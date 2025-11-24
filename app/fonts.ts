import localFont from "next/font/local";

export const urbanist = localFont({
  src: [
    {
      path: "../public/font/static/Urbanist-SemiBold.ttf", // 👈 adjust path if needed
      weight: "600",
      style: "normal",
    },
    // If you have more weights, add them here:
    // { path: "../public/font/static/Urbanist-Regular.ttf", weight: "400", style: "normal" },
    // { path: "../public/font/static/Urbanist-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-urbanist",
});