import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Layers, Sliders, Users, Target, ShieldCheck } from 'lucide-react';

interface WorkflowGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowGuide: React.FC<WorkflowGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const phases = [
    {
      phase: 'Phase 1 · Student & Baseline Competency',
      steps: [
        {
          num: 1,
          title: 'Student Registration & Availability',
          desc: 'Students create profiles, declare weekly availability (10–40 hrs), preferred engineering roles (ML, Frontend, Backend, etc.), and GitHub links.',
        },
        {
          num: 2,
          title: 'Portfolio & Technical Skills DNA',
          desc: 'Showcase repositories, live demos, and rate proficiency (1–5) and experience (0–10) across 15 standard computer science domains.',
        },
        {
          num: 3,
          title: 'General Competency Calculation',
          desc: 'The scoring formula evaluates verifiable proficiency, practical experience, and assessment benchmarks into a normalized score out of 10.',
        },
      ],
    },
    {
      phase: 'Phase 2 · Coordinator Competition Configuration',
      steps: [
        {
          num: 4,
          title: 'Tracks & Variable Team Sizing',
          desc: 'Choose 1 or multiple competition tracks (e.g. AI/ML, Web, DSA) and select scale presets from Classroom (10–50) to International (1,000–10,000+).',
        },
        {
          num: 5,
          title: 'Weighted Skill Matrix & Tolerance Threshold',
          desc: 'Assign weights to required skills and specify the maximum allowed average score difference (tolerance gap, e.g. 0.8) for fair parity.',
        },
        {
          num: 6,
          title: 'Publish Competition',
          desc: 'Event status transitions from Draft to Registration Open with a unique shareable join code.',
        },
      ],
    },
    {
      phase: 'Phase 3 · Student Discovery & Teammate Wishes',
      steps: [
        {
          num: 7,
          title: 'Eligibility & Fit Calculation',
          desc: 'Students see real-time match fitness score and eligibility validation against mandatory requirements before applying.',
        },
        {
          num: 8,
          title: 'Volunteer Leadership & Teammate Preferences',
          desc: 'Optionally volunteer to lead a team. Submit up to 3 teammate wishes: "Prefer" (team together) or "Avoid" (separate teams).',
        },
      ],
    },
    {
      phase: 'Phase 4 · Algorithmic Balancer Engine',
      steps: [
        {
          num: 9,
          title: 'Leadership Seeding & Initial Greedy Allocation',
          desc: 'Evaluates leadership suitability from availability and competency, seeding exactly 1 qualified leader per team round-robin.',
        },
        {
          num: 10,
          title: 'Multi-Objective Iterative Swap Search',
          desc: 'Hill-climbing optimizer evaluates thousands of student permutations, minimizing variance below tolerance while maximizing fulfilled wishes.',
        },
        {
          num: 11,
          title: '3 Candidate Team Proposals Generated',
          desc: 'Produces Option 1 (Strict Skill Balance), Option 2 (Preference Focused), and Option 3 (Role & Leadership Optimized) with live Chart.js comparisons.',
        },
      ],
    },
    {
      phase: 'Phase 5 · Audit, Finalization & Monte Carlo Benchmark',
      steps: [
        {
          num: 12,
          title: 'Fairness Benchmark vs 300 Random Trials',
          desc: 'Coordinator audits team spreads against 300 random assignment trials to scientifically prove mathematical fairness and lack of bias.',
        },
        {
          num: 13,
          title: 'Lock Teams, CSV Export & Workspace Activation',
          desc: 'Coordinator finalizes chosen option. Workspaces automatically unlock for all team members, and official roster CSV is exported.',
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">SkillSync End-to-End Workflow</h2>
              <p className="text-xs text-slate-500">7 Phases & 13 Algorithmic Steps from Registration to Grading</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {phases.map((phaseGroup, pIdx) => (
            <div key={pIdx} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50/80 px-3 py-1.5 rounded-lg inline-block border border-teal-100">
                {phaseGroup.phase}
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {phaseGroup.steps.map((step) => (
                  <div
                    key={step.num}
                    className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-teal-300 transition-all shadow-sm flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{step.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
          <span>SkillSync Multi-Objective Fairness Engine</span>
          <button type="button" onClick={onClose} className="btn text-xs py-2 px-4">
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
