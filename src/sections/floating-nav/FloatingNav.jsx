import { useState, useEffect } from "react";
import data from "./data";
import Scrollspy from "react-scrollspy";
import Nav from "./Nav";
import "./floating-nav.css";

const FloatingNav = () => {
  const [showNav, setShowNav] = useState(true); // Start visible
  const [activeLink, setActiveLink] = useState("#");
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    // Function to handle scroll for showing/hiding the floating nav
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      
      // Determine if we're at the top of the page
      const atTop = currentScrollTop <= 10;
      setIsAtTop(atTop);
      
      // Always show nav at the top or when starting to scroll
      if (atTop) {
        setShowNav(true);
      } else {
        // If not at top, show nav when scrolling starts
        setShowNav(true);
        // And start the auto-hide timer
        startHideTimer();
      }
      
      // Get all section elements for active link detection
      const sections = {
        home: document.querySelector("header"),
        about: document.querySelector("#about"),
        services: document.querySelector("#services"),
        portfolio: document.querySelector("#portfolio"),
        contact: document.querySelector("#contact")
      };
      
      // Default to home/top for very top of page
      if (window.scrollY < 100) {
        setActiveLink("#");
        return;
      }
      
      // Determine which section is currently visible
      let currentSection = "";
      const scrollPosition = window.scrollY + 200;
      
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
      
      // Set active link based on current section
      if (currentSection === "home") {
        setActiveLink("#");
      } else if (currentSection) {
        setActiveLink(`#${currentSection}`);
      }
    };

    // Function to handle auto-hide after 3 seconds
    let hideTimeout = null;
    const startHideTimer = () => {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (!isAtTop) { // Never hide if at the top
          setShowNav(false);
        }
      }, 3000);
    };

    // Function to handle clicks for showing nav
    const handleClick = (e) => {
      if (isAtTop) return; // Don't process clicks if at top (already visible)
      
      const isClickableElement = 
        e.target.tagName === 'BUTTON' || 
        e.target.closest('button') || 
        (e.target.tagName === 'A' && e.target.href) ||
        e.target.closest('a') ||
        window.getComputedStyle(e.target).cursor === 'pointer' ||
        window.getComputedStyle(e.target.closest('*') || {}).cursor === 'pointer';
      
      if (!isClickableElement) {
        setShowNav(true);
        startHideTimer();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClick);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      clearTimeout(hideTimeout);
    };
  }, [isAtTop]);

  return (
    <ul id="floating__nav" className={showNav ? "show" : "hide"}>
      <Scrollspy
        offset={-400}
        className="scrollspy"
        items={["header", "about", "services", "portfolio", "contact"]}
        currentClassName="active"
      >
        {data.map((item) => (
          <Nav 
            key={item.id} 
            item={item}
            isActive={activeLink === item.link}
          />
        ))}
      </Scrollspy>
    </ul>
  );
};

export default FloatingNav;