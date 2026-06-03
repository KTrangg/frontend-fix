import { createContext, useContext, useState, ReactNode } from "react";
import {
  users, accountApprovals, teamMembers, events, tracks, rounds,
  judgeAssignments, mentorAssignments, teams, MOCK_CREDENTIALS,
  HackathonEvent,
} from "@/shared/mocks/mockData";

export interface AuthUser {
  user_id: number;
  full_name: string;
  email: string;
  role: 'PARTICIPANT' | 'MENTOR' | 'JUDGE' | 'COORDINATOR';
  student_type: 'FPT' | 'EXTERNAL' | null;
  is_leader: boolean;
  team_id: number | null;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  currentEvent: HackathonEvent | null;
  setCurrentEvent: (event: HackathonEvent) => void;
  login: (email: string, password: string) => 'ok' | 'invalid_credentials' | 'pending_approval';
  logout: () => void;
  switchUser: (userId: number) => void;
  updateLeaderStatus: (isLeader: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function buildAuthUser(userId: number): AuthUser | null {
  const user = users.find(u => u.user_id === userId);
  if (!user) return null;
  const membership = teamMembers.find(m => m.user_id === userId);
  return {
    user_id: user.user_id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    student_type: user.student_type,
    is_leader: membership?.is_leader ?? false,
    team_id: membership ? membership.team_id : null,
  };
}

function deriveDefaultEvent(userId: number, role: string, teamId: number | null): HackathonEvent | null {
  if (role === 'PARTICIPANT') {
    if (teamId === null) return null;
    const team = teams.find(t => t.team_id === teamId);
    if (!team) return null;
    const track = tracks.find(tr => tr.track_id === team.track_id);
    if (!track) return null;
    return events.find(e => e.event_id === track.event_id) ?? null;
  }
  if (role === 'MENTOR') {
    const assigned = mentorAssignments.filter(m => m.mentor_id === userId);
    const eventIds = new Set(
      tracks.filter(t => assigned.some(a => a.track_id === t.track_id)).map(t => t.event_id)
    );
    return events.find(e => eventIds.has(e.event_id)) ?? null;
  }
  if (role === 'JUDGE') {
    const assigned = judgeAssignments.filter(j => j.judge_id === userId);
    const eventIds = new Set(
      rounds.filter(r => assigned.some(a => a.round_id === r.round_id)).map(r => r.event_id)
    );
    return events.find(e => eventIds.has(e.event_id)) ?? null;
  }
  if (role === 'COORDINATOR') {
    // Most recent OPEN event first, fall back to any event
    return events.find(e => e.status === 'OPEN') ?? events[events.length - 1] ?? null;
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentEvent, setCurrentEvent] = useState<HackathonEvent | null>(null);

  function login(email: string, password: string): 'ok' | 'invalid_credentials' | 'pending_approval' {
    const userId = MOCK_CREDENTIALS[email.toLowerCase()];
    if (!userId || password !== "password") return 'invalid_credentials';
    const user = users.find(u => u.user_id === userId);
    if (!user) return 'invalid_credentials';
    if (user.status !== 'ACTIVE') return 'pending_approval';
    const approval = accountApprovals.find(a => a.user_id === userId);
    if (approval && approval.status === 'PENDING') return 'pending_approval';
    const authUser = buildAuthUser(userId);
    if (!authUser) return 'invalid_credentials';
    setCurrentUser(authUser);
    setCurrentEvent(deriveDefaultEvent(userId, user.role, authUser.team_id));
    return 'ok';
  }

  function logout() {
    setCurrentUser(null);
    setCurrentEvent(null);
  }

  function switchUser(userId: number) {
    const authUser = buildAuthUser(userId);
    if (!authUser) return;
    const user = users.find(u => u.user_id === userId);
    if (!user) return;
    setCurrentUser(authUser);
    setCurrentEvent(deriveDefaultEvent(userId, user.role, authUser.team_id));
  }

  function updateLeaderStatus(isLeader: boolean) {
    setCurrentUser(prev => prev ? { ...prev, is_leader: isLeader } : prev);
  }

  return (
    <AuthContext.Provider value={{
      currentUser, isAuthenticated: !!currentUser,
      currentEvent, setCurrentEvent,
      login, logout, switchUser, updateLeaderStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
