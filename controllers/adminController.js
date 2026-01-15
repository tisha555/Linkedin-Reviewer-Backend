import User from "../models/User.js";
import Review from "../models/Review.js";
import Notification from "../models/Notification.js";

export const assignExpert = async (req, res) => {
  const { reviewId, expertId } = req.body;

  await Notification.create({
  userId: review.userId,
  title: "Expert Assigned",
  message: "Your review has been assigned to an expert.",
  type: "REVIEW"
});


  res.json({ message: "Expert assigned" });
};


export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find()
    .populate("userId", "name email role")
    .populate("expertId", "name email role");

  res.json(reviews);
};

export const changeUserRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("-password");

  res.json(user);
};


export const reassignExpert = async (req, res) => {
  const { expertId } = req.body;

  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });

  review.expertId = expertId;
  review.status = "IN_REVIEW";

  await review.save();

  res.json({ message: "Expert reassigned successfully", review });
};




export const blockUnblockUser = async (req, res) => {
  const { isBlocked } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked },
    { new: true }
  ).select("-password");

  res.json({ message: "User status updated", user });
};

