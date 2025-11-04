import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Bar title is required"],
      trim: true,
    },
    goalAmount: {
      type: Number,
      required: [true, "Free shipping goal amount is required"],
      min: [0, "Goal amount must be a positive number"],
    },
    secondaryGoal: {
      type: Number,
      default: null,
      min: [0, "Secondary goal must be a positive number"],
    },

    initialMessage: {
      type: String,
      required: [true, "Initial message is required"],
      trim: true,
    },
    progressMessage: {
      type: String,
      required: [true, "Progress message is required"],
      trim: true,
    },
    goalMessage: {
      type: String,
      required: [true, "Goal achieved message is required"],
      trim: true,
    },

    currency: {
      type: String,
      enum: ["AED", "USD", "EUR", "INR"],
      required: [true, "Currency is required"],
    },
    currencySymbol: {
      type: String,
      required: [true, "Currency symbol is required"],
      trim: true,
    },
    symbolPosition: {
      type: String,
      enum: ["before", "after"],
      default: "before",
    },

    bgColor: {
      type: String,
      default: "#9cece0",
    },
    textColor: {
      type: String,
      default: "#000000",
    },
    fontFamily: {
      type: String,
      enum: [
        "Lato",
        "Roboto",
        "Josefin Sans",
        "Lobster",
        "Open Sans",
        "Montserrat",
      ],
      default: "Lato",
    },
    fontSize: {
      type: Number,
      default: 18,
      min: [10, "Font size too small"],
      max: [48, "Font size too large"],
    },

    link: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Shipping =
  mongoose.models.Shipping || mongoose.model("Shipping", shippingSchema);
