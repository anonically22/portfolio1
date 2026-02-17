import { motion } from 'framer-motion';
import Section from './Section';

const About = () => {
  return (
    <Section id="about" className="bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left: Professional Photo Placeholder / Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-accent-light"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-transparent" />
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
              alt="Anirbaan Sarkar" 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Right: Intro Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-display-md font-bold">
                Designing with intention, <br />
                building with intelligence.
              </h2>
              <div className="w-20 h-1 bg-accent-blue" />
            </div>

            <div className="space-y-6 text-xl text-muted font-light leading-relaxed">
              <p>
                I am <span className="text-foreground font-medium">Anirbaan Sarkar</span>, a Computer Science student at Techno India University. My journey in technology is driven by a deep-seated passion for the intersection of logic and aesthetics.
              </p>
              <p>
                As a UI/UX designer and web developer, I believe that great products are built on a foundation of empathy and rigorous research. I strive to create experiences that are not only visually stunning but also solve real-world problems through thoughtful design systems and robust engineering.
              </p>
              <p>
                Beyond code, I am actively involved in cybersecurity research, exploring vulnerability assessment and threat detection protocols under expert guidance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="font-display font-bold text-lg mb-2">Philosophy</h4>
                <p className="text-muted text-sm leading-relaxed">UX-first development where empathy leads the engineering process.</p>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-2">Education</h4>
                <p className="text-muted text-sm leading-relaxed">B.Tech in Computer Science & Engineering, Techno India University.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default About;
