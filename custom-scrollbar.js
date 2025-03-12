document.addEventListener('DOMContentLoaded', function() {
    const scrollTrack = document.createElement('div');
    scrollTrack.className = 'custom-scrollbar-track';
    document.body.appendChild(scrollTrack);
  
    const scrollThumb = document.createElement('div');
    scrollThumb.className = 'custom-scrollbar-thumb';
    scrollTrack.appendChild(scrollThumb);
  
    // Calculate thumb height based on page height
    const updateThumbHeight = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const thumbHeight = Math.max(40, (viewportHeight / pageHeight) * viewportHeight);
      scrollThumb.style.height = thumbHeight + 'px';
    };
  
    // Update thumb position on scroll
    const updateThumbPosition = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const thumbPosition = scrollPercentage * (window.innerHeight - scrollThumb.offsetHeight);
      scrollThumb.style.transform = `translateY(${thumbPosition}px)`;
    };
  
    // Initialize
    updateThumbHeight();
    updateThumbPosition();
  
    // Update on scroll and resize
    window.addEventListener('scroll', updateThumbPosition);
    window.addEventListener('resize', () => {
      updateThumbHeight();
      updateThumbPosition();
    });
  
    // Dragging functionality
    let isDragging = false;
    let startY = 0;
    let startScrollY = 0;
  
    scrollThumb.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
      startScrollY = window.scrollY;
      document.body.style.userSelect = 'none';
    });
  
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const deltaY = e.clientY - startY;
      const scrollRatio = document.documentElement.scrollHeight / window.innerHeight;
      window.scrollTo(0, startScrollY + deltaY * scrollRatio);
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.userSelect = '';
    });
  });  