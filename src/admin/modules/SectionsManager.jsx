import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, Settings, ToggleLeft, ToggleRight, History } from 'lucide-react';

const SectionsManager = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) console.error('Error fetching sections:', error);
    else setSections(data || []);
    setLoading(false);
  };

  const handleToggle = async (section) => {
    const { error } = await supabase
      .from('sections')
      .update({ enabled: !section.enabled })
      .eq('id', section.id);

    if (!error) fetchSections();
  };

  const handleUpdateContent = async (id, contentJson) => {
    setSaving(true);
    const { error } = await supabase
      .from('sections')
      .update({ content_json: contentJson })
      .eq('id', id);

    if (error) alert('Error saving content: ' + error.message);
    else fetchSections();
    setSaving(false);
  };

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-display font-bold tracking-tight">Dynamic Sections</h2>
        <p className="text-muted">Control Hero text, About story, and section visibility.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent-blue" size={40} />
        </div>
      ) : (
        <div className="grid gap-8">
          {sections.map((section) => (
            <div key={section.id} className="p-8 glass-light rounded-3xl border border-border shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent-blue/10 text-accent-blue rounded-xl">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold capitalize">{section.section_name} Content</h3>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest">{section.section_type}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(section)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm ${section.enabled ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                    }`}
                >
                  {section.enabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  {section.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="grid gap-6">
                {Object.keys(section.content_json || {}).map((key) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted">{key.replace(/_/g, ' ')}</label>
                    {typeof section.content_json[key] === 'string' && section.content_json[key].length > 100 ? (
                      <textarea
                        rows={4}
                        defaultValue={section.content_json[key]}
                        onBlur={(e) => handleUpdateContent(section.id, { ...section.content_json, [key]: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none resize-none"
                      />
                    ) : (
                      <input
                        defaultValue={section.content_json[key]}
                        onBlur={(e) => handleUpdateContent(section.id, { ...section.content_json, [key]: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {sections.length === 0 && (
            <div className="p-12 text-center bg-white dark:bg-accent-light rounded-3xl border border-dashed border-border space-y-4">
              <History size={40} className="mx-auto text-muted/30" />
              <p className="text-muted">No sections initialized in Supabase yet.</p>
              <div className="text-sm bg-accent-light dark:bg-background p-4 rounded-xl text-left inline-block">
                <code className="text-xs font-mono">
                  -- Run this in SQL Editor:<br />
                  insert into sections (section_name, section_type, content_json, order_index) <br />
                  values ('hero', 'hero_main', '&#123;"greeting": "Building with intelligence", "name": "Anirbaan\\nSarkar"&#125;', 0);
                </code>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionsManager;
