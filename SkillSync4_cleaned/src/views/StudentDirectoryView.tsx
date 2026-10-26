import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { store } from '../services/storage';
import {
  Users,
  Search,
  Award,
  Clock,
  Code2,
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface StudentDirectoryViewProps {
  onSelectStudent: (student: User) => void;
  onToast: (msg: string) => void;
}

export const StudentDirectoryView: React.FC<StudentDirectoryViewProps> = ({
  onSelectStudent,
  onToast,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'hours' | 'name'>('score');
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  const students = store.getAllStudents();

  const filtered = useMemo(() => {
    return students
      .filter((s) => {
        const profile = store.getState().studentProfiles.find((p) => p.userId === s.id);
        const matchesSearch =
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole =
          roleFilter === 'all' || profile?.preferredRole === roleFilter;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        const scoreA = store.calcGeneralScore(a.id);
        const scoreB = store.calcGeneralScore(b.id);
        const profA = store.getState().studentProfiles.find((p) => p.userId === a.id);
        const profB = store.getState().studentProfiles.find((p) => p.userId === b.id);

        if (sortBy === 'score') return scoreB - scoreA;
        if (sortBy === 'hours') return (profB?.availabilityHours || 0) - (profA?.availabilityHours || 0);
        return a.name.localeCompare(b.name);
      });
  }, [students, search, roleFilter, sortBy]);

  const selectedProfile = selectedStudentId
    ? store.getStudentProfile(selectedStudentId)
    : null;
  const selectedUser = selectedStudentId
    ? store.getUserById(selectedStudentId)
    : null;

  return (
    <div className="space-y-6">
      {/* Directory Header Banner */}
      <div className="card p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-teal-950 text-white border-0 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-teal-300 text-xs font-semibold">
              <Users className="w-4 h-4" /> Comprehensive Cohort Roster
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Student Directory</span>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {students.length} Verified Students
              </span>
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Inspect verified competency scores, technical proficiencies, weekly availability, and portfolio repositories across the entire cohort.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-300">Cohort Average Score</div>
              <div className="text-xl font-black text-teal-300">
                {(
                  students.reduce((sum, s) => sum + store.calcGeneralScore(s.id), 0) /
                  (students.length || 1)
                ).toFixed(2)}{' '}
                / 10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter and Controls */}
      <div className="card p-4 bg-white border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name or email..."
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Sort by:
              <select
                aria-label="Sort student directory"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'score' | 'hours' | 'name')}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="score">Highest General Score</option>
                <option value="hours">Availability Hours</option>
                <option value="name">Alphabetical (Name)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 mr-1">Specialization:</span>
          {[
            { id: 'all', label: `All (${students.length})` },
            { id: 'ml', label: 'AI / Machine Learning' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend' },
            { id: 'fullstack', label: 'Fullstack' },
            { id: 'hardware', label: 'IoT & Hardware' },
            { id: 'cyber', label: 'Cybersecurity' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRoleFilter(tab.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap border ${
                roleFilter === tab.id
                  ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((student) => {
          const profile = store.getState().studentProfiles.find((p) => p.userId === student.id);
          const score = store.calcGeneralScore(student.id);
          const pData = store.getStudentProfile(student.id);
          const topSkills = pData.skills.sort((a, b) => b.score - a.score).slice(0, 3);
          const isSelected = selectedStudentId === student.id;

          return (
            <div
              key={student.id}
              className={`card p-4.5 bg-white border flex flex-col justify-between transition-all hover:border-teal-400 hover:shadow-md ${
                isSelected ? 'ring-2 ring-teal-500 border-teal-500 bg-teal-50/20' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-tight">
                        {student.name}
                      </h3>
                      <div className="text-[11px] text-slate-400">{student.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-teal-700">
                      {score.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ 10</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 my-2.5">
                  {profile?.preferredRole && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {profile.preferredRole}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    <Clock className="w-3 h-3 text-slate-400" /> {profile?.availabilityHours || 15}h/wk
                  </span>
                </div>

                {/* Top Skills Preview */}
                <div className="space-y-1.5 my-3 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Top Proficiencies:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {topSkills.map((sk) => (
                      <span
                        key={sk.skillId}
                        className="text-[11px] bg-teal-50/80 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-md font-semibold"
                      >
                        {sk.name}: <b>{sk.score.toFixed(1)}</b>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudentId(isSelected ? null : student.id)}
                  className="text-xs text-slate-600 hover:text-teal-700 font-semibold flex items-center gap-1"
                >
                  {isSelected ? 'Hide Details' : 'View Full Profile →'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectStudent(student);
                    onToast(`Switched active view to ${student.name}`);
                  }}
                  className="btn ghost text-xs py-1 px-2.5 border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100"
                >
                  Switch to User
                </button>
              </div>

              {/* Expandable Profile Details Modal/Drawer */}
              {isSelected && selectedProfile && (
                <div className="mt-3 pt-3 border-t border-teal-100 bg-teal-50/40 p-3 rounded-xl space-y-2 text-xs">
                  <p className="text-slate-600 italic">"{selectedProfile.profile.bio}"</p>
                  {selectedProfile.profile.githubUrl && (
                    <a
                      href={selectedProfile.profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Code2 className="w-3.5 h-3.5" /> {selectedProfile.profile.githubUrl}
                    </a>
                  )}
                  <div className="text-[11px] font-semibold text-slate-700">
                    Portfolio: {selectedProfile.profile.portfolioProjects?.length || 0} Project(s) ·{' '}
                    {selectedProfile.profile.certifications?.length || 0} Certifications
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
