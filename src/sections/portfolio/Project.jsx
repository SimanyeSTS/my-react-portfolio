import React from "react";
import Card from "../../components/Card";

const Project = ({ project }) => {
  const { title, desc, demo, github, image, category } = project;

  return (
    <Card className="portfolio__project">
      <div className="portfolio__project-image">
        <img src={image || "https://via.placeholder.com/400x200"} alt={title} />
      </div>
      <h4 title={title}>{title}</h4>
      <p>{desc}</p>
      <div className="portfolio__project-cta">
        <a href={demo} className="btn sm primary" target="_blank" rel="noopener noreferrer">
          Demo
        </a>
        {}
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