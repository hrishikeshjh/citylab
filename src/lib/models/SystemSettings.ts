import mongoose, { Schema, Document } from "mongoose";

export interface ISystemSettings extends Document {
  labName: string;
  logoUrl: string;
  faviconUrl: string;
  themeColorPrimary: string;
  emailSettingsHost: string;
  emailSettingsPort: number;
  emailSettingsUser: string;
  termsAndConditions: string;
  privacyPolicy: string;
  
  // CMS Section
  heroHeadline: string;
  heroSubheading: string;
  heroCtaText: string;
  heroImageUrl: string;
  aboutText: string;
  aboutStatsPatients: string;
  aboutStatsExperience: string;
  aboutMission: string;
  aboutVision: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const SystemSettingsSchema: Schema = new Schema(
  {
    labName: { type: String, default: "City Lab Diagnostic Centre" },
    logoUrl: { type: String, default: "/images/logo.svg" },
    faviconUrl: { type: String, default: "/favicon.ico" },
    themeColorPrimary: { type: String, default: "#F97316" },
    emailSettingsHost: { type: String, default: "smtp.mailgun.org" },
    emailSettingsPort: { type: Number, default: 587 },
    emailSettingsUser: { type: String, default: "postmaster@citylab.com" },
    termsAndConditions: { type: String, default: "Terms and Conditions of City Lab." },
    privacyPolicy: { type: String, default: "Privacy Policy of City Lab." },

    // CMS Settings
    heroHeadline: { type: String, default: "Accurate Diagnostics. Trusted Care." },
    heroSubheading: { type: String, default: "From blood tests to health packages, select slots and consult doctors online." },
    heroCtaText: { type: String, default: "Book a Test" },
    heroImageUrl: { type: String, default: "/images/hero-background.png" },
    aboutText: { type: String, default: "City Lab has been a pioneer in state-of-the-art diagnostic testing services." },
    aboutStatsPatients: { type: String, default: "50k+" },
    aboutStatsExperience: { type: String, default: "15+ Years" },
    aboutMission: { type: String, default: "To deliver standard laboratory services with utmost empathy and speed." },
    aboutVision: { type: String, default: "To be the most trusted diagnostics name in healthcare." },
  },
  { timestamps: true }
);

export default mongoose.models.SystemSettings ||
  mongoose.model<ISystemSettings>("SystemSettings", SystemSettingsSchema);
