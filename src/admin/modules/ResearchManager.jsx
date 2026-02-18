import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, FileText, GripVertical, Loader2, Save, X, Link as LinkIcon } from 'lucide-react';

const ResearchManager = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentPaper, setCurrentPaper] = useState({
    title: '',
    abstract: '',
    full_content: '',
    pdf_url: '',
    supervisor: '',
    publication_status: 'Published'
  });

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('research_papers')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching papers:', error);
    else setPapers(data || []);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    let error;
    if (currentPaper.id) {
      const { error: err } = await supabase
        .from('research_papers')
        .update(currentPaper)
        .eq('id', currentPaper.id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from('research_papers')
        .insert([currentPaper]);
      error = err;
    }

    if (error) alert('Error saving paper: ' + error.message);
    else {
      setIsEditing(false);
      fetchPapers();
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this research paper?')) return;
    const { error } = await supabase.from('research_papers').delete().eq('id', id);
    if (!error) fetchPapers();
  };

  if (isEditing) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight">
              {currentPaper.id ? 'Edit Research Paper' : 'New Research Paper'}
            </h2>
            <p className="text-muted">Document your academic contributions.</p>
          </div>
          <button onClick={() => setIsEditing(false)} className="p-3 text-muted hover:text-foreground hover:bg-white dark:hover:bg-accent-light rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 bg-white dark:bg-accent-light rounded-3xl border border-border shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Paper Title</label>
                <input 
                  required
                  value={currentPaper.title}
                  onChange={(e) => setCurrentPaper({...currentPaper, title: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                  placeholder="The impact of AI on..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Abstract</label>
                <textarea 
                  required
                  rows={6}
                  value={currentPaper.abstract}
                  onChange={(e) => setCurrentPaper({...currentPaper, abstract: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none resize-none"
                  placeholder="Summarize your research..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-white dark:bg-accent-light rounded-3xl border border-border shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Supervisor</label>
                <input 
                  value={currentPaper.supervisor}
                  onChange={(e) => setCurrentPaper({...currentPaper, supervisor: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Publication Status</label>
                <select 
                  value={currentPaper.publication_status}
                  onChange={(e) => setCurrentPaper({...currentPaper, publication_status: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                >
                  <option>Published</option>
                  <option>In Review</option>
                  <option>Pre-print</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">PDF/Document Link</label>
                <input 
                  value={currentPaper.pdf_url}
                  onChange={(e) => setCurrentPaper({...currentPaper, pdf_url: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent-blue outline-none"
                  placeholder="https://..."
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={saving}
              className="w-full py-5 bg-accent-blue text-white font-bold rounded-3xl hover:bg-accent-blue/90 transition-all shadow-xl shadow-accent-blue/20 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Save Paper
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
          <h2 className="text-3xl font-display font-bold tracking-tight">Research</h2>
          <p className="text-muted">Manage your academic and technical publications.</p>
        </div>
        <button 
          onClick={() => { setCurrentPaper({ title: '', abstract: '', full_content: '', pdf_url: '', supervisor: '', publication_status: 'Published' }); setIsEditing(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-accent-blue text-white font-bold rounded-2xl hover:bg-accent-blue/90 transition-all shadow-lg hover:shadow-accent-blue/20"
        >
          <Plus size={20} />
          Add Paper
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent-blue" size={40} />
        </div>
      ) : (
        <div className="grid gap-4">
          {papers.map((paper) => (
            <div key={paper.id} className="group flex items-center gap-6 p-6 bg-white dark:bg-accent-light rounded-3xl border border-border hover:border-accent-blue/30 transition-all">
              <div className="text-muted cursor-grab"><GripVertical size={20} /></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold truncate mb-1">{paper.title}</h3>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="text-accent-blue">{paper.publication_status}</span>
                  <span className="text-muted">•</span>
                  <span className="text-muted">Sup: {paper.supervisor || 'N/A'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setCurrentPaper(paper); setIsEditing(true); }} className="p-3 text-muted hover:text-foreground hover:bg-background rounded-xl transition-all">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(paper.id)} className="p-3 text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {papers.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-accent-light rounded-3xl border border-dashed border-border text-muted">
              No research papers found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResearchManager;
