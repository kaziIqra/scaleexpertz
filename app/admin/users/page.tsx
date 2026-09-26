"use client";

import { useCallback, useEffect, useState } from "react";
import { LuPlus, LuRefreshCw, LuTrash2, LuX, LuKeyRound, LuUserCheck, LuUserX, LuShieldCheck, LuLock } from "react-icons/lu";
import AdminHeader, { adminBtnClass, adminAccentBtnClass } from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { cardClass, chipClass, inputClass, labelClass, primaryBtnClass, dangerBtnClass } from "@/components/admin/ui";

interface UserRow {
  id: string;
  username: string;
  display_name: string;
  role: "owner" | "admin";
  is_active: boolean;
  created_by: string | null;
  created_at: string | null;
  last_login_at: string | null;
  builtin?: boolean;
}

export default function UsersPage() {
  const { authFetch, user: me } = useAdminAuth();
  const isOwner = me.role === "owner";

  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ username: "", display_name: "", password: "", role: "admin" as "owner" | "admin" });
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2600);
  };

  const load = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await authFetch("/api/admin/users");
      if (res.status === 401) return;
      const data = await res.json();
      if (data.success) setUsers(data.users);
      else setError(data.error || "Could not load users");
    } catch {
      setError("Unable to load users.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authFetch]);

  useEffect(() => {
    const t = setTimeout(() => load(), 0);
    return () => clearTimeout(t);
  }, [load]);

  const submit = async () => {
    setSubmitting(true);
    setCreateError(null);
    try {
      const res = await authFetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setCreating(false);
        setForm({ username: "", display_name: "", password: "", role: "admin" });
        showToast(`User ${data.user.username} created`);
        load();
      } else setCreateError(data.error || "Could not create user.");
    } catch {
      setCreateError("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const patch = async (u: UserRow, body: Record<string, unknown>, okMsg: string) => {
    const res = await authFetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      showToast(okMsg);
      load();
    } else alert(data.error || "Update failed");
  };

  const resetPassword = (u: UserRow) => {
    const pw = prompt(`New password for ${u.username} (min 8 chars):`);
    if (!pw) return;
    patch(u, { password: pw }, "Password updated");
  };

  const remove = async (u: UserRow) => {
    if (!confirm(`Delete user "${u.username}"? They will no longer be able to log in.`)) return;
    const res = await authFetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      showToast("User deleted");
      load();
    } else alert(data.error || "Delete failed");
  };

  const fmt = (d: string | null) => (d ? new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—");

  return (
    <div className="min-h-dvh bg-[#f8f9fc] dark:bg-[#09090b] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <AdminHeader
        actions={
          <>
            <button onClick={load} disabled={refreshing} className={adminBtnClass}>
              <LuRefreshCw className={refreshing ? "animate-spin text-amber" : ""} size={13} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            {isOwner ? (
              <button onClick={() => setCreating(true)} className={adminAccentBtnClass}>
                <LuPlus size={13} />
                <span>Add user</span>
              </button>
            ) : null}
          </>
        }
      />

      <main className="mx-auto max-w-5xl px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {error && <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-500 font-medium">{error}</div>}

        {!isOwner ? (
          <div className="rounded-2xl border border-amber/40 bg-accent/10 p-4 text-xs text-amber font-medium">
            You are signed in as an admin. Only owners can add, edit or remove users.
          </div>
        ) : null}

        <div className={`${cardClass} overflow-hidden`}>
          <div className="border-b border-black/10 dark:border-white/10 px-5 py-3.5 flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Admin Users</span>
              <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-xs text-amber font-mono font-bold">{users.length}</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Owners manage users and everything else. Admins manage leads, audits and templates.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <LuRefreshCw className="animate-spin text-accent" size={28} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="border-b border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last login</th>
                    <th className="px-4 py-3">Added</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium">
                  {users.map((u) => {
                    const self = u.id === me.id || (u.builtin && me.id === "env-owner");
                    return (
                      <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                            {u.display_name}
                            {self ? <span className={chipClass("gold")}>you</span> : null}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">@{u.username}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={chipClass(u.role === "owner" ? "gold" : "grey")}>
                            <span className="inline-flex items-center gap-1">
                              {u.role === "owner" ? <LuShieldCheck size={10} /> : null}
                              {u.role}
                            </span>
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          {u.builtin ? (
                            <span className={chipClass("grey")}>
                              <span className="inline-flex items-center gap-1">
                                <LuLock size={9} /> env
                              </span>
                            </span>
                          ) : (
                            <span className={chipClass(u.is_active ? "green" : "grey")}>{u.is_active ? "Active" : "Disabled"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-[11px] font-mono text-slate-500 dark:text-slate-400">{fmt(u.last_login_at)}</td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-[11px] text-slate-500 dark:text-slate-400">
                          {u.builtin ? "from .env" : (
                            <>
                              {fmt(u.created_at)}
                              {u.created_by ? <span className="text-slate-400"> · by {u.created_by}</span> : null}
                            </>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          {u.builtin ? (
                            <span className="text-[10px] text-slate-400">managed via env vars</span>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              {(isOwner || self) ? (
                                <button onClick={() => resetPassword(u)} title="Reset password" className={`${dangerBtnClass} hover:text-amber hover:bg-accent/10`}>
                                  <LuKeyRound size={14} />
                                </button>
                              ) : null}
                              {isOwner && !self ? (
                                <>
                                  <button
                                    onClick={() => patch(u, { role: u.role === "owner" ? "admin" : "owner" }, "Role updated")}
                                    title={u.role === "owner" ? "Demote to admin" : "Promote to owner"}
                                    className={`${dangerBtnClass} hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10`}
                                  >
                                    <LuShieldCheck size={14} />
                                  </button>
                                  <button
                                    onClick={() => patch(u, { is_active: !u.is_active }, u.is_active ? "User disabled" : "User enabled")}
                                    title={u.is_active ? "Disable login" : "Enable login"}
                                    className={`${dangerBtnClass} hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10`}
                                  >
                                    {u.is_active ? <LuUserX size={14} /> : <LuUserCheck size={14} />}
                                  </button>
                                  <button onClick={() => remove(u)} title="Delete user" className={dangerBtnClass}>
                                    <LuTrash2 size={14} />
                                  </button>
                                </>
                              ) : null}
                            </div>
                          )}
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

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => !submitting && setCreating(false)}>
          <div className="relative w-full max-w-md rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#14141a] p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className={labelClass}>New admin user</span>
                <h3 className="mt-0.5 font-display text-xl font-bold">Add user</h3>
              </div>
              <button onClick={() => setCreating(false)} className="rounded-full p-2 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                <LuX size={18} />
              </button>
            </div>
            <form
              className="mt-5 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <label className="grid gap-1.5">
                <span className={labelClass}>Username *</span>
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, "") })}
                  placeholder="e.g. priya.s"
                  autoComplete="off"
                  className={`${inputClass} font-mono`}
                  required
                />
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>Display name</span>
                <input value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} placeholder="Priya Sharma" className={inputClass} />
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>Password * (min 8)</span>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="new-password" className={inputClass} required minLength={8} />
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>Role</span>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "owner" | "admin" })} className={inputClass}>
                  <option value="admin">Admin — leads, audits, templates</option>
                  <option value="owner">Owner — everything incl. users</option>
                </select>
              </label>
              {createError && <p className="text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2.5">{createError}</p>}
              <button type="submit" disabled={submitting} className={primaryBtnClass}>
                {submitting ? <LuRefreshCw className="animate-spin" size={14} /> : <span>Create user &rarr;</span>}
              </button>
            </form>
          </div>
        </div>
      )}

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2.5 text-xs font-semibold text-white dark:text-slate-900 shadow-xl">{toast}</div>
      ) : null}
    </div>
  );
}
