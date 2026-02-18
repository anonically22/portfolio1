import { motion } from 'framer-motion';
import Section from './Section';

const Contact = () => {
  return (
    <Section id="contact" className="bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container py-24 md:py-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-light border border-border rounded-[3rem] p-12 md:p-20 text-center space-y-12 shadow-2xl shadow-accent-blue/5">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-bold uppercase tracking-widest mb-4"
              >
                Available for opportunities
              </motion.div>
              <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-display font-bold leading-[0.9] tracking-tighter text-foreground">
                Let’s build something <br />
                <span className="text-accent-blue italic">extraordinary.</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto font-light leading-relaxed">
                Open to collaborating on innovative projects, research initiatives, or architectural challenges.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10 pt-6">
              <a
                href="mailto:anirbaandsarkar@gmail.com"
                className="px-12 py-6 bg-accent-blue text-white font-bold rounded-2xl hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-2 text-xl flex items-center gap-3 group"
              >
                Get in Touch
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <div className="flex items-center gap-10 flex-wrap justify-center">
                {[
                  { name: 'GitHub', href: 'https://github.com/anonically22' },
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anirbaan-sarkar/' },
                  { name: 'X', href: 'https://x.com/anirbaansarkar' },
                  { name: 'Kaggle', href: 'https://www.kaggle.com/anirbaansarkar' }
                ].map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-muted hover:text-foreground transition-all relative group py-2"
                  >
                    {platform.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-blue group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
