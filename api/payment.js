import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { amount, currency, receipt } = req.body;

      if (!amount || !currency || !receipt) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt,
      };

      const order = await razorpay.orders.create(options);

      res.status(200).json({ order });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.error("Payment creation failed:", err);
    res.status(500).json({ error: "Payment creation failed", details: err.message });
  }
}
