import FortuneTrackDesign from "../../assets/FortuneTrack-Design.png";
import WeatherWisePlus from "../../assets/WeatherWise++.png";
import FortuneTrack from "../../assets/FortuneTrack.png";
import VuePortfolioDesign from "../../assets/VuePortfolio-Design.png";
import SnackShackDesign from "../../assets/SnackShack-Design.png";
import VuePortfolio from "../../assets/VuePortfolio.png";
import AuraArtistry from "../../assets/AuraArtistry.png";
import WeatherWise from "../../assets/WeatherWise.png";
import TimeScape from "../../assets/TimeScape.png";


const data = [
  {
    id: 1,
    category: "UI/UX",
    image: FortuneTrackDesign,
    title: "FortuneTrack - Design",
    desc: "A comprehensive financial analytics UI designed in Figma, showcasing my ability to create complex data visualization interfaces with a clean, professional aesthetic. The project features a component-based design system with custom charts, interactive dashboards, and a cohesive color scheme dominated by professional blues. FortuneTrack demonstrates my proficiency in Figma's advanced features including auto-layout, component variants, and prototyping capabilities while delivering an intuitive interface for complex financial data.",
    demo: "https://www.figma.com/design/HXmTERwjHOYsptklvTHAkW/FortuneTrack-Capstone?node-id=28-248&t=zu6TKAQspc9W5rYt-1",
    github: null,
  },
  {
    id: 2,
    category: "Front-End",
    image: WeatherWisePlus,
    title: "WeatherWise ++",
    desc: "WeatherWise++ is an interactive weather map application developed using React and React Leaflet, showcasing my frontend expertise. Users can explore real-time weather data by clicking on the map or searching for specific cities, with features like geolocation, dark mode, and responsive design ensuring a seamless experience across devices. This project not only highlights my ability to integrate APIs and manage state effectively but also demonstrates my commitment to creating user-friendly interfaces with robust error handling.",
    demo: "https://weather-wise-plus.vercel.app/",
    github: "https://github.com/SimanyeSTS/weather-map-app.git",
  },
  {
    id: 3,
    category: "Back-End",
    image: FortuneTrack,
    title: "FortuneTrack",
    desc: "FortuneTrack is an AI-driven stock market analysis platform built with the MEVN stack, designed to provide real-time insights and predictive analytics across four major industries: Retail, Technology, Food & Beverages, and Healthcare. The backend, powered by Node.js, Express.js, and MySQL, features robust API integrations with Alpha Vantage for live market data and Gemini AI for predictive insights. Key backend functionalities include JWT authentication, role-based access control, automated data updates via cron jobs, and CI/CD pipelines using GitHub Actions. The system is optimized for scalability, with plans to migrate to AWS Lambda for enhanced performance. This project demonstrates my ability to design and implement complex, data-driven backend systems with a focus on security, efficiency, and scalability.",
    demo: "https://fortunetrack-91faa.web.app/",
    github: "https://github.com/SimanyeSTS/FortuneTrack.git",
  },
  {
    id: 4,
    category: "UI/UX",
    image: VuePortfolioDesign,
    title: "VueJS Portfolio - Design",
    desc: "A sophisticated developer portfolio UI design created in Figma, featuring a striking dark theme with vibrant accent colors that highlight key information while maintaining readability. This design demonstrates my command of Figma's component system, allowing for consistent styling across multiple portfolio sections including projects, skills, and contact information. The interface incorporates Vue.js-inspired design patterns with thoughtful micro-interactions, responsive layouts, and a carefully crafted typographic system. This project showcases my ability to create visually compelling interfaces that balance modern aesthetics with functional information architecture, all while maintaining the technical considerations necessary for Vue.js implementation.",
    demo: "https://www.figma.com/design/uRPLAZmDEjBFdNfsV74CbQ/Vue.js-Portfolio?node-id=0-1&t=JzEQBtWXPlSvGXcX-1",
    github: null, // No GitHub link for UI/UX projects
  },
  {
    id: 5,
    category: "UI/UX",
    image: SnackShackDesign,
    title: "Snack Shack - Design",
    desc: "In this group project, I was specifically responsible for designing the tablet and mobile frames for the Fast Food Snack Shack fast food app using Figma. Working from the established desktop design, I created dedicated frames for smaller devices, ensuring all essential content and functionality remained accessible across the three screen sizes. My work involved carefully considering appropriate scaling, layout adjustments, and touch-friendly elements to maintain a consistent user experience across desktop, tablet, and mobile formats. This project demonstrates my ability to think across multiple device contexts while maintaining design coherence in collaborative environments.",
    demo: "https://www.figma.com/design/UwJTS7YCLV0X1r3ncT3s3J/Fast-Food-Snack-Shack?node-id=0-1&t=ARl1TFPu8pWz3uoX-1",
    github: null, // No GitHub link for UI/UX projects
  },
  {
    id: 6,
    category: "Front-End",
    image: VuePortfolio,
    title: "VueJS Portfolio",
    desc: "Showcasing my frontend expertise, this Vue.js portfolio project features a dynamic and responsive design that highlights my skills, projects, and testimonials. Utilizing Vue Router for seamless navigation and Vuex for state management, the application integrates various components such as a contact form, project cards, and a visually appealing layout, all styled with CSS and Bootstrap. The project is hosted on Firebase, demonstrating my ability to deploy and manage web applications effectively.",
    demo: "https://simanye-somdaka-s-portfolio.web.app/",
    github: "https://github.com/SimanyeSTS/finalPortfolio1.git",
  },
  {
    id: 7,
    category: "Back-End",
    image: AuraArtistry,
    title: "AuraArtistry",
    desc: "The AuraArtistry project showcases my backend expertise through the development of a robust RESTful API using Node.js and Express. This project features a well-structured directory that includes controllers for user and product management, middleware for error handling and token verification, and a MySQL database connection for efficient data retrieval and manipulation. By implementing secure user authentication and CRUD operations for products, I ensured a seamless and secure experience for users, demonstrating my ability to create scalable and maintainable backend solutions.",
    demo: "https://vuejs-frontend-e2fc1.web.app/",
    github: "https://github.com/SimanyeSTS/AuraArtistry-Project.git",
  },
  {
    id: 8,
    category: "Back-End",
    image: WeatherWise,
    title: "WeatherWise",
    desc: "WeatherWise is a dynamic weather application where I contributed significantly to both frontend and backend development. Primarily focused on frontend, I also optimized the backend's Python/Flask API to enhance scalability and efficiency in data integration from external weather services. This involved refining data processing and structuring to ensure seamless and rapid delivery of weather information, including current conditions, forecasts, and pollution data, to the user interface.",
    demo: "https://weather-wise-sftw-eng.vercel.app/",
    github: "https://github.com/SimanyeSTS/weather_app.git",
  },
  {
    id: 9,
    category: "Front-End",
    image: TimeScape,
    title: "TimeScape",
    desc: "TimeScape is an interactive clock application that showcases my frontend development skills through a visually appealing and responsive design. Utilizing HTML, CSS, and JavaScript, I created a dynamic clock that accurately reflects real-time hours, minutes, and seconds with smooth animations. The project features a modern aesthetic with a vibrant gradient background and a sleek, circular clock interface, demonstrating my ability to blend functionality with engaging user experiences.",
    demo: "https://clock-work-three.vercel.app/",
    github: "https://github.com/SimanyeSTS/clockWork.git",
  },
];

export default data;