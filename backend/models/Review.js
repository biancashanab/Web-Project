import mongoose from "mongoose";

const SiteReviewSchema = new mongoose.Schema(
  {
    PetId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  { timestamps: true }
);

const SiteReview = mongoose.model("SiteReview", SiteReviewSchema);
export default SiteReview;