import { links, socials } from "./data";
import { useState, useEffect } from "react";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
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
    <footer>
      <div className="container footer__container">
        <ul className="nav__menu">
          {links.map((fLink) => (
            <li key={fLink.id}>
              <a 
                href={fLink.link}
                className={`${activeLink === fLink.link ? "active" : ""} ${
                  hoveredLink === fLink.link ? "hovered" : ""
                }`}
                onClick={(e) => handleLinkClick(e, fLink.link)}
                onMouseEnter={() => setHoveredLink(fLink.link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {fLink.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="footer__socials">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="footer__copyright">
        <small> {currentYear} Simanye Somdaka &copy; All Rights Reserved</small>
      </div>
    </footer>
  );
};

export default Footer;