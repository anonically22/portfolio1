import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-dark-lighter border-t border-dark-border py-24 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-start gap-16"
        >
          <div className="space-y-4">
             <h4 className="text-4xl font-serif font-bold text-white tracking-tighter">Anirbaan.</h4>
             <p className="text-xl text-text-muted font-light italic">Designing systems for the digital age.</p>
          </div>

          <div className="grid grid-cols-2 gap-24">
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.5em] text-accent-red uppercase">Navigation</span>
              <ul className="space-y-4 text-xl font-medium text-text-secondary">
                <li className="opacity-50 line-through">Surface</li>
                <li className="opacity-50 line-through">Context</li>
                <li className="opacity-50 line-through">Case Studies</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.5em] text-accent-violet uppercase">Legal</span>
              <p className="text-xl font-medium text-text-secondary opacity-50">© 2026</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-40 pt-12 border-t border-dark-border flex flex-col md:flex-row justify-between gap-8">
           <p className="text-sm tracking-[0.3em] text-text-muted uppercase">Designed by AS / Built with React + Motion</p>
           <p className="text-sm font-serif italic text-text-muted">Rooted in User Needs.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
