import React from "react";
import Card from "../../components/Card";
import { useThemeContext } from "../../context/theme-context";

const Project = ({ project }) => {
  const { themeState } = useThemeContext();
  const { title, desc, demo, github, image, imageLight, category } = project;
  
  // Determine which image to use based on background theme
  const displayImage = themeState.background === "bg-1" ? imageLight : image;

  // List of technology keywords to highlight
  const techKeywords = [
    "Figma", "Vue", "Vue.js", "VueJS", "JavaScript", "MySQL", "Python", "React", 
    "Node.js", "Express.js", "HTML", "CSS", "Bootstrap", "Vuex", "Flask", 
    "Firebase", "API", "JWT", "MEVN", "AWS", "Lambda", "GitHub", "React Leaflet",
    "Alpha Vantage", "Gemini AI", "Leaflet"
  ];

  // Function to highlight tech keywords
  const highlightTechWords = (text) => {
    if (!text) return "";
    
    // Create regex pattern to match all tech words (with word boundaries)
    const pattern = new RegExp(`\\b(${techKeywords.join('|')})\\b`, 'g');
    
    // Split the text by matching tech words
    const parts = text.split(pattern);
    
    // Map through parts and wrap tech words with styled spans
    return parts.map((part, index) => {
      if (techKeywords.includes(part)) {
        return <span key={index} className="tech-keyword">{part}</span>;
      }
      return part;
    });
  };

  return (
    <Card className="portfolio__project">
      {/* Image container with fixed height */}
      <div className="portfolio__project-image">
        <img 
          src={displayImage} 
          alt={title} 
          className="project-image-transition" 
        />
      </div>
      
      {/* Title with fixed height */}
      <div className="portfolio__project-title">
        <h4 title={title}>{title}</h4>
      </div>
      
      {/* Description container with fixed position and scrolling */}
      <div className="portfolio__project-description">
        <p>{desc ? highlightTechWords(desc) : '\u00A0'}</p>
      </div>
      
      {/* Buttons always at bottom */}
      <div className="portfolio__project-cta">
        <a href={demo} className="btn sm primary" target="_blank" rel="noopener noreferrer">
          Demo
        </a>
        {category !== "UI/UX" && (
          <a href={github} className="btn sm" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
      </div>
    </Card>
  );
};

export default Project;