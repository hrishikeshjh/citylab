import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  date: string; // YYYY-MM-DD
  slot: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  notes?: string;
  createdAt: Date;
}

const AppointmentSchema: Schema = new Schema({
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);
