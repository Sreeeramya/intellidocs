"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  FlaskConical,
  FolderOpen,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Moon,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";

const nav = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/research", label: "Research Agent", icon: FlaskConical },
  { href: "/reports", label: "Reports", icon: BookOpen },
  { href: "/security", label: "Security", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [mobile, setMobile] = useState(false);
  return (
    <div className={dark ? "app-shell dark" : "app-shell"}>
      <aside className={`sidebar ${mobile ? "sidebar-open" : ""}`}>
        <Link href="/chat" className="brand">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>
            intelli<span className="brand-light">docs</span>
          </span>
        </Link>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobile(false)}
                className={`nav-link ${pathname === item.href ? "nav-active" : ""}`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {item.label}
                {item.label === "Documents" && (
                  <span className="nav-count">3</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="usage-card">
            <div className="usage-head">
              <span>Storage</span>
              <span>68%</span>
            </div>
            <div className="usage-track">
              <span />
            </div>
            <small>6.8 GB of 10 GB used</small>
            <Link href="/settings">
              Manage plan <ArrowUpRight size={12} />
            </Link>
          </div>
          <button className="profile">
            <div className="avatar">SR</div>
            <span className="profile-copy">
              <b>Sreeramya</b>
              <small>Personal workspace</small>
            </span>
            <MoreHorizontal size={18} />
          </button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobile(!mobile)}
          >
            <Menu size={19} />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <b>{nav.find((x) => x.href === pathname)?.label ?? "Chat"}</b>
          </div>
          <div className="top-actions">
            <span className="status-dot" />{" "}
            <span className="status-text">All systems operational</span>
            <button
              className="icon-button"
              aria-label={
                dark ? "Switch to light theme" : "Switch to dark theme"
              }
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="help-button">
              <CircleHelp size={16} /> Help
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
