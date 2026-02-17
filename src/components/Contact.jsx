import { motion } from 'framer-motion';
import Section from './Section';

const Contact = () => {
  return (
    <Section id="contact" className="bg-foreground text-background">
      <div className="container py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-display-xl font-bold leading-none tracking-tight text-white">
              Let’s build something <br />
              <span className="text-accent-blue italic">together.</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted/80 max-w-2xl mx-auto font-light leading-relaxed">
              Open to collaborating on innovative projects, research initiatives, or architectural challenges.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6">
            <a
              href="mailto:anirbaansarkar.dev@gmail.com"
              className="px-10 py-5 bg-accent-blue text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1 text-lg"
            >
              Get in Touch
            </a>
            
            <div className="flex items-center gap-8">
              {['GitHub', 'LinkedIn'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-lg font-medium text-muted hover:text-white transition-colors relative group"
                >
                  {platform}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-blue group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
