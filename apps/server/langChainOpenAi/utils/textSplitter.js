import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const geminiApiKey = "AIzaSyCFyr5f8JjgPjKrKytgP4hOAqVUPy35PkI";

const sbApiKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5d3d1cGxwdG9od2Fia3lhcWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1MzkxMjcsImV4cCI6MjAxODExNTEyN30.y0d5byRVHP5GfFeb2H6UyUtby_0HJB5LkK84rSiMyz8";
const sbUrl = "https://aywwuplptohwabkyaqfh.supabase.co";

fs.readFile("../description.txt", "utf8", async (err, text) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    const textSplitter = new RecursiveCharacterTextSplitter();
    const output = await textSplitter.createDocuments([text]);
    console.log(output);
    const client = createClient(sbUrl, sbApiKey);
    await SupabaseVectorStore.fromDocuments(
      output,
      new GoogleGenerativeAIEmbeddings({
        apiKey: geminiApiKey,
        modelName: "embedding-001",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Ron Johnson",
      }),
      {
        client,
        tableName: "documents",
      }
    );
  } catch (err) {
    console.log(err);
  }
});
