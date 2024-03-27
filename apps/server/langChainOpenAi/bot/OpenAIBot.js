import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

import { PromptTemplate } from "langchain/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
import dotenv from "dotenv";
// import readline from "readline";

import { retriever, geminiApiKey } from "../utils/retriever.js";
import { combineVectorStoreInfo } from "../utils/combineVectorStoreInfo.js";

dotenv.config();

const llm = new ChatGoogleGenerativeAI({
  apiKey: geminiApiKey,
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
});

const standaloneQuestionTemplate =
  "Given a question, convert it to a standalone question. question: {question} standalone question:";

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate
);

const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about Ron Johnson and his services based on the context provided. 
However,you shouldn't behave like a bot but rather as Ron Johnson.
 Try to find the answer in the context. 
 If you really don't know the answer, say "I'm sorry, I don't know the answer to that."
 Do not reply to racial slurs and abuse related questions and other explicit content.
 And direct the questioner to email ronjohn@gmail.com(only if you don't know anything about a specific topic or if they ask your email). Don't try to make up an answer. 
 Also,DO NOT REPLY IN MORE THAN 100 words,like keep it short always,unless absolutely necessary.
 Always speak as if you were chatting to a friend and do not give really long answers unless it's absolutely required,be onto the point always
 context:{context}
 question:{question}
 answer:`;

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const standaloneQuestionChain = standaloneQuestionPrompt
  .pipe(llm)
  .pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
  (prevResult) => prevResult.standalone_question,
  retriever,
  combineVectorStoreInfo,
]);

const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

const runnableChain = RunnableSequence.from([
  {
    standalone_question: standaloneQuestionChain,
    original_input: new RunnablePassthrough(),
  },
  {
    context: retrieverChain,
    question: ({ original_input }) => original_input.question,
  },
  answerChain,
]);

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const askQuestion = async () => {
//   for (;;) {
//     const question = await new Promise((resolve) => {
//       rl.question("Ask a question: ", (input) => {
//         resolve(input);
//       });
//     });

//     if (question.toLowerCase() === "exit") {
//       break;
//     }

//     try {
//       const response = await runnableChain.invoke({ question });
//       console.log("Response:", response);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   rl.close();
// };

// askQuestion();

export async function getAnswerFromGemini(question) {
  const response = await runnableChain.invoke({ question });
  return response;
}
