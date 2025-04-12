import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    mission: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    welcome: {
      type: String,
      required: true,
    },
    aboutUs: {
      type: String,
      required: true,
    },
    whatWeDo: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    petCareGuides: [
      {
        type: {
          type: String,
          required: true,
        },
        icon: {
          type: String,
          required: true,
        },
        bgColor: {
          type: String,
          required: true,
        },
        iconBgColor: {
          type: String,
          required: true,
        },
        items: [{
          type: String,
          required: true,
        }],
      },
    ],
    userReviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        date: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    quote: {
      text: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", AboutSchema);
export default About; 