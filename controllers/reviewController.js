import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const review = await Review.create({
    userId: req.user.id,
    ...req.body
  });
  res.status(201).json(review);
};

export const myReviews = async (req, res) => {
  res.json(await Review.find({ userId: req.user.id }));
};



export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // allow only owner (user) or assigned expert or admin
    if (
      String(review.userId) !== req.user.id &&
      String(review.expertId) !== req.user.id &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateReview = async (req, res) => {
  try {
    const { resumeUrl, linkedinUrl } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // only user can edit their review while not completed
    if (String(review.userId) !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (review.status === "COMPLETED") {
      return res.status(400).json({ message: "Review already completed" });
    }

    review.resumeUrl = resumeUrl ?? review.resumeUrl;
    review.linkedinUrl = linkedinUrl ?? review.linkedinUrl;

    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (String(review.userId) !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await review.deleteOne();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};