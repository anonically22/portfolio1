import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="glass-strong rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar border-accent-red/20 shadow-2xl shadow-accent-red/5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 glass-strong border-b border-dark-border p-8 flex justify-between items-start z-10">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2">{project.title}</h2>
              <p className="text-accent-violet font-medium text-lg">{project.role}</p>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-accent-red text-4xl leading-none transition-colors"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {Array.isArray(project.tags) && project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2 glass text-accent-red border border-accent-red/30 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-accent-red">Overview</h3>
              <p className="text-xl text-text-secondary leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Case Study */}
            {(project.caseStudy || project.case_study) && (
              <div className="grid gap-8">
                {(project.caseStudy?.challenge || project.case_study?.challenge) && (
                  <div className="glass rounded-xl p-8 border-l-4 border-accent-red">
                    <h4 className="font-serif font-bold text-xl mb-3 text-accent-red">Challenge</h4>
                    <p className="text-lg text-text-secondary">{project.caseStudy?.challenge || project.case_study?.challenge}</p>
                  </div>
                )}

                {(project.caseStudy?.solution || project.case_study?.solution) && (
                  <div className="glass rounded-xl p-8 border-l-4 border-accent-violet">
                    <h4 className="font-serif font-bold text-xl mb-3 text-accent-violet">Solution</h4>
                    <p className="text-lg text-text-secondary">{project.caseStudy?.solution || project.case_study?.solution}</p>
                  </div>
                )}

                {(project.caseStudy?.impact || project.case_study?.impact) && (
                  <div className="glass rounded-xl p-8 border-l-4 border-accent-cyan">
                    <h4 className="font-serif font-bold text-xl mb-3 text-accent-cyan">Impact</h4>
                    <p className="text-lg text-text-secondary">{project.caseStudy?.impact || project.case_study?.impact}</p>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <a
                href={project.link}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-accent-red to-accent-violet text-white rounded-lg font-medium text-center text-lg hover:shadow-xl hover:shadow-accent-red/40 transition-all duration-300"
              >
                View Project
              </a>
              <button
                onClick={onClose}
                className="px-8 py-4 glass border-2 border-accent-red text-accent-red rounded-lg font-medium text-lg hover:bg-accent-red hover:text-white transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
