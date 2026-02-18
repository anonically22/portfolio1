import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Star, GripVertical, Loader2, Image as ImageIcon, X, Save } from 'lucide-react';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    slug: '',
    description: '',
    role: '',
    category: 'web',
    thumbnail_url: '',
    tags: [],
    link: '#',
    pinned: false,
    case_study: { challenge: '', solution: '', impact: '' }
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('pinned', { ascending: false })
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data || []);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Generate slug if empty
    const slug = currentProject.slug || currentProject.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const projectToSave = {
      ...currentProject,
      slug,
      tags: typeof currentProject.tags === 'string' 
        ? currentProject.tags.split(',').map(t => t.trim()) 
        : currentProject.tags
    };

    let error;
    if (currentProject.id) {
      const { error: err } = await supabase
        .from('projects')
        .update(projectToSave)
        .eq('id', currentProject.id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from('projects')
        .insert([projectToSave]);
      error = err;
    }

    if (error) {
      alert('Error saving project: ' + error.message);
    } else {
      setIsEditing(false);
      fetchProjects();
    }
    setSaving(false);
  };

  const handleTogglePin = async (project) => {
    const { error } = await supabase
      .from('projects')
      .update({ pinned: !project.pinned })
      .eq('id', project.id);
    
    if (!error) fetchProjects();
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
  };

  if (isEditing) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight">
              {currentProject.id ? 'Edit Project' : 'New Project'}
            </h2>
            <p className="text-muted">Fill in the details for your showcase item.</p>
          </div>
          <button 
            onClick={() => setIsEditing(false)}
            className="p-3 text-muted hover:text-foreground hover:bg-white dark:hover:bg-accent-light rounded-2xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 bg-white dark:bg-accent-light rounded-3xl border border-border shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted">Title</label>
                  <input 
                    required
                    value={currentProject.title}
                    onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                    placeholder="E.g. AI-Powered Chatbot"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted">Category</label>
                  <select 
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({...currentProject, category: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                  >
                    <option value="web">Web Development</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="research">Research</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Short Description</label>
                <textarea 
                  required
                  rows={3}
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none resize-none"
                  placeholder="A brief overview of the project..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Tags (comma separated)</label>
                <input 
                  value={Array.isArray(currentProject.tags) ? currentProject.tags.join(', ') : currentProject.tags}
                  onChange={(e) => setCurrentProject({...currentProject, tags: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                  placeholder="React, Tailwind, Supabase..."
                />
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-accent-light rounded-3xl border border-border shadow-sm space-y-6">
              <h3 className="font-bold text-lg">Case Study Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted">The Challenge</label>
                  <textarea 
                    value={currentProject.case_study?.challenge}
                    onChange={(e) => setCurrentProject({
                      ...currentProject, 
                      case_study: { ...currentProject.case_study, challenge: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted">The Solution</label>
                  <textarea 
                    value={currentProject.case_study?.solution}
                    onChange={(e) => setCurrentProject({
                      ...currentProject, 
                      case_study: { ...currentProject.case_study, solution: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-white dark:bg-accent-light rounded-3xl border border-border shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Thumbnail URL</label>
                <input 
                  value={currentProject.thumbnail_url}
                  onChange={(e) => setCurrentProject({...currentProject, thumbnail_url: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                  placeholder="https://..."
                />
                <div className="aspect-video w-full rounded-xl bg-background border border-border overflow-hidden flex items-center justify-center mt-4">
                  {currentProject.thumbnail_url ? (
                    <img src={currentProject.thumbnail_url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-muted/30" size={40} />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-background border border-border rounded-2xl">
                <div className="flex items-center gap-3">
                  <Star size={20} className={currentProject.pinned ? 'text-yellow-500' : 'text-muted'} />
                  <span className="font-bold">Pinned Project</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentProject({...currentProject, pinned: !currentProject.pinned})}
                  className={`w-12 h-6 rounded-full transition-all relative ${currentProject.pinned ? 'bg-accent-blue' : 'bg-border'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentProject.pinned ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={saving}
              className="w-full py-5 bg-accent-blue text-white font-bold rounded-3xl hover:bg-accent-blue/90 transition-all shadow-xl shadow-accent-blue/20 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Save Project
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Projects</h2>
          <p className="text-muted">Manage your portfolio work and case studies.</p>
        </div>
        <button 
          onClick={() => { 
            setCurrentProject({
              title: '',
              slug: '',
              description: '',
              role: '',
              category: 'web',
              thumbnail_url: '',
              tags: [],
              link: '#',
              pinned: false,
              case_study: { challenge: '', solution: '', impact: '' }
            }); 
            setIsEditing(true); 
          }}
          className="flex items-center gap-2 px-6 py-3 bg-accent-blue text-white font-bold rounded-2xl hover:bg-accent-blue/90 transition-all shadow-lg hover:shadow-accent-blue/20"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent-blue" size={40} />
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group flex items-center gap-6 p-6 bg-white dark:bg-accent-light rounded-3xl border border-border hover:border-accent-blue/30 transition-all"
            >
              <div className="text-muted cursor-grab">
                <GripVertical size={20} />
              </div>

              <div className="w-24 h-16 rounded-xl bg-accent-light dark:bg-background overflow-hidden flex items-center justify-center border border-border">
                {project.thumbnail_url ? (
                  <img src={project.thumbnail_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={24} className="text-muted/50" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold truncate">{project.title}</h3>
                  {project.pinned && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-400/10 text-yellow-600 dark:text-yellow-500 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      <Star size={10} fill="currentColor" /> Pinned
                    </span>
                  )}
                </div>
                <p className="text-muted text-sm line-clamp-1">{project.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleTogglePin(project)}
                  className={`p-3 rounded-xl transition-all ${project.pinned ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'text-muted hover:bg-background'}`}
                >
                  <Star size={18} fill={project.pinned ? 'currentColor' : 'none'} />
                </button>
                <button 
                  onClick={() => { setCurrentProject(project); setIsEditing(true); }}
                  className="p-3 text-muted hover:text-foreground hover:bg-background rounded-xl transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-3 text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-accent-light rounded-3xl border border-dashed border-border">
              <p className="text-muted">No projects found. Click "Add Project" to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
