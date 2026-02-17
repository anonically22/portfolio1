import { motion } from 'framer-motion';
import Section from './Section';

const Research = () => {
  const research = [
    {
      id: 1,
      title: "Cyber Security Research",
      supervisor: "Dr. Anindya Kumar Biswas",
      description: "Conducting advanced research in cybersecurity, focusing on threat detection, vulnerability assessment, and security protocols.",
      status: "Ongoing",
      year: "2024-Present"
    },
    {
      id: 2,
      title: "Academic Integrity Publication",
      publication: "Academic Integrity Book Chapter",
      description: "Contributed research on maintaining academic standards and integrity in digital learning environments.",
      status: "Published",
      year: "2024"
    }
  ];

  return (
    <Section id="research" className="bg-dark-lighter py-64">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <h2 className="text-display-lg md:text-display-xl font-serif font-bold mb-12 tracking-tight">
            Research <span className="gradient-text">Lab.</span>
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-accent-red to-accent-violet" />
        </motion.div>

        <div className="space-y-40">
          {research.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row gap-20 items-start ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <span className="text-accent-red font-bold tracking-[0.4em] text-sm uppercase">
                      {item.status}
                    </span>
                    <div className="h-[1px] flex-1 bg-dark-border" />
                    <span className="text-text-muted font-medium">{item.year}</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {item.supervisor && (
                    <p className="text-2xl text-accent-violet font-medium italic">
                      Under: {item.supervisor}
                    </p>
                  )}
                  {item.publication && (
                    <p className="text-2xl text-accent-cyan font-medium italic">
                      {item.publication}
                    </p>
                  )}
                  <p className="text-2xl text-text-secondary leading-relaxed font-light opacity-80">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-1/4 h-[1px] bg-dark-border mt-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Research;
