import Review from "../models/Review.js";
import Notification from "../models/Notification.js";


export const assignedReviews = async (req, res) => {
  res.json(await Review.find({ expertId: req.user.id }));
};

export const submitFeedback = async (req, res) => {
  await Notification.create({
  userId: review.userId,
  title: "Review Completed",
  message: "Your resume/LinkedIn review is completed. Download your feedback now.",
  type: "REVIEW"
});

}
