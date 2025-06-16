import React, { useState, useEffect, useRef } from "react";
import programmer from "/Josh.png";
import aboutMeImg from "/Programmer.png";
import TypewriterHeading from "../../Animation/TypeWriterHeading";
import SplashCursor from "../../Animation/SplashCursor";
import Preloader from "../../Animation/PreLoader";

const labels = ["Home", "About", "Work Experience", "Projects", "Contact"];
function AdminLoginPage(): JSX.Element {
  const [loading, setLoading] = useState(true); // Control preloader

  const handlePreloaderFinish = () => {
    setLoading(false);
  };

  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [animate, setAnimate] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [typewriterTrigger, setTypewriterTrigger] = useState<number>(0);
  const [visibleSections, setVisibleSections] = useState({
    home: false,
    about: false,
  });

  const handleScroll = (label: string) => {
    const target = document.getElementById(label.toLowerCase().replace(/\s+/g, "-"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu after click (mobile)
    }
  };

  const skills = [
    { name: "React", percentage: 80, color: "bg-blue-500" },
    { name: "Tailwind", percentage: 70, color: "bg-blue-300" },
    { name: "JavaScript", percentage: 85, color: "bg-yellow-400" },
    { name: "C#", percentage: 90, color: "bg-pink-400" },
    { name: "C++", percentage: 70, color: "bg-red-200" },
    { name: "VB.Net", percentage: 80, color: "bg-blue-800" },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (!id) return;

          const isVisible = entry.isIntersecting;

          setVisibleSections((prev) => ({
            ...prev,
            [id]: isVisible,
          }));

          if (isVisible) {
            setActiveSection(id);
          }

          if (id === "home" && isVisible) {
            setTypewriterTrigger((prev) => prev + 1);
          }

          if (id === "about") {
            if (isVisible) {
              // Delay to allow width reset to 0% before animating
              setTimeout(() => setAnimate(true), 100);
            } else {
              setAnimate(false); // Reset when about section leaves viewport
            }
          }

          if (id === "work experience") {
            if (isVisible) {
              // Delay to allow width reset to 0% before animating
              setTimeout(() => setAnimate(true), 100);
            } else {
              setAnimate(false); // Reset when about section leaves viewport
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((el) => observer.observe(el));

    return () => {
      sections.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {!loading && <Preloader onFinish={handlePreloaderFinish} />}
      {loading && (
        <>
          <div className="overflow-x-hidden bg-black scroll-smooth">

            <SplashCursor />
            <nav className="fixed inset-x-0 top-0 z-50 flex h-12 sm:h-16 items-center justify-between bg-white/20 backdrop-blur-md border-b border-white/10 shadow-xl rounded-b-2xl px-4 transition-all duration-300">
              {/* Optional logo/title */}
              <div className="text-white font-bold text-lg hidden sm:flex items-center space-x-2">
                <img
                  src="/portfolioLogo.png"
                  alt="joshLaz"
                  className="w-10 h-10 object-contain rounded-full bg-transparent"
                />
                <span className="text-3xl mb-1 font-serif">Josh</span>
              </div>

              {/* Desktop nav */}
              <div className="hidden sm:flex flex-wrap justify-end gap-3 overflow-x-auto">
                {labels.map((label) => {
                  const sectionId = label.toLowerCase().replace(/\s+/g, "-");
                  const isActive = activeSection === sectionId;

                  return (
                    <button
                      key={label}
                      className={`text-sm font-medium px-4 py-2 rounded-lg transition whitespace-nowrap ${isActive ? "bg-white text-black font-semibold" : "text-white bg-white/10 hover:bg-white/20"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll(label);
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Mobile hamburger button */}
              <div className="flex items-center sm:hidden">
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="text-white p-2 rounded hover:bg-white/20 transition"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Mobile dropdown */}
              <div
                className={`fixed top-12 inset-x-0 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                  } bg-gray-900 text-white border-b border-white/10 shadow-md rounded-b-2xl flex flex-col items-center py-2 sm:hidden transition-all duration-300 ease-in-out`}
              >
                {labels.map((label) => (
                  <button
                    key={label}
                    className="text-base font-medium text-white px-4 py-3 w-full text-center hover:bg-gray-800 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(label);
                      setIsMenuOpen(false); // close after clicking
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </nav>

            {/* ── Main content ──────────────────────────────────────────────── */}
            <main className="w-full">

              <section
                id="home"
                ref={aboutRef}
                className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white px-4 sm:px-10 gap-6 sm:gap-8 py-8"
              >
                {/* Lightning Background positioned absolutely */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                </div>
                {/* Intro text */}
                <div
                  className={`order-2 md:order-1 w-full md:w-2/5 max-w-lg bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl transition-all duration-1000 ${visibleSections.home ? "opacity-100 md:translate-x-0" : "opacity-0 md:-translate-x-10"}`}
                >
                  <h2 className="text-2xl text-start">Hello! I'm</h2>
                  <h2 className="md:text-5xl text-3xl font-bold text-start pt-2">Joshua Lazaro</h2>
                  <h2 className="mt-8 text-lg text-start">Web | Software Developer</h2>
                  <TypewriterHeading
                    text="Turning ideas into code and code into experiences."
                    trigger={typewriterTrigger}
                  />

                  {/* Button + Social Media */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Download Resume Button */}
                    <a
                      href="/Joshua Lazaro CV.pdf"
                      download
                      className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-md hover:opacity-80 transition-opacity w-full sm:w-auto text-center"
                    >
                      <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition-opacity"></span>
                      Download Resume
                    </a>

                    {/* Social Media Icons */}
                    <div className="flex space-x-3">
                      <a
                        href="https://www.facebook.com/Jollibee262"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/facebooklogo.png"
                          alt="Facebook"
                          className="md:mt-2 md:ml-20 size-7 rounded-full hover:scale-110 transition-transform duration-300"
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/joshua-lazaro-7b35011b4/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/linkedInlogo.png"
                          alt="LinkedIn"
                          className="md:mt-2 md:ml-3 size-7 rounded-full hover:scale-110 transition-transform duration-300"
                        />
                      </a>
                      <a
                        href="https://github.com/nimbus-cutie-26"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/githublogo.png"
                          alt="GitHub"
                          className="md:mt-2 md:ml-3 size-7 rounded-full hover:scale-110 transition-transform duration-300"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hero image */}
                <div className="order-1 md:order-2 w-full md:w-2/5 max-w-40 sm:max-w-sm md:max-w-72 flex items-center justify-center md:ml-16">
                  <img
                    src={programmer}
                    alt="Programmer"
                    className={`w-full h-auto object-contain md:object-cover rounded-2xl drop-shadow-[5px_10px_10px_rgba(0,0,0,0.5)] transition-all duration-1000  ${visibleSections.home ? "opacity-100 md:translate-x-0" : "opacity-0 md:-translate-x-10"}`}
                  />
                </div>
              </section>

              {/* About ---------------------------------------------------------------- */}
              <section
                id="about"
                ref={homeRef}
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white px-4 sm:px-10 md:py-16"
              >
                {/* Flex layout based on image */}
                <div className="flex flex-col md:mt-5 mt-10 sm:flex-row gap-4 w-full max-w-5xl">
                  {/* Left vertical box */}
                  <div className="flex-1 h-96 sm:h-auto sm:min-h-[50px] sm:flex hidden items-center justify-center">
                    <img
                      src={aboutMeImg}
                      alt="aboutMeImg"
                      className={`w-full max-w-xs sm:max-w-sm md:h-[500px] h-[250px] object-contain rounded-2xl drop-shadow-[5px_10px_10px_rgba(0,0,0,0.5)] transition-all duration-1000 ${visibleSections.about ? "opacity-100 md:translate-x-0" : "opacity-0 md:-translate-x-10"}`}
                    />
                  </div>
                  {/* Right column with two boxes stacked */}
                  <div className="flex flex-col flex-1 gap-4 mt-5">
                    <div
                      className={`h-40 transition-all duration-1000 rounded-xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] ${visibleSections.about
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                        }`}
                    >
                      <div className="text-center text-white text-xl">
                        <h2 className="font-bold">About Me</h2>
                        <p className="md:text-sm text-xs mt-3 text-justify indent-8 mx-5 leading-relaxed">
                          A Computer Science graduate proficient in ReactJS, Tailwind CSS, and Figma, with backend
                          experience in Java, C#, JavaScript, and Node.js. I focus on building responsive,
                          intuitive web applications that seamlessly blend visual appeal with robust functionality.
                        </p>
                      </div>
                    </div>
                    <div
                      className={`h-80 transition-all duration-1000 rounded-xl p-4 text-white space-y-2 overflow-y-auto text-xs ${visibleSections.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    >
                      <h2 className="text-base font-semibold mb-1 text-center">My Skills Overview</h2>
                      <p className="text-[11px] text-gray-300 mb-3 text-justify">
                        Versatile in front-end and back-end technologies, specializing in the development of
                        responsive, scalable, and user-focused web applications.
                      </p>

                      {skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-0.5">
                            <span>{skill.name}</span>
                            <span>{skill.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                            <div
                              className={`${skill.color} h-full transition-all duration-1000 ease-in-out`}
                              style={{ width: animate ? `${skill.percentage}%` : "0%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>


              <section
                id="work-experience"
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white px-4 sm:px-10 py-16"
              >
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">Work Experience</h1>
                <ul className="space-y-2 text-base sm:text-lg">
                  <li>📌 Faculty Attendance Monitoring System</li>
                  <li>📌 Fingerprint-based Door Lock System</li>
                  <li>📌 RFID Plastic-to-Load Waste System</li>
                </ul>
              </section>

              {/* Projects ------------------------------------------------------------- */}
              <section
                id="projects"
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white px-4 sm:px-10 py-16"
              >
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">Projects</h1>
                <ul className="space-y-2 text-base sm:text-lg">
                  <li>📌 Faculty Attendance Monitoring System</li>
                  <li>📌 Fingerprint-based Door Lock System</li>
                  <li>📌 RFID Plastic-to-Load Waste System</li>
                </ul>
              </section>


              {/* Contact -------------------------------------------------------------- */}
              <section
                id="contact"
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white px-4 sm:px-10 py-16"
              >
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact</h1>
                <p className="text-base sm:text-lg">
                  Email: <span className="underline">joshua@example.com</span>
                </p>
                <p className="text-base sm:text-lg">
                  GitHub:{" "}
                  <a href="https://github.com/yourusername" className="underline">
                    github.com/yourusername
                  </a>
                </p>
              </section>
            </main>
          </div>
        </>
      )}

    </>
  );
}

export default AdminLoginPage;
