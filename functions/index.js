const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

// Configure your email transporter (Use SendGrid or Gmail App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // REPLACE WITH YOUR EMAIL
    pass: "your-app-password",     // REPLACE WITH YOUR GMAIL APP PASSWORD
  },
});

exports.sendActivityEmail = onDocumentCreated("user_logs/{logId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    return;
  }

  const data = snapshot.data();
  const activityTime = data.timestamp ? data.timestamp.toDate().toLocaleString() : new Date().toLocaleString();

  const mailOptions = {
    from: '"IWS Command Center" <system@integratedwellth.co.za>',
    to: "enquiries@integratedwellth.co.za", // The admin getting the alert
    subject: `🚨 Dashboard Activity: ${data.action}`,
    html: `
      <h3>User Interaction Detected</h3>
      <p><strong>Action:</strong> ${data.action}</p>
      <p><strong>Details:</strong> ${data.details}</p>
      <p><strong>User ID:</strong> ${data.userId || "Anonymous"}</p>
      <p><strong>Time:</strong> ${activityTime}</p>
      <hr />
      <p style="font-size:10px; color:gray;">Integrated Wellth Solutions System Log</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.log(`Email sent for action: ${data.action}`);
  } catch (error) {
    logger.error("Error sending email:", error);
  }
});
