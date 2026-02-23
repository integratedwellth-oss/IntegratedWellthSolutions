const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors")({ origin: true });
const FormData = require("form-data");

admin.initializeApp();

exports.createInvoice = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== 'POST') return res.status(400).send('POST Required');

    try {
      const { customerName, itemName, rate } = req.body;
      
      // 1. Get Access Token using Secrets from Firebase Config
      const tokenParams = new URLSearchParams();
      tokenParams.append("refresh_token", process.env.ZOHO_REFRESH_TOKEN);
      tokenParams.append("client_id", process.env.ZOHO_CLIENT_ID);
      tokenParams.append("client_secret", process.env.ZOHO_CLIENT_SECRET);
      tokenParams.append("grant_type", "refresh_token");

      const tokenRes = await axios.post("https://accounts.zoho.com/oauth/v2/token", tokenParams);
      const accessToken = tokenRes.data.access_token;

      // 2. Prepare Zoho Invoice Data
      const invoiceData = {
        customer_name: customerName,
        line_items: [{ name: itemName, rate: rate, quantity: 1 }]
      };

      const form = new FormData();
      form.append("JSONString", JSON.stringify(invoiceData));

      // 3. Send to Zoho
      const zohoRes = await axios.post(
        `https://www.zohoapis.com/invoice/v3/invoices?organization_id=${process.env.ZOHO_ORG_ID}`,
        form,
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
            ...form.getHeaders()
          }
        }
      );

      res.status(200).json({ success: true, data: zohoRes.data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
});
