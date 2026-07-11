// --- Types --------------------------------------------------------------------

export interface QuickService {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface CollectionStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface HealthPackage {
  name: string;
  description: string;
  tests: string[];
  price: number;
  originalPrice: number;
  popular?: boolean;
}

export interface Test {
  name: string;
  category: string;
  preparation: string;
  reportTime: string;
  price: number;
}

export interface Doctor {
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  availableDays: string;
  consultationFee: number;
  image: string;
}

export interface Article {
  title: string;
  date: string;
  readingTime: string;
  category: string;
  summary: string;
  image: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  location: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// --- Data ---------------------------------------------------------------------

export const quickServices: QuickService[] = [
  {
    icon: "TestTube",
    title: "Book a Test",
    description: "Schedule any diagnostic test quickly and easily from our wide range of offerings.",
    href: "#tests",
  },
  {
    icon: "Home",
    title: "Book Home Collection",
    description: "Get your samples collected from the comfort of your home by our trained technicians.",
    href: "#home-collection",
  },
  {
    icon: "Stethoscope",
    title: "Consult a Doctor",
    description: "Connect with our experienced doctors for consultations and report discussions.",
    href: "#doctors",
  },
  {
    icon: "FileDown",
    title: "Download Reports",
    description: "Access and download your diagnostic reports online, anytime, anywhere.",
    href: "#contact",
  },
  {
    icon: "Package",
    title: "Health Packages",
    description: "Explore our comprehensive health checkup packages designed for every need.",
    href: "#packages",
  },
  {
    icon: "Phone",
    title: "Emergency Contact",
    description: "Reach our team anytime for urgent diagnostic needs or medical emergencies.",
    href: "#contact",
  },
];

export const stats: Stat[] = [
  { value: "15+", label: "Years of Service" },
  { value: "50,000+", label: "Patients Served" },
  { value: "300+", label: "Diagnostic Tests" },
  { value: "98%", label: "Patient Satisfaction" },
];

export const whyChooseItems: WhyChooseItem[] = [
  {
    icon: "UserCheck",
    title: "Experienced Doctors",
    description: "Our team includes highly qualified pathologists and specialists with decades of clinical experience.",
  },
  {
    icon: "ShieldCheck",
    title: "Certified Laboratory",
    description: "We follow NABL standard practices to ensure every test meets the highest quality benchmarks.",
  },
  {
    icon: "FileCheck",
    title: "Accurate Reports",
    description: "Every report is verified through rigorous quality control processes for reliable results.",
  },
  {
    icon: "Smartphone",
    title: "Digital Report Access",
    description: "Receive your reports digitally through our portal — access them anytime, from any device.",
  },
  {
    icon: "IndianRupee",
    title: "Affordable Pricing",
    description: "Quality diagnostics should be accessible. We offer competitive prices without compromising accuracy.",
  },
  {
    icon: "Home",
    title: "Home Collection",
    description: "Our trained phlebotomists come to your doorstep, making testing convenient and comfortable.",
  },
  {
    icon: "Clock",
    title: "Quick Turnaround",
    description: "Most of our routine tests deliver results within 24 hours, so you are never left waiting.",
  },
  {
    icon: "Microscope",
    title: "Modern Equipment",
    description: "We use state-of-the-art analyzers and instruments for precise and dependable diagnostics.",
  },
];

export const collectionSteps: CollectionStep[] = [
  {
    step: 1,
    title: "Book Online",
    description: "Choose your test and select a convenient date and time through our simple booking form.",
    icon: "CalendarCheck",
  },
  {
    step: 2,
    title: "Technician Visits",
    description: "A trained and certified phlebotomist arrives at your home at the scheduled time.",
    icon: "UserCheck",
  },
  {
    step: 3,
    title: "Sample Collected",
    description: "Your sample is collected safely following strict hygiene and handling protocols.",
    icon: "TestTube",
  },
  {
    step: 4,
    title: "Reports Delivered",
    description: "Your digital reports are delivered to your email and our online portal within hours.",
    icon: "Mail",
  },
];

export const healthPackages: HealthPackage[] = [
  {
    name: "Basic Health Checkup",
    description: "Essential screening for overall health assessment",
    tests: [
      "Complete Blood Count",
      "Blood Sugar (Fasting)",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Urine Routine",
    ],
    price: 999,
    originalPrice: 1500,
  },
  {
    name: "Women's Wellness",
    description: "Comprehensive health package designed for women",
    tests: [
      "Complete Blood Count",
      "Thyroid Profile",
      "Iron Studies",
      "Vitamin D",
      "Vitamin B12",
      "Calcium",
      "Urine Routine",
      "Pap Smear",
    ],
    price: 2499,
    originalPrice: 3800,
    popular: true,
  },
  {
    name: "Senior Citizen Package",
    description: "Thorough health assessment for those aged 60 and above",
    tests: [
      "Complete Blood Count",
      "Blood Sugar (Fasting & PP)",
      "HbA1c",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Thyroid Profile",
      "Vitamin D",
      "ECG",
      "Chest X-Ray",
    ],
    price: 3499,
    originalPrice: 5500,
  },
  {
    name: "Diabetes Package",
    description: "Complete diabetes screening and monitoring panel",
    tests: [
      "Blood Sugar (Fasting & PP)",
      "HbA1c",
      "Kidney Function Test",
      "Lipid Profile",
      "Urine Microalbumin",
      "Urine Routine",
    ],
    price: 1299,
    originalPrice: 2000,
  },
  {
    name: "Heart Health Package",
    description: "Cardiac risk assessment and heart health evaluation",
    tests: [
      "Lipid Profile",
      "ECG",
      "Troponin I",
      "CRP (High Sensitivity)",
      "Blood Sugar (Fasting)",
      "Complete Blood Count",
      "Chest X-Ray",
    ],
    price: 2999,
    originalPrice: 4500,
  },
  {
    name: "Executive Health Checkup",
    description: "Premium full-body health assessment for professionals",
    tests: [
      "Complete Blood Count",
      "Blood Sugar (Fasting & PP)",
      "HbA1c",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Thyroid Profile",
      "Vitamin D",
      "Vitamin B12",
      "Iron Studies",
      "ECG",
      "Chest X-Ray",
      "Urine Routine",
    ],
    price: 4999,
    originalPrice: 8000,
  },
];

export const testCategories = [
  "All",
  "Blood Test",
  "Urine Test",
  "Hormone Test",
  "Liver Function",
  "Kidney Function",
  "Vitamin Tests",
  "Cancer Markers",
  "Cardiac",
  "Diabetes",
  "Thyroid",
];

export const tests: Test[] = [
  { name: "Complete Blood Count (CBC)", category: "Blood Test", preparation: "No fasting required", reportTime: "Same day", price: 350 },
  { name: "Haemoglobin (Hb)", category: "Blood Test", preparation: "No fasting required", reportTime: "Same day", price: 150 },
  { name: "ESR", category: "Blood Test", preparation: "No fasting required", reportTime: "Same day", price: 150 },
  { name: "Blood Group & Rh Typing", category: "Blood Test", preparation: "No fasting required", reportTime: "Same day", price: 200 },
  { name: "Peripheral Blood Smear", category: "Blood Test", preparation: "No fasting required", reportTime: "Next day", price: 300 },
  { name: "Urine Routine & Microscopy", category: "Urine Test", preparation: "Midstream sample preferred", reportTime: "Same day", price: 150 },
  { name: "Urine Culture & Sensitivity", category: "Urine Test", preparation: "Midstream clean-catch sample", reportTime: "3 days", price: 600 },
  { name: "Urine Microalbumin", category: "Urine Test", preparation: "No special preparation", reportTime: "Same day", price: 450 },
  { name: "Thyroid Profile (T3, T4, TSH)", category: "Thyroid", preparation: "No fasting required", reportTime: "Same day", price: 600 },
  { name: "TSH (Thyroid Stimulating Hormone)", category: "Thyroid", preparation: "No fasting required", reportTime: "Same day", price: 300 },
  { name: "Free T3 & Free T4", category: "Thyroid", preparation: "No fasting required", reportTime: "Same day", price: 500 },
  { name: "Testosterone", category: "Hormone Test", preparation: "Fasting preferred, morning sample", reportTime: "Next day", price: 550 },
  { name: "Estradiol (E2)", category: "Hormone Test", preparation: "No fasting required", reportTime: "Next day", price: 600 },
  { name: "Prolactin", category: "Hormone Test", preparation: "No fasting required", reportTime: "Next day", price: 500 },
  { name: "Cortisol (Morning)", category: "Hormone Test", preparation: "Morning fasting sample required", reportTime: "Next day", price: 450 },
  { name: "Liver Function Test (LFT)", category: "Liver Function", preparation: "10-12 hours fasting", reportTime: "Same day", price: 500 },
  { name: "SGPT (ALT)", category: "Liver Function", preparation: "No fasting required", reportTime: "Same day", price: 200 },
  { name: "SGOT (AST)", category: "Liver Function", preparation: "No fasting required", reportTime: "Same day", price: 200 },
  { name: "Bilirubin (Total & Direct)", category: "Liver Function", preparation: "Fasting preferred", reportTime: "Same day", price: 250 },
  { name: "Kidney Function Test (KFT)", category: "Kidney Function", preparation: "10-12 hours fasting", reportTime: "Same day", price: 500 },
  { name: "Serum Creatinine", category: "Kidney Function", preparation: "No fasting required", reportTime: "Same day", price: 200 },
  { name: "Blood Urea", category: "Kidney Function", preparation: "No fasting required", reportTime: "Same day", price: 200 },
  { name: "Uric Acid", category: "Kidney Function", preparation: "Fasting preferred", reportTime: "Same day", price: 200 },
  { name: "Vitamin D (25-OH)", category: "Vitamin Tests", preparation: "No fasting required", reportTime: "Next day", price: 800 },
  { name: "Vitamin B12", category: "Vitamin Tests", preparation: "No fasting required", reportTime: "Next day", price: 700 },
  { name: "Iron Studies", category: "Vitamin Tests", preparation: "Fasting preferred", reportTime: "Next day", price: 600 },
  { name: "Folate (Folic Acid)", category: "Vitamin Tests", preparation: "Fasting preferred", reportTime: "Next day", price: 600 },
  { name: "PSA (Prostate Specific Antigen)", category: "Cancer Markers", preparation: "No fasting required", reportTime: "Next day", price: 700 },
  { name: "CA-125", category: "Cancer Markers", preparation: "No fasting required", reportTime: "Next day", price: 900 },
  { name: "AFP (Alpha Fetoprotein)", category: "Cancer Markers", preparation: "No fasting required", reportTime: "Next day", price: 700 },
  { name: "CEA (Carcinoembryonic Antigen)", category: "Cancer Markers", preparation: "No fasting required", reportTime: "Next day", price: 800 },
  { name: "Lipid Profile", category: "Cardiac", preparation: "10-12 hours fasting", reportTime: "Same day", price: 500 },
  { name: "Troponin I", category: "Cardiac", preparation: "No fasting required", reportTime: "Same day", price: 800 },
  { name: "CRP (High Sensitivity)", category: "Cardiac", preparation: "No fasting required", reportTime: "Same day", price: 500 },
  { name: "Homocysteine", category: "Cardiac", preparation: "Fasting preferred", reportTime: "Next day", price: 900 },
  { name: "Blood Sugar (Fasting)", category: "Diabetes", preparation: "10-12 hours fasting", reportTime: "Same day", price: 100 },
  { name: "Blood Sugar (Post Prandial)", category: "Diabetes", preparation: "2 hours after meal", reportTime: "Same day", price: 100 },
  { name: "HbA1c (Glycated Haemoglobin)", category: "Diabetes", preparation: "No fasting required", reportTime: "Same day", price: 450 },
  { name: "Glucose Tolerance Test (GTT)", category: "Diabetes", preparation: "Overnight fasting required", reportTime: "Same day", price: 350 },
  { name: "Fasting Insulin", category: "Diabetes", preparation: "10-12 hours fasting", reportTime: "Next day", price: 500 },
];

export const doctors: Doctor[] = [
  {
    name: "Dr. Rajesh Sharma",
    qualification: "MD Pathology, DNB",
    specialization: "Clinical Pathology",
    experience: "22 Years",
    availableDays: "Mon — Sat",
    consultationFee: 500,
    image: "/images/doctor-1.png",
  },
  {
    name: "Dr. Priya Mehta",
    qualification: "MD Biochemistry",
    specialization: "Clinical Biochemistry",
    experience: "18 Years",
    availableDays: "Mon — Fri",
    consultationFee: 500,
    image: "/images/doctor-2.png",
  },
  {
    name: "Dr. Amit Desai",
    qualification: "MD Microbiology",
    specialization: "Microbiology & Serology",
    experience: "15 Years",
    availableDays: "Mon — Sat",
    consultationFee: 400,
    image: "/images/doctor-3.png",
  },
  {
    name: "Dr. Sneha Kulkarni",
    qualification: "MD Pathology",
    specialization: "Haematology",
    experience: "12 Years",
    availableDays: "Tue — Sat",
    consultationFee: 400,
    image: "/images/doctor-4.png",
  },
];

export const articles: Article[] = [
  {
    title: "Understanding Diabetes: Causes, Symptoms, and Testing",
    date: "June 28, 2026",
    readingTime: "6 min read",
    category: "Diabetes",
    summary: "Learn about the different types of diabetes, early warning signs to watch for, and the diagnostic tests that can help you stay ahead of this condition.",
    image: "/images/article-diabetes.png",
  },
  {
    title: "Why Vitamin D Matters More Than You Think",
    date: "June 20, 2026",
    readingTime: "5 min read",
    category: "Nutrition",
    summary: "Vitamin D plays a critical role in bone health, immunity, and mood. Find out how a simple blood test can reveal if you are getting enough.",
    image: "/images/article-vitamins.png",
  },
  {
    title: "How Often Should You Get Blood Tests Done?",
    date: "June 12, 2026",
    readingTime: "4 min read",
    category: "Preventive Care",
    summary: "Regular blood work is one of the simplest ways to stay on top of your health. Here is a practical guide to how often you should be getting tested.",
    image: "/images/article-blood-test.png",
  },
  {
    title: "Managing Thyroid Health: What Your Reports Tell You",
    date: "May 30, 2026",
    readingTime: "7 min read",
    category: "Thyroid",
    summary: "Thyroid disorders are common but often go unnoticed. Understand what TSH, T3, and T4 levels mean and when to seek medical advice.",
    image: "/images/article-thyroid.png",
  },
  {
    title: "Heart Health: 5 Tests You Should Not Skip",
    date: "May 18, 2026",
    readingTime: "5 min read",
    category: "Cardiac",
    summary: "Heart disease remains a leading cause of concern. These five diagnostic tests can help detect risks early and keep your heart in good shape.",
    image: "/images/article-heart.png",
  },
  {
    title: "Signs of Vitamin Deficiency You Should Not Ignore",
    date: "May 5, 2026",
    readingTime: "6 min read",
    category: "Nutrition",
    summary: "Fatigue, hair loss, and mood changes can all be linked to vitamin deficiencies. Learn the common signs and the tests that can help identify them.",
    image: "/images/article-deficiency.png",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ananya Iyer",
    text: "The booking process was simple, the technician arrived on time, and I received my reports the same day. I highly recommend City Lab for anyone looking for reliable diagnostic services.",
    rating: 5,
    location: "Pune",
  },
  {
    name: "Rajiv Menon",
    text: "I have been getting my annual health checkup done at City Lab for the past three years. The staff is courteous, the lab is clean, and the reports are always accurate. Very satisfied.",
    rating: 5,
    location: "Mumbai",
  },
  {
    name: "Sunita Deshmukh",
    text: "As a senior citizen, I appreciate the home collection service. The phlebotomist was gentle and professional, and I received my reports on my phone within hours. Excellent service.",
    rating: 5,
    location: "Nagpur",
  },
  {
    name: "Karan Joshi",
    text: "The Women's Wellness package was very thorough. Dr. Mehta took the time to explain all my reports in detail. It felt genuinely caring, not rushed. I will definitely come back.",
    rating: 5,
    location: "Pune",
  },
  {
    name: "Meera Nair",
    text: "City Lab is the only diagnostic center I trust for my family. From blood tests to X-rays, everything is handled professionally. The digital reports feature is very convenient too.",
    rating: 4,
    location: "Bangalore",
  },
  {
    name: "Deepak Patel",
    text: "Got my complete health checkup done here on a friend's recommendation. The experience was smooth from booking to receiving the reports. Good pricing, reliable results.",
    rating: 5,
    location: "Ahmedabad",
  },
];

export const faqs: FAQ[] = [
  {
    question: "How can I book a home collection?",
    answer: "You can book a home collection through our website by clicking the 'Book Home Collection' button, or by calling us directly at +91 98765 43210. Simply choose your preferred test, select a date and time, and our trained phlebotomist will visit your home at the scheduled time.",
  },
  {
    question: "When will my reports be available?",
    answer: "Most routine test reports (such as CBC, blood sugar, and urine tests) are available within the same day. Specialized tests like hormone panels, cancer markers, and culture tests may take 1 to 3 days. You will receive a notification as soon as your reports are ready.",
  },
  {
    question: "Are doctors available every day?",
    answer: "Our doctors are available Monday through Saturday. Some doctors have specific consultation days, which are listed on their profiles. You can book a consultation appointment through our website or by phone. Sunday consultations are available only for emergencies.",
  },
  {
    question: "Do I need to fast before my test?",
    answer: "It depends on the test. Tests like fasting blood sugar, lipid profile, liver function, and kidney function require 10 to 12 hours of fasting (water is usually allowed). Tests like CBC, thyroid profile, and vitamin levels do not require fasting. Please check the test details or ask our team if you are unsure.",
  },
  {
    question: "How are reports delivered?",
    answer: "Reports are delivered digitally through email and are also accessible through our online portal. You can download and print them at any time. If you prefer, we can also provide printed copies at our center. For home collection patients, reports are shared via WhatsApp as well.",
  },
  {
    question: "Can I consult a doctor after receiving my reports?",
    answer: "Absolutely. We encourage all patients to discuss their results with one of our experienced doctors. You can book a post-report consultation through our website or by calling us. Our doctors will explain your results clearly and suggest any next steps if needed.",
  },
];

export const contactInfo = {
  phone: "+91 98765 43210",
  email: "info@citylabdiagnostics.com",
  workingHours: "Mon — Sat: 7:00 AM — 9:00 PM | Sun: 8:00 AM — 2:00 PM",
  emergencyContact: "+91 98765 43211",
  address: "123, Health Avenue, Near City Hospital, Pune, Maharashtra 411001",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Book Test", href: "#tests" },
  { label: "Health Packages", href: "#packages" },
  { label: "Tests", href: "#tests" },
  { label: "Doctors", href: "#doctors" },
  { label: "Articles", href: "#articles" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
