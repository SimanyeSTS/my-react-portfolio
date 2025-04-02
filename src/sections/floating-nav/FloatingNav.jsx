import { useState, useEffect } from "react";
import data from "./data";
import Scrollspy from "react-scrollspy";
import Nav from "./Nav";
import "./floating-nav.css";

const FloatingNav = () => {
  const [showNav, setShowNav] = useState(true);
  const [activeLink, setActiveLink] = useState("#");
  const [isScrolling, setIsScrolling] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Show nav for 3 seconds on initial load
  useEffect(() => {
    if (initialLoad) {
      const timer = setTimeout(() => {
        setShowNav(false);
        setInitialLoad(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  // Handle scroll events
  useEffect(() => {
    let scrollTimeout;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show nav when scrolling starts
      if (Math.abs(currentScrollTop - lastScrollTop) > 5) {
        setIsScrolling(true);
        setShowNav(true);
        
        // Hide nav after 3 seconds of no scrolling
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (!isAtTop()) {
            setShowNav(false);
          }
          setIsScrolling(false);
        }, 3000);
      }
      
      lastScrollTop = currentScrollTop;
      
      // Update active link based on scroll position
      updateActiveLink();
    };

    // Handle clicks on non-clickable elements
    const handleClick = (e) => {
      const target = e.target;
      
      // Check if the clicked element is non-interactive (text, empty space, etc.)
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[onclick]') ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.isContentEditable;
      
      if (!isInteractive) {
        setShowNav(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (!isAtTop()) {
            setShowNav(false);
          }
        }, 3000);
      }
    };

    // Check if we're at the top of the page
    const isAtTop = () => {
      return window.scrollY <= 10;
    };

    // Update active link based on scroll position
    const updateActiveLink = () => {
      const sections = {
        home: document.querySelector("header"),
        about: document.querySelector("#about"),
        services: document.querySelector("#services"),
        portfolio: document.querySelector("#portfolio"),
        contact: document.querySelector("#contact")
      };
      
      if (isAtTop()) {
        setActiveLink("#");
        return;
      }
      
      let currentSection = "";
      const scrollPosition = window.scrollY + 200;
      
      for (const [id, section] of Object.entries(sections)) {
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = id;
          break;
        }
      }
      
      if (currentSection === "home") {
        setActiveLink("#");
      } else if (currentSection) {
        setActiveLink(`#${currentSection}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClick);
    
    // Initial check
    updateActiveLink();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      clearTimeout(scrollTimeout);
    };
  }, []);

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