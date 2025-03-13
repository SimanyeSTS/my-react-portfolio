import React, { useEffect, useRef } from "react";
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

const About = () => {
  const skillsContainerRef = useRef(null);
  const animationRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationSpeedRef = useRef({ x: 0, y: 0 });
  const sphereRotationRef = useRef({ x: 0.3, y: 0.3 }); // Initial rotation set to downwards
  const useDefaultRotationRef = useRef(true); // Track if we should use default rotation

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

  useEffect(() => {
    if (!skillsContainerRef.current) return;

    const container = skillsContainerRef.current;
    const iconElements = container.querySelectorAll('.skill__icon-wrapper');
    const total = iconElements.length;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Calculate the radius based on container size
    const containerRect = container.getBoundingClientRect();
    const containerHeight = containerRect.height - 100; // Subtract space for skill names
    const radius = Math.min(containerRect.width, containerHeight) * 0.45;

    // Center position in the upper part of the container
    const center = {
      x: containerRect.width / 2,
      y: (containerHeight / 2) - 20,
    };

    // Create a 3D sphere distribution of points
    const createSpherePoints = (n) => {
      const points = [];
      const phi = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        points.push({ x, y, z });
      }

      return points;
    };

    // Generate sphere points
    const spherePoints = createSpherePoints(total);

    // Assign 3D coordinates to each icon
    iconElements.forEach((icon, index) => {
      const point = spherePoints[index];

      icon.dataset.baseX = point.x;
      icon.dataset.baseY = point.y;
      icon.dataset.baseZ = point.z;

      icon.dataset.x = point.x;
      icon.dataset.y = point.y;
      icon.dataset.z = point.z;

      icon.dataset.speedFactor = "1.0";
    });

    // Animation function
    const animate = () => {
      if (!isDraggingRef.current) {
        if (useDefaultRotationRef.current) {
          // Default rotation mode (only used when page loads initially)
          sphereRotationRef.current.x += 0.001;
          sphereRotationRef.current.y += 0.001;
        } else {
          // Apply the user's drag direction continuously
          sphereRotationRef.current.x += rotationSpeedRef.current.x;
          sphereRotationRef.current.y += rotationSpeedRef.current.y;
        }
      }

      // Apply rotation matrix to each icon
      iconElements.forEach((icon) => {
        let x = parseFloat(icon.dataset.baseX);
        let y = parseFloat(icon.dataset.baseY);
        let z = parseFloat(icon.dataset.baseZ);
        const speedFactor = parseFloat(icon.dataset.speedFactor);

        // Apply Y-axis rotation
        const cosY = Math.cos(sphereRotationRef.current.y * speedFactor);
        const sinY = Math.sin(sphereRotationRef.current.y * speedFactor);
        const tempX = x * cosY + z * sinY;
        const tempZ = z * cosY - x * sinY;

        // Apply X-axis rotation
        const cosX = Math.cos(sphereRotationRef.current.x * speedFactor);
        const sinX = Math.sin(sphereRotationRef.current.x * speedFactor);
        const tempY = y * cosX + tempZ * sinX;
        const finalZ = tempZ * cosX - y * sinX;

        // Apply perspective and scaling
        const scale = (finalZ + 2) / 3;

        // Calculate screen position
        const translateX = tempX * radius * scale + center.x;
        const translateY = tempY * radius * scale + center.y;

        // Update visual position
        icon.style.transform = `translate(${translateX - 25}px, ${translateY - 25}px) scale(${0.8 + scale * 0.5})`;
        icon.style.opacity = Math.max(0.2, (finalZ + 1) / 2).toFixed(2);
        icon.style.zIndex = Math.floor((finalZ + 1) * 100);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Mouse and touch event handlers
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;

      // Apply rotation directly during drag
      sphereRotationRef.current.y += deltaX * 0.005;
      sphereRotationRef.current.x += deltaY * 0.005;

      // Store rotation speed from user drag
      // Important: We set constant rotation speed based on drag direction, not velocity
      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        // Set a small fixed rotation rate in the dragged direction
        const speedMultiplier = 0.001; // Adjust this to control rotation speed
        
        // Only update if there's significant movement
        rotationSpeedRef.current.x = Math.sign(deltaY) * speedMultiplier;
        rotationSpeedRef.current.y = Math.sign(deltaX) * speedMultiplier;
        
        // Switch to user-directed rotation mode
        useDefaultRotationRef.current = false;
      }

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        e.preventDefault();
        container.style.cursor = 'grabbing';
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - lastMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - lastMousePosRef.current.y;

      // Apply rotation directly during drag
      sphereRotationRef.current.y += deltaX * 0.005;
      sphereRotationRef.current.x += deltaY * 0.005;

      // Store rotation speed from user drag - same logic as mouse move
      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        // Set a small fixed rotation rate in the dragged direction
        const speedMultiplier = 0.001; // Adjust this to control rotation speed
        
        // Only update if there's significant movement
        rotationSpeedRef.current.x = Math.sign(deltaY) * speedMultiplier;
        rotationSpeedRef.current.y = Math.sign(deltaX) * speedMultiplier;
        
        // Switch to user-directed rotation mode
        useDefaultRotationRef.current = false;
      }

      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    const handleResize = () => {
      const newContainerRect = container.getBoundingClientRect();
      const newContainerHeight = newContainerRect.height - 100;
      const newRadius = Math.min(newContainerRect.width, newContainerHeight) * 0.45;
      center.x = newContainerRect.width / 2;
      center.y = (newContainerHeight / 2) - 20;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="about">
      <div className="container about__container" data-aos="fade-in">
        <div className="about__content-container">
          <h2>About Me</h2>
          <p>Every journey has a story—here’s mine.</p>
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
          <p>Empowered by knowledge, driven by skills—here’s what I bring to the table.</p>
          <div className="skills__floating-area">
            {skillsData.map((skill) => (
              <div key={skill.id} className="skill__icon-wrapper" draggable="false">
                <div className="skill__icon">
                  {skill.icon}
                </div>
              </div>
            ))}
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