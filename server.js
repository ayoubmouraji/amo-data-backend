require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Données reçues :", req.body);

  // Configuration du transporteur SMTP
 // const transporter = nodemailer.createTransport({
  //  host: 'smtp.zoho.com',
  // port: 465,
    //secure: true,
  //  auth: {
    //  user: process.env.EMAIL_USER,
  //    pass: process.env.EMAIL_PASS
  //  }
 // });
  const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

  try {
    await transporter.sendMail({
    from: `"${name} via Site AMO DATA" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: 'Nouveau message du formulaire de contact',
    text: message
        });
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error("Erreur lors de l'envoi d'email :", error);
    console.log('Email:', process.env.EMAIL_USER);
    console.log('Mot de passe:', process.env.EMAIL_PASS ? '✔️ défini' : '❌ non défini');
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});