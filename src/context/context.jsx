import { createContext, useState } from "react";
import PropTypes from "prop-types";
import runChat from "../config/gemini"; // Assuming this function handles the API call
import Showdown from "showdown"; // Used to convert markdown to HTML

// Create a context for the chat state
export const ChatContext = createContext();

const ContextProvider = ({ children }) => {
    // Using useState to manage all state variables
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Function to simulate typing by progressively revealing the text
    const delayPara = (text, callback, delay = 5) => {
        let index = 0;
        const chars = text.split(""); // Convert text to an array of characters
        let currentText = ""; // Variable to track the progressively built text

        // Set an interval to update the text character by character
        const interval = setInterval(() => {
            if (index < chars.length) {
                currentText += chars[index]; // Append the next character to currentText
                callback(currentText); // Call the callback with the updated text
                index++;
            } else {
                clearInterval(interval); // Stop the interval when all characters are shown
            }
        }, delay);
    };

    // Function to handle sending a chat prompt
    const onSend = async (prompt) => {
        try {
            // Set the loading state to true and reset previous result data
            setLoading(true);
            setResultData("");

            // Get the response from the chat API
            const response = await runChat(prompt);
            // Convert the response from markdown to HTML
            const htmlResponse = new Showdown.Converter().makeHtml(response);

            // Use delayPara to progressively show the result data
            delayPara(htmlResponse, (updatedText) => {
                setResultData(updatedText);
            });

            // Update the state with the recent prompt and previous prompt history
            setRecentPrompt(prompt);
            setPreviousPrompt((prev) => [...prev, prompt]);
            setShowResult(true);
        } catch (error) {
            // Handle any errors and show an error message
            console.error("Error sending prompt:", error);
            setResultData("An error occurred. Please try again.");
        } finally {
            // Set loading to false once the request completes
            setLoading(false);
        }
    };

    // Context value that will be provided to children components
    const contextValue = {
        input,
        setInput,
        recentPrompt,
        previousPrompt,
        showResult,
        loading,
        resultData,
        onSend,
    };

    // Return the context provider that wraps around the children components
    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    );
};

// PropTypes validation to ensure proper use of the context provider
ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContextProvider;
