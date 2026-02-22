const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PROGRAM_PRICES = {
  'language_bachelor': 27900,
  'master_phd': 34900
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { program_type, name, email, phone, country_code } = req.body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }
    if (!PROGRAM_PRICES[program_type]) {
      return res.status(400).json({ error: 'Invalid program type' });
    }

    const intent = await stripe.paymentIntents.create({
      amount: PROGRAM_PRICES[program_type],
      currency: 'usd',
      metadata: { name, email, phone, program_type, country_code: country_code || '' }
    });

    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(400).json({ error: 'Payment processing error' });
  }
};
