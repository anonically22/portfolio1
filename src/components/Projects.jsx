import { motion } from 'framer-motion';
import Section from './Section';
import { projects } from '../data/projects';

const Projects = () => {
  return (
    <Section id="projects" className="bg-dark py-64">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <h2 className="text-display-lg md:text-display-xl font-serif font-bold mb-12 tracking-tight">
            Selected <span className="gradient-text">Case Studies.</span>
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-accent-red to-accent-violet mb-12" />
        </motion.div>

        <div className="space-y-64">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`grid lg:grid-cols-12 gap-24 items-center ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Project Image Placeholder */}
              <div className={`lg:col-span-7 aspect-[16/10] bg-dark-lighter relative overflow-hidden group border border-dark-border ${
                 index % 2 !== 0 ? 'lg:order-2' : ''
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 to-accent-violet/5 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-10 group-hover:translate-y-0">
                  <div className="flex flex-wrap gap-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-sm font-bold tracking-widest text-accent-red uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className={`lg:col-span-5 space-y-10 ${
                index % 2 !== 0 ? 'lg:order-1' : ''
              }`}>
                <div className="space-y-4">
                  <span className="text-accent-violet font-bold tracking-[0.5em] text-sm uppercase">
                    0{index + 1} / {project.category}
                  </span>
                  <h3 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                    {project.title}
                  </h3>
                </div>

                <p className="text-2xl text-text-secondary leading-relaxed font-light italic opacity-80">
                  {project.description}
                </p>

                <div className="pt-10 border-t border-dark-border">
                  <div className="flex items-center gap-6 group cursor-default">
                    <span className="text-sm font-bold tracking-[0.3em] text-text-muted transition-colors">
                      CASE STUDY ARCHIVED
                    </span>
                    <div className="w-12 h-[1px] bg-dark-border" />
                  </div>
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
