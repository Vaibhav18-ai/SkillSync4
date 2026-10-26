import React, { useState, useEffect } from 'react';
import { User } from './types';
import { store } from './services/storage';
import { Header, AppNavView } from './components/Header';
import { CoordinatorDashboard } from './views/CoordinatorDashboard';
import { StudentDashboard } from './views/StudentDashboard';
import { TeamWorkspaceView } from './views/TeamWorkspaceView';
import { StudentDirectoryView } from './views/StudentDirectoryView';
import { WorkflowGuide } from './components/WorkflowGuide';
import { CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const users = store.getState().users;
    return users[0] || { id: 1, name: 'Prof. Sharma', email: 'coordinator@skillsync.test', role: 'coordinator' };
  });

  const [currentNavView, setCurrentNavView] = useState<AppNavView>(() => {
    const users = store.getState().users;
    return (users[0]?.role === 'coordinator' ? 'coordinator' : 'student') as AppNavView;
  });

  const [activeTeamId, setActiveTeamId] = useState<number | null>(() => {
    const teams = store.getAllTeams();
    return teams.length > 0 ? teams[0].teamId : null;
  });

  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'coordinator') {
      setCurrentNavView('coordinator');
    } else {
      setCurrentNavView('student');
    }
    showToast(`Switched active account to ${user.name} (${user.role}).`);
  };

  const handleOpenTeamWorkspace = (teamId: number) => {
    setActiveTeamId(teamId);
    setCurrentNavView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalTeamsCount = store.getAllTeams().length;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-20">
      <Header
        currentUser={currentUser}
        onSelectUser={handleSelectUser}
        onOpenWorkflow={() => setShowWorkflowModal(true)}
        activeView={currentNavView}
        onChangeView={(view) => {
          setCurrentNavView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        teamsCount={totalTeamsCount}
      />

      <main>
        {currentNavView === 'workspace' ? (
          <TeamWorkspaceView
            teamId={activeTeamId}
            onSelectTeamId={(tId) => setActiveTeamId(tId)}
            user={currentUser}
            onBack={() => {
              setCurrentNavView(currentUser.role === 'coordinator' ? 'coordinator' : 'student');
            }}
            onToast={showToast}
          />
        ) : currentNavView === 'directory' ? (
          <StudentDirectoryView
            onSelectStudent={(student) => {
              setCurrentUser(student);
              setCurrentNavView('student');
            }}
            onToast={showToast}
          />
        ) : currentNavView === 'coordinator' ? (
          <CoordinatorDashboard
            user={currentUser}
            onOpenTeamWorkspace={handleOpenTeamWorkspace}
            onToast={showToast}
          />
        ) : (
          <StudentDashboard
            user={currentUser}
            onOpenTeam={handleOpenTeamWorkspace}
            onToast={showToast}
          />
        )}
      </main>

      <WorkflowGuide
        isOpen={showWorkflowModal}
        onClose={() => setShowWorkflowModal(false)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200 border border-slate-700 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
