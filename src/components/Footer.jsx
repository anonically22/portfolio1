import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const socials = [
    { icon: Github, href: 'https://github.com/anonically22', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/anirbaan-sarkar/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/anirbaansarkar', label: 'X' },
    { icon: Mail, href: 'mailto:anirbaandsarkar@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="space-y-6 max-w-sm">
            <h4 className="text-3xl font-display font-bold text-foreground flex items-center gap-1">
              AS<span className="w-2 h-2 rounded-full bg-accent-blue mt-2" />
            </h4>
            <p className="text-muted font-light leading-relaxed">
              Synthesizing code and aesthetics to build digital products that feel as good as they work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-6">
              <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Navigation</h5>
              <ul className="space-y-4">
                {['Projects', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-muted hover:text-accent-blue transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Socials</h5>
              <div className="flex flex-wrap gap-4">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="p-3 bg-accent-light text-muted hover:text-white hover:bg-accent-blue transition-all rounded-xl"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted font-medium tracking-wide">
            © 2026 Anirbaan Sarkar. Crafted with <span className="text-accent-blue">❤</span> in TIU
          </p>

          <motion.a
            href="#hero"
            whileHover={{ y: -5 }}
            className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-foreground hover:text-accent-blue transition-colors uppercase py-2 px-4 glass-light rounded-full border border-border"
          >
            Back to Top <ArrowUp size={14} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
