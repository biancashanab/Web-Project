import AdoptionOrder from "../../models/AdoptionOrder.js";
import SiteReview from "../../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { userId, userName, reviewMessage, reviewValue } = req.body;

    const adoptionOrder = await AdoptionOrder.findOne({ userId });

    if (!adoptionOrder) {
      return res.status(403).json({
        success: false,
        message: "You need to complete an adoption to leave a review.",
      });
    }

  const existingReview = await SiteReview.findOne({ userId });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed the adoption experience!",
      });
    }

    const newReview = new SiteReview({
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await SiteReview.find();
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
      totalReviewsLength;

    res.status(201).json({
      success: true,
      data: newReview,
      averageReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error processing the review.",
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await SiteReview.find();
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error fetching reviews.",
    });
  }
};