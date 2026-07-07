"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Search, 
  Trash2, 
  FolderKanban, 
  User, 
  MapPin, 
  Calendar,
  X,
  Edit3,
  Check
} from "lucide-react";

interface ProjectTask {
  id: string;
  projectName: string;
  clientName: string;
  location: string;
  currentPhase: "Site Survey" | "2D Layout Drafting" | "3D Modeling" | "Structural Engineering" | "Finished / Handover";
  priority: "High" | "Medium" | "Low";
  deadline: string;
  notes: string;
}

const PHASES: ProjectTask["currentPhase"][] = [
  "Site Survey",
  "2D Layout Drafting",
  "3D Modeling",
  "Structural Engineering",
  "Finished / Handover"
];

const defaultProjects: ProjectTask[] = [
  {
    id: "PRJ-001",
    projectName: "G+3 Residential Apartment",
    clientName: "Sanjay Bajpai",
    location: "Boring Road, Patna",
    currentPhase: "3D Modeling",
    priority: "High",
    deadline: "2026-07-25",
    notes: "Client wants modifications on the front structural balcony elevation view.",
  },
  {
    id: "PRJ-002",
    projectName: "Commercial Showroom Interior Layout",
    clientName: "Megha Gupta",
    location: "Muzaffarpur",
    currentPhase: "2D Layout Drafting",
    priority: "Medium",
    deadline: "2026-08-02",
    notes: "Site measurements completed. Waiting for structural column map approval.",
  },
];

export default function TaskManagerPage() {
  const [projects, setProjects] = useState<ProjectTask[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("All");

  // Modal & Inline UI Controls
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectTask | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // New Project Form State
  const [newProjectName, setNewProjectName] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPhase, setNewPhase] = useState<ProjectTask["currentPhase"]>("Site Survey");
  const [newPriority, setNewPriority] = useState<ProjectTask["priority"]>("Medium");
  const [newDeadline, setNewDeadline] = useState("");
  const [newNotes, setNewNotes] = useState("");

  // Safe client-side local storage initialization
  useEffect(() => {
    const savedProjects = localStorage.getItem("dhb_studio_projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(defaultProjects);
      localStorage.setItem("dhb_studio_projects", JSON.stringify(defaultProjects));
    }
  }, []);

  const saveAndSync = (updatedList: ProjectTask[]) => {
    setProjects(updatedList);
    localStorage.setItem("dhb_studio_projects", JSON.stringify(updatedList));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newClientName || !newLocation || !newDeadline) return;

    // Safely calculate the next numerical ID sequence
    const nextIdNum = projects.reduce((max, p) => {
      const match = p.id.match(/\d+/);
      const num = match ? parseInt(match[0], 10) : 0;
      return num > max ? num : max;
    }, 0) + 1;

    const newProjectItem: ProjectTask = {
      id: `PRJ-${String(nextIdNum).padStart(3, "0")}`,
      projectName: newProjectName,
      clientName: newClientName,
      location: newLocation,
      currentPhase: newPhase,
      priority: newPriority,
      deadline: newDeadline,
      notes: newNotes,
    };

    saveAndSync([newProjectItem, ...projects]);

    // Reset Form fields
    setNewProjectName("");
    setNewClientName("");
    setNewLocation("");
    setNewDeadline("");
    setNewNotes("");
    setIsCreateModalOpen(false);
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const updated = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    saveAndSync(updated);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    saveAndSync(updated);
    setDeletingId(null);
  };

  const isOverdue = (dateString: string, phase: string) => {
    if (phase === "Finished / Handover") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateString);
    return targetDate < today;
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhase = phaseFilter === "All" || p.currentPhase === phaseFilter;
    return matchesSearch && matchesPhase;
  });

  const getPriorityBadge = (priority: ProjectTask["priority"]) => {
    switch (priority) {
      case "High": return "bg-red-50 text-red-700 border-red-200";
      case "Medium": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Low": return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getPhaseColor = (phase: ProjectTask["currentPhase"]) => {
    switch (phase) {
      case "Site Survey": return "bg-slate-100 text-slate-800 border-slate-300";
      case "2D Layout Drafting": return "bg-purple-50 text-purple-700 border-purple-200";
      case "3D Modeling": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Structural Engineering": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Finished / Handover": return "bg-green-50 text-green-700 border-green-200";
    }
  };

  const highPriorityCount = projects.filter((p) => p.priority === "High" && p.currentPhase !== "Finished / Handover").length;
  const activeProjectsCount = projects.filter((p) => p.currentPhase !== "Finished / Handover").length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <FolderKanban className="text-blue-600" /> Architectural Project Workspace
            </h1>
            <p className="text-sm text-slate-500 mt-1">Track architectural blueprints, design pipelines, and construction project timelines.</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
          >
            <Plus size={18} /> Initialize New Project
          </button>
        </div>

        {/* Track Counters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Active Drawing Blueprints</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{activeProjectsCount} Ongoing Projects</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full border border-blue-100"><Clock size={24} /></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">High Priority Critical Deadlines</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{highPriorityCount} Urgently Required</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-full border border-red-100"><AlertCircle size={24} /></div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by project name, client, or district site..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-medium bg-slate-100 p-1 rounded-lg border border-slate-200">
            {["All", ...PHASES].map((phase) => (
              <button
                key={phase}
                onClick={() => setPhaseFilter(phase)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  phaseFilter === phase ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {phase}
              </button>
            ))}
          </div>
        </div>

        {/* Task Cards Deck Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              const currentPhaseIndex = PHASES.indexOf(project.currentPhase);
              const overdue = isOverdue(project.deadline, project.currentPhase);

              return (
                <div 
                  key={project.id} 
                  className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all ${
                    overdue ? "border-red-300 ring-1 ring-red-100 bg-red-50/10" : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{project.id}</span>
                      <div className="flex gap-2">
                        {overdue && (
                          <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                            <AlertCircle size={10} /> Overdue
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityBadge(project.priority)}`}>{project.priority} Priority</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getPhaseColor(project.currentPhase)}`}>{project.currentPhase}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight pt-1">{project.projectName}</h3>
                  </div>

                  {/* Horizontal Progress Flowline */}
                  <div className="pt-1 pb-2">
                    <div className="flex items-center w-full justify-between relative">
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0" />
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-500 transition-all duration-300 z-0" 
                        style={{ width: `${(currentPhaseIndex / (PHASES.length - 1)) * 100}%` }}
                      />
                      {PHASES.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center z-10 transition-colors ${
                            idx <= currentPhaseIndex 
                              ? "bg-blue-600 border-blue-600 text-white" 
                              : "bg-white border-slate-200"
                          }`}
                          title={PHASES[idx]}
                        >
                          {idx <= currentPhaseIndex && <Check size={8} strokeWidth={4} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5"><User size={14} className="text-slate-400" /> <span className="font-semibold text-slate-800">Client:</span> {project.clientName}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> <span className="font-semibold text-slate-800">Site:</span> {project.location}</div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" /> 
                      <span className="font-semibold text-slate-800">Target Delivery:</span> 
                      <span className={overdue ? "text-red-600 font-bold" : ""}>{project.deadline}</span>
                    </div>
                  </div>

                  {project.notes && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 border-l-2 border-blue-500 p-2 rounded-r-md">
                      "{project.notes}"
                    </p>
                  )}

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 items-center min-h-[36px]">
                    {deletingId === project.id ? (
                      <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-2 py-1 rounded-lg animate-fadeIn">
                        <span className="text-[11px] font-semibold text-red-700">Delete Project?</span>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="bg-red-600 text-white font-medium text-[11px] px-2 py-0.5 rounded shadow-sm hover:bg-red-700"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => setDeletingId(null)}
                          className="bg-slate-200 text-slate-700 font-medium text-[11px] px-2 py-0.5 rounded hover:bg-slate-300"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <>
                        <button 
                          onClick={() => setEditingProject(project)}
                          className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-all"
                        >
                          <Edit3 size={12} strokeWidth={2.5} /> Edit Phase
                        </button>
                        <button 
                          onClick={() => setDeletingId(project.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 border-dashed text-center text-slate-400">
              No architectural pipelines are registered matching this tracking filter scope.
            </div>
          )}
        </div>

        {/* MODAL 1: ADD NEW ARCHITECTURAL TASK PROJECT */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Initialize Design Workspace</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4 pt-1">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Project Name Structure Type</label>
                  <input required type="text" placeholder="e.g. G+2 Residential Villa Blueprint" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Client Name</label>
                    <input required type="text" placeholder="e.g. Alok Sharma" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Site Location Address</label>
                    <input required type="text" placeholder="e.g. Kankarbagh, Patna" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Current Studio Pipeline Stage</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newPhase} onChange={(e) => setNewPhase(e.target.value as ProjectTask["currentPhase"])}>
                      {PHASES.map((phase) => <option key={phase} value={phase}>{phase}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Urgency Priority</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newPriority} onChange={(e) => setNewPriority(e.target.value as ProjectTask["priority"])}>
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Blueprint Delivery Target Deadline</label>
                  <input required type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Studio Stage Operational Notes</label>
                  <textarea rows={2} placeholder="Add structural specifications, revision requests or design constraints..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Launch Workspace</button>
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 rounded-lg text-sm hover:bg-slate-200">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: EDITING PIPELINE / TASKS */}
        {editingProject && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Modify Project Blueprint Stage</h3>
                <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>

              <form onSubmit={handleUpdateProject} className="space-y-4 pt-1">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Project Work Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={editingProject.projectName} onChange={(e) => setEditingProject({...editingProject, projectName: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Pipeline Progress</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={editingProject.currentPhase} onChange={(e) => setEditingProject({...editingProject, currentPhase: e.target.value as ProjectTask["currentPhase"]})}>
                      {PHASES.map((phase) => <option key={phase} value={phase}>{phase}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Urgency Level</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={editingProject.priority} onChange={(e) => setEditingProject({...editingProject, priority: e.target.value as ProjectTask["priority"]})}>
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Target Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={editingProject.deadline} onChange={(e) => setEditingProject({...editingProject, deadline: e.target.value})} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Revision / Design Feedback Updates</label>
                  <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" value={editingProject.notes} onChange={(e) => setEditingProject({...editingProject, notes: e.target.value})} />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Apply Workspace Updates</button>
                  <button type="button" onClick={() => setEditingProject(null)} className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 rounded-lg text-sm hover:bg-slate-200">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}