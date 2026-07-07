"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  CheckCircle, 
  Clock, 
  Compass, 
  X,
  Eye,
  Edit2,
  Trash2,
  Wallet
} from "lucide-react";

interface Invoice {
  id: string;
  clientName: string;
  projectName: string;
  totalAmount: number;   // Total quoted fee
  paidAmount: number;    // Amount paid so far
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  type: "Concept Design" | "2D Submission Plan" | "3D Elevation" | "Structural & Working Drawing" | "Full Architectural Set";
}

const defaultInvoices: Invoice[] = [
  {
    id: "DHB-ARCH-001",
    clientName: "Rajesh Ranjan",
    projectName: "G+2 Residential Building (Saguna More, Patna)",
    totalAmount: 45000,
    paidAmount: 45000,
    dueDate: "2026-07-20",
    status: "Paid",
    type: "2D Submission Plan",
  },
  {
    id: "DHB-ARCH-002",
    clientName: "Amit Kumar Singh",
    projectName: "Commercial Complex (Muzaffarpur)",
    totalAmount: 150000,
    paidAmount: 50000,
    dueDate: "2026-08-05",
    status: "Pending",
    type: "Full Architectural Set",
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Modals management state
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Creation Form Fields State
  const [newClient, setNewClient] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newLocation, setNewLocation] = useState("Patna");
  const [newTotalAmount, setNewTotalAmount] = useState("");
  const [newPaidAmount, setNewPaidAmount] = useState("0");
  const [newDueDate, setNewDueDate] = useState("");
  const [newType, setNewType] = useState<Invoice["type"]>("Concept Design");
  const [newStatus, setNewStatus] = useState<Invoice["status"]>("Pending");

  // Load from localStorage safely
  useEffect(() => {
    const savedInvoices = localStorage.getItem("dhb_architectural_balances");
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    } else {
      setInvoices(defaultInvoices);
      localStorage.setItem("dhb_architectural_balances", JSON.stringify(defaultInvoices));
    }
  }, []);

  // Sync back to local browser cache
  const saveAndSync = (updatedList: Invoice[]) => {
    setInvoices(updatedList);
    localStorage.setItem("dhb_architectural_balances", JSON.stringify(updatedList));
  };

  // Submit action for creating a brand new invoice record
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient || !newProject || !newTotalAmount || !newDueDate) return;

    const total = parseFloat(newTotalAmount);
    const paid = parseFloat(newPaidAmount) || 0;

    const newInvoiceItem: Invoice = {
      id: `DHB-ARCH-${String(invoices.length + 1).padStart(3, "0")}`,
      clientName: newClient,
      projectName: `${newProject} (${newLocation})`,
      totalAmount: total,
      paidAmount: paid,
      dueDate: newDueDate,
      status: newStatus,
      type: newType,
    };

    saveAndSync([newInvoiceItem, ...invoices]);
    
    // Clear fields
    setNewClient("");
    setNewProject("");
    setNewTotalAmount("");
    setNewPaidAmount("0");
    setNewDueDate("");
    setIsCreateModalOpen(false);
  };

  // Submit action for updating an existing invoice record
  const handleUpdateInvoiceDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInvoice) return;

    const updated = invoices.map((inv) => {
      if (inv.id === editingInvoice.id) {
        return editingInvoice;
      }
      return inv;
    });

    saveAndSync(updated);
    setEditingInvoice(null);
  };

  const handleDeleteInvoice = (idToDelete: string) => {
    if (confirm("Permanently delete this architectural drawing log?")) {
      const updated = invoices.filter(item => item.id !== idToDelete);
      saveAndSync(updated);
    }
  };

  // Filter Logic
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Dynamic dashboard counter mathematics
  const totalFeesReceived = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalOutstandingBalance = invoices.reduce((acc, curr) => acc + (curr.totalAmount - curr.paidAmount), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Compass className="text-blue-600" /> Dream Homes Bihar <span className="text-sm font-normal text-slate-400 px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200">Studio Desk</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">Track drawing phase fees, client installments, and total collections.</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
          >
            <Plus size={18} /> New Drawing Invoice
          </button>
        </div>

        {/* Studio Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Advanced Cash Received</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{formatINR(totalFeesReceived)}</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-full border border-green-100"><Wallet size={24} /></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Remaining Balance Collectible</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{formatINR(totalOutstandingBalance)}</p>
            </div>
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full border border-yellow-100"><Clock size={24} /></div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by client or site location..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
            {["All", "Paid", "Pending", "Overdue"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  statusFilter === status ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Drawing ID</th>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Project Details</th>
                  <th className="px-6 py-4">Drawing Phase</th>
                  <th className="px-6 py-4">Total Fee</th>
                  <th className="px-6 py-4">Paid So Far</th>
                  <th className="px-6 py-4">Remaining Balance</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-600">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => {
                    const balance = invoice.totalAmount - invoice.paidAmount;
                    return (
                      <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-900">{invoice.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{invoice.clientName}</td>
                        <td className="px-6 py-4 max-w-xs truncate text-slate-500">{invoice.projectName}</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded text-xs border border-blue-100">{invoice.type}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-900">{formatINR(invoice.totalAmount)}</td>
                        <td className="px-6 py-4 text-green-600 font-medium">{formatINR(invoice.paidAmount)}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">
                          {balance === 0 ? <span className="text-green-600 font-semibold">Cleared 🎉</span> : formatINR(balance)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            invoice.status === "Paid" ? "bg-green-50 text-green-700 border-green-200" :
                            invoice.status === "Pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                            "bg-red-50 text-red-700 border-red-200"
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => setSelectedInvoice(invoice)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md transition-colors" title="View Details"><Eye size={16} /></button>
                            <button onClick={() => setEditingInvoice(invoice)} className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md transition-colors" title="Edit Payments / Data"><Edit2 size={16} /></button>
                            <button onClick={() => handleDeleteInvoice(invoice.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors" title="Delete Row"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-slate-400 font-medium">No tracking entries match filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL 1: CREATE NEW BLUEPRINT LOG */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Log New Architectural Phase</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleCreateInvoice} className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Client Full Name</label>
                  <input required type="text" placeholder="e.g. Priyanshu Raj" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={newClient} onChange={(e) => setNewClient(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Project Site Scope</label>
                    <input required type="text" placeholder="e.g. G+3 Apartment, Boring Road" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={newProject} onChange={(e) => setNewProject(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Location District</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}>
                      <option value="Patna">Patna</option>
                      <option value="Muzaffarpur">Muzaffarpur</option>
                      <option value="Gaya">Gaya</option>
                      <option value="Bhagalpur">Bhagalpur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Drawing Package</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={newType} onChange={(e) => setNewType(e.target.value as Invoice["type"])}>
                    <option value="Concept Design">Concept Design (Initial Layouts)</option>
                    <option value="2D Submission Plan">2D Submission Plan (Map Approval)</option>
                    <option value="3D Elevation">3D Elevation (Exterior Views)</option>
                    <option value="Structural & Working Drawing">Structural & Working Drawing</option>
                    <option value="Full Architectural Set">Full Architectural Set (Complete Package)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Total Fee (INR)</label>
                    <input required type="number" placeholder="e.g. 75000" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={newTotalAmount} onChange={(e) => setNewTotalAmount(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Amount Paid (INR)</label>
                    <input type="number" placeholder="e.g. 25000" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={newPaidAmount} onChange={(e) => setNewPaidAmount(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Target Date</label>
                    <input required type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Initial Status</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={newStatus} onChange={(e) => setNewStatus(e.target.value as Invoice["status"])}>
                      <option value="Pending">Pending Balance</option>
                      <option value="Paid">Paid Fully</option>
                      <option value="Overdue">Overdue Clearance</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Register Phase</button>
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 rounded-lg text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: EDIT SYSTEM (Updates total + advanced partial amount) */}
        {editingInvoice && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Update Payments / Details</h3>
                <button onClick={() => setEditingInvoice(null)} className="text-slate-400"><X size={20} /></button>
              </div>

              <form onSubmit={handleUpdateInvoiceDetails} className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Client Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={editingInvoice.clientName} onChange={(e) => setEditingInvoice({...editingInvoice, clientName: e.target.value})} />
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Project Scope</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={editingInvoice.projectName} onChange={(e) => setEditingInvoice({...editingInvoice, projectName: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Total Fee (INR)</label>
                    <input required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={editingInvoice.totalAmount} onChange={(e) => setEditingInvoice({...editingInvoice, totalAmount: parseFloat(e.target.value) || 0})} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Paid Amount (INR)</label>
                    <input required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={editingInvoice.paidAmount} onChange={(e) => setEditingInvoice({...editingInvoice, paidAmount: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">Collection Status</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={editingInvoice.status} onChange={(e) => setEditingInvoice({...editingInvoice, status: e.target.value as Invoice["status"]})}>
                    <option value="Pending">Pending Balance</option>
                    <option value="Paid">Paid Fully</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg text-xs font-medium text-slate-500 flex justify-between">
                  <span>Calculated Balance:</span>
                  <span className="font-bold text-slate-900">{formatINR(editingInvoice.totalAmount - editingInvoice.paidAmount)}</span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Save Changes</button>
                  <button type="button" onClick={() => setEditingInvoice(null)} className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 rounded-lg text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: VIEW SPECIFICATIONS SHEET */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-6 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Project Ledger Audit</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">{selectedInvoice.id}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-md border text-slate-700">{selectedInvoice.status}</span>
              </div>
              <hr className="border-slate-100" />
              <div className="space-y-4">
                <div><label className="text-xs font-semibold text-slate-400 uppercase block">Client</label><p className="text-sm font-medium text-slate-800 mt-1">{selectedInvoice.clientName}</p></div>
                <div><label className="text-xs font-semibold text-slate-400 uppercase block">Site Location / Target</label><p className="text-sm font-medium text-slate-800 mt-1">{selectedInvoice.projectName}</p></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-slate-400 uppercase block">Drawing Deliverable</label><p className="text-sm font-medium text-slate-800 mt-1">{selectedInvoice.type}</p></div>
                  <div><label className="text-xs font-semibold text-slate-400 uppercase block">Deadlines</label><p className="text-sm font-medium text-slate-800 mt-1">{selectedInvoice.dueDate}</p></div>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <div><span className="text-xs text-slate-400 block uppercase">Total Quoted</span><span className="text-sm font-bold text-slate-800">{formatINR(selectedInvoice.totalAmount)}</span></div>
                  <div><span className="text-xs text-slate-400 block uppercase">Paid Advanced</span><span className="text-sm font-bold text-green-600">+{formatINR(selectedInvoice.paidAmount)}</span></div>
                  <div><span className="text-xs text-slate-400 block uppercase">Balance Due</span><span className="text-sm font-bold text-red-600">{formatINR(selectedInvoice.totalAmount - selectedInvoice.paidAmount)}</span></div>
                </div>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="w-full bg-slate-100 text-slate-700 font-medium py-2 rounded-lg text-sm">Close Overview</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}