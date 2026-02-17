import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const interests = [
    "a CSE student.",
    "a UI/UX enthusiast.",
    "a Full Stack builder.",
    "a Researcher.",
    "an AI explorer."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark px-6 py-32">
      {/* Balanced Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-12 max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <span className="text-xs font-bold tracking-[0.6em] text-accent-red uppercase block mb-6">
              Hello!
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-tight">
              I'm <span className="gradient-text">Anirbaan Sarkar.</span>
            </h1>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-secondary font-light"
          >
            I'm <TypingEffect words={interests} />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light italic opacity-80"
          >
            Passionately creating innovative digital experiences, rooted in user needs and complex system thinking.
          </motion.p>
        </motion.div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-text-muted opacity-40 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent-red to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
