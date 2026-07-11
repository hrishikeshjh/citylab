import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  patientName: string;
  email: string;
  phone: string;
  type: "walk-in" | "online" | "phone" | "home";
  status: "pending" | "confirmed";
  details: string; // List of tests/packages
  date: Date;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ["walk-in", "online", "phone", "home"], required: true },
  status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
  details: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
