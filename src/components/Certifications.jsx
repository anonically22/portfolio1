import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';
import { certifications } from '../data/certifications';

const Certifications = () => {
  return (
    <Section id="certifications" className="bg-dark-lighter py-64">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <h2 className="text-display-lg md:text-display-xl font-serif font-bold mb-12 tracking-tight">
            Academic <span className="gradient-text">Badges.</span>
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-accent-red to-accent-violet" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full p-16 flex flex-col items-center text-center group border-dark-border hover:border-accent-red/30 transition-all duration-500">
                <div className="mb-12 w-28 h-28 rounded-full bg-dark flex items-center justify-center border border-dark-border relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-red/20 to-accent-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-3xl font-bold font-serif text-text-muted group-hover:text-accent-red transition-colors relative z-10">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex-1 space-y-8">
                  <h3 className="text-3xl font-serif font-bold leading-tight group-hover:text-accent-red transition-all duration-500">
                    {cert.title}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-accent-violet font-bold tracking-[0.6em] text-xs uppercase">
                      {cert.issuer}
                    </p>
                    <p className="text-xl text-text-muted font-light italic">
                      {cert.date}
                    </p>
                  </div>
                  <p className="text-xl text-text-secondary font-light leading-relaxed italic opacity-80">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-16 pt-10 border-t border-dark-border w-full">
                  <span className="text-xs font-bold tracking-[0.4em] text-text-muted opacity-50 uppercase">
                    Credential Verified
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Certifications;
