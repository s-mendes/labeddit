import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';

function GradientBorderButton(props) {
  const { text, gradient } = props;
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    initial: { background: gradient },
    hover: { background: gradient },
  };

  const borderVariants = {
    initial: { borderColor: 'transparent' },
    hover: { borderColor: gradient },
  };

  const textVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 360 },
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
        background: 'transparent',
        border: '2px solid',
        borderRadius: '4px',
      }}
      variants={borderVariants}
      initial="initial"
      animate={controls}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        style={{
          background: gradient,
          borderRadius: '2px',
          padding: '8px 16px',
        }}
        variants={buttonVariants}
      >
        <motion.div
          style={{
            color: '#fff',
            ...textVariants[isHovered ? 'hover' : 'initial'],
          }}
        >
          {text}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default GradientBorderButton;
