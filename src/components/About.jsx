import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Section from './Section';
import TypingEffect from './TypingEffect';
import profilePic from '../assets/2x4ou0.jpg';

const About = () => {
  const [content, setContent] = useState({
    title: "Designing with intention, building with intelligence.",
    philosophy_title: "Philosophy",
    philosophy_text: "UX-first development where empathy leads the engineering process.",
    education_title: "Education",
    education_text: "B.Tech in Computer Science & Engineering, Techno India University.",
    paragraphs: [
      "I am Anirbaan Sarkar, a Computer Science student at Techno India University. My journey in technology is driven by a deep-seated passion for the intersection of logic and aesthetics.",
      "As a UI/UX designer and web developer, I believe that great products are built on a foundation of empathy and rigorous research. I strive to create experiences that are not only visually stunning but also solve real-world problems through thoughtful design systems and robust engineering.",
      "Beyond code, I am actively involved in cybersecurity research, exploring vulnerability assessment and threat detection protocols under expert guidance."
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const { data, error } = await supabase
          .from('sections')
          .select('content_json')
          .eq('section_type', 'about_main')
          .eq('enabled', true)
          .single();

        if (!error && data?.content_json) {
          setContent(prev => ({
            ...prev,
            ...data.content_json,
            paragraphs: Array.isArray(data.content_json.paragraphs)
              ? data.content_json.paragraphs
              : prev.paragraphs
          }));
        }
      } catch (err) {
        console.error('Error fetching about content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  if (loading) return (
    <div className="py-20 flex justify-center bg-background">
      <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <Section id="about" className="bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left: Professional Photo Placeholder / Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-accent-light"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-transparent" />
            <img
              src={profilePic}
              alt="Anirbaan Sarkar"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Right: Intro Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-display-md font-bold whitespace-pre-wrap">
                <TypingEffect words={[content.title]} speed={50} delay={5000} loop={true} />
              </h2>
              <div className="w-20 h-1 bg-accent-blue" />
            </div>

            <div className="space-y-6 text-xl text-muted font-light leading-relaxed">
              {content.paragraphs?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="font-display font-bold text-lg mb-2">{content.philosophy_title}</h4>
                <p className="text-muted text-sm leading-relaxed">{content.philosophy_text}</p>
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-2">{content.education_title}</h4>
                <p className="text-muted text-sm leading-relaxed">{content.education_text}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default About;
