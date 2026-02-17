import { motion } from 'framer-motion';
import Section from './Section';

const Contact = () => {
  return (
    <Section id="contact" className="bg-dark min-h-screen py-64 flex items-center">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-40"
        >
          <div className="space-y-12">
            <motion.h2 
              className="text-display-xl md:text-display-2xl font-serif font-bold leading-none tracking-tighter"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Let's Build
              <br />
              <span className="gradient-text">Intelligent Stuff.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl text-text-secondary max-w-4xl mx-auto font-light italic opacity-70 leading-relaxed"
            >
              Always open to discussing innovative projects, research collaborations, or architectural systems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="text-xl text-text-muted tracking-[0.8em] font-medium uppercase mb-8">
              Channels Archived
            </div>
            
            <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale pointer-events-none">
              {['GitHub', 'LinkedIn', 'Email'].map((channel) => (
                <div key={channel} className="text-3xl font-serif font-bold tracking-tighter hover:text-accent-red cursor-default">
                  {channel}.
                </div>
              ))}
            </div>
          </motion.div>

          {/* Large Abstract Decorative Background */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-5">
             <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-accent-red via-accent-violet to-transparent rounded-full"
               animate={{
                 scale: [1, 1.1, 1],
                 opacity: [0.3, 0.5, 0.3]
               }}
               transition={{
                 duration: 10,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
