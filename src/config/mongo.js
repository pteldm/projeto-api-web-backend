import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("A variável de ambiente MONGO_URI não está definida. Verifique seu arquivo .env");
}

const client = new MongoClient(uri);
let dbInstance;

export const connectToDatabase = async () => {
  await client.connect();
  console.log("🟢 Conectado com sucesso ao MongoDB Atlas!");
  dbInstance = client.db('loja');
};

export const getDB = () => {
  if (!dbInstance) throw new Error("Banco de dados não inicializado!");
  return dbInstance;
};