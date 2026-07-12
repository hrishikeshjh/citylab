import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  patientName: string;
  rating: number;
  reviewText: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  createdAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    patientName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    reviewText: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
