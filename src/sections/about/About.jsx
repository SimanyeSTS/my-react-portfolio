import React, { useRef } from "react";
import CV from "../../assets/cv.pdf";
import { HiDownload } from "react-icons/hi";
import data from "./data";
import Card from "../../components/Card";
import "./about.css";
import {
  FaReact, FaNode, FaJava, FaPython,
  FaHtml5, FaCss3Alt, FaDatabase, FaCloud,
  FaCode, FaGitAlt, FaDocker, FaGithub, FaGitlab
} from "react-icons/fa";
import {
  SiJavascript, SiTailwindcss, SiMongodb,
  SiExpress, SiNextdotjs, SiSqlite,
  SiTestinglibrary, SiFigma, SiVisualstudiocode
} from "react-icons/si";
import IconCloud from "../../components/IconCloud";

const About = () => {
  const skillsContainerRef = useRef(null);
  
  const skillsData = [
    { id: 1, name: "JavaScript", icon: <SiJavascript /> },
    { id: 2, name: "React", icon: <FaReact /> },
    { id: 3, name: "Node.js", icon: <FaNode /> },
    { id: 4, name: "Python", icon: <FaPython /> },
    { id: 5, name: "Java", icon: <FaJava /> },
    { id: 6, name: "HTML5", icon: <FaHtml5 /> },
    { id: 7, name: "CSS3", icon: <FaCss3Alt /> },
    { id: 8, name: "MongoDB", icon: <SiMongodb /> },
    { id: 9, name: "Tailwind", icon: <SiTailwindcss /> },
    { id: 10, name: "Git", icon: <FaGitAlt /> },
    { id: 11, name: "Docker", icon: <FaDocker /> },
    { id: 12, name: "Backend", icon: <FaCode /> },
    { id: 13, name: "Cloud", icon: <FaCloud /> },
    { id: 14, name: "Database", icon: <FaDatabase /> },
    { id: 15, name: "Express", icon: <SiExpress /> },
    { id: 16, name: "Next.js", icon: <SiNextdotjs /> },
    { id: 17, name: "SQLite", icon: <SiSqlite /> },
    { id: 18, name: "Testing", icon: <SiTestinglibrary /> },
    { id: 19, name: "GitHub", icon: <FaGithub /> },
    { id: 20, name: "GitLab", icon: <FaGitlab /> },
    { id: 21, name: "VS Code", icon: <SiVisualstudiocode /> },
    { id: 22, name: "Figma", icon: <SiFigma /> },
  ];

  const handleIconClick = (skill) => {
    console.log("Selected skill:", skill.name);
    // You could add additional logic here like highlighting the skill name
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

        <div className="skills__container" ref={skillsContainerRef}>
          <h2>Skills</h2>
          <p>Empowered by knowledge, driven by skills—here's what I bring to the table.</p>
          <div className="skills__floating-area">
            <IconCloud 
              icons={skillsData} 
              radius={200} 
              speed={0.003}
              dragSpeed={0.05}      // How responsive to mouse drag
              initialSpeed={0.003}  // Base rotation speed
              onClick={handleIconClick}
            />
          </div>
          <div className="skills__names">
            {skillsData.map((skill) => (
              <span key={skill.id} className="skill__name">{skill.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;