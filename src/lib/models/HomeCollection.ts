import mongoose, { Schema, Document } from "mongoose";

export interface IHomeCollection extends Document {
  bookingId: string;
  patientName: string;
  address: string;
  phone: string;
  collectionTime: string;
  technicianName: string;
  status: "OTP Verification" | "Arrival status" | "Sample collected" | "Sample received" | "Completed" | "Missed";
  notes?: string;
  otp?: string;
  createdAt: Date;
}

const HomeCollectionSchema: Schema = new Schema({
  bookingId: { type: String, required: true },
  patientName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  collectionTime: { type: String, required: true },
  technicianName: { type: String, required: true },
  status: {
    type: String,
    enum: ["OTP Verification", "Arrival status", "Sample collected", "Sample received", "Completed", "Missed"],
    default: "Arrival status",
  },
  notes: { type: String },
  otp: { type: String, default: "1234" }, // mock OTP for demo verification
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.HomeCollection || mongoose.model<IHomeCollection>("HomeCollection", HomeCollectionSchema);
