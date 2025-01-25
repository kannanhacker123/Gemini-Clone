
const GEMINI_API_KEY = "AIzaSyDqxQ_AJCT35GVahviNE8gaGmZLSTE6LPkAAravindk"
import { GoogleGenerativeAI } from "@google/generative-ai";
// 
const apiKey = GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const runChat = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text();
}

export default runChat;