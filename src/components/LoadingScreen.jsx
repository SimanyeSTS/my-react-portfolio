import React, { useState, useEffect, useRef } from 'react';
import { MdDesignServices, MdCode, MdVideoLibrary } from "react-icons/md";
import { HiServer } from "react-icons/hi";
import { useThemeContext } from "../context/theme-context";
import './loading.css';

// LoadingScreen component
const LoadingScreen = ({ onLoadingComplete }) => {
  const { themeState } = useThemeContext();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressBarVisible, setProgressBarVisible] = useState(true);
  const [portfolioReady, setPortfolioReady] = useState(false);
  const profileRef = useRef(null);
  const loadingScreenRef = useRef(null);
  const progressBarRef = useRef(null);

  // Determine theme colors (Hardcoded to Black or White)
  const isLightTheme = themeState.background === 'bg-1';
  const backgroundColor = isLightTheme ? 'white' : 'black';
  const textColor = isLightTheme ? 'black' : 'white';
  const iconBgColor = isLightTheme ? 'white' : 'black';

  // Function to get header profile position
  const getHeaderProfilePosition = () => {
    const headerProfile = document.querySelector('header .profile__area');
    if (headerProfile) {
      const rect = headerProfile.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
    }
    return null;
  };

  useEffect(() => {
    // Prevent scrolling when loading screen is active
    document.body.style.overflow = isVisible ? 'hidden' : 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (loadingProgress === 100) {
      // Fade out progress bar when it reaches 100%
      setTimeout(() => {
        if (progressBarRef.current) {
          progressBarRef.current.classList.add('fade-out');
        }
        
        setTimeout(() => {
          setProgressBarVisible(false);
          
          // Start profile transition animation
          setTimeout(() => {
            setIsTransitioning(true);
            
            // Get header profile position for animation
            const finalPosition = getHeaderProfilePosition();
            if (profileRef.current && finalPosition) {
              // Choose a random animation direction
              const directions = ['left', 'right', 'top', 'bottom'];
              const randomDirection = directions[Math.floor(Math.random() * directions.length)];
              
              // Apply the initial position based on chosen direction
              profileRef.current.style.position = 'fixed';
              
              // Set initial position outside viewport based on direction
              switch(randomDirection) {
                case 'left':
                  profileRef.current.style.left = '-100%';
                  profileRef.current.style.top = `${finalPosition.top}px`;
                  break;
                case 'right':
                  profileRef.current.style.left = '200%';
                  profileRef.current.style.top = `${finalPosition.top}px`;
                  break;
                case 'top':
                  profileRef.current.style.top = '-100%';
                  profileRef.current.style.left = `${finalPosition.left}px`;
                  break;
                case 'bottom':
                  profileRef.current.style.top = '200%';
                  profileRef.current.style.left = `${finalPosition.left}px`;
                  break;
                default:
                  profileRef.current.style.left = '-100%';
                  profileRef.current.style.top = `${finalPosition.top}px`;
              }
              
              // Force reflow
              void profileRef.current.offsetWidth;
              
              // Apply the smooth transition to final position
              profileRef.current.style.transition = 'all 1.5s ease-in-out';
              profileRef.current.style.top = `${finalPosition.top}px`;
              profileRef.current.style.left = `${finalPosition.left}px`;
              profileRef.current.style.width = `${finalPosition.width}px`;
              profileRef.current.style.height = `${finalPosition.height}px`;
              
              // After transition completes
              setTimeout(() => {
                // Trigger the dramatic screen dim effect
                setPortfolioReady(true);
                
                // Apply the dramatic dim effect
                if (loadingScreenRef.current) {
                  loadingScreenRef.current.classList.add('dim-screen');
                  
                  // After dim effect, brighten up
                  setTimeout(() => {
                    loadingScreenRef.current.classList.add('brighten-screen');
                    
                    // After brightening, remove loading screen
                    setTimeout(() => {
                      setIsVisible(false);
                      // Notify parent that loading is complete
                      onLoadingComplete();
                    }, 700);
                  }, 2000);
                }
              }, 1500);
            }
          }, 300);
        }, 600);
      }, 300);
    }
  }, [loadingProgress, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div 
      ref={loadingScreenRef}
      className={`loading-screen ${portfolioReady ? 'portfolio-ready' : ''}`}
      style={{
        backgroundColor: backgroundColor,
        color: textColor
      }}
    >
      <div 
        ref={profileRef}
        className="profile__area"
      >
<div 
  className="outer__circle"
  style={{ borderColor: `hsl(${themeState.primaryHue}, 89%, 41%)` }} // Add this line
>
  <span className="tech-icon" style={{ backgroundColor: iconBgColor, color: `hsl(${themeState.primaryHue}, 89%, 41%)` }}>
    <MdDesignServices />
  </span>
  <span className="tech-icon" style={{ backgroundColor: iconBgColor, color: `hsl(${themeState.primaryHue}, 89%, 41%)` }}>
    <HiServer />
  </span>
  <span className="tech-icon" style={{ backgroundColor: iconBgColor, color: `hsl(${themeState.primaryHue}, 89%, 41%)` }}>
    <MdCode />
  </span>
  <span className="tech-icon" style={{ backgroundColor: iconBgColor, color: `hsl(${themeState.primaryHue}, 89%, 41%)` }}>
    <MdVideoLibrary />
  </span>
</div>
        <div className="inner__circle">
          <img src='https://i.postimg.cc/KjNYFm0m/IMG-20231017-WA0028_(1).png' alt="Header Portrait" />
        </div>
      </div>
      
      {/* Loading progress bar */}
      {progressBarVisible && (
        <div ref={progressBarRef} className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${loadingProgress}%`, backgroundColor: `hsl(${themeState.primaryHue}, 89%, 41%)` }} 
            />
          </div>
          
          <div className="progress-text">
            Loading {loadingProgress}%
          </div>
        </div>
      )}
      
      {portfolioReady && (
        <div className="portfolio-reveal">
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;