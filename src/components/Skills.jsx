import { motion } from 'framer-motion';
import { useState } from 'react';
import Section from './Section';
import { skills, skillCategories } from '../data/skills';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const getColor = (color) => {
    if (color === 'blue') return 'red';
    return color;
  };

  return (
    <Section id="skills" className="bg-dark py-64">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <h2 className="text-display-lg md:text-display-xl font-serif font-bold mb-12 tracking-tight">
            Technical <span className="gradient-text">Proficiencies.</span>
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-accent-red to-accent-violet" />
        </motion.div>

        <div className="space-y-40">
          {skillCategories.map((category, categoryIndex) => {
            const activeColor = getColor(category.color);
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                className="grid lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-4">
                  <h3 className="text-4xl font-serif font-bold flex items-center gap-6">
                    <span className={`w-4 h-4 rounded-full bg-accent-${activeColor}`} />
                    {category.name}
                  </h3>
                </div>

                <div className="lg:col-span-8 flex flex-wrap gap-8">
                  {skills[category.key].map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`
                        glass px-10 py-5 rounded-full font-medium cursor-default
                        border-2 transition-all duration-500 text-2xl
                        ${hoveredSkill === skill 
                          ? `border-accent-${activeColor} text-accent-${activeColor} scale-110` 
                          : 'border-dark-border text-text-secondary opacity-60 hover:opacity-100'
                        }
                      `}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Skills;
