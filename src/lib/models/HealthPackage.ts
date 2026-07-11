import mongoose, { Schema, Document } from "mongoose";

export interface IHealthPackage extends Document {
  name: string;
  description: string;
  tests: string[];
  price: number;
  originalPrice: number;
  discount: number;
  offerValidity?: string;
  popular: boolean;
  categoryTags: string[]; // e.g. "Senior Citizen", "Women's Wellness", "Corporate"
}

const HealthPackageSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  tests: [{ type: String, required: true }],
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  offerValidity: { type: String },
  popular: { type: Boolean, default: false },
  categoryTags: [{ type: String }],
});

export default mongoose.models.HealthPackage || mongoose.model<IHealthPackage>("HealthPackage", HealthPackageSchema);
