import { useState } from "react";

const G = {
  bg: "#0b1219",
  surface: "#111c27",
  card: "#162030",
  border: "rgba(255,255,255,0.06)",
  borderGold: "rgba(201,168,76,0.25)",
  gold: "#c9a84c",
  goldLight: "#e8c96b",
  white: "#f0ece3",
  muted: "#6b7f95",
  success: "#3cb47a",
  warning: "#d97e35",
  danger: "#d44f4f",
  info: "#4a8fd4",
  text: "#dde4ed",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'IBM Plex Sans',sans-serif;background:${G.bg};color:${G.text};min-height:100vh;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px;}
::-webkit-scrollbar-track{background:transparent;}
.admin-shell{display:flex;height:100vh;overflow:hidden;}
.sidebar{width:220px;flex-shrink:0;background:${G.surface};border-right:1px solid ${G.border};display:flex;flex-direction:column;overflow:hidden;}
.sidebar-logo{padding:20px 18px 14px;border-bottom:1px solid ${G.border};}
.logo-top{display:flex;align-items:center;gap:10px;margin-bottom:2px;}
.logo-badge{width:32px;height:32px;background:linear-gradient(135deg,${G.gold},${G.goldLight});border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:16px;color:${G.bg};}
.logo-name{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:${G.white};line-height:1.1;}
.logo-sub{font-size:10px;color:${G.gold};letter-spacing:0.1em;text-transform:uppercase;font-weight:500;margin-top:2px;}
.logo-addr{font-size:10px;color:${G.muted};margin-top:4px;}
.nav-section{padding:12px 10px 4px;font-size:9px;color:${G.muted};text-transform:uppercase;letter-spacing:0.12em;font-weight:600;}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;margin:1px 8px;cursor:pointer;transition:all 0.18s;font-size:13px;font-weight:400;color:${G.muted};}
.nav-item:hover{background:rgba(255,255,255,0.04);color:${G.text};}
.nav-item.active{background:rgba(201,168,76,0.1);color:${G.gold};}
.nav-item .ni-icon{font-size:16px;width:20px;text-align:center;flex-shrink:0;}
.nav-badge{margin-left:auto;background:${G.danger};color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:10px;line-height:1.5;}
.nav-badge.gold{background:rgba(201,168,76,0.2);color:${G.gold};}
.sidebar-footer{margin-top:auto;border-top:1px solid ${G.border};padding:14px 18px;}
.admin-info{display:flex;align-items:center;gap:10px;}
.admin-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#2d4a6e,#1a3050);border:1.5px solid rgba(201,168,76,0.3);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:${G.gold};}
.admin-name{font-size:12px;font-weight:500;color:${G.white};line-height:1.2;}
.admin-role{font-size:10px;color:${G.muted};}
.main{flex:1;overflow-y:auto;display:flex;flex-direction:column;}
.topbar{padding:16px 24px;border-bottom:1px solid ${G.border};display:flex;align-items:center;justify-content:space-between;flex-shrink:0;background:${G.surface};}
.page-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:${G.white};}
.page-sub{font-size:11px;color:${G.muted};margin-top:2px;}
.topbar-actions{display:flex;align-items:center;gap:10px;}
.tb-btn{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.18s;font-family:'IBM Plex Sans',sans-serif;border:none;}
.tb-btn.ghost{background:transparent;border:1px solid ${G.border};color:${G.muted};}
.tb-btn.ghost:hover{border-color:rgba(255,255,255,0.15);color:${G.text};}
.tb-btn.primary{background:linear-gradient(135deg,${G.gold},${G.goldLight});color:${G.bg};font-weight:600;box-shadow:0 3px 10px rgba(201,168,76,0.25);}
.tb-btn.primary:hover{transform:translateY(-1px);box-shadow:0 5px 14px rgba(201,168,76,0.35);}
.tb-btn.danger{background:rgba(212,79,79,0.12);border:1px solid rgba(212,79,79,0.25);color:#f08080;}
.body-pad{padding:20px 24px;flex:1;}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px;}
.stat-card{background:${G.card};border:1px solid ${G.border};border-radius:12px;padding:16px;position:relative;overflow:hidden;}
.stat-card::after{content:'';position:absolute;top:-20px;right:-20px;width:60px;height:60px;border-radius:50%;opacity:0.06;}
.stat-card.s-gold::after{background:${G.gold};}
.stat-card.s-green::after{background:${G.success};}
.stat-card.s-red::after{background:${G.danger};}
.stat-card.s-blue::after{background:${G.info};}
.stat-icon{font-size:18px;margin-bottom:10px;display:block;}
.stat-label{font-size:10px;color:${G.muted};text-transform:uppercase;letter-spacing:0.1em;font-weight:600;margin-bottom:5px;}
.stat-val{font-family:'Syne',sans-serif;font-size:26px;font-weight:700;color:${G.white};line-height:1;margin-bottom:6px;}
.stat-note{font-size:11px;color:${G.muted};}
.stat-note.green{color:${G.success};}
.stat-note.red{color:${G.danger};}
.two-col{display:grid;grid-template-columns:1.6fr 1fr;gap:14px;margin-bottom:20px;}
.section-card{background:${G.card};border:1px solid ${G.border};border-radius:12px;overflow:hidden;}
.sc-head{padding:14px 16px;border-bottom:1px solid ${G.border};display:flex;align-items:center;justify-content:space-between;}
.sc-title{font-size:13px;font-weight:600;color:${G.white};font-family:'Syne',sans-serif;}
.sc-link{font-size:11px;color:${G.gold};cursor:pointer;font-weight:500;}
.pay-row-item{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.03);transition:background 0.15s;cursor:pointer;}
.pay-row-item:hover{background:rgba(255,255,255,0.02);}
.pay-row-item:last-child{border-bottom:none;}
.pri-name{font-size:13px;color:${G.text};font-weight:500;}
.pri-unit{font-size:11px;color:${G.muted};margin-top:1px;}
.pri-amount{font-size:13px;font-weight:600;color:${G.white};}
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;}
.badge.paid{background:rgba(60,180,122,0.12);color:${G.success};}
.badge.pending{background:rgba(217,126,53,0.12);color:${G.warning};}
.badge.late{background:rgba(212,79,79,0.12);color:${G.danger};}
.badge.open{background:rgba(74,143,212,0.12);color:${G.info};}
.badge.progress{background:rgba(201,168,76,0.1);color:${G.gold};}
.badge.done{background:rgba(60,180,122,0.12);color:${G.success};}
.ticket-row{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.03);cursor:pointer;transition:background 0.15s;}
.ticket-row:hover{background:rgba(255,255,255,0.02);}
.ticket-row:last-child{border-bottom:none;}
.tr-icon{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;margin-right:10px;}
.tr-title{font-size:12px;color:${G.text};font-weight:500;}
.tr-meta{font-size:11px;color:${G.muted};margin-top:1px;}
.unit-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(68px,1fr));gap:8px;padding:16px;}
.unit-box{border-radius:8px;padding:8px 6px;text-align:center;cursor:pointer;transition:all 0.18s;border:1px solid transparent;}
.unit-box:hover{transform:translateY(-1px);}
.unit-box.occupied{background:rgba(60,180,122,0.08);border-color:rgba(60,180,122,0.2);}
.unit-box.vacant{background:rgba(212,79,79,0.08);border-color:rgba(212,79,79,0.15);}
.unit-box.notice{background:rgba(217,126,53,0.08);border-color:rgba(217,126,53,0.2);}
.unit-box.maintenance{background:rgba(201,168,76,0.06);border-color:rgba(201,168,76,0.2);}
.unit-num{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;margin-bottom:3px;}
.unit-box.occupied .unit-num{color:${G.success};}
.unit-box.vacant .unit-num{color:${G.danger};}
.unit-box.notice .unit-num{color:${G.warning};}
.unit-box.maintenance .unit-num{color:${G.gold};}
.unit-status{font-size:9px;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;}
.unit-box.occupied .unit-status{color:rgba(60,180,122,0.7);}
.unit-box.vacant .unit-status{color:rgba(212,79,79,0.7);}
.unit-box.notice .unit-status{color:rgba(217,126,53,0.7);}
.unit-box.maintenance .unit-status{color:rgba(201,168,76,0.7);}
.legend-row{display:flex;gap:16px;padding:0 16px 14px;flex-wrap:wrap;}
.legend-item{display:flex;align-items:center;gap:6px;font-size:11px;color:${G.muted};}
.leg-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.table-wrap{overflow-x:auto;}
table{width:100%;border-collapse:collapse;}
thead th{padding:10px 16px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:${G.muted};font-weight:600;border-bottom:1px solid ${G.border};white-space:nowrap;}
tbody tr{border-bottom:1px solid rgba(255,255,255,0.03);cursor:pointer;transition:background 0.15s;}
tbody tr:hover{background:rgba(255,255,255,0.02);}
tbody tr:last-child{border-bottom:none;}
tbody td{padding:11px 16px;font-size:13px;color:${G.text};}
tbody td.muted{color:${G.muted};font-size:12px;}
.input-field{background:rgba(255,255,255,0.04);border:1px solid ${G.border};border-radius:8px;padding:9px 12px;font-size:13px;color:${G.text};font-family:'IBM Plex Sans',sans-serif;outline:none;transition:border-color 0.18s;width:100%;}
.input-field:focus{border-color:rgba(201,168,76,0.4);}
.input-label{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;color:${G.muted};margin-bottom:6px;display:block;}
.form-group{margin-bottom:14px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.broadcast-types{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px;}
.bt-chip{border:1px solid ${G.border};border-radius:8px;padding:10px;text-align:center;cursor:pointer;transition:all 0.18s;background:transparent;}
.bt-chip.sel{border-color:rgba(201,168,76,0.4);background:rgba(201,168,76,0.07);}
.bt-chip .bc-icon{font-size:20px;display:block;margin-bottom:4px;}
.bt-chip .bc-label{font-size:11px;color:${G.muted};font-weight:500;}
.bt-chip.sel .bc-label{color:${G.gold};}
.recipient-list{background:rgba(255,255,255,0.03);border:1px solid ${G.border};border-radius:8px;padding:12px;margin-bottom:14px;}
.rec-item{display:flex;align-items:center;justify-content:space-between;padding:6px 0;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.04);}
.rec-item:last-child{border-bottom:none;}
.rec-item label{display:flex;align-items:center;gap:8px;cursor:pointer;color:${G.text};}
.rec-item input[type=checkbox]{accent-color:${G.gold};width:14px;height:14px;}
.donut-wrap{padding:16px;display:flex;align-items:center;gap:20px;}
.donut-svg{flex-shrink:0;}
.donut-legend{display:flex;flex-direction:column;gap:10px;}
.dl-item{display:flex;align-items:center;gap:8px;font-size:12px;}
.dl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
.dl-label{color:${G.muted};flex:1;}
.dl-val{font-weight:600;color:${G.white};}
.occ-bar{height:6px;border-radius:3px;background:rgba(255,255,255,0.06);margin-bottom:12px;overflow:hidden;}
.occ-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,${G.success},rgba(60,180,122,0.6));}
.rev-bar-wrap{padding:16px;}
.rev-month{display:flex;align-items:center;gap:10px;margin-bottom:9px;}
.rev-mo-label{font-size:11px;color:${G.muted};width:28px;flex-shrink:0;}
.rev-bar-bg{flex:1;background:rgba(255,255,255,0.05);border-radius:3px;height:6px;overflow:hidden;}
.rev-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,${G.gold},${G.goldLight});}
.rev-amount{font-size:11px;color:${G.text};width:54px;text-align:right;flex-shrink:0;}
.modal-backdrop{position:fixed;inset:0;background:rgba(5,10,16,0.8);z-index:200;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);}
.modal-box{background:${G.surface};border:1px solid rgba(201,168,76,0.2);border-radius:16px;padding:24px;width:420px;max-height:85vh;overflow-y:auto;}
.modal-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:${G.white};margin-bottom:4px;}
.modal-sub{font-size:12px;color:${G.muted};margin-bottom:20px;}
.modal-actions{display:flex;gap:10px;margin-top:18px;}
.modal-actions .tb-btn{flex:1;justify-content:center;padding:10px;}
.pill{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500;}
.pill.active{background:rgba(60,180,122,0.1);color:${G.success};border:1px solid rgba(60,180,122,0.2);}
.pill.inactive{background:rgba(212,79,79,0.1);color:${G.danger};border:1px solid rgba(212,79,79,0.2);}
select.input-field{cursor:pointer;}
textarea.input-field{resize:none;height:90px;}
.activity-item{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.03);}
.activity-item:last-child{border-bottom:none;}
.act-icon{width:30px;height:30px;border-radius:7px;background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;margin-top:1px;}
.act-text{font-size:12px;color:${G.text};line-height:1.4;}
.act-time{font-size:10px;color:${G.muted};margin-top:2px;}
`;

const units = Array.from({ length: 47 }, (_, i) => {
  const n = i + 1;
  const rand = (n * 7 + 13) % 10;
  const s = rand < 7 ? "occupied" : rand < 8 ? "vacant" : rand < 9 ? "notice" : "maintenance";
  const labels = { occupied: "Leased", vacant: "Vacant", notice: "Notice", maintenance: "Maint" };
  return { num: n <= 9 ? `0${n}` : `${n}`, status: s, label: labels[s] };
});

const payments = [
  { name: "Marcus Webb", unit: "Unit 07", amount: "$875", status: "paid", date: "May 1" },
  { name: "Denise Carter", unit: "Unit 12", amount: "$910", status: "paid", date: "May 1" },
  { name: "Jordan Davis", unit: "Unit 14B", amount: "$875", status: "pending", date: "Due Jun 1" },
  { name: "Tamara Ellis", unit: "Unit 22", amount: "$850", status: "late", date: "Apr — 8 days" },
  { name: "Reginald Moon", unit: "Unit 31", amount: "$960", status: "paid", date: "May 2" },
  { name: "Cynthia Park", unit: "Unit 38", amount: "$875", status: "pending", date: "Due Jun 1" },
];

const tickets = [
  { icon: "🚰", title: "Kitchen faucet dripping", unit: "Unit 14B", prio: "medium", status: "progress", date: "Apr 29" },
  { icon: "⚡", title: "Outlet cover broken", unit: "Unit 22", prio: "low", status: "open", date: "May 1" },
  { icon: "❄️", title: "AC not cooling", unit: "Unit 05", prio: "high", status: "open", date: "May 3" },
  { icon: "🚪", title: "Front door alignment", unit: "Unit 33", prio: "low", status: "done", date: "Apr 20" },
  { icon: "🐛", title: "Pest sighting — kitchen", unit: "Unit 09", prio: "high", status: "open", date: "May 4" },
];

const tenants = [
  { name: "Marcus Webb", unit: "07", rent: "$875", lease: "Jan–Dec 2025", status: "active", email: "m.webb@email.com" },
  { name: "Denise Carter", unit: "12", rent: "$910", lease: "Mar 2025–Feb 2026", status: "active", email: "d.carter@email.com" },
  { name: "Jordan Davis", unit: "14B", rent: "$875", lease: "Jan–Dec 2025", status: "active", email: "j.davis@email.com" },
  { name: "Tamara Ellis", unit: "22", rent: "$850", lease: "Jun 2024–May 2025", status: "notice", email: "t.ellis@email.com" },
  { name: "Reginald Moon", unit: "31", rent: "$960", lease: "Sep 2025–Aug 2026", status: "active", email: "r.moon@email.com" },
  { name: "Cynthia Park", unit: "38", rent: "$875", lease: "Jan–Dec 2025", status: "active", email: "c.park@email.com" },
];

const months = [
  { m: "Jan", v: 37800 }, { m: "Feb", v: 38200 }, { m: "Mar", v: 39100 },
  { m: "Apr", v: 38600 }, { m: "May", v: 40200 }, { m: "Jun", v: 0 },
];
const maxRev = 40200;

const activity = [
  { icon: "💳", text: "Marcus Webb paid $875 for Unit 07", time: "2 hours ago" },
  { icon: "🔧", text: "Ticket #1042 assigned to maintenance team — Unit 14B", time: "4 hours ago" },
  { icon: "📝", text: "Lease renewal sent to Jordan Davis (Unit 14B)", time: "Yesterday" },
  { icon: "⚠️", text: "Notice to vacate filed — Tamara Ellis (Unit 22)", time: "Apr 30" },
  { icon: "📣", text: "Emergency alert broadcast sent to all 47 units", time: "Apr 28" },
];

const occupied = units.filter(u => u.status === "occupied").length;
const vacant = units.filter(u => u.status === "vacant").length;
const notice = units.filter(u => u.status === "notice").length;
const maint = units.filter(u => u.status === "maintenance").length;

export default function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [modal, setModal] = useState(null);
  const [broadcastType, setBroadcastType] = useState("all");
  const [alertType, setAlertType] = useState("notice");
  const [ticketFilter, setTicketFilter] = useState("All");

  const nav = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "units", icon: "🏠", label: "Units & Occupancy" },
    { id: "tenants", icon: "👥", label: "Tenants" },
    { id: "payments", icon: "💳", label: "Payments" },
    { id: "maintenance", icon: "🔧", label: "Maintenance", badge: tickets.filter(t => t.status !== "done").length },
    { id: "broadcast", icon: "📣", label: "Broadcast Alerts" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const pageTitles = {
    dashboard: ["Dashboard", "Church View Homes · May 2025"],
    units: ["Units & Occupancy", "47 total units · Shelley St, Peoria IL"],
    tenants: ["Tenant Management", "Lease records and resident directory"],
    payments: ["Payments", "Rent collection and ledger"],
    maintenance: ["Maintenance Queue", "Open tickets and work orders"],
    broadcast: ["Broadcast & Alerts", "Send notices, newsletters & emergency alerts"],
    settings: ["Settings", "Property configuration and integrations"],
  };

  const filteredTickets = ticketFilter === "All" ? tickets : tickets.filter(t =>
    ticketFilter === "Open" ? t.status === "open" :
    ticketFilter === "In Progress" ? t.status === "progress" :
    t.status === "done"
  );

  return (
    <div className="admin-shell">
      <style>{CSS}</style>

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-top">
            <div className="logo-badge">C</div>
            <div>
              <div className="logo-name">Church View Homes</div>
              <div className="logo-sub">Admin Portal</div>
            </div>
          </div>
          <div className="logo-addr">📍 Shelley St, Peoria IL · 47 Units</div>
        </div>

        <div className="nav-section">Main</div>
        {nav.slice(0, 4).map(n => (
          <div key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
            <span className="ni-icon">{n.icon}</span>
            {n.label}
          </div>
        ))}

        <div className="nav-section">Operations</div>
        {nav.slice(4).map(n => (
          <div key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
            <span className="ni-icon">{n.icon}</span>
            {n.label}
            {n.badge ? <span className="nav-badge">{n.badge}</span> : null}
          </div>
        ))}

        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">PM</div>
            <div>
              <div className="admin-name">Property Manager</div>
              <div className="admin-role">Pivotal Properties</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="topbar">
          <div>
            <div className="page-title">{pageTitles[page][0]}</div>
            <div className="page-sub">{pageTitles[page][1]}</div>
          </div>
          <div className="topbar-actions">
            {page === "broadcast" && (
              <button className="tb-btn danger" onClick={() => setModal("emergency")}>🚨 Emergency Alert</button>
            )}
            {page === "tenants" && (
              <button className="tb-btn ghost" onClick={() => setModal("addTenant")}>+ Add Tenant</button>
            )}
            {page === "maintenance" && (
              <button className="tb-btn ghost" onClick={() => setModal("addTicket")}>+ New Ticket</button>
            )}
            <button className="tb-btn primary" onClick={() => setModal("broadcast")}>
              {page === "broadcast" ? "📣 Send Broadcast" : "📣 Broadcast"}
            </button>
          </div>
        </div>

        <div className="body-pad">

          {/* ── DASHBOARD ── */}
          {page === "dashboard" && (
            <>
              <div className="stat-grid">
                <div className="stat-card s-gold">
                  <span className="stat-icon">💰</span>
                  <div className="stat-label">May Revenue Collected</div>
                  <div className="stat-val">$38,450</div>
                  <div className="stat-note green">↑ 4.2% vs last month</div>
                </div>
                <div className="stat-card s-green">
                  <span className="stat-icon">🏠</span>
                  <div className="stat-label">Occupancy Rate</div>
                  <div className="stat-val">{Math.round((occupied / 47) * 100)}%</div>
                  <div className="stat-note">{occupied} of 47 units leased</div>
                </div>
                <div className="stat-card s-red">
                  <span className="stat-icon">🔧</span>
                  <div className="stat-label">Open Maintenance</div>
                  <div className="stat-val">{tickets.filter(t => t.status !== "done").length}</div>
                  <div className="stat-note red">2 marked high priority</div>
                </div>
                <div className="stat-card s-blue">
                  <span className="stat-icon">📋</span>
                  <div className="stat-label">Pending Payments</div>
                  <div className="stat-val">3</div>
                  <div className="stat-note red">1 late — Unit 22</div>
                </div>
              </div>

              <div className="two-col">
                <div className="section-card">
                  <div className="sc-head">
                    <div className="sc-title">2025 Revenue by Month</div>
                    <div className="sc-link" onClick={() => setPage("payments")}>View all →</div>
                  </div>
                  <div className="rev-bar-wrap">
                    {months.map(m => (
                      <div className="rev-month" key={m.m}>
                        <div className="rev-mo-label">{m.m}</div>
                        <div className="rev-bar-bg">
                          {m.v > 0 && <div className="rev-bar-fill" style={{ width: `${(m.v / maxRev) * 100}%` }} />}
                        </div>
                        <div className="rev-amount">{m.v > 0 ? `$${(m.v / 1000).toFixed(1)}k` : "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="section-card">
                    <div className="sc-head"><div className="sc-title">Occupancy Breakdown</div></div>
                    <div className="donut-wrap">
                      <svg className="donut-svg" width="80" height="80" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="30" fill="none" stroke={`rgba(255,255,255,0.06)`} strokeWidth="12" />
                        <circle cx="40" cy="40" r="30" fill="none" stroke={G.success} strokeWidth="12"
                          strokeDasharray={`${(occupied / 47) * 188.5} 188.5`} strokeLinecap="round"
                          transform="rotate(-90 40 40)" style={{ opacity: 0.85 }} />
                        <text x="40" y="44" textAnchor="middle" fontSize="14" fontWeight="700" fill={G.white} fontFamily="Syne,sans-serif">
                          {Math.round((occupied / 47) * 100)}%
                        </text>
                      </svg>
                      <div className="donut-legend">
                        <div className="dl-item"><div className="dl-dot" style={{ background: G.success }} /><div className="dl-label">Occupied</div><div className="dl-val">{occupied}</div></div>
                        <div className="dl-item"><div className="dl-dot" style={{ background: G.danger }} /><div className="dl-label">Vacant</div><div className="dl-val">{vacant}</div></div>
                        <div className="dl-item"><div className="dl-dot" style={{ background: G.warning }} /><div className="dl-label">Notice</div><div className="dl-val">{notice}</div></div>
                        <div className="dl-item"><div className="dl-dot" style={{ background: G.gold }} /><div className="dl-label">Maint.</div><div className="dl-val">{maint}</div></div>
                      </div>
                    </div>
                  </div>

                  <div className="section-card">
                    <div className="sc-head"><div className="sc-title">Recent Activity</div></div>
                    <div style={{ padding: "8px 16px" }}>
                      {activity.slice(0, 3).map((a, i) => (
                        <div className="activity-item" key={i}>
                          <div className="act-icon">{a.icon}</div>
                          <div>
                            <div className="act-text">{a.text}</div>
                            <div className="act-time">{a.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-card">
                <div className="sc-head"><div className="sc-title">Recent Payments</div><div className="sc-link" onClick={() => setPage("payments")}>View all →</div></div>
                {payments.slice(0, 4).map((p, i) => (
                  <div className="pay-row-item" key={i}>
                    <div>
                      <div className="pri-name">{p.name}</div>
                      <div className="pri-unit">{p.unit}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span className={`badge ${p.status}`}>{p.status}</span>
                      <div className="pri-amount">{p.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── UNITS ── */}
          {page === "units" && (
            <>
              <div className="two-col" style={{ marginBottom: 14 }}>
                <div className="stat-card s-green" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div>
                    <div className="stat-label">Occupancy</div>
                    <div className="stat-val">{Math.round((occupied / 47) * 100)}%</div>
                    <div className="occ-bar" style={{ width: 140, marginTop: 8, marginBottom: 0 }}>
                      <div className="occ-fill" style={{ width: `${(occupied / 47) * 100}%` }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontSize: 12, color: G.muted }}><span style={{ color: G.success, fontWeight: 600 }}>{occupied}</span> Occupied</div>
                    <div style={{ fontSize: 12, color: G.muted }}><span style={{ color: G.danger, fontWeight: 600 }}>{vacant}</span> Vacant</div>
                    <div style={{ fontSize: 12, color: G.muted }}><span style={{ color: G.warning, fontWeight: 600 }}>{notice}</span> Notice</div>
                    <div style={{ fontSize: 12, color: G.muted }}><span style={{ color: G.gold, fontWeight: 600 }}>{maint}</span> Maintenance</div>
                  </div>
                </div>
                <div className="stat-card s-gold">
                  <div className="stat-label">Monthly Rent Roll</div>
                  <div className="stat-val">$40,850</div>
                  <div className="stat-note">At full occupancy</div>
                  <div style={{ marginTop: 10, fontSize: 12, color: G.muted }}>Avg/unit: <span style={{ color: G.text, fontWeight: 500 }}>$869</span></div>
                </div>
              </div>

              <div className="section-card">
                <div className="sc-head">
                  <div className="sc-title">All 47 Units — Shelley St</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="tb-btn ghost" style={{ fontSize: 11, padding: "5px 10px" }}>Export</button>
                  </div>
                </div>
                <div className="legend-row">
                  <div className="legend-item"><div className="leg-dot" style={{ background: G.success }} /> Occupied</div>
                  <div className="legend-item"><div className="leg-dot" style={{ background: G.danger }} /> Vacant</div>
                  <div className="legend-item"><div className="leg-dot" style={{ background: G.warning }} /> Notice to Vacate</div>
                  <div className="legend-item"><div className="leg-dot" style={{ background: G.gold }} /> Maintenance Hold</div>
                </div>
                <div className="unit-grid">
                  {units.map(u => (
                    <div key={u.num} className={`unit-box ${u.status}`} onClick={() => setModal("unitDetail")}>
                      <div className="unit-num">{u.num}</div>
                      <div className="unit-status">{u.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── TENANTS ── */}
          {page === "tenants" && (
            <div className="section-card">
              <div className="sc-head">
                <div className="sc-title">Resident Directory</div>
                <input className="input-field" style={{ width: 200, padding: "6px 10px", fontSize: 12 }} placeholder="🔍  Search tenants..." />
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Resident</th>
                      <th>Unit</th>
                      <th>Rent</th>
                      <th>Lease Term</th>
                      <th>Status</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map((t, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500, color: G.white }}>{t.name}</td>
                        <td className="muted">{t.unit}</td>
                        <td style={{ color: G.gold, fontWeight: 600 }}>{t.rent}</td>
                        <td className="muted">{t.lease}</td>
                        <td><span className={`pill ${t.status === "active" ? "active" : "inactive"}`}>{t.status === "active" ? "Active" : "Notice"}</span></td>
                        <td className="muted">{t.email}</td>
                        <td>
                          <button className="tb-btn ghost" style={{ fontSize: 11, padding: "4px 10px" }} onClick={() => setModal("tenantDetail")}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PAYMENTS ── */}
          {page === "payments" && (
            <>
              <div className="stat-grid">
                <div className="stat-card s-gold">
                  <div className="stat-label">Collected — May</div>
                  <div className="stat-val">$38,450</div>
                  <div className="stat-note green">34 of 47 units paid</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Outstanding</div>
                  <div className="stat-val">$2,400</div>
                  <div className="stat-note red">3 units pending</div>
                </div>
                <div className="stat-card s-red">
                  <div className="stat-label">Late Payments</div>
                  <div className="stat-val">1</div>
                  <div className="stat-note red">Unit 22 — 8 days late</div>
                </div>
                <div className="stat-card s-green">
                  <div className="stat-label">On-Time Rate</div>
                  <div className="stat-val">94%</div>
                  <div className="stat-note green">YTD average</div>
                </div>
              </div>
              <div className="section-card">
                <div className="sc-head">
                  <div className="sc-title">May 2025 — Payment Ledger</div>
                  <button className="tb-btn ghost" style={{ fontSize: 11, padding: "5px 10px" }}>Export CSV</button>
                </div>
                {payments.map((p, i) => (
                  <div className="pay-row-item" key={i}>
                    <div>
                      <div className="pri-name">{p.name}</div>
                      <div className="pri-unit">{p.unit} · {p.date}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span className={`badge ${p.status}`}>{p.status}</span>
                      <div className="pri-amount">{p.amount}</div>
                      {p.status !== "paid" && (
                        <button className="tb-btn ghost" style={{ fontSize: 11, padding: "4px 10px" }}>Send Reminder</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── MAINTENANCE ── */}
          {page === "maintenance" && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {["All", "Open", "In Progress", "Resolved"].map(f => (
                  <button key={f} onClick={() => setTicketFilter(f)}
                    className="tb-btn ghost"
                    style={{ fontSize: 12, padding: "7px 14px", borderColor: ticketFilter === f ? "rgba(201,168,76,0.4)" : undefined, color: ticketFilter === f ? G.gold : undefined, background: ticketFilter === f ? "rgba(201,168,76,0.07)" : undefined }}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="section-card">
                <div className="sc-head"><div className="sc-title">Work Orders</div></div>
                {filteredTickets.map((t, i) => (
                  <div className="ticket-row" key={i} onClick={() => setModal("ticketDetail")}>
                    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <div className="tr-icon">{t.icon}</div>
                      <div>
                        <div className="tr-title">{t.title}</div>
                        <div className="tr-meta">{t.unit} · Submitted {t.date}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span className="badge" style={{
                        background: t.prio === "high" ? "rgba(212,79,79,0.1)" : t.prio === "medium" ? "rgba(217,126,53,0.1)" : "rgba(60,180,122,0.1)",
                        color: t.prio === "high" ? G.danger : t.prio === "medium" ? G.warning : G.success
                      }}>{t.prio}</span>
                      <span className={`badge ${t.status === "progress" ? "progress" : t.status === "done" ? "done" : "open"}`}>
                        {t.status === "progress" ? "In Progress" : t.status === "done" ? "Resolved" : "Open"}
                      </span>
                      <button className="tb-btn ghost" style={{ fontSize: 11, padding: "4px 10px" }}>Assign</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── BROADCAST ── */}
          {page === "broadcast" && (
            <div className="two-col">
              <div className="section-card">
                <div className="sc-head"><div className="sc-title">Compose Message</div></div>
                <div style={{ padding: "16px" }}>
                  <div className="form-group">
                    <label className="input-label">Alert Type</label>
                    <div className="broadcast-types">
                      {[["📣", "Notice", "notice"], ["🔧", "Maintenance", "maint"], ["📰", "Newsletter", "news"]].map(([icon, label, val]) => (
                        <div key={val} className={`bt-chip ${alertType === val ? "sel" : ""}`} onClick={() => setAlertType(val)}>
                          <span className="bc-icon">{icon}</span>
                          <span className="bc-label">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="input-label">Subject / Title</label>
                    <input className="input-field" placeholder="e.g. Water Shutoff Notice — May 8" />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Message Body</label>
                    <textarea className="input-field" placeholder="Write your message to residents here..." style={{ height: 100 }} />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Delivery Channels</label>
                    <div style={{ display: "flex", gap: 8" }}>
                      {["📱 Push Notification", "📧 Email", "💬 SMS"].map(ch => (
                        <label key={ch} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: G.muted, cursor: "pointer" }}>
                          <input type="checkbox" defaultChecked style={{ accentColor: G.gold }} /> {ch}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="input-label">Send To</label>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      {["All Units", "Specific Units", "Floor/Section"].map(opt => (
                        <button key={opt} className="tb-btn ghost"
                          style={{ fontSize: 11, padding: "5px 10px", borderColor: broadcastType === opt ? "rgba(201,168,76,0.4)" : undefined, color: broadcastType === opt ? G.gold : undefined }}
                          onClick={() => setBroadcastType(opt)}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: G.muted }}>Sending to: <span style={{ color: G.gold, fontWeight: 600 }}>All 47 units</span></div>
                  </div>
                  <button className="tb-btn primary" style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 4 }}>
                    📣 Send to All Residents
                  </button>
                  <button className="tb-btn danger" style={{ width: "100%", justifyContent: "center", padding: "11px", marginTop: 8 }} onClick={() => setModal("emergency")}>
                    🚨 Send Emergency Alert
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="section-card">
                  <div className="sc-head"><div className="sc-title">Broadcast History</div></div>
                  {[
                    { icon: "📣", title: "Water Shutoff — May 8", sent: "May 1 · All 47 units", channels: "Push · Email · SMS" },
                    { icon: "📰", title: "Spring Community Newsletter", sent: "Apr 28 · All 47 units", channels: "Email" },
                    { icon: "🚨", title: "Emergency: Gas Leak Drill", sent: "Apr 15 · All 47 units", channels: "Push · SMS" },
                    { icon: "🔧", title: "Parking Lot Closure Notice", sent: "Apr 10 · All 47 units", channels: "Push · Email" },
                  ].map((b, i) => (
                    <div className="activity-item" key={i} style={{ padding: "10px 16px" }}>
                      <div className="act-icon">{b.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div className="act-text" style={{ fontWeight: 500 }}>{b.title}</div>
                        <div className="act-time">{b.sent}</div>
                        <div className="act-time" style={{ marginTop: 2, color: G.gold }}>{b.channels}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="section-card">
                  <div className="sc-head"><div className="sc-title">Delivery Stats</div></div>
                  <div style={{ padding: "14px 16px" }}>
                    {[["Avg Open Rate", "84%", G.success], ["Push Opt-In", "91%", G.gold], ["SMS Opt-In", "78%", G.info]].map(([l, v, c]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span style={{ fontSize: 12, color: G.muted }}>{l}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: c, fontFamily: "Syne,sans-serif" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {page === "settings" && (
            <div className="two-col">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="section-card">
                  <div className="sc-head"><div className="sc-title">Property Info</div></div>
                  <div style={{ padding: 16 }}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="input-label">Property Name</label>
                        <input className="input-field" defaultValue="Church View Homes" />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Total Units</label>
                        <input className="input-field" defaultValue="47" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="input-label">Address</label>
                      <input className="input-field" defaultValue="Shelley St, Peoria, IL 61602" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="input-label">Office Phone</label>
                        <input className="input-field" defaultValue="(309) 444-5800" />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Emergency Line</label>
                        <input className="input-field" defaultValue="(309) 444-5801" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="input-label">Office Email</label>
                      <input className="input-field" defaultValue="office@churchviewhomes.com" />
                    </div>
                    <button className="tb-btn primary" style={{ fontSize: 12, padding: "9px 16px" }}>Save Changes</button>
                  </div>
                </div>

                <div className="section-card">
                  <div className="sc-head"><div className="sc-title">Office Hours</div></div>
                  <div style={{ padding: 16 }}>
                    {[["Mon – Fri", "9:00 AM", "5:00 PM"], ["Saturday", "10:00 AM", "2:00 PM"], ["Sunday", "Closed", "Closed"]].map(([d, o, c]) => (
                      <div key={d} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, color: G.muted, width: 70, flexShrink: 0 }}>{d}</span>
                        <input className="input-field" defaultValue={o} style={{ flex: 1 }} />
                        <span style={{ fontSize: 12, color: G.muted }}>to</span>
                        <input className="input-field" defaultValue={c} style={{ flex: 1 }} />
                      </div>
                    ))}
                    <button className="tb-btn primary" style={{ fontSize: 12, padding: "9px 16px", marginTop: 4 }}>Save Hours</button>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="section-card">
                  <div className="sc-head"><div className="sc-title">Integrations</div></div>
                  <div style={{ padding: 16 }}>
                    {[
                      { name: "Stripe Payments", status: "Not Connected", icon: "💳", color: G.danger },
                      { name: "DocuSign", status: "Not Connected", icon: "📝", color: G.danger },
                      { name: "Twilio SMS", status: "Not Connected", icon: "💬", color: G.danger },
                      { name: "Firebase Push", status: "Not Connected", icon: "🔔", color: G.danger },
                      { name: "SendGrid Email", status: "Not Connected", icon: "📧", color: G.danger },
                    ].map(int => (
                      <div key={int.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 18 }}>{int.icon}</span>
                          <div>
                            <div style={{ fontSize: 13, color: G.text, fontWeight: 500 }}>{int.name}</div>
                            <div style={{ fontSize: 11, color: int.color }}>{int.status}</div>
                          </div>
                        </div>
                        <button className="tb-btn ghost" style={{ fontSize: 11, padding: "5px 10px" }}>Connect</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section-card">
                  <div className="sc-head"><div className="sc-title">Notification Rules</div></div>
                  <div style={{ padding: 16 }}>
                    {[
                      "Email me when rent is received",
                      "Alert me when maintenance is high priority",
                      "Notify me of new tenant applications",
                      "Weekly payment summary report",
                      "Daily occupancy digest",
                    ].map(rule => (
                      <label key={rule} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: G.muted, cursor: "pointer", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: G.gold, width: 14, height: 14 }} />
                        {rule}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MODALS ── */}
      {modal === "emergency" && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🚨</div>
              <div className="modal-title">Emergency Alert Broadcast</div>
              <div className="modal-sub">This will immediately notify ALL 47 units via push, SMS, and email.</div>
            </div>
            <div className="form-group">
              <label className="input-label">Emergency Type</label>
              <select className="input-field">
                <option>🔥 Fire / Evacuation</option>
                <option>⛽ Gas Leak</option>
                <option>💧 Flooding / Water Emergency</option>
                <option>🔒 Security Threat</option>
                <option>⚡ Power Outage</option>
                <option>🌪️ Severe Weather</option>
                <option>📢 Other Emergency</option>
              </select>
            </div>
            <div className="form-group">
              <label className="input-label">Emergency Message</label>
              <textarea className="input-field" placeholder="Describe the emergency situation and any required actions for residents..." />
            </div>
            <div className="modal-actions">
              <button className="tb-btn ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="tb-btn danger" style={{ flex: 1 }} onClick={() => setModal(null)}>🚨 SEND EMERGENCY ALERT</button>
            </div>
          </div>
        </div>
      )}

      {modal === "broadcast" && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Quick Broadcast</div>
            <div className="modal-sub">Send a message to all Church View residents</div>
            <div className="form-group">
              <label className="input-label">Title</label>
              <input className="input-field" placeholder="Message subject..." />
            </div>
            <div className="form-group">
              <label className="input-label">Message</label>
              <textarea className="input-field" placeholder="What do you want to tell residents?" />
            </div>
            <div className="form-group">
              <label className="input-label">Send via</label>
              <div style={{ display: "flex", gap: 12" }}>
                {["📱 Push", "📧 Email", "💬 SMS"].map(c => (
                  <label key={c} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: G.muted, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: G.gold }} /> {c}
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button className="tb-btn ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="tb-btn primary" onClick={() => setModal(null)}>Send to All 47 Units</button>
            </div>
          </div>
        </div>
      )}

      {modal === "ticketDetail" && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Maintenance Ticket #1043</div>
            <div className="modal-sub">AC not cooling — Unit 05 · High Priority · Submitted May 3</div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: G.muted, marginBottom: 6 }}>Resident Description</div>
              <div style={{ fontSize: 13, color: G.text, lineHeight: 1.5 }}>AC unit is not producing cold air. Thermostat set to 68°F but apartment is 81°F. Has been this way for 2 days.</div>
            </div>
            <div className="form-group">
              <label className="input-label">Assign To</label>
              <select className="input-field"><option>-- Select Technician --</option><option>Marcus (HVAC)</option><option>James (General)</option></select>
            </div>
            <div className="form-group">
              <label className="input-label">Scheduled Date</label>
              <input type="date" className="input-field" />
            </div>
            <div className="form-group">
              <label className="input-label">Update Status</label>
              <select className="input-field"><option>Open</option><option>In Progress</option><option>Resolved</option></select>
            </div>
            <div className="modal-actions">
              <button className="tb-btn ghost" onClick={() => setModal(null)}>Close</button>
              <button className="tb-btn primary" onClick={() => setModal(null)}>Save & Notify Tenant</button>
            </div>
          </div>
        </div>
      )}

      {modal === "tenantDetail" && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div className="admin-avatar" style={{ width: 48, height: 48, fontSize: 18 }}>MW</div>
              <div>
                <div className="modal-title" style={{ marginBottom: 2 }}>Marcus Webb</div>
                <div style={{ fontSize: 12, color: G.muted }}>Unit 07 · Active Lease · (309) 555-0191</div>
              </div>
            </div>
            {[["Lease Start", "Jan 1, 2025"], ["Lease End", "Dec 31, 2025"], ["Monthly Rent", "$875"], ["Security Deposit", "$875 (on file)"], ["Email", "m.webb@email.com"], ["Last Payment", "May 1, 2025 — $875"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13 }}>
                <span style={{ color: G.muted }}>{l}</span>
                <span style={{ color: G.text, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div className="modal-actions">
              <button className="tb-btn ghost" style={{ fontSize: 12 }} onClick={() => setModal(null)}>Send Message</button>
              <button className="tb-btn ghost" style={{ fontSize: 12 }} onClick={() => setModal(null)}>View Lease</button>
              <button className="tb-btn primary" style={{ fontSize: 12 }} onClick={() => setModal(null)}>Edit Record</button>
            </div>
          </div>
        </div>
      )}

      {modal === "unitDetail" && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Unit 05 — Details</div>
            <div className="modal-sub">Church View Homes · Shelley St</div>
            {[["Status", "Occupied"], ["Tenant", "Aisha Thompson"], ["Lease Term", "Mar 2025 – Feb 2026"], ["Monthly Rent", "$875"], ["Bedrooms", "2 BR / 1 BA"], ["Floor", "Ground Floor"], ["Open Tickets", "1 — High Priority HVAC"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13 }}>
                <span style={{ color: G.muted }}>{l}</span>
                <span style={{ color: G.text, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div className="modal-actions">
              <button className="tb-btn ghost" onClick={() => setModal(null)}>Close</button>
              <button className="tb-btn primary" onClick={() => setModal(null)}>View Tenant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
