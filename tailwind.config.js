/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      boxShadow: {
        text: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      },
      backgroundColor: {
        "login-bg": "#658147",
        "login-frame-bg": "#E7F0DC",
        "sidebar-bg": "#597445",
        "dashboard-bg": "#eef0ea",
      },
      width: {
        "360px": "360px",
        "400px": "400px",
        "300px": "300px",
        "110px": "110px",
        "55px": "55px",
        "20%": "20%",
        "40%": "40%",
        "60%": "60%",
        "50%": "50%",
        "80%": "80%",
        "100%": "100%",
      },
      height: {
        "420px": "420px",
        "270px": "270px",
      },
      margin: {
        "105px": "105px",
        "50px": "50px",
      },
    },
  },
  plugins: [],
};
