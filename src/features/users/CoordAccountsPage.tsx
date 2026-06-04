import { useState } from "react";
import {
  C, GradientText, PixelCard, PixelButton, PixelBadge, PixelTabs,
} from "@/shared/components/PixelComponents";
import {
  accountApprovals as initialApprovals, users, AccountApproval,
} from "@/shared/mocks/mockData";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function CoordAccountsPage() {
  const [approvals, setApprovals] = useState<AccountApproval[]>(initialApprovals);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  const pendingCount = approvals.filter(a => a.status === 'PENDING').length;
  const approvedCount = approvals.filter(a => a.status === 'APPROVED').length;
  const rejectedCount = approvals.filter(a => a.status === 'REJECTED').length;

  const rows = approvals.filter(a => a.status === activeTab);

  function approve(id: number) {
    setApprovals(prev => prev.map(a => a.approval_id === id ? { ...a, status: 'APPROVED' } : a));
  }
  function confirmReject(id: number) {
    setApprovals(prev => prev.map(a => a.approval_id === id ? { ...a, status: 'REJECTED', note: rejectNote || "Rejected" } : a));
    setRejectingId(null);
    setRejectNote("");
  }

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 800 }}>
          <GradientText>Account Approvals</GradientText>
        </h1>
      </div>

      <PixelTabs
        tabs={[
          { id: "PENDING", label: `Pending (${pendingCount})` },
          { id: "APPROVED", label: `Approved (${approvedCount})` },
          { id: "REJECTED", label: `Rejected (${rejectedCount})` },
        ]}
        active={activeTab}
        onChange={(id) => setActiveTab(id as 'PENDING' | 'APPROVED' | 'REJECTED')}
      />

      <PixelCard style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'JetBrains Mono', monospace" }}>
            <thead>
              <tr style={{ background: C.surface2, borderBottom: `1px solid ${C.border}` }}>
                {["Full Name", "Email", "Role", "Student Type", "Student ID", "University", "Applied", "Actions"].map(h => (
                  <th key={h} style={{ color: C.green, fontSize: 10, letterSpacing: "0.12em", textAlign: "left", padding: "12px 14px", fontWeight: 600, textTransform: "uppercase" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={8} style={{ padding: 20, color: C.textMuted, fontSize: 12, textAlign: "center" }}>No records</td></tr>
              )}
              {rows.map((a, i) => {
                const u = users.find(uu => uu.user_id === a.user_id);
                if (!u) return null;
                return (
                  <tr key={a.approval_id} style={{ borderBottom: `1px solid rgba(34,197,94,0.06)`, background: i % 2 === 0 ? C.surface : C.surface2 }}>
                    <td style={{ color: C.text, fontSize: 12, padding: "12px 14px" }}>{u.full_name}</td>
                    <td style={{ color: C.textMuted, fontSize: 11, padding: "12px 14px" }}>{u.email}</td>
                    <td style={{ padding: "12px 14px" }}><PixelBadge color="blue">{u.role.replace("_", " ")}</PixelBadge></td>
                    <td style={{ padding: "12px 14px" }}>
                      {u.student_type && <PixelBadge color={u.student_type === 'FPT' ? 'green' : 'cyan'}>{u.student_type}</PixelBadge>}
                    </td>
                    <td style={{ color: C.textMuted, fontSize: 11, padding: "12px 14px" }}>{u.student_id ?? "—"}</td>
                    <td style={{ color: C.textMuted, fontSize: 11, padding: "12px 14px" }}>{u.university_name ?? "—"}</td>
                    <td style={{ color: C.textMuted, fontSize: 11, padding: "12px 14px" }}>{fmtDate(a.created_at)}</td>
                    <td style={{ padding: "12px 14px" }}>
                      {activeTab === 'PENDING' && rejectingId !== a.approval_id && (
                        <div style={{ display: "flex", gap: 6 }}>
                          <PixelButton size="sm" variant="cyber" onClick={() => approve(a.approval_id)}>APPROVE</PixelButton>
                          <PixelButton size="sm" variant="danger" onClick={() => setRejectingId(a.approval_id)}>REJECT</PixelButton>
                        </div>
                      )}
                      {rejectingId === a.approval_id && (
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <input value={rejectNote} onChange={(e) => setRejectNote(e.target.value)} placeholder="Reason..." style={{ padding: "4px 8px", background: C.surface2, border: `1px solid ${C.border}`, color: C.text, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, outline: "none", borderRadius: 0 }} />
                          <PixelButton size="sm" variant="danger" onClick={() => confirmReject(a.approval_id)}>CONFIRM</PixelButton>
                          <PixelButton size="sm" variant="ghost" onClick={() => setRejectingId(null)}>CANCEL</PixelButton>
                        </div>
                      )}
                      {activeTab === 'REJECTED' && a.note && (
                        <span style={{ color: C.red, fontSize: 11 }}>{a.note}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PixelCard>
    </div>
  );
}
