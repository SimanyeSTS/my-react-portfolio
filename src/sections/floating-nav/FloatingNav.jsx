import { useState, useEffect } from "react";
import data from "./data";
import { updateActiveLinkByScroll, scrollToSection } from "../../components/navUtils";
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
      
      // Update active link based on scroll position
      const newActiveLink = updateActiveLinkByScroll();
      setActiveLink(newActiveLink);
      
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

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClick);
    
    // Initial check
    setActiveLink(updateActiveLinkByScroll());
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link);
    scrollToSection(link);
  };

  return (
    <ul id="floating__nav" className={showNav ? "show" : "hide"}>
      {data.map((item) => (
        <li key={item.id}>
          <a
            href={item.link}
            className={activeLink === item.link ? "active" : ""}
            onClick={(e) => handleLinkClick(e, item.link)}
          >
            {item.icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FloatingNav;