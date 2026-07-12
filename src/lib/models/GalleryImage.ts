import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage extends Document {
  fileUrl: string;
  category: "Laboratory" | "Doctors" | "Equipment" | "Reception" | "Events";
  displayOrder: number;
  description?: string;
  createdAt: Date;
}

const GalleryImageSchema: Schema = new Schema(
  {
    fileUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["Laboratory", "Doctors", "Equipment", "Reception", "Events"],
      default: "Laboratory",
    },
    displayOrder: { type: Number, default: 0 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);
