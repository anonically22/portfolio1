import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Section = ({ 
  children, 
  className = '', 
  id,
  delay = 0,
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section-padding ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default Section;
