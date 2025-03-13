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
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveLink("#");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Apply active link to both Portfolio, Testimonials, and FAQs
            if (id === "portfolio" || id === "testimonials" || id === "faqs") {
              setActiveLink("#portfolio"); // All these should trigger Portfolio active state
            } else {
              setActiveLink(`#${id}`);
            }
          }
        });
      },
      {
        rootMargin: "-100px 0px",
        threshold: 0.5,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link);

    if (link === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      document.querySelector(link)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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