import React, { useState, useEffect, useCallback } from 'react';
import { User, Task, Milestone } from '../types';
import { store } from '../services/storage';
import { BarChart } from '../components/BarChart';
import {
  Users,
  CheckCircle2,
  Clock,
  Calendar,
  Plus,
  Trash2,
  ExternalLink,
  Code2,
  Award,
  ArrowLeft,
  MoveRight,
  Sparkles,
  Layers,
  BarChart2,
  AlertCircle,
  FileCheck,
  ChevronRight,
  FolderGit2,
  Filter,
} from 'lucide-react';

interface TeamWorkspaceViewProps {
  teamId: number | null;
  onSelectTeamId: (teamId: number | null) => void;
  user: User;
  onBack: () => void;
  onToast: (msg: string) => void;
}

export const TeamWorkspaceView: React.FC<TeamWorkspaceViewProps> = ({
  teamId,
  onSelectTeamId,
  user,
  onBack,
  onToast,
}) => {
  const allTeams = store.getAllTeams();
  const [activeTeamId, setActiveTeamId] = useState<number | null>(() => {
    if (teamId !== null) return teamId;
    return allTeams.length > 0 ? allTeams[0].teamId : null;
  });

  useEffect(() => {
    if (teamId !== null) {
      setActiveTeamId(teamId);
    }
  }, [teamId]);

  const details = activeTeamId ? store.getTeamDetails(activeTeamId) : null;

  // Task form state
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskAssignee, setTaskAssignee] = useState<number | ''>('');
  const [taskHours, setTaskHours] = useState(4);
  const [taskDeadline, setTaskDeadline] = useState('Day 2');

  // Milestone form state
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDate, setMilestoneDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  });

  // Project submission state
  const [projTitle, setProjTitle] = useState(details?.team.projectTitle || '');
  const [projDesc, setProjDesc] = useState(details?.team.projectDescription || '');
  const [projRepo, setProjRepo] = useState(details?.team.projectRepoUrl || '');
  const [projNotes, setProjNotes] = useState(details?.team.submissionNotes || '');

  const loadData = useCallback(() => {
    if (activeTeamId) {
      const d = store.getTeamDetails(activeTeamId);
      if (d) {
        setProjTitle(d.team.projectTitle || '');
        setProjDesc(d.team.projectDescription || '');
        setProjRepo(d.team.projectRepoUrl || '');
        setProjNotes(d.team.submissionNotes || '');
      }
    }
  }, [activeTeamId]);

  useEffect(() => {
    loadData();
    const unsub = store.subscribe(loadData);
    return unsub;
  }, [loadData]);

  // If no team is selected or no teams exist, show the overarching Team Dashboard Hub
  if (!details || activeTeamId === null) {
    return (
      <div className="space-y-6">
        {/* Hub Header */}
        <div className="card p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1 text-teal-300 text-xs font-semibold">
                <Layers className="w-4 h-4" /> Multi-Team Collaborative Workspaces
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
                <span>Team Dashboard Hub</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {allTeams.length} Active Teams
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Explore live team sprints, member task workload distribution, milestones, and project repository deliverables.
              </p>
            </div>

            <div className="flex gap-4 text-center">
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-xs border border-white/10">
                <div className="text-lg font-black text-teal-300">{allTeams.length}</div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider">Finalized Teams</div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-xs border border-white/10">
                <div className="text-lg font-black text-emerald-300">
                  {allTeams.filter((t) => t.isSubmitted).length}
                </div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider">Submitted</div>
              </div>
            </div>
          </div>
        </div>

        {/* All Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allTeams.map((t) => {
            const teamDetails = store.getTeamDetails(t.teamId);
            const doneTasks = teamDetails?.tasks.filter((x) => x.status === 'done').length || 0;
            const totalTasks = teamDetails?.tasks.length || 0;

            return (
              <div
                key={t.teamId}
                className="card p-5 bg-white border border-slate-200 flex flex-col justify-between hover:border-teal-400 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="badge font-bold text-xs">Team {t.teamNo}</span>
                    <span className="text-xs font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Avg {t.avgScore.toFixed(2)}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1">{t.competitionName}</h3>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                    {teamDetails?.team.projectTitle || 'Collaborative sprint team'}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Team Leader:</span>
                      <b className="text-slate-800">{t.leaderName}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Team Members:</span>
                      <span>{t.memberCount} members</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sprint Progress:</span>
                      <span className="font-semibold text-teal-700">
                        {doneTasks} / {totalTasks} tasks done
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTeamId(t.teamId);
                    onSelectTeamId(t.teamId);
                  }}
                  className="btn text-xs py-2 px-3 w-full flex items-center justify-center gap-1.5"
                >
                  <span>Open Team Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {allTeams.length === 0 && (
            <div className="col-span-3 card p-12 text-center text-slate-400">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-700 mb-1">No Finalized Teams Yet</h3>
              <p className="text-xs max-w-md mx-auto mb-4">
                Finalize candidate teams in the Coordinator Hub to activate private workspaces with Kanban boards, hours workload tracking, and milestones.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const { team, competition, members, tasks, milestones } = details;

  // Sprint Progress Calculations
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const progressPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Workload calculations per member
  const memberWorkload = members.map((m) => {
    const assignedHours = tasks
      .filter((t) => t.assigneeId === m.userId && t.status !== 'done')
      .reduce((sum, t) => sum + (t.estimatedHours || 0), 0);
    return {
      name: m.name.split(' ')[0],
      hours: assignedHours,
    };
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      onToast('Task title is required.');
      return;
    }
    store.addTask(team.id, {
      title: taskTitle.trim(),
      description: taskDesc.trim(),
      assigneeId: taskAssignee === '' ? null : Number(taskAssignee),
      estimatedHours: Number(taskHours) || 3,
      deadline: taskDeadline.trim() || null,
      status: 'todo',
    });
    setTaskTitle('');
    setTaskDesc('');
    setTaskAssignee('');
    setShowAddTask(false);
    onToast('Task added to sprint Kanban board.');
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneTitle.trim()) {
      onToast('Milestone title is required.');
      return;
    }
    store.addMilestone(team.id, milestoneTitle.trim(), milestoneDate);
    setMilestoneTitle('');
    setShowAddMilestone(false);
    onToast('Milestone scheduled.');
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    store.submitProject(team.id, {
      projectTitle: projTitle.trim(),
      projectDescription: projDesc.trim(),
      projectRepoUrl: projRepo.trim(),
      submissionNotes: projNotes.trim(),
    });
    onToast('Project deliverables submitted for coordinator review!');
  };

  const kanbanColumns: Array<{ key: 'todo' | 'doing' | 'done'; title: string; color: string }> = [
    { key: 'todo', title: 'To Do', color: 'border-slate-300 bg-slate-50/60' },
    { key: 'doing', title: 'In Progress', color: 'border-amber-300 bg-amber-50/40' },
    { key: 'done', title: 'Done', color: 'border-emerald-300 bg-emerald-50/40' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar with Team Selector Dropdown and Hub Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectTeamId(null)}
            className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200"
          >
            ← View All Teams Hub
          </button>

          {/* Quick Team Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Switch Team:</span>
            <select
              aria-label="Switch Team Workspace"
              value={activeTeamId}
              onChange={(e) => {
                const targetId = Number(e.target.value);
                setActiveTeamId(targetId);
                onSelectTeamId(targetId);
              }}
              className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              {allTeams.map((t) => (
                <option key={t.teamId} value={t.teamId}>
                  Team {t.teamNo}: {t.competitionName} (Leader: {t.leaderName})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            Cohort Member: <b>{user.name}</b>
          </span>
        </div>
      </div>

      {/* Workspace Top Header Bar */}
      <div className="card p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white border-0 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-teal-300 font-semibold">{competition.name}</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">Format: {competition.formationMode}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Team {team.teamNo} Workspace</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Avg: {team.avgScore.toFixed(2)}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {team.isSubmitted ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <FileCheck className="w-4 h-4" /> Deliverables Submitted
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Clock className="w-4 h-4" /> In Active Sprint
              </span>
            )}
          </div>
        </div>

        {/* Member list chips */}
        <div className="mt-4 pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-1">Assigned Roster:</span>
          {members.map((m) => (
            <span
              key={m.userId}
              className={`chip text-xs py-1 px-3 ${
                m.isLeader
                  ? 'bg-teal-600 text-white border-teal-500 font-bold'
                  : 'bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              {m.name} {m.isLeader && '👑 (Leader)'} • Score: {m.score.toFixed(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Analytics & Sprint Health Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sprint Progress */}
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sprint Completion
              </span>
              <span className="text-sm font-bold text-teal-600">{progressPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 mb-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-slate-600">
              {doneTasks} of {totalTasks} sprint backlog items completed.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            <span>To Do: {tasks.filter((t) => t.status === 'todo').length}</span>
            <span>Doing: {tasks.filter((t) => t.status === 'doing').length}</span>
            <span>Done: {doneTasks}</span>
          </div>
        </div>

        {/* Planned Member Workload Chart */}
        <div className="card p-5 md:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-teal-600" /> Member Workload Distribution
              </h3>
              <p className="text-xs text-slate-500">Estimated pending sprint hours assigned per member</p>
            </div>
          </div>
          <div className="h-44 w-full">
            <BarChart
              labels={memberWorkload.map((m) => m.name)}
              data={memberWorkload.map((m) => m.hours)}
              labelName="Pending Hours"
              minY={0}
              maxY={Math.max(12, ...(memberWorkload.length ? memberWorkload.map((m) => m.hours) : [0])) + 2}
            />
          </div>
        </div>
      </div>

      {/* Milestones & Schedule */}
      <div className="card p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" /> Sprint Milestones
            </h3>
            <p className="text-xs text-slate-500">Track target deliveries and deadlines</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddMilestone(!showAddMilestone)}
            className="btn ghost text-xs py-1.5 px-3 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 text-teal-600" /> Add Milestone
          </button>
        </div>

        {showAddMilestone && (
          <form
            onSubmit={handleCreateMilestone}
            className="p-4 mb-4 rounded-xl border border-teal-200 bg-teal-50/50 flex flex-wrap gap-3 items-end"
          >
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-slate-700 mb-1">Milestone Title</label>
              <input
                type="text"
                required
                value={milestoneTitle}
                onChange={(e) => setMilestoneTitle(e.target.value)}
                placeholder="e.g. Complete Model Benchmark Validation"
                className="w-full text-xs bg-white rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Due Date</label>
              <input
                type="date"
                required
                value={milestoneDate}
                onChange={(e) => setMilestoneDate(e.target.value)}
                className="text-xs bg-white rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn text-xs py-2 px-3">
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAddMilestone(false)}
                className="btn ghost text-xs py-2 px-3"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                m.done ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  aria-label={`Toggle milestone ${m.title}`}
                  checked={m.done}
                  onChange={() => store.toggleMilestone(m.id)}
                  className="mt-1 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                />
                <div>
                  <h4
                    className={`text-xs font-bold ${
                      m.done ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {m.title}
                  </h4>
                  {m.dueDate && (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> Due {m.dueDate}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                aria-label={`Delete milestone ${m.title}`}
                onClick={() => store.deleteMilestone(m.id)}
                className="text-slate-300 hover:text-rose-500 transition-colors p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {milestones.length === 0 && (
            <div className="text-xs text-slate-400 col-span-3 py-4 text-center">
              No milestones planned yet. Add one above!
            </div>
          )}
        </div>
      </div>

      {/* 3-Column Kanban Board */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-600" /> Sprint Kanban Board
            </h2>
            <p className="text-xs text-slate-500">Organize and transition tasks in real-time</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddTask(!showAddTask)}
            className="btn text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Task
          </button>
        </div>

        {showAddTask && (
          <form
            onSubmit={handleCreateTask}
            className="card p-5 border-teal-300 bg-white shadow-md max-w-xl mx-auto space-y-3"
          >
            <h3 className="font-bold text-sm text-slate-800">Add Sprint Task</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g. Build Data Augmentation Script"
                className="w-full text-xs bg-slate-50 rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                placeholder="Implementation details, test cases..."
                rows={2}
                className="w-full text-xs bg-slate-50 rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assignee</label>
                <select
                  value={taskAssignee}
                  onChange={(e) =>
                    setTaskAssignee(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full text-xs bg-slate-50 rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="">Unassigned</option>
                  {members.map((m) => (
                    <option key={m.userId} value={m.userId}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Est. Hours</label>
                <input
                  type="number"
                  min={1}
                  max={40}
                  value={taskHours}
                  onChange={(e) => setTaskHours(Number(e.target.value))}
                  className="w-full text-xs bg-slate-50 rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Phase</label>
                <input
                  type="text"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                  placeholder="e.g. Day 2"
                  className="w-full text-xs bg-slate-50 rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddTask(false)}
                className="btn ghost text-xs py-2 px-3"
              >
                Cancel
              </button>
              <button type="submit" className="btn text-xs py-2 px-4">
                Add to Backlog
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kanbanColumns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.key);

            return (
              <div
                key={col.key}
                className={`rounded-2xl border ${col.color} p-4 flex flex-col min-h-[350px] shadow-sm`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm text-slate-800">{col.title}</h3>
                  <span className="badge text-[11px]">{colTasks.length}</span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((t) => {
                    const assignee = members.find((m) => m.userId === t.assigneeId);

                    return (
                      <div
                        key={t.id}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-sm hover:shadow transition-shadow space-y-2.5"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-semibold text-xs text-slate-900 leading-snug">
                            {t.title}
                          </h4>
                          <button
                            type="button"
                            aria-label={`Delete task ${t.title}`}
                            onClick={() => store.deleteTask(t.id)}
                            className="text-slate-300 hover:text-rose-500 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {t.description && (
                          <p className="text-[11px] text-slate-500 line-clamp-2">{t.description}</p>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span className="chip py-0.5 px-2 text-[10px] bg-slate-100">
                            👤 {assignee ? assignee.name.split(' ')[0] : 'Unassigned'}
                          </span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3 h-3" /> {t.estimatedHours}h
                          </span>
                        </div>

                        <div className="flex gap-1 pt-1 justify-end border-t border-slate-50">
                          {col.key !== 'todo' && (
                            <button
                              type="button"
                              onClick={() => store.updateTaskStatus(t.id, 'todo')}
                              className="text-[10px] text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded bg-slate-100"
                            >
                              ← To Do
                            </button>
                          )}
                          {col.key !== 'doing' && (
                            <button
                              type="button"
                              onClick={() => store.updateTaskStatus(t.id, 'doing')}
                              className="text-[10px] text-amber-700 hover:text-amber-900 px-2 py-0.5 rounded bg-amber-100/60"
                            >
                              In Progress
                            </button>
                          )}
                          {col.key !== 'done' && (
                            <button
                              type="button"
                              onClick={() => store.updateTaskStatus(t.id, 'done')}
                              className="text-[10px] text-emerald-700 hover:text-emerald-900 px-2 py-0.5 rounded bg-emerald-100/60"
                            >
                              Done ✓
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {colTasks.length === 0 && (
                    <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                      No tasks in this lane
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Deliverable Submission Section */}
      <div className="card p-6 bg-white border border-slate-200">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-slate-800" /> Final Project Deliverables
            </h2>
            <p className="text-xs text-slate-500">
              Submit your team repository and notes for coordinator review and grading
            </p>
          </div>

          {team.evaluationScore !== undefined && (
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-3">
              <Award className="w-6 h-6 text-teal-600" />
              <div>
                <div className="text-xs text-teal-800 font-semibold">Evaluation Score:</div>
                <div className="text-lg font-extrabold text-teal-900">
                  {team.evaluationScore} / 100
                </div>
              </div>
            </div>
          )}
        </div>

        {team.feedback && (
          <div className="p-3 mb-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="font-bold text-slate-900">Coordinator Feedback: </span>
            {team.feedback}
          </div>
        )}

        <form onSubmit={handleSubmitProject} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
              <input
                type="text"
                required
                value={projTitle}
                onChange={(e) => setProjTitle(e.target.value)}
                placeholder="e.g. Distributed Vision Agent Engine"
                className="w-full text-xs bg-slate-50 rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                required
                value={projRepo}
                onChange={(e) => setProjRepo(e.target.value)}
                placeholder="https://github.com/org/repo"
                className="w-full text-xs bg-slate-50 rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Architecture & Solution Summary
            </label>
            <textarea
              rows={3}
              value={projDesc}
              onChange={(e) => setProjDesc(e.target.value)}
              placeholder="Outline your tech stack, algorithmic models, and deployment instructions..."
              className="w-full text-xs bg-slate-50 rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" className="btn text-xs py-2.5 px-5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Save & Submit Deliverables
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
