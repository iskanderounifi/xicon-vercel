import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }, colors: {
        'brand-p1-c1': '#6863BF', // Violet
        'brand-p1-c2': '#51B3D8', // Sky Blue
        'brand-p1-c3': '#F26D6E', // Reddish
        'brand-p1-c4': '#F1836A', // Red-Orange
        'brand-p1-c6': '#5ECCD9', // Cyan
        'brand-p2-c1': '#570EF1', // Purple
        'brand-p2-c3': '#05DBF3', // Bright Cyan
        'brand-p2-c5': '#F3A950', // Orange-Yellow
        'brand-p2-c6': '#F5FFFF', // Almost White
        'brand-p3-c3': '#F20B8B', // Pink/Magenta
        "P1-C1": "#6366F1", // Example: Indigo 500
        "P1-C2": "#3B82F6", // Example: Blue 500
        "P1-C3": "#F97316", // Example: Orange 500
        "P2-C1": "#A855F7", // Example: Purple 500
        "P2-C2": "#8B5CF6", // Example: Violet 500
        "P2-C5": "#78716C", // Example: Stone 500
        "P3-C3": "#EC4899", // Example: Pink 500
        "P3-C4": "#14B8A6", // Example: Teal 500
        "P3-C5": "#84CC16", // Example: Lime 500
        'custom-gray-700': '#374151',
        'custom-violet-950': '#311b92',
        'custom-dark-blue-gray': '#373552',
        'custom-dark-navy': '#09244B',

        'sky-50': '#f0f9ff',
        'red-50': '#fef2f2',
        'orange-50': '#fff7ed',
        'violet-100': '#ede9fe',

        'rose-200': '#fecdd3',
        'purple-100': '#f3e8ff',
        'amber-200': '#fde68a',
        'rose-50': '#fff1f2',
        'cyan-300': '#67e8f9',
        'star-yellow': '#F0C519', // New
      },
       boxShadow: {
        'custom-form': '0px 0px 50px 0px rgba(98,98,98,0.08)',
        'pricing-card': '0px 4px 25px 1px rgba(29,29,29,0.05)', // New
        'rating-bar': '4px 4px 25px 1px rgba(29,29,29,0.05)',  // New
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config; 