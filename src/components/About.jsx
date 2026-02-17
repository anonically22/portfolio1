import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Section from './Section';

const AnimatedCounter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  const stats = [
    { label: 'Projects', value: 6, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
    { label: 'Research Papers', value: 1, suffix: '' },
    { label: 'Certifications', value: 3, suffix: '' },
  ];

  return (
    <Section id="about" className="bg-dark-lighter py-64">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <h2 className="text-display-lg md:text-display-xl font-serif font-bold mb-12 tracking-tight">
            The <span className="gradient-text">Context.</span>
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-accent-red to-accent-violet" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-24 items-start">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-12"
          >
            <p className="text-4xl md:text-5xl text-text-primary leading-tight font-light">
              I'm a <span className="text-accent-red font-medium">CSE student</span> at Techno India University, obsessive about the intersection of code and aesthetics.
            </p>
            <p className="text-2xl md:text-3xl text-text-secondary leading-relaxed font-light italic opacity-80">
              My work focuses on AI systems, UX-first product development, and cybersecurity research. I believe in technology that's not just functional, but emotionally resonant.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-12">
              {['AI & ML', 'Full Stack', 'UI/UX Design', 'Research'].map((tag) => (
                <span
                  key={tag}
                  className="px-8 py-3 glass text-accent-red border border-accent-red/20 rounded-full text-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border-b border-dark-border pb-12 last:border-0"
              >
                <div className="text-7xl md:text-8xl font-bold text-white mb-4 flex items-baseline gap-2">
                  <AnimatedCounter end={stat.value} />
                  <span className="text-accent-violet">{stat.suffix}</span>
                </div>
                <div className="text-xl text-text-muted uppercase tracking-[0.4em] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default About;
