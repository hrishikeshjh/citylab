import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  adminEmail: string;
  adminName: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    adminEmail: { type: String, required: true },
    adminName: { type: String, default: "Administrator" },
    action: { type: String, required: true },
    details: { type: String, required: true },
    ipAddress: { type: String, default: "127.0.0.1" },
  },
  { timestamps: true }
);

export default mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
