import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-10"
        >
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl font-display font-bold text-foreground flex items-center gap-1 justify-center md:justify-start">
              AS<span className="w-2 h-2 rounded-full bg-accent-blue mt-2" />
            </h4>
            <p className="text-sm text-muted font-light">© 2026 Anirbaan Sarkar. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-10">
            <p className="text-xs font-bold tracking-[0.3em] text-muted uppercase">
              Built with <span className="text-accent-blue">React</span> + <span className="text-foreground">Motion</span>
            </p>
          </div>

          <motion.a
            href="#hero"
            whileHover={{ y: -5 }}
            className="text-xs font-bold tracking-[0.5em] text-foreground hover:text-accent-blue transition-colors uppercase border-b border-border hover:border-accent-blue pb-1"
          >
            Back to Top ↑
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
