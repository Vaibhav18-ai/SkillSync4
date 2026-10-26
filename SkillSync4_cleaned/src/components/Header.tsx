import React, { useState, useMemo } from 'react';
import { User, Role } from '../types';
import { store } from '../services/storage';
import {
  Users,
  BookOpen,
  Layers,
  Shield,
  Sparkles,
  Award,
  Search,
  Dice5,
  X,
  ChevronDown,
  Briefcase,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';

export type AppNavView = 'coordinator' | 'student' | 'workspace' | 'directory';

interface HeaderProps {
  currentUser: User;
  onSelectUser: (user: User) => void;
  onOpenWorkflow: () => void;
  activeView: AppNavView;
  onChangeView: (view: AppNavView) => void;
  teamsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSelectUser,
  onOpenWorkflow,
  activeView,
  onChangeView,
  teamsCount,
}) => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'ml' | 'frontend' | 'backend' | 'hardware' | 'cyber'>('all');

  const allUsers = store.getState().users;
  const coordinators = allUsers.filter((u) => u.role === 'coordinator');
  const students = allUsers.filter((u) => u.role === 'student');

  // Filter students for switcher
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const profile = store.getState().studentProfiles.find((p) => p.userId === s.id);
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole =
        roleFilter === 'all' || profile?.preferredRole === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [students, searchQuery, roleFilter]);

  const handlePickRandomStudent = () => {
    if (students.length === 0) return;
    const random = students[Math.floor(Math.random() * students.length)];
    onSelectUser(random);
    setShowUserModal(false);
  };

  return (
    <>
      <header className="px-5 py-3 mb-6 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 sticky top-3 z-40">
        {/* Left: Brand Logo */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <button
            type="button"
            onClick={() => onChangeView(currentUser.role === 'coordinator' ? 'coordinator' : 'student')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="logo text-xl font-black tracking-tight">SkillSync</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-md border border-teal-200">
                  100+ Cohort
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Fair Algorithmic Team Formation & Sprint Workspace
              </p>
            </div>
          </button>

          {/* Mobile User Toggle */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setShowUserModal(true)}
              className="flex items-center gap-1 text-xs bg-slate-100 px-2.5 py-1.5 rounded-xl font-semibold border border-slate-300"
            >
              <span>{currentUser.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Center: Main App Navigation Tabs */}
        <nav className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 gap-1 w-full md:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => onChangeView('coordinator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'coordinator'
                ? 'bg-white text-teal-900 shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🎓</span> Coordinator Hub
          </button>

          <button
            type="button"
            onClick={() => onChangeView('student')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'student'
                ? 'bg-white text-teal-900 shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👤</span> Student Portal
          </button>

          <button
            type="button"
            onClick={() => onChangeView('workspace')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'workspace'
                ? 'bg-white text-teal-900 shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👥</span> Team Dashboard
            <span className="text-[10px] bg-teal-600 text-white font-bold px-1.5 py-0.2 rounded-full">
              {teamsCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChangeView('directory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'directory'
                ? 'bg-white text-teal-900 shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📋</span> 100+ Roster
          </button>
        </nav>

        {/* Right: User Switcher Button & Workflow Guide */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenWorkflow}
            className="btn ghost text-xs py-1.5 px-3 flex items-center gap-1.5"
            title="13-Step Algorithmic Team Formation Architecture"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Workflow</span>
          </button>

          {/* Interactive User Switcher Trigger Button */}
          <button
            type="button"
            onClick={() => setShowUserModal(true)}
            className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100/90 text-left px-3 py-1.5 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs hover:border-teal-400 group"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-700 font-bold flex items-center justify-center text-xs group-hover:bg-teal-500 group-hover:text-white transition-colors">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>{currentUser.name}</span>
                {currentUser.role === 'coordinator' ? (
                  <span className="text-[9px] bg-purple-100 text-purple-700 px-1 rounded font-bold">
                    Coordinator
                  </span>
                ) : (
                  <span className="text-[9px] bg-teal-100 text-teal-700 px-1 rounded font-bold">
                    Student
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400">Switch user (100+ available)</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 ml-1" />
          </button>
        </div>
      </header>

      {/* Modern Searchable User Switcher Modal (Fixes native select overflow) */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" /> Switch Active Account
                </h3>
                <p className="text-xs text-slate-500">
                  Select coordinator or any of the {students.length} students to test both perspectives
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="p-3 border-b border-slate-100 bg-teal-50/50 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectUser(coordinators[0]);
                    setShowUserModal(false);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold border flex items-center gap-1 ${
                    currentUser.id === 1
                      ? 'bg-purple-600 text-white border-purple-700 font-bold'
                      : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  🎓 Prof. Sharma (Coordinator)
                </button>
                <button
                  type="button"
                  onClick={handlePickRandomStudent}
                  className="text-xs px-2.5 py-1 rounded-lg font-semibold bg-white text-teal-700 border border-teal-200 hover:bg-teal-50 flex items-center gap-1.5"
                >
                  <Dice5 className="w-3.5 h-3.5" /> Random Student
                </button>
              </div>
              <span className="text-[11px] text-slate-500">
                Active: <b>{currentUser.name}</b>
              </span>
            </div>

            {/* Search Input & Role Filters */}
            <div className="p-3 border-b border-slate-100 space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student by name or email (e.g. Aarav, Diya, Kabir)..."
                  className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  autoFocus
                />
              </div>

              {/* Role filter chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Filter:</span>
                {(['all', 'ml', 'frontend', 'backend', 'hardware', 'cyber'] as const).map((rf) => (
                  <button
                    key={rf}
                    type="button"
                    onClick={() => setRoleFilter(rf)}
                    className={`text-[11px] px-2 py-0.5 rounded-full capitalize font-medium transition cursor-pointer ${
                      roleFilter === rf
                        ? 'bg-teal-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {rf === 'all' ? 'All (105)' : rf}
                  </button>
                ))}
              </div>
            </div>

            {/* Students List */}
            <div className="p-2 overflow-y-auto max-h-[380px] divide-y divide-slate-100">
              {filteredStudents.map((s) => {
                const profile = store.getState().studentProfiles.find((p) => p.userId === s.id);
                const score = store.calcGeneralScore(s.id);
                const isSelected = currentUser.id === s.id;

                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectUser(s);
                      setShowUserModal(false);
                    }}
                    className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-teal-50 border border-teal-300'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span>{s.name}</span>
                          {profile?.preferredRole && (
                            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {profile.preferredRole}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{s.email}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-teal-700">{score.toFixed(1)} / 10</div>
                      <div className="text-[10px] text-slate-400">
                        {profile?.availabilityHours || 15}h / week
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredStudents.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  No students found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredStudents.length} of {students.length} students</span>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="btn ghost text-xs py-1 px-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
