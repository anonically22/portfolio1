import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import TypingEffect from './TypingEffect';

const Hero = () => {
  const [nameDone, setNameDone] = useState(false);
  const [content, setContent] = useState({
    greeting: "Building with intelligence",
    name: "Anirbaan\nSarkar",
    subtext: "Designing thoughtful experiences",
    interests: [
      "a Computer Science student.",
      "a UI/UX designer.",
      "a Web developer.",
      "a Researcher."
    ],
    description: "A Computer Science student obsessive about the intersection of code and aesthetics, dedicated to building systems that are both functional and emotionally resonant."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('sections')
          .select('content_json')
          .eq('section_type', 'hero_main')
          .eq('enabled', true)
          .single();
        
        if (!error && data?.content_json) {
          // Merge with defaults to ensure interests is always an array
          setContent(prev => ({
            ...prev,
            ...data.content_json,
            interests: Array.isArray(data.content_json.interests) 
              ? data.content_json.interests 
              : prev.interests
          }));
        }
      } catch (err) {
        console.error('Error fetching hero content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  if (loading) return (
    <div className="min-h-[90vh] flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center bg-background overflow-hidden border-b border-border">
      {/* Soft Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-accent-light/50 to-transparent pointer-events-none" />
      
      <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center pt-24 md:pt-32">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-accent-blue font-display font-semibold tracking-wide uppercase text-sm"
            >
              {content.greeting}
            </motion.p>
            <h1 className="text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.8] tracking-tighter">
              <TypingEffect 
                words={[content.name]} 
                speed={150} 
                delay={4000} 
                loop={true} 
                onComplete={() => setNameDone(true)}
              /> <span className="text-accent-blue font-light">.</span>
            </h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: nameDone ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="text-2xl md:text-3xl text-muted font-light leading-tight"
            >
              {content.subtext} <br className="hidden md:block" />
              as <TypingEffect words={content.interests || []} start={nameDone} speed={120} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted max-w-xl font-light leading-relaxed"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-accent-light transition-all"
            >
              Let's talk
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Visual Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:block relative"
        >
          <div className="w-full aspect-square relative">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 via-accent-light to-white rounded-[40%_60%_70%_30%] blur-3xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border border-accent-blue/10 rounded-full animate-float" />
              <div className="absolute w-48 h-48 border border-accent-blue/5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
