// Icon.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, position, onClick }) => {
  const style = {
    position: 'absolute',
    transform: `translate(${position.x}px, ${position.y}px)`,
    cursor: 'pointer',
  };

  return (
    <div style={style} onClick={onClick}>
      {icon}
    </div>
  );
};

Icon.propTypes = {
  icon: PropTypes.element.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Icon;
