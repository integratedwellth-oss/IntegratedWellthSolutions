const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors")({ origin: true });
const FormData = require("form-data");

admin.initializeApp();

// ZOHO CONFIGURATION (Set these via CLI: firebase functions:config:set zoho.client_id="..." etc)
const ZOHO_CONFIG = {
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
  orgId: process.env.ZOHO_ORG_ID
};

// Helper: Get Fresh Access Token
async function getAccessToken() {
  try {
    const params = new URLSearchParams();
    params.append("refresh_token", ZOHO_CONFIG.refreshToken);
    params.append("client_id", ZOHO_CONFIG.clientId);
    params.append("client_secret", ZOHO_CONFIG.clientSecret);
    params.append("redirect_uri", "http://localhost:3000"); // Not used for refresh but required param
    params.append("grant_type", "refresh_token");

    const response = await axios.post("https://accounts.zoho.com/oauth/v2/token", params);
    return response.data.access_token;
  } catch (error) {
    logger.error("Error refreshing token", error);
    throw new Error("Authentication failed");
  }
}

// FUNCTION 1: Create Invoice
exports.createInvoice = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') return res.status(400).send('POST required');

    try {
      const { customerName, itemName, rate, quantity } = req.body;
      const accessToken = await getAccessToken();

      // Basic Invoice JSON Structure for Zoho
      const invoiceData = {
        customer_name: customerName, // In prod, use customer_id
        line_items: [
          {
            name: itemName,
            rate: rate,
            quantity: quantity
          }
        ]
      };

      // Zoho requires JSONString in FormData
      const form = new FormData();
      form.append("JSONString", JSON.stringify(invoiceData));

      const zohoResponse = await axios.post(
        `https://www.zohoapis.com/invoice/v3/invoices?organization_id=${ZOHO_CONFIG.orgId}`,
        form,
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
            ...form.getHeaders()
          }
        }
      );

      // Log success to Firestore for dashboard history
      await admin.firestore().collection('user_logs').add({
        action: 'Invoice Created',
        details: `Invoice for ${customerName} - ${itemName}`,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).json({ success: true, data: zohoResponse.data });

    } catch (error) {
      logger.error("Invoice creation failed", error.response ? error.response.data : error);
      res.status(500).json({ error: error.message });
    }
  });
});

// FUNCTION 2: Log Activity & Email (As requested)
exports.logActivity = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { action, details } = req.body;
    
    await admin.firestore().collection('user_logs').add({
      action,
      details,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    // Email logic would go here (requires Blaz plan for external network calls to SendGrid/Gmail)
    logger.info(`Activity Logged: ${action}`);
    
    res.status(200).json({ success: true });
  });
});
