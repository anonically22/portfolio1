import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Section from './Section';

const Research = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const { data, error } = await supabase
          .from('research_papers')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (!error && data) {
          setPapers(data);
        }
      } catch (err) {
        console.error('Error fetching papers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

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

        {loading ? (
          <div className="grid lg:grid-cols-2 gap-12">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse p-10 bg-accent-light/10 rounded-3xl space-y-6">
                <div className="h-6 bg-border rounded w-1/4" />
                <div className="h-10 bg-border rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-border rounded" />
                  <div className="h-4 bg-border rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            {papers.length > 0 ? papers.map((item, index) => (
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
                      {item.publication_status}
                    </span>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] px-3 py-1 bg-white dark:bg-accent-light rounded-full border border-border">
                      {item.full_content ? 'Active Research' : 'Academic Paper'}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold leading-tight group-hover:text-accent-blue transition-colors">
                    {item.title}
                  </h3>

                  <div className="space-y-4">
                     {item.supervisor && (
                       <p className="text-sm font-semibold text-foreground italic">Under: {item.supervisor}</p>
                     )}
                     <p className="text-lg text-muted font-light leading-relaxed line-clamp-4">
                       {item.abstract}
                     </p>
                  </div>

                  {item.pdf_url && (
                    <div className="pt-6">
                      <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest text-foreground/40 uppercase group-hover:text-accent-blue transition-colors">
                        Explore Abstract →
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )) : (
              <p className="text-muted col-span-2 text-center py-10 italic">No research papers documented yet.</p>
            )}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Research;
