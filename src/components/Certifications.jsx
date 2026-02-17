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
              <div className="h-full p-10 bg-white border border-border rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
                <div className="mb-6 w-14 h-14 rounded-2xl bg-accent-light flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                  <span className="text-accent-blue font-bold font-display text-xl">0{index + 1}</span>
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-accent-blue transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest">
                    <span className="text-accent-blue">{cert.issuer}</span>
                    <span className="text-muted">{cert.date}</span>
                  </div>
                  <p className="text-sm text-muted font-light leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Verified</span>
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-accent-blue hover:underline"
                  >
                    View Credential →
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
