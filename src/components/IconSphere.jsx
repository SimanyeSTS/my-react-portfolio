import React, { useEffect, useRef, useContext } from 'react';
import { useThemeContext } from '../context/theme-context';

const IconSphere = ({ icons }) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const { themeState } = useThemeContext();
  
  // Sphere configuration
  const config = {
    radius: 150, // Base radius (will be adjusted based on container size)
    maxSpeed: 0.02,
    minSpeed: 0.001,
    initialRotation: { x: 0.1, y: 0.1 },
    dragFactor: 0.05,
    hoverScale: 1.2,
    baseOpacity: 0.7,
    hoverOpacity: 1,
    baseZIndex: 1,
    hoverZIndex: 1000
  };

  // State for sphere rotation
  const sphereState = useRef({
    rotation: { ...config.initialRotation },
    speed: { x: config.minSpeed, y: config.minSpeed },
    isDragging: false,
    lastPos: { x: 0, y: 0 },
    icons: []
  });

  // Initialize icons on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const center = {
      x: containerRect.width / 2,
      y: containerRect.height / 2
    };

    // Adjust radius based on container size
    const radius = Math.min(containerRect.width, containerRect.height) * 0.4;

    // Create sphere points using Fibonacci spiral for even distribution
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < icons.length; i++) {
      const y = 1 - (i / (icons.length - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({ x, y, z, element: null });
    }

    // Create icon elements
    const iconElements = icons.map((icon, index) => {
      const point = points[index];
      const iconElement = document.createElement('div');
      iconElement.className = 'sphere-icon';
      iconElement.innerHTML = icon.icon;
      
      // Style the icon
      iconElement.style.position = 'absolute';
      iconElement.style.width = '40px';
      iconElement.style.height = '40px';
      iconElement.style.display = 'flex';
      iconElement.style.alignItems = 'center';
      iconElement.style.justifyContent = 'center';
      iconElement.style.borderRadius = '50%';
      iconElement.style.backgroundColor = `var(--color-light)`;
      iconElement.style.color = `var(--color-primary)`;
      iconElement.style.transition = 'all 0.3s ease';
      iconElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      iconElement.style.fontSize = '1.2rem';
      
      // Store reference to the point
      point.element = iconElement;
      container.appendChild(iconElement);
      
      // Add hover effect
      iconElement.addEventListener('mouseenter', () => {
        iconElement.style.transform = `scale(${config.hoverScale})`;
        iconElement.style.opacity = config.hoverOpacity;
        iconElement.style.zIndex = config.hoverZIndex;
        iconElement.style.backgroundColor = `var(--color-primary)`;
        iconElement.style.color = 'var(--color-white)';
      });
      
      iconElement.addEventListener('mouseleave', () => {
        iconElement.style.transform = '';
        iconElement.style.opacity = '';
        iconElement.style.zIndex = '';
        iconElement.style.backgroundColor = `var(--color-light)`;
        iconElement.style.color = `var(--color-primary)`;
      });
      
      return { element: iconElement, point };
    });

    sphereState.current.icons = iconElements;

    // Animation loop
    const animate = () => {
      const { rotation, speed, isDragging } = sphereState.current;
      
      if (!isDragging) {
        rotation.x += speed.x;
        rotation.y += speed.y;
      }

      // Apply rotation to each icon
      iconElements.forEach(({ element, point }) => {
        const { x: px, y: py, z: pz } = point;
        
        // Apply rotation
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        
        // Rotate around Y axis
        const x1 = px * cosY + pz * sinY;
        const z1 = pz * cosY - px * sinY;
        
        // Rotate around X axis
        const y1 = py * cosX + z1 * sinX;
        const z2 = z1 * cosX - py * sinX;
        
        // Perspective projection
        const scale = (z2 + 2) / 3;
        const opacity = Math.max(config.baseOpacity, (z2 + 1) / 2);
        const translateX = x1 * radius * scale + center.x - 20;
        const translateY = y1 * radius * scale + center.y - 20;
        
        // Update element position
        element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        element.style.opacity = opacity;
        element.style.zIndex = Math.floor((z2 + 1) * 100);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Mouse events for dragging
    const handleMouseDown = (e) => {
      sphereState.current.isDragging = true;
      sphereState.current.lastPos = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!sphereState.current.isDragging) return;
      
      const deltaX = e.clientX - sphereState.current.lastPos.x;
      const deltaY = e.clientY - sphereState.current.lastPos.y;
      
      sphereState.current.rotation.y += deltaX * config.dragFactor;
      sphereState.current.rotation.x += deltaY * config.dragFactor;
      
      // Set speed based on drag direction
      sphereState.current.speed = {
        x: Math.sign(deltaY) * config.minSpeed,
        y: Math.sign(deltaX) * config.minSpeed
      };
      
      sphereState.current.lastPos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      sphereState.current.isDragging = false;
      container.style.cursor = 'grab';
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        sphereState.current.isDragging = true;
        sphereState.current.lastPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        container.style.cursor = 'grabbing';
      }
    };

    const handleTouchMove = (e) => {
      if (!sphereState.current.isDragging || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - sphereState.current.lastPos.x;
      const deltaY = e.touches[0].clientY - sphereState.current.lastPos.y;
      
      sphereState.current.rotation.y += deltaX * config.dragFactor;
      sphereState.current.rotation.x += deltaY * config.dragFactor;
      
      // Set speed based on drag direction
      sphereState.current.speed = {
        x: Math.sign(deltaY) * config.minSpeed,
        y: Math.sign(deltaX) * config.minSpeed
      };
      
      sphereState.current.lastPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = () => {
      sphereState.current.isDragging = false;
      container.style.cursor = 'grab';
    };

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      
      // Remove event listeners
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      // Remove icon elements
      iconElements.forEach(({ element }) => {
        if (element && element.parentNode === container) {
          container.removeChild(element);
        }
      });
    };
  }, [icons, themeState]);

  return (
    <div 
      ref={containerRef}
      className="icon-sphere-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'grab'
      }}
    />
  );
};

export default IconSphere;