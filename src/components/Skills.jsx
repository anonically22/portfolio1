import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { skills as staticSkills, skillCategories } from '../data/skills';
import Section from './Section';
import TypingEffect from './TypingEffect';

const Skills = () => {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          const grouped = data.reduce((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill.name);
            return acc;
          }, {});
          setSkills(grouped);
        } else {
          setSkills(staticSkills);
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
        setSkills(staticSkills);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <Section id="skills" className="bg-accent-light/10">
      <div className="container">
        <div className="mb-20 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-blue font-display font-semibold tracking-wide uppercase text-sm"
          >
            Technical Stack
          </motion.p>
          <h2 className="text-display-lg font-bold">
            <TypingEffect words={["Tools & Tech."]} />
          </h2>
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-2 gap-20">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse space-y-8">
                <div className="h-8 bg-border rounded-xl w-1/3" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[1, 2, 3].map(j => <div key={j} className="h-24 bg-border rounded-2xl" />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-20">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: catIndex * 0.1 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full bg-accent-blue`} />
                  {category.name}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {(skills[category.key] || []).length > 0 ? (
                    (skills[category.key] || []).map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        whileHover={{ y: -5, borderColor: '#2563EB' }}
                        className="p-5 bg-white dark:bg-accent-light border border-border rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-3 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent-light dark:bg-background flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                          <span className="text-foreground font-bold text-xs">{skill.substring(0, 2).toUpperCase()}</span>
                        </div>
                        <span className="text-sm font-medium text-muted group-hover:text-foreground transition-colors">
                          {skill}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-muted text-sm italic py-4">No skills listed under {category.name}.</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Skills;
