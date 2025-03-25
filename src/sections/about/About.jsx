import React from "react";
import CV from "../../assets/cv.pdf";
import { HiDownload } from "react-icons/hi";
import data from "./data";
import Card from "../../components/Card";
import SkillsCard from "../../components/SkillsCard";
import "./about.css";

const About = () => {
  // Skills data matching the Next.js portfolio structure
  const skillsData = {
    title: "Skills",
    skills: { 
      python: "Python", 
      javascript: "JavaScript", 
      java: "Java", 
      react: "React", 
      html5: "HTML5", 
      css3: "CSS3", 
      nodedotjs: "Node.js", 
      express: "Express", 
      nextdotjs: "Next.js", 
      sqlite: "SQLite", 
      tailwindcss: "Tailwind", 
      mongodb: "MongoDB", 
      testinglibrary: "Testing", 
      docker: "Docker", 
      git: "Git", 
      github: "GitHub", 
      gitlab: "GitLab", 
      visualstudiocode: "VS Code", 
      figma: "Figma" 
    }
  };

  return (
    <section id="about">
      <div className="container about__container" data-aos="fade-in">
        <div className="about__content-container">
          <h2>About Me</h2>
          <p>Every journey has a story—here's mine.</p>
          <div className="about__cards">
            {data.map((item) => (
              <Card key={item.id} className="about__card">
                <span className="about__card-icon">{item.icon}</span>
                <h5>{item.title}</h5>
                <small>{item.desc}</small>
              </Card>
            ))}
          </div>
          <div className="about__text">
            <p>
              As a Junior Software Engineer, my passion is delivering scalable, secure, and efficient solutions by applying strong engineering principles. My expertise lies in backend and cloud development, but I take a full-stack approach when needed, ensuring that the best tools and strategies are used to solve any challenge.
            </p>
            <p>
              Currently an Applications Development student at CPUT, I thrive in both independent and collaborative environments. My skills span data analysis, pattern recognition, and system optimization, with a keen interest in cloud security and infrastructure design. With a focus on mastering problem-solving and scalable architecture, I adapt quickly to new technologies and challenges, always approaching each project with a solution-driven mindset.
            </p>
            <p>
              I'm always eager to connect with like-minded professionals and explore new opportunities. If you have a project or challenge, feel free to reach out—let's create something impactful!
            </p>
          </div>
          <a href={CV} download className="btn primary">
            Download CV <HiDownload />
          </a>
        </div>

        {/* Replaced the old skills sphere with the new SkillsCard */}
        <SkillsCard data={skillsData} />
      </div>
    </section>
  );
};

export default About;