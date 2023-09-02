import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';

function GradientButton( props ) {
  const { text } = props;
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    initial: { background: 'linear-gradient(90deg, #FF6489, #F9B24E)' },
    hover: { background: 'linear-gradient(90deg, #F9B24E, #FF6489)' },
  };

  const handleHover = () => {
    setIsHovered(true);
    controls.start('hover');
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start('initial');
  };

  return (
    <motion.div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: isHovered
          ? 'linear-gradient(90deg, #F9B24E, #FF6489)'
          : 'linear-gradient(90deg, #FF6489, #F9B24E)',
      }}
      variants={buttonVariants}
      initial="initial"
      animate={controls}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      {text}
    </motion.div>
  );
}

export default GradientButton;
