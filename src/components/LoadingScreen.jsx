import React, { useState, useEffect, useRef } from 'react';
import { MdDesignServices, MdCode, MdVideoLibrary } from "react-icons/md";
import { HiServer } from "react-icons/hi";
import { useThemeContext } from "../context/theme-context";
import profile from '../assets/profile.png';
import './loading.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const { themeState } = useThemeContext();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [progressBarVisible, setProgressBarVisible] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true); 
  const [portfolioReady, setPortfolioReady] = useState(false);
  const profileRef = useRef(null);
  const outerCircleRef = useRef(null);
  const loadingScreenRef = useRef(null);
  const progressBarRef = useRef(null);

  const isLightTheme = themeState.background === 'bg-1';
  const backgroundColor = isLightTheme ? 'white' : '#100F0F';
  const textColor = isLightTheme ? '#100F0F' : 'white';
  const iconBgColor = isLightTheme ? 'white' : '#100F0F';

  // Prevent scrolling when loading screen is visible
  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  // Handle loading progress
  useEffect(() => {
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

  // Handle loading completion and transitions
  useEffect(() => {
    if (loadingProgress === 100) {
      // Step 1: Fade out progress bar
      setTimeout(() => {
        if (progressBarRef.current) {
          progressBarRef.current.classList.add('fade-out');
        }
        
        // Step 2: Hide progress bar and prepare for profile transition
        setTimeout(() => {
          setProgressBarVisible(false);
          
          // Step 3: Fade out initial profile
          setTimeout(() => {
            if (profileRef.current) {
              profileRef.current.classList.add('fade-out');
            }
            
            // Step 4: Apply dim screen effect after profile fades out
            setTimeout(() => {
              setProfileVisible(false);
              setPortfolioReady(true);
              
              if (loadingScreenRef.current) {
                loadingScreenRef.current.classList.add('dim-screen');
                
                // Step 5: Apply brighten screen effect
                setTimeout(() => {
                  loadingScreenRef.current.classList.add('brighten-screen');
                  
                  // Step 6: End loading sequence
                  setTimeout(() => {
                    setIsVisible(false);
                    onLoadingComplete();
                  }, 700);
                }, 1000);
              }
            }, 600);
          }, 1500);
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
      <div className="content-container">
        {/* Initial profile area that stays centered */}
        {profileVisible && (
          <div 
            ref={profileRef}
            className="profile__area loading-profile"
          >
            <div 
              ref={outerCircleRef}
              className="outer__circle keep-bright"
              style={{ borderColor: `hsl(${themeState.primaryHue}, 89%, 41%)` }}
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
              <img src={profile} alt="Header Portrait" />
            </div>
          </div>
        )}
        
        {/* Progress bar that appears below the profile */}
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
      </div>
    </div>
  );
};

export default LoadingScreen;