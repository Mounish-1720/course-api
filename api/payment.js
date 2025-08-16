// api/payment.js
import Razorpay from "razorpay";
import db from "./db";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createOrder(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { courseName, amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
}

export async function verifyPayment(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { razorpay_order_id, razorpay_payment_id, courseName, amount } = req.body;

  try {
    // Save payment info to MotherDuck
    const sql = `
      INSERT INTO payments (course_name, order_id, payment_id, amount)
      VALUES ('${courseName}', '${razorpay_order_id}', '${razorpay_payment_id}', ${amount})
    `;
    await db.query(sql);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
