import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { researchPapers as staticPapers } from '../data/research';
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

        if (!error && data && data.length > 0) {
          setPapers(data);
        } else {
          setPapers(staticPapers);
        }
      } catch (err) {
        console.error('Error fetching papers:', err);
        setPapers(staticPapers);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('ongoing')) return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    if (s.includes('published')) return 'bg-green-500/10 text-green-500 border-green-500/20';
    return 'bg-neutral-800 text-muted border-white/5';
  };

  return (
    <Section id="research" className="bg-background">
      <div className="container">
        <div className="mb-20 space-y-4 max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent-blue font-display font-semibold tracking-wide uppercase text-sm"
          >
            Insights & Discovery
          </motion.p>
          <h2 className="text-display-lg font-bold">Research & Publications</h2>
          <p className="text-lg text-muted font-light leading-relaxed">
            Exploring the intersection of cybersecurity, academic integrity, and emerging technologies through research-driven inquiry and applied investigation.
          </p>
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-2 gap-8">
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
          <div className="grid lg:grid-cols-2 gap-8">
            {papers.length > 0 ? papers.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-8 lg:p-10 bg-accent-light/20 rounded-3xl border border-white/5 hover:border-accent-blue/20 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${getStatusColor(item.publication_status)}`}>
                    {item.publication_status}
                  </span>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight group-hover:text-accent-blue transition-colors pr-24">
                    {item.title}
                  </h3>

                  <div className="space-y-4">
                    {item.supervisor && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Supervisor:</span>
                        <p className="text-sm font-semibold text-foreground italic">{item.supervisor}</p>
                      </div>
                    )}
                    <p className="text-md text-muted font-light leading-relaxed line-clamp-4">
                      {item.abstract}
                    </p>
                  </div>

                  {item.pdf_url && (
                    <div className="pt-4">
                      <a
                        href={item.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-accent-blue uppercase hover:gap-3 transition-all"
                      >
                        View Paper <span>→</span>
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
