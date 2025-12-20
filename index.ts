import { onRequest } from "firebase-functions/v2/https";
import axios from "axios";

// SECURE SETUP: These pull from your GitHub Secrets vault
const PHONE_ID = "931320420054495"; 
const PERMANENT_TOKEN = process.env.WHATSAPP_TOKEN; 
const GEMINI_KEY = process.env.GEMINI_API_KEY;      
const VERIFY_TOKEN = "IWS_SECRET_2025"; 

// ... rest of the WhatsApp Agent logic ...
