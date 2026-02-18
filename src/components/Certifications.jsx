import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';
import { certifications } from '../data/certifications';

const Certifications = () => {
  return (
    <Section id="certifications" className="bg-background">
      <div className="container">
        <div className="mb-20 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-blue font-display font-semibold tracking-wide uppercase text-sm"
          >
            Proof of Proficiency
          </motion.p>
          <h2 className="text-display-lg font-bold">Academic Badges.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="h-full p-10 glass-light border border-border rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-accent-blue/10 transition-all duration-500 group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent-blue/10 transition-all" />

                <div className="mb-8 w-14 h-14 rounded-2xl bg-accent-blue/10 text-accent-blue flex items-center justify-center font-display font-bold text-xl group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>

                <div className="flex-1 space-y-4 relative z-10">
                  <h3 className="text-2xl font-display font-bold group-hover:text-accent-blue transition-colors leading-tight">
                    {cert.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-accent-blue uppercase tracking-widest">{cert.issuer}</span>
                    <span className="text-xs font-medium text-muted uppercase tracking-[0.2em]">{cert.date}</span>
                  </div>
                  <p className="text-muted font-light leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-border/50 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Verified Badge</span>
                  </div>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-foreground hover:text-accent-blue transition-colors flex items-center gap-1 group/link"
                  >
                    View <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Certifications;
