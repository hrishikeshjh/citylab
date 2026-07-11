import mongoose, { Schema, Document } from "mongoose";

export interface ITest extends Document {
  name: string;
  category: string;
  price: number;
  description: string;
  preparation: string;
  sampleType: string;
  reportTime: string;
  department: string;
  equipment?: string;
  technician?: string;
  referenceValues: string;
  featured: boolean;
  visible: boolean;
}

const TestSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  preparation: { type: String, required: true },
  sampleType: { type: String, required: true },
  reportTime: { type: String, required: true },
  department: { type: String, required: true },
  equipment: { type: String },
  technician: { type: String },
  referenceValues: { type: String, required: true },
  featured: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
});

export default mongoose.models.Test || mongoose.model<ITest>("Test", TestSchema);
