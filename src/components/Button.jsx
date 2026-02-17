import { motion } from 'framer-motion';
import { useState } from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  onClick,
  href,
  ...props 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const variants = {
    primary: 'bg-gradient-to-r from-accent-red to-accent-violet text-white hover:shadow-xl hover:shadow-accent-red/40',
    secondary: 'glass border-2 border-accent-red text-accent-red hover:bg-accent-red hover:text-white',
    ghost: 'text-text-primary hover:text-accent-red border-b-2 border-transparent hover:border-accent-red',
  };

  const baseClasses = 'px-8 py-4 rounded-lg font-bold tracking-widest transition-all duration-300 relative overflow-hidden text-sm uppercase';
  
  const buttonContent = (
    <>
      {isHovered && variant !== 'ghost' && (
        <motion.div
          className="absolute inset-0 bg-white opacity-10"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </>
  );

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {buttonContent}
    </Component>
  );
};

export default Button;
