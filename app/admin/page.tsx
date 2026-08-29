"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LuSearch,
  LuRefreshCw,
  LuDownload,
  LuLogOut,
  LuLock,
  LuTrendingUp,
  LuUsers,
  LuCalendar,
  LuGlobe,
  LuMail,
  LuPhone,
  LuTrash2,
  LuExternalLink,
  LuCheck,
  LuCopy,
  LuMessageSquare,
  LuX,
  LuBuilding,
} from "react-icons/lu";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface Lead {
  id: string;
  name: string;
  work_email?: string;
  company_name: string;
  website: string | null;
  monthly_revenue_range: string;
  team_size: string;
  biggest_challenge: string;
  whatsapp_number: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rememberCreds, setRememberCreds] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [revenueFilter, setRevenueFilter] = useState("all");
  const [teamSizeFilter, setTeamSizeFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Prefetch home page and load local session + saved credentials on mount
  useEffect(() => {
    // Prefetch homepage for instant zero-latency exit
    router.prefetch("/");

    // Check active session
    const savedToken = localStorage.getItem("scalexpertz_admin_token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      setLoading(false);
    }
  }, [router]);

  // 2. Fetch leads from API
  const fetchLeads = useCallback(
    async (authToken: string, isSilent = false) => {
      if (!isSilent) setIsRefreshing(true);
      setDashboardError(null);
      try {
        const res = await fetch("/api/admin/leads", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("scalexpertz_admin_token");
          setToken(null);
          setAuthError("Session expired. Please log in again.");
          return;
        }

        const data = await res.json();
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        } else if (data.error) {
          setDashboardError(data.error);
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
        setDashboardError("Unable to fetch leads. Please check your network and Supabase configuration.");
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // 3. Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("scalexpertz_admin_token", data.token);

        // Store or clear credentials locally based on preference
        if (rememberCreds) {
          localStorage.setItem("scalexpertz_saved_username", usernameInput);
          localStorage.setItem("scalexpertz_saved_password", passwordInput);
          localStorage.setItem("scalexpertz_remember_creds", "true");
        } else {
          localStorage.removeItem("scalexpertz_saved_username");
          localStorage.removeItem("scalexpertz_saved_password");
          localStorage.setItem("scalexpertz_remember_creds", "false");
        }

        setToken(data.token);
        fetchLeads(data.token);
      } else {
        setAuthError(data.error || "Invalid credentials.");
      }
    } catch {
      setAuthError("Unable to authenticate. Check connection.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Instant exit to dashboard
  const handleLogout = () => {
    localStorage.removeItem("scalexpertz_admin_token");
    router.push("/");
  };

  // 4. Initial fetch & Realtime subscription
  useEffect(() => {
    if (!token) return;

    fetchLeads(token);

    // Setup Supabase Realtime channel
    const channel = supabase
      .channel("admin-realtime-leads")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "founder_growth_leads" },
        () => {
          fetchLeads(token, true);
        }
      )
      .subscribe();

    // 6-second polling fallback
    const interval = setInterval(() => {
      fetchLeads(token, true);
    }, 6000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [token, fetchLeads]);

  // 5. Delete lead
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete lead for "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      } else {
        alert("Failed to delete lead");
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // 6. Copy lead data to clipboard
  const handleCopyLead = (lead: Lead) => {
    const text = `ScaleXpertz Lead:
Name: ${lead.name}
Email: ${lead.work_email || "N/A"}
Company: ${lead.company_name}
Website: ${lead.website || "N/A"}
WhatsApp: ${lead.whatsapp_number}
Monthly Revenue: ${lead.monthly_revenue_range}
Team Size: ${lead.team_size}
Challenge: ${lead.biggest_challenge}
Date: ${new Date(lead.created_at).toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 7. Export leads to native Excel (.xlsx) with auto-fitted column widths
  const handleExportExcel = () => {
    if (!leads.length) return;

    // Prepare clean tabular data for Excel
    const excelData = filteredLeads.map((l) => {
      const formattedDate = new Date(l.created_at).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      return {
        "Lead ID": l.id,
        "Submission Date": formattedDate,
        "Founder Name": l.name || "",
        "Work Email": l.work_email || "N/A",
        "Company Name": l.company_name || "",
        "Website / Social Link": l.website || "N/A",
        "WhatsApp Number": l.whatsapp_number ? `${l.whatsapp_number}` : "",
        "Monthly Revenue Range": l.monthly_revenue_range || "",
        "Team Size": l.team_size || "",
        "Growth Bottleneck / Challenge": (l.biggest_challenge || "").replace(/[\r\n]+/g, " "),
      };
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set auto-fitted generous column widths so data never cuts off in Excel
    worksheet["!cols"] = [
      { wch: 38 }, // Lead ID
      { wch: 24 }, // Submission Date
      { wch: 22 }, // Founder Name
      { wch: 28 }, // Work Email
      { wch: 24 }, // Company Name
      { wch: 26 }, // Website URL
      { wch: 20 }, // WhatsApp Number
      { wch: 28 }, // Monthly Revenue Range
      { wch: 18 }, // Team Size
      { wch: 55 }, // Growth Bottleneck / Challenge
    ];

    // Create workbook and append sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ScaleXpertz Leads");

    // Write file directly as standard .xlsx
    XLSX.writeFile(
      workbook,
      `ScaleXpertz_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  // 8. Filters & Search computation
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lead.name?.toLowerCase().includes(q) ||
        lead.work_email?.toLowerCase().includes(q) ||
        lead.company_name?.toLowerCase().includes(q) ||
        lead.whatsapp_number?.toLowerCase().includes(q) ||
        lead.biggest_challenge?.toLowerCase().includes(q);

      const matchesRevenue =
        revenueFilter === "all" ||
        lead.monthly_revenue_range?.toLowerCase().includes(revenueFilter.toLowerCase());

      const matchesTeam =
        teamSizeFilter === "all" ||
        lead.team_size?.toLowerCase().includes(teamSizeFilter.toLowerCase());

      return matchesSearch && matchesRevenue && matchesTeam;
    });
  }, [leads, searchQuery, revenueFilter, teamSizeFilter]);

  // 9. Quick KPI counts
  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todayCount = leads.filter(
      (l) => new Date(l.created_at).toDateString() === today
    ).length;

    const highRevenueCount = leads.filter(
      (l) =>
        l.monthly_revenue_range?.includes("50L") ||
        l.monthly_revenue_range?.includes("1.5 Crore") ||
        l.monthly_revenue_range?.includes("180K")
    ).length;

    return {
      total: leads.length,
      today: todayCount,
      highRevenue: highRevenueCount,
    };
  }, [leads]);

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-[#f8f9fc] dark:bg-[#0a0a0d] p-4 text-slate-900 dark:text-white transition-colors duration-300 relative">
        {/* Top right theme toggle */}
        <div className="absolute top-5 right-5">
          <ThemeToggle />
        </div>

        <div className="relative w-full max-w-md overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-b from-accent/50 via-amber/40 to-pink-500/40 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
          <div className="relative rounded-[22.5px] bg-white/95 dark:bg-[#121217]/95 p-8 sm:p-10 backdrop-blur-2xl text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/15 text-accent shadow-inner">
              <LuLock size={26} />
            </div>

            <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              ScaleXpertz Admin
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              Enter your credentials to access founder growth diagnosis leads.
            </p>

            <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4 text-left">
              <label className="grid gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber font-bold">
                  Username
                </span>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter username..."
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber font-bold">
                  Password
                </span>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all"
                />
              </label>

              {/* Remember credentials checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberCreds}
                  onChange={(e) => setRememberCreds(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-amber focus:ring-amber accent-amber cursor-pointer"
                />
                <span>Remember credentials on this device</span>
              </label>

              {authError && (
                <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2.5 text-center">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent via-amber to-pink-500 py-3 text-sm font-extrabold text-ink shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {authLoading ? (
                  <LuRefreshCw className="animate-spin" size={16} />
                ) : (
                  <span>Access Dashboard &rarr;</span>
                )}
              </button>

              <div className="mt-2 text-center">
                <Link
                  href="/"
                  className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  &larr; Back to Website
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD SCREEN
  return (
    <div className="min-h-dvh bg-[#f8f9fc] dark:bg-[#09090b] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#111115]/90 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-amber transition-colors"
            >
              ScaleXpertz<span className="text-accent">.</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <button
              onClick={() => fetchLeads(token)}
              disabled={isRefreshing}
              title="Refresh leads"
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <LuRefreshCw className={isRefreshing ? "animate-spin text-amber" : ""} size={13} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportExcel}
              disabled={!leads.length}
              title="Download Excel Workbook (.xlsx)"
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/15 px-3 py-1.5 text-xs font-bold text-amber hover:bg-accent/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <LuDownload size={13} />
              <span>Export Excel (.xlsx)</span>
            </button>

            <button
              onClick={handleLogout}
              title="Log out"
              className="inline-flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all cursor-pointer"
            >
              <LuLogOut size={13} />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {dashboardError && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-500 dark:text-rose-400 font-medium flex items-center justify-between gap-3">
            <span>{dashboardError}</span>
            <button
              onClick={() => fetchLeads(token)}
              className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#131318] p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono font-medium">
              <span>TOTAL INQUIRIES</span>
              <LuUsers className="text-accent" size={16} />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.total}
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">All submitted leads</div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#131318] p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono font-medium">
              <span>TODAY&apos;S LEADS</span>
              <LuCalendar className="text-emerald-500 dark:text-emerald-400" size={16} />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {stats.today}
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Received today</div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#131318] p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-mono font-medium">
              <span>HIGH REVENUE LEADS</span>
              <LuTrendingUp className="text-pink-500 dark:text-pink-400" size={16} />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-pink-600 dark:text-pink-400">
              {stats.highRevenue}
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">₹50L+ / $60K+ monthly</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#131318] p-3 sm:p-4 shadow-sm">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, email, WhatsApp, bottleneck..."
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/40 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={revenueFilter}
              onChange={(e) => setRevenueFilter(e.target.value)}
              className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/40 px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-amber cursor-pointer"
            >
              <option value="all" className="bg-white dark:bg-[#181822]">All Revenue Tiers</option>
              <option value="Pre-revenue" className="bg-white dark:bg-[#181822]">Pre-revenue</option>
              <option value="5 Lakhs" className="bg-white dark:bg-[#181822]">&lt; ₹5L</option>
              <option value="15 Lakhs" className="bg-white dark:bg-[#181822]">₹5L – ₹15L</option>
              <option value="50 Lakhs" className="bg-white dark:bg-[#181822]">₹15L – ₹50L</option>
              <option value="1.5 Crore" className="bg-white dark:bg-[#181822]">₹50L – ₹1.5Cr</option>
              <option value="1.5 Crore+" className="bg-white dark:bg-[#181822]">₹1.5Cr+</option>
            </select>

            <select
              value={teamSizeFilter}
              onChange={(e) => setTeamSizeFilter(e.target.value)}
              className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/40 px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-amber cursor-pointer"
            >
              <option value="all" className="bg-white dark:bg-[#181822]">All Team Sizes</option>
              <option value="Solo" className="bg-white dark:bg-[#181822]">Solo</option>
              <option value="2 – 5" className="bg-white dark:bg-[#181822]">2–5</option>
              <option value="6 – 15" className="bg-white dark:bg-[#181822]">6–15</option>
              <option value="16 – 50" className="bg-white dark:bg-[#181822]">16–50</option>
              <option value="50+" className="bg-white dark:bg-[#181822]">50+</option>
            </select>
          </div>
        </div>

        {/* Leads Table Container */}
        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#131318] shadow-card">
          <div className="border-b border-black/10 dark:border-white/10 px-5 py-3.5 flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Assessment Submissions</span>
              <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-xs text-amber font-mono font-bold">
                {filteredLeads.length}
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <LuRefreshCw className="animate-spin text-accent" size={28} />
              <p className="text-xs font-mono tracking-wider">Loading leads from Supabase...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-slate-400 mb-3">
                <LuUsers size={24} />
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">No submissions found</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                {searchQuery || revenueFilter !== "all" || teamSizeFilter !== "all"
                  ? "Try clearing your search filters to see all recorded entries."
                  : "Leads submitted via the Founder Growth Diagnosis form will appear here in real-time."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="border-b border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Founder &amp; Company</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Revenue / Team</th>
                    <th className="px-4 py-3">Growth Bottleneck</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium">
                  {filteredLeads.map((lead) => {
                    const cleanPhone = (lead.whatsapp_number || "").replace(/\D/g, "");
                    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hi ${lead.name}, this is from ScaleXpertz regarding your Founder Growth Diagnosis assessment for ${lead.company_name}!`
                    )}`;

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                      >
                        {/* Founder & Company */}
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber transition-colors">
                            {lead.name}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <LuBuilding size={12} className="text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{lead.company_name}</span>
                            {lead.website && (
                              <a
                                href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title={lead.website}
                                className="inline-flex items-center text-accent hover:underline ml-1"
                              >
                                <LuGlobe size={11} className="mr-0.5" />
                                <LuExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          {lead.work_email && (
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                              <LuMail size={12} className="text-slate-400 shrink-0" />
                              <a
                                href={`mailto:${lead.work_email}`}
                                className="hover:text-amber transition-colors truncate max-w-[180px]"
                              >
                                {lead.work_email}
                              </a>
                            </div>
                          )}
                          <div className="mt-1 flex items-center gap-1.5">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition-all"
                            >
                              <LuPhone size={10} />
                              <span>{lead.whatsapp_number}</span>
                            </a>
                          </div>
                        </td>

                        {/* Revenue & Team Size */}
                        <td className="px-4 py-3.5">
                          <span className="inline-block rounded-md border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[11px] font-bold text-pink-700 dark:text-pink-300">
                            {lead.monthly_revenue_range}
                          </span>
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <LuUsers size={11} />
                            <span>{lead.team_size}</span>
                          </div>
                        </td>

                        {/* Bottleneck Summary */}
                        <td className="px-4 py-3.5 max-w-xs">
                          <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {lead.biggest_challenge}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                          {new Date(lead.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleCopyLead(lead)}
                              title="Copy lead info"
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                            >
                              {copiedId === lead.id ? (
                                <LuCheck size={14} className="text-emerald-500 dark:text-emerald-400" />
                              ) : (
                                <LuCopy size={14} />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id, lead.name)}
                              title="Delete submission"
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-500/15 hover:text-rose-500 dark:hover:text-rose-400 transition-all cursor-pointer"
                            >
                              <LuTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detailed Lead Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#14141a] p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber font-bold">
                  Lead Details
                </span>
                <h3 className="mt-0.5 font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedLead.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedLead.company_name}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              >
                <LuX size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Work Email
                  </span>
                  <div className="mt-1 font-semibold text-slate-900 dark:text-white truncate">
                    {selectedLead.work_email || "N/A"}
                  </div>
                </div>

                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    WhatsApp
                  </span>
                  <div className="mt-1 font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                    {selectedLead.whatsapp_number}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Monthly Revenue
                  </span>
                  <div className="mt-1 font-semibold text-pink-600 dark:text-pink-300">
                    {selectedLead.monthly_revenue_range}
                  </div>
                </div>

                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Team Size
                  </span>
                  <div className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {selectedLead.team_size}
                  </div>
                </div>
              </div>

              {selectedLead.website && (
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Website / Social Link
                  </span>
                  <div className="mt-1">
                    <a
                      href={selectedLead.website.startsWith("http") ? selectedLead.website : `https://${selectedLead.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline flex items-center gap-1 font-semibold"
                    >
                      {selectedLead.website}
                      <LuExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-3.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber font-bold">
                  Primary Growth Challenge / Bottleneck
                </span>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.biggest_challenge}
                </p>
              </div>

              <div className="flex items-center justify-end text-[11px] font-mono text-slate-400 pt-2">
                <span>
                  Submitted: {new Date(selectedLead.created_at).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 pt-2 border-t border-black/10 dark:border-white/10">
              <a
                href={`https://wa.me/${(selectedLead.whatsapp_number || "").replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Hi ${selectedLead.name}, this is from ScaleXpertz regarding your Founder Growth Diagnosis assessment for ${selectedLead.company_name}!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md"
              >
                <LuMessageSquare size={14} />
                <span>Open WhatsApp Chat</span>
              </a>

              <button
                onClick={() => handleCopyLead(selectedLead)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.04] dark:bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition-all cursor-pointer"
              >
                {copiedId === selectedLead.id ? (
                  <>
                    <LuCheck size={14} className="text-emerald-500 dark:text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <LuCopy size={14} />
                    <span>Copy All</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
