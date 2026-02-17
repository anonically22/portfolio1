import { motion } from 'framer-motion';
import Section from './Section';

const Research = () => {
  const research = [
    {
      id: 1,
      title: "Advanced Threat Detection in Cybersecurity",
      supervisor: "Dr. Anindya Kumar Biswas",
      description: "Exploring vulnerability assessment protocols and proactive monitoring systems for complex digital infrastructures.",
      status: "Ongoing",
      tag: "Security Research"
    },
    {
      id: 2,
      title: "Academic Integrity in Digital Learning",
      publication: "Academic Integrity Book Chapter",
      description: "Analysis of maintaining academic standards and ethics within remote and AI-assisted educational environments.",
      status: "Published",
      tag: "Bio-Ethics"
    }
  ];

  return (
    <Section id="research" className="bg-background">
      <div className="container">
        <div className="mb-20 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-blue font-display font-semibold tracking-wide uppercase text-sm"
          >
            Insights & Discovery
          </motion.p>
          <h2 className="text-display-lg font-bold">Academic Contributions.</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {research.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="p-10 bg-accent-light/20 rounded-3xl border border-accent-blue/5 hover:border-accent-blue/20 transition-colors group"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold tracking-[0.3em] text-accent-blue uppercase">
                    {item.status}
                  </span>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] px-3 py-1 bg-white rounded-full border border-border">
                    {item.tag}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold leading-tight group-hover:text-accent-blue transition-colors">
                  {item.title}
                </h3>

                <div className="space-y-4">
                   {item.supervisor && (
                     <p className="text-sm font-semibold text-foreground italic">Under: {item.supervisor}</p>
                   )}
                   {item.publication && (
                     <p className="text-sm font-semibold text-accent-blue italic">{item.publication}</p>
                   )}
                   <p className="text-lg text-muted font-light leading-relaxed">
                     {item.description}
                   </p>
                </div>

                <div className="pt-6">
                  <span className="text-xs font-bold tracking-widest text-foreground/40 uppercase group-hover:text-accent-blue transition-colors">
                    Explore Abstract →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Research;
