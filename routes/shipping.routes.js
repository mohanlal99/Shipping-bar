import express from "express";
import { Shipping } from "../models/Shipping.js";

export const shippingRoute = express.Router();

shippingRoute.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Free Shipping Bar API!" });
});

shippingRoute.post("/create", async (req, res) => {
  try {
    const shippingBar = new Shipping(req.body);
    const savedBar = await shippingBar.save();

    res.status(201).json({
      success: true,
      message: "Shipping bar created successfully!",
      data: savedBar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

shippingRoute.get("/all", async (req, res) => {
  try {
    const bars = await Shipping.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bars.length,
      data: bars,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

shippingRoute.get("/:id", async (req, res) => {
  try {
    const bar = await Shipping.findById(req.params.id);
    if (!bar) {
      return res
        .status(404)
        .json({ success: false, message: "Shipping bar not found" });
    }
    res.status(200).json({ success: true, data: bar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});




shippingRoute.put("/:id", async (req, res) => {
  try {
    const updatedBar = await Shipping.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBar) {
      return res
        .status(404)
        .json({ success: false, message: "Shipping bar not found" });
    }

    res.status(200).json({
      success: true,
      message: "Shipping bar updated successfully!",
      data: updatedBar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});