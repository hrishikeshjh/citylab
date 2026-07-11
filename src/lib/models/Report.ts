import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  patientName: string;
  email: string;
  bookingId: string;
  testNames: string;
  fileUrl?: string;
  status: "Draft" | "Pending Doctor Review" | "Approved";
  verifiedBy?: string;
  digitalSignatureUrl?: string;
  version: number;
  createdAt: Date;
}

const ReportSchema: Schema = new Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  bookingId: { type: String, required: true },
  testNames: { type: String, required: true },
  fileUrl: { type: String },
  status: { type: String, enum: ["Draft", "Pending Doctor Review", "Approved"], default: "Draft" },
  verifiedBy: { type: String },
  digitalSignatureUrl: { type: String },
  version: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);
