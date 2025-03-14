import data from "./data";
import { IoIosColorPalette } from "react-icons/io";
import { useModalContext } from "../../context/modal-context";
import { useState, useEffect } from "react";
import "./navbar.css";

const Navbar = () => {
  const { showModalHandler } = useModalContext();
  const [activeLink, setActiveLink] = useState("#");
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    // Get all section elements
    const sections = {
      home: document.querySelector("header"),
      about: document.querySelector("#about"),
      services: document.querySelector("#services"),
      portfolio: document.querySelector("#portfolio"),
      testimonials: document.querySelector("#testimonials"),
      faqs: document.querySelector("#faqs"),
      contact: document.querySelector("#contact")
    };
    
    const handleScroll = () => {
      // Get current scroll position with offset for better detection
      const scrollPosition = window.scrollY + 200;
      
      // Default to home/top for very top of page
      if (window.scrollY < 100) {
        setActiveLink("#");
        return;
      }
      
      // Determine which section is currently visible
      let currentSection = "";
      
      // Check each section's position
      for (const [id, section] of Object.entries(sections)) {
        if (!section) continue; // Skip if section not found
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = id;
          break;
        }
      }
      
      // Apply special case for portfolio, testimonials, and faqs
      if (currentSection === "portfolio" || currentSection === "testimonials" || currentSection === "faqs") {
        setActiveLink("#portfolio");
      } else if (currentSection === "home") {
        setActiveLink("#");
      } else if (currentSection) {
        setActiveLink(`#${currentSection}`);
      }
    };
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link);
    
    // Special handling for Portfolio link
    if (link === "#portfolio") {
      const portfolioSection = document.querySelector("#portfolio");
      if (portfolioSection) {
        window.scrollTo({
          top: portfolioSection.offsetTop,
          behavior: "smooth",
        });
      }
    }
    // Handle scrolling to other sections
    else if (link === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const targetElement = document.querySelector(link);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <a href="index.html" className="nav__logo">
          <img
            src="https://i.postimg.cc/zvtpyV80/20240422-102953.jpg"
            alt="Logo"
          />
        </a>
        <ul className="nav__menu">
          {data.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                className={`${activeLink === item.link ? "active" : ""} ${
                  hoveredLink === item.link ? "hovered" : ""
                }`}
                onClick={(e) => handleLinkClick(e, item.link)}
                onMouseEnter={() => setHoveredLink(item.link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <button id="theme__icon" onClick={showModalHandler}>
          <IoIosColorPalette />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;