import Payment from "../models/Payment.js";
import Package from "../models/Package.js";

export const checkoutPayment = async (req, res) => {
  try {
    const { packageId } = req.body;

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    const payment = await Payment.create({
      userId: req.user.id,
      packageId: pkg._id,
      amount: pkg.price,
      status: "PENDING",
      gateway: "MOCK"
    });

    res.status(201).json({
      message: "Checkout created",
      paymentId: payment._id,
      amount: payment.amount,
      status: payment.status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const myPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }).populate("packageId");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const paymentWebhook = async (req, res) => {
  try {
    const { paymentId, status, transactionId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = status;
    payment.transactionId = transactionId;
    await payment.save();

    res.json({ message: "Webhook processed", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
