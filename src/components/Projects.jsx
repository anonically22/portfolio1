import { motion } from 'framer-motion';
import Section from './Section';
import { projects } from '../data/projects';

const Projects = () => {
  return (
    <Section id="projects" className="bg-accent-light/30">
      <div className="container">
        <div className="mb-20 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-blue font-display font-semibold tracking-wide uppercase text-sm"
          >
            Selected Work
          </motion.p>
          <h2 className="text-display-lg font-bold">Featured Case Studies.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] bg-white dark:bg-accent-light rounded-2xl overflow-hidden shadow-sm border border-border group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                   {/* Placeholder for project image */}
                   <span className="text-muted text-xs font-medium uppercase tracking-widest">{project.category}</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold group-hover:text-accent-blue transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-semibold text-muted tracking-widest uppercase py-1 px-3 border border-border rounded-full">
                    {project.role}
                  </span>
                </div>
                <p className="text-muted text-lg font-light leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-foreground/60 bg-white border border-border px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Projects;
