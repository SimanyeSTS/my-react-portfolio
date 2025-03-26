import React, { useEffect, useRef, useState } from 'react';
import './IconCloud.css';

const IconCloud = ({ 
  icons, 
  radius = 250, 
  initialSpeed = 0.01,
  dragSpeed = 0.05,
  onClick,
  initialRotation = { x: 0.3, y: 0.3 }
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(initialRotation);
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const animatingToFrontRef = useRef(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const friction = 0.98; // Friction coefficient for slowing down
  const springFactor = 0.2; // For centering animation
  const maxSpeed = 0.1; // Maximum rotation speed

  // Generate points on a sphere using Fibonacci spiral algorithm
  const generateSpherePoints = (count) => {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      points.push({ x, y, z, index: i });
    }
    
    return points;
  };

  // Center an icon to the front with smooth animation
  const centerIcon = (index) => {
    const points = generateSpherePoints(icons.length);
    const point = points[index];
    
    // Calculate target rotation to bring this point to front (z-axis)
    targetRotationRef.current = {
      x: -Math.atan2(point.y, point.z),
      y: -Math.atan2(point.x, point.z)
    };
    
    animatingToFrontRef.current = true;
    velocityRef.current = { x: 0, y: 0 }; // Reset velocity when centering
  };

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Main animation loop with physics
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const animate = (timestamp) => {
      // Apply velocity (momentum)
      if (!isDraggingRef.current && !animatingToFrontRef.current) {
        rotationRef.current.x += velocityRef.current.x;
        rotationRef.current.y += velocityRef.current.y;
        
        // Apply friction to slow down
        velocityRef.current.x *= friction;
        velocityRef.current.y *= friction;
        
        // Stop when speed is very low
        if (Math.abs(velocityRef.current.x) < 0.0001) velocityRef.current.x = 0;
        if (Math.abs(velocityRef.current.y) < 0.0001) velocityRef.current.y = 0;
      }

      // Smoothly animate to target rotation if needed
      if (animatingToFrontRef.current) {
        const dx = targetRotationRef.current.x - rotationRef.current.x;
        const dy = targetRotationRef.current.y - rotationRef.current.y;
        
        // Spring physics for smooth centering
        rotationRef.current.x += dx * springFactor;
        rotationRef.current.y += dy * springFactor;
        
        // Check if close enough to stop animating
        if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
          animatingToFrontRef.current = false;
          rotationRef.current.x = targetRotationRef.current.x;
          rotationRef.current.y = targetRotationRef.current.y;
        }
      } else if (!isDraggingRef.current && velocityRef.current.x === 0 && velocityRef.current.y === 0) {
        // Continue slow automatic rotation when idle
        rotationRef.current.x += initialSpeed;
        rotationRef.current.y += initialSpeed;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, initialSpeed]);

  // Mouse event handlers with momentum calculation
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { 
      x: e.clientX,
      y: e.clientY
    };
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    
    // Update rotation based on mouse movement
    rotationRef.current.y += deltaX * dragSpeed;
    rotationRef.current.x += deltaY * dragSpeed;
    
    // Update velocity for momentum
    velocityRef.current = {
      x: deltaY * dragSpeed * 0.5,
      y: deltaX * dragSpeed * 0.5
    };
    
    // Clamp velocity to max speed
    if (Math.abs(velocityRef.current.x) > maxSpeed) {
      velocityRef.current.x = maxSpeed * Math.sign(velocityRef.current.x);
    }
    if (Math.abs(velocityRef.current.y) > maxSpeed) {
      velocityRef.current.y = maxSpeed * Math.sign(velocityRef.current.y);
    }
    
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.body.style.cursor = '';
  };

  // Calculate icon positions
  const points = generateSpherePoints(icons.length);
  const center = { 
    x: dimensions.width / 2, 
    y: dimensions.height / 2 
  };

  return (
    <div 
      ref={containerRef}
      className="icon-cloud-container"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      style={{ cursor: 'grab' }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <>
          {points.map((point) => {
            // Apply rotation
            const cosY = Math.cos(rotationRef.current.y);
            const sinY = Math.sin(rotationRef.current.y);
            const tempX = point.x * cosY + point.z * sinY;
            const tempZ = point.z * cosY - point.x * sinY;
            
            const cosX = Math.cos(rotationRef.current.x);
            const sinX = Math.sin(rotationRef.current.x);
            const tempY = point.y * cosX + tempZ * sinX;
            const finalZ = tempZ * cosX - point.y * sinX;
            
            // Perspective scale and opacity
            const scale = 0.5 + (finalZ + 1) / 4; // Scale from 0.5 to 1
            const opacity = 0.2 + (finalZ + 1) / 2.5; // Opacity from 0.2 to 1
            
            // Position on screen
            const x = tempX * radius * scale + center.x;
            const y = tempY * radius * scale + center.y;
            const zIndex = Math.floor((finalZ + 1) * 100);
            
            return (
              <div
                key={icons[point.index].id}
                className="icon-wrapper"
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transition: isDraggingRef.current ? 'none' : 'transform 0.1s ease-out, opacity 0.1s ease-out'
                }}
                onClick={() => {
                  centerIcon(point.index);
                  if (onClick) onClick(icons[point.index]);
                }}
              >
                <div className="skill__icon">
                  {icons[point.index].icon}
                </div>
              </div>
            );
          })}
        </>
      )}
      {/* Mouse event listeners */}
      {typeof window !== 'undefined' && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener('mousemove', ${handleMouseMove.toString()});
                window.addEventListener('mouseup', ${handleMouseUp.toString()});
              `
            }}
          />
        </>
      )}
    </div>
  );
};

export default IconCloud;