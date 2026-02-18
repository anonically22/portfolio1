import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Briefcase, BookOpen, Cpu, Settings } from 'lucide-react';
import ProjectsManager from './modules/ProjectsManager';
import SkillsManager from './modules/SkillsManager';
import ResearchManager from './modules/ResearchManager';
import SectionsManager from './modules/SectionsManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/masteradmin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'skills':
        return <SkillsManager />;
      case 'research':
        return <ResearchManager />;
      case 'sections':
        return <SectionsManager />;
      case 'dashboard':
      default:
        return (
          <>
            <header className="mb-12">
              <h2 className="text-4xl font-display font-bold tracking-tight mb-2">Welcome Back</h2>
              <p className="text-muted text-lg">Manage your professional presence from one central hub.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 bg-white dark:bg-accent-light rounded-3xl border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-4">Master CMS Plan</h3>
                <p className="text-muted leading-relaxed">
                  You are now in full control of your portfolio content.
                  <br /><br />
                  - **Projects**: Showcase your work.<br />
                  - **Research**: Academic contributions.<br />
                  - **Skills**: Technical matrix.<br />
                  - **Sections**: Dynamic Hero/About content.
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-white dark:bg-accent-light flex flex-col transition-colors duration-300">
        <div className="p-8 border-b border-border">
          <h1 className="text-xl font-display font-bold tracking-tighter flex items-center gap-2 text-foreground">
            AS<span className="w-2 h-2 rounded-full bg-accent-blue flex-shrink-0" />
            <span className="text-sm font-medium text-muted uppercase tracking-widest ml-2">CMS</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'projects', name: 'Projects', icon: Briefcase },
            { id: 'research', name: 'Research', icon: BookOpen },
            { id: 'skills', name: 'Skills', icon: Cpu },
            { id: 'sections', name: 'Sections', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === item.id 
                  ? 'text-accent-blue bg-accent-blue/10 dark:bg-accent-blue/20' 
                  : 'text-muted hover:text-foreground hover:bg-background'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
