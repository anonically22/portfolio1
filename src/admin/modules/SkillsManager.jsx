import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Cpu, GripVertical, Loader2, Save, X } from 'lucide-react';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    name: '',
    category: 'frontend',
    proficiency: 3,
    order_index: 0
  });

  const categories = [
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Database', value: 'database' },
    { label: 'Tools', value: 'tools' },
    { label: 'AI & Research', value: 'aiResearch' }
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching skills:', error);
    else setSkills(data || []);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    let error;
    if (currentSkill.id) {
      const { error: err } = await supabase
        .from('skills')
        .update(currentSkill)
        .eq('id', currentSkill.id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from('skills')
        .insert([currentSkill]);
      error = err;
    }

    if (error) alert('Error saving skill: ' + error.message);
    else {
      setIsEditing(false);
      fetchSkills();
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (!error) fetchSkills();
  };

  if (isEditing) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight">
              {currentSkill.id ? 'Edit Skill' : 'New Skill'}
            </h2>
            <p className="text-muted">Manage your technical expertise.</p>
          </div>
          <button onClick={() => setIsEditing(false)} className="p-3 text-muted hover:text-foreground hover:bg-white dark:hover:bg-accent-light rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="max-w-2xl space-y-6">
          <div className="p-8 bg-white dark:bg-accent-light rounded-3xl border border-border shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted">Skill Name</label>
              <input 
                required
                value={currentSkill.name}
                onChange={(e) => setCurrentSkill({...currentSkill, name: e.target.value})}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                placeholder="E.g. JavaScript"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Category</label>
                <select 
                  value={currentSkill.category}
                  onChange={(e) => setCurrentSkill({...currentSkill, category: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                >
                  {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Proficiency (1-5)</label>
                <input 
                  type="number"
                  min="1"
                  max="5"
                  value={currentSkill.proficiency}
                  onChange={(e) => setCurrentSkill({...currentSkill, proficiency: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={saving}
            className="w-full py-5 bg-accent-blue text-white font-bold rounded-3xl hover:bg-accent-blue/90 transition-all shadow-xl shadow-accent-blue/20 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Skill
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Skills</h2>
          <p className="text-muted">Maintain your technical matrix.</p>
        </div>
        <button 
          onClick={() => { setCurrentSkill({ name: '', category: 'frontend', proficiency: 3, order_index: 0 }); setIsEditing(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-accent-blue text-white font-bold rounded-2xl hover:bg-accent-blue/90 transition-all shadow-lg hover:shadow-accent-blue/20"
        >
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent-blue" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="group flex items-center gap-4 p-5 bg-white dark:bg-accent-light rounded-2xl border border-border hover:border-accent-blue/30 transition-all">
              <div className="text-muted cursor-grab"><GripVertical size={18} /></div>
              <div className="flex-1">
                <h3 className="font-bold flex items-center gap-2">
                  {skill.name}
                  <span className="text-[10px] px-2 py-0.5 bg-accent-blue/5 text-accent-blue rounded-full border border-accent-blue/10 uppercase font-bold tracking-widest leading-none">
                    {skill.category}
                  </span>
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { setCurrentSkill(skill); setIsEditing(true); }} className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-all">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(skill.id)} className="p-2 text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
