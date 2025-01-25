import { useContext } from "react";
import PropTypes from "prop-types";
import "./Main.css";
import { assets } from "../../assets/assets";
import { ChatContext } from "../../context/context";
import DOMPurify from "dompurify";
import katex from "katex";
import "katex/dist/katex.min.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const cardData = [
  { text: "Suggest a beautiful place to visit", icon: assets.compass_icon },
  { text: "Summarize a story", icon: assets.bulb_icon },
  { text: "Make a code snippet", icon: assets.question_icon },
  { text: "Improve the readability of the following code", icon: assets.code_icon },
];

const Cards = ({ onSend }) => {
  return (
    <div className="cards">
      {cardData.map((card, index) => (
        <div key={index} className="card" onClick={() => onSend(card.text)}>
          <p>{card.text}</p>
          <img src={card.icon} alt={`${card.text} Icon`} />
        </div>
      ))}
    </div>
  );
};

Cards.propTypes = {
  onSend: PropTypes.func.isRequired,
};

const renderMath = (text) => {
  try {
    return katex.renderToString(text, { throwOnError: false });
  } catch {
    return text; // Return raw text if invalid math
  }
};

const highlightCode = (code, language) => {
  return Prism.highlight(code, Prism.languages[language], language);
};

const Message = ({ message }) => {
  switch (message.type) {
    case "text":
      return <div dangerouslySetInnerHTML={{ __html: message.content }} />;
    case "math":
      return <div dangerouslySetInnerHTML={{ __html: renderMath(message.content) }} />;
    case "code":
      return (
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightCode(message.content, "javascript") }} />
        </pre>
      );
    default:
      return <p>{message.content}</p>;
  }
};

Message.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};



const Main = () => {
  const {
    onSend,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(ChatContext);

  const safeHTML = DOMPurify.sanitize(resultData);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend(input);
    }
  };

  return (
    <div className="main">
      <header className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </header>

      {!showResult ? (
        <div className="main-container">
          <section className="greet">
            <p><span>Hello Dev Kannan</span></p>
            <p>How can I help you today?</p>
          </section>

          <Cards onSend={onSend} />
        </div>
      ) : (
        <div className="result">
          <header className="result-heading">
            <img src={assets.user_icon} alt="User Icon" />
            <p>{recentPrompt}</p>
          </header>

          <div className="result-data">
            <img src={assets.gemini_icon} alt="Gemini Icon" />
            {loading ? (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <Message message={{ type: "text", content: safeHTML }} />
            )}
          </div>
        </div>
      )}

      <footer className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="What can I help you with?"
            onKeyDown={handleKeyDown}
          />
          <div className="search-actions">
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            <img onClick={() => onSend(input)} src={assets.send_icon} alt="Send Icon" />
          </div>
        </div>

        <p className="bottom-info">
          Gemini may provide inaccurate or incomplete information, including financial, medical, health, or safety advice. Please consult a professional for specific advice. <br />
          Made with <span>&#10084;</span> by <a href="https://github.com/kannanhacker123">Kannan</a>
        </p>
      </footer>
    </div>
  );
};

export default Main;
