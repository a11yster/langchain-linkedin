import { SupabaseVectorStore } from "langchain/vectorstores/supabase"
import { createClient } from "@supabase/supabase-js"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = "AIzaSyCFyr5f8JjgPjKrKytgP4hOAqVUPy35PkI"
const sbApiKey =" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5d3d1cGxwdG9od2Fia3lhcWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1MzkxMjcsImV4cCI6MjAxODExNTEyN30.y0d5byRVHP5GfFeb2H6UyUtby_0HJB5LkK84rSiMyz8"
const sbUrl = "https://aywwuplptohwabkyaqfh.supabase.co"
const client = createClient(sbUrl, sbApiKey)

const embeddings = new GoogleGenerativeAIEmbeddings({ 
    apiKey:geminiApiKey
 })

const vectorStore = new SupabaseVectorStore(embeddings,{
    client,
    tableName:'documents',
    queryName:'match_documents'
})

const retriever = vectorStore.asRetriever()

export { retriever,geminiApiKey }