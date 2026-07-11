import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  availableDays: string[];
  consultationFee: number;
  image: string;
  biography?: string;
  onlineConsultation: boolean;
  slots: string[];
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  availableDays: [{ type: String, required: true }],
  consultationFee: { type: Number, required: true },
  image: { type: String, required: true },
  biography: { type: String },
  onlineConsultation: { type: Boolean, default: true },
  slots: [{ type: String }],
});

export default mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);
