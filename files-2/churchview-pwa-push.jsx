import { useState, useEffect, useRef } from "react";

/* ─── STEP 3: PWA + PUSH NOTIFICATION SYSTEM ───
   Churchview Gardens · Pivotal Communities
   Stack: Firebase Cloud Messaging (push) · Twilio (SMS) · Vercel (hosting)
   ─────────────────────────────────────────────── */

const G = {
  bg: "#080c10",
  s1: "#0d1219",
  s2: "#111822",
  s3: "#16202e",
  border: "rgba(255,255,255,0.06)",
  teal: "#00c9a7",
  tealDim: "rgba(0,201,167,0.08)",
  tealBorder: "rgba(0,201,167,0.22)",
  tealMid: "#00a88c",
  electric: "#00e5c8",
  red: "#e53935",
  redDim: "rgba(229,57,53,0.1)",
  redBorder: "rgba(229,57,53,0.3)",
  amber: "#f59e0b",
  amberDim: "rgba(245,158,11,0.08)",
  blue: "#3b82f6",
  blueDim: "rgba(59,130,246,0.08)",
  purple: "#a855f7",
  purpleDim: "rgba(168,85,247,0.08)",
  white: "#e8f0f8",
  text: "#94a8c0",
  muted: "#445566",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
@keyframes pulse-ring{0%{transform:scale(1);opacity:1}70%{transform:scale(1.8);opacity:0}100%{transform:scale(1.8);opacity:0}}
@keyframes slide-in{from{transform:translateY(-12px) translateX(12px);opacity:0}to{transform:translateY(0) translateX(0);opacity:1}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes sweep{from{width:0}to{width:100%}}
@keyframes fade-up{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Space Grotesk',sans-serif;background:${G.bg};color:${G.text};min-height:100vh;}
.shell{max-width:960px;margin:0 auto;padding:0 0 60px;}
pre,code{font-family:'Space Mono',monospace;}

/* TOP BAR */
.topbar{background:${G.s1};border-bottom:1px solid ${G.border};padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:56px;}
.tb-logo{display:flex;align-items:center;gap:10px;}
.tb-dot{width:10px;height:10px;border-radius:50%;background:${G.teal};box-shadow:0 0 10px ${G.teal};animation:blink 2s infinite;}
.tb-name{font-size:14px;font-weight:600;color:${G.white};letter-spacing:0.02em;}
.tb-tag{font-size:10px;color:${G.teal};font-family:'Space Mono',monospace;letter-spacing:0.1em;text-transform:uppercase;}
.tb-right{display:flex;align-items:center;gap:12px;}
.tb-status{display:flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;background:${G.tealDim};border:1px solid ${G.tealBorder};font-size:11px;color:${G.teal};font-family:'Space Mono',monospace;}
.tb-status-dot{width:6px;height:6px;border-radius:50%;background:${G.teal};box-shadow:0 0 6px ${G.teal};}

/* HERO */
.hero{background:linear-gradient(135deg,rgba(0,201,167,0.05) 0%,transparent 60%);border-bottom:1px solid ${G.border};padding:40px 28px 32px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;}
.hero-eyebrow{font-size:11px;font-family:'Space Mono',monospace;color:${G.teal};letter-spacing:0.14em;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.hero-eyebrow::before{content:'';width:20px;height:1px;background:${G.teal};}
.hero-title{font-size:32px;font-weight:700;color:${G.white};line-height:1.1;margin-bottom:10px;letter-spacing:-0.02em;}
.hero-title span{color:${G.teal};}
.hero-sub{font-size:14px;color:${G.muted};line-height:1.7;max-width:480px;}
.hero-stats{display:flex;flex-direction:column;gap:8px;align-items:flex-end;}
.hs-item{text-align:right;}
.hs-num{font-size:28px;font-weight:700;color:${G.white};font-family:'Space Mono',monospace;line-height:1;}
.hs-num span{color:${G.teal};}
.hs-label{font-size:10px;color:${G.muted};text-transform:uppercase;letter-spacing:0.1em;}

/* NAV TABS */
.nav-tabs{background:${G.s1};border-bottom:1px solid ${G.border};padding:0 28px;display:flex;gap:0;overflow-x:auto;scrollbar-width:none;}
.nav-tabs::-webkit-scrollbar{display:none;}
.nt{padding:14px 18px;font-size:12px;font-weight:500;color:${G.muted};border-bottom:2px solid transparent;cursor:pointer;transition:all 0.18s;white-space:nowrap;letter-spacing:0.02em;background:none;border-top:none;border-left:none;border-right:none;font-family:'Space Grotesk',sans-serif;}
.nt:hover{color:${G.text};}
.nt.active{color:${G.teal};border-bottom-color:${G.teal};}

/* LAYOUT */
.body{padding:24px 28px;}
.two-col{display:grid;grid-template-columns:1.5fr 1fr;gap:20px;}
.three-col{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;}

/* CARDS */
.card{background:${G.s2};border:1px solid ${G.border};border-radius:14px;overflow:hidden;}
.card-head{padding:14px 18px;border-bottom:1px solid ${G.border};display:flex;align-items:center;justify-content:space-between;}
.ch-left{display:flex;align-items:center;gap:10px;}
.ch-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.ch-title{font-size:13px;font-weight:600;color:${G.white};letter-spacing:0.01em;}
.ch-sub{font-size:10px;color:${G.muted};margin-top:1px;}
.ch-right{font-size:11px;color:${G.teal};cursor:pointer;font-weight:500;}
.card-body{padding:18px;}

/* STAT CARDS */
.stat{background:${G.s2};border:1px solid ${G.border};border-radius:12px;padding:16px;position:relative;overflow:hidden;}
.stat::after{content:'';position:absolute;top:-20px;right:-20px;width:70px;height:70px;border-radius:50%;filter:blur(20px);opacity:0.15;}
.stat.teal::after{background:${G.teal};}
.stat.red::after{background:${G.red};}
.stat.amber::after{background:${G.amber};}
.stat-icon{font-size:18px;margin-bottom:10px;display:block;}
.stat-label{font-size:10px;color:${G.muted};text-transform:uppercase;letter-spacing:0.12em;font-weight:600;margin-bottom:5px;}
.stat-val{font-family:'Space Mono',monospace;font-size:26px;font-weight:700;color:${G.white};line-height:1;margin-bottom:5px;}
.stat-note{font-size:11px;}
.stat-note.teal{color:${G.teal};}
.stat-note.red{color:${G.red};}

/* NOTIFICATION FEED */
.notif-item{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer;transition:all 0.15s;}
.notif-item:hover{padding-left:4px;}
.notif-item:last-child{border-bottom:none;}
.ni-dot-wrap{display:flex;flex-direction:column;align-items:center;padding-top:5px;}
.ni-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.ni-line{width:1px;flex:1;background:rgba(255,255,255,0.05);margin-top:4px;}
.ni-content{flex:1;}
.ni-type{font-size:9px;font-family:'Space Mono',monospace;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;margin-bottom:4px;}
.ni-msg{font-size:12px;color:${G.text};line-height:1.5;margin-bottom:3px;}
.ni-meta{font-size:10px;color:${G.muted};}
.ni-channels{display:flex;gap:4px;margin-top:4px;}
.ni-ch{font-size:9px;padding:2px 6px;border-radius:3px;font-weight:600;letter-spacing:0.04em;}
.ni-ch.push{background:rgba(59,130,246,0.15);color:#93c5fd;}
.ni-ch.sms{background:rgba(245,158,11,0.12);color:#fcd34d;}
.ni-ch.email{background:rgba(168,85,247,0.12);color:#d8b4fe;}

/* COMPOSE */
.compose-wrap{display:flex;flex-direction:column;gap:14px;}
.type-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
.type-card{border:1.5px solid ${G.border};border-radius:10px;padding:12px 8px;text-align:center;cursor:pointer;transition:all 0.2s;background:${G.s3};}
.type-card:hover{border-color:rgba(0,201,167,0.3);}
.type-card.sel-teal{border-color:${G.teal};background:${G.tealDim};}
.type-card.sel-red{border-color:${G.red};background:${G.redDim};}
.type-card.sel-amber{border-color:${G.amber};background:${G.amberDim};}
.type-card.sel-blue{border-color:${G.blue};background:${G.blueDim};}
.tc-icon{font-size:22px;display:block;margin-bottom:6px;}
.tc-label{font-size:11px;font-weight:600;color:${G.text};}
.tc-sub{font-size:9px;color:${G.muted};margin-top:2px;}
.fi{width:100%;background:${G.s3};border:1px solid ${G.border};border-radius:9px;padding:10px 14px;font-size:13px;color:${G.white};font-family:'Space Grotesk',sans-serif;outline:none;transition:border-color 0.2s;}
.fi:focus{border-color:rgba(0,201,167,0.4);}
.fi::placeholder{color:rgba(255,255,255,0.15);}
textarea.fi{resize:none;height:80px;}
.channel-row{display:flex;gap:10px;flex-wrap:wrap;}
.ch-toggle{display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:8px;border:1px solid ${G.border};cursor:pointer;transition:all 0.18s;font-size:12px;font-weight:500;color:${G.muted};}
.ch-toggle.on-push{border-color:rgba(59,130,246,0.4);background:${G.blueDim};color:#93c5fd;}
.ch-toggle.on-sms{border-color:rgba(245,158,11,0.3);background:${G.amberDim};color:#fcd34d;}
.ch-toggle.on-email{border-color:rgba(168,85,247,0.3);background:${G.purpleDim};color:#d8b4fe;}
.ch-toggle.on-inapp{border-color:${G.tealBorder};background:${G.tealDim};color:${G.teal};}
.recipient-row{display:flex;gap:8px;flex-wrap:wrap;}
.rec-chip{padding:6px 12px;border-radius:20px;border:1px solid ${G.border};font-size:11px;font-weight:500;color:${G.muted};cursor:pointer;transition:all 0.18s;}
.rec-chip.sel{border-color:${G.tealBorder};background:${G.tealDim};color:${G.teal};}
.send-btn{width:100%;background:${G.teal};color:${G.bg};border:none;border-radius:10px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Space Grotesk',sans-serif;letter-spacing:0.04em;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.2s;}
.send-btn:hover{background:${G.electric};transform:translateY(-1px);box-shadow:0 5px 16px rgba(0,201,167,0.3);}
.em-btn{width:100%;background:${G.red};color:#fff;border:none;border-radius:10px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Space Grotesk',sans-serif;letter-spacing:0.04em;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.2s;margin-top:8px;}
.em-btn:hover{background:#ff4040;box-shadow:0 5px 16px rgba(229,57,53,0.35);}

/* PROGRESS STEPS */
.setup-step{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.04);}
.setup-step:last-child{border-bottom:none;}
.ss-num{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:2px;font-family:'Space Mono',monospace;}
.ss-num.done{background:rgba(0,201,167,0.15);color:${G.teal};border:1px solid ${G.tealBorder};}
.ss-num.active{background:${G.teal};color:${G.bg};}
.ss-num.pending{background:rgba(255,255,255,0.04);color:${G.muted};border:1px solid ${G.border};}
.ss-title{font-size:13px;font-weight:600;color:${G.white};margin-bottom:4px;}
.ss-desc{font-size:12px;color:${G.muted};line-height:1.6;}
.ss-code{background:${G.s3};border:1px solid ${G.border};border-radius:8px;padding:12px 14px;margin-top:10px;font-size:11px;color:rgba(0,201,167,0.9);font-family:'Space Mono',monospace;line-height:1.7;overflow-x:auto;}
.ss-tag{display:inline-flex;align-items:center;gap:5px;margin-top:8px;font-size:11px;color:${G.teal};font-weight:600;padding:4px 10px;background:${G.tealDim};border-radius:20px;border:1px solid ${G.tealBorder};}
.ss-link{color:${G.teal};font-size:12px;margin-top:6px;display:flex;align-items:center;gap:4px;cursor:pointer;}

/* NOTIFICATION MOCK */
.phone-mock{background:${G.s3};border:1px solid ${G.border};border-radius:16px;padding:16px;position:relative;overflow:hidden;}
.pm-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.pm-title{font-size:11px;color:${G.muted};font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:0.1em;}
.pm-time{font-size:11px;color:${G.muted};font-family:'Space Mono',monospace;}
.push-notif{background:rgba(255,255,255,0.06);border-radius:12px;padding:12px 14px;margin-bottom:8px;animation:slide-in 0.3s ease;border:1px solid rgba(255,255,255,0.06);}
.push-notif.emergency{background:${G.redDim};border-color:${G.redBorder};animation:slide-in 0.3s ease;}
.push-notif.maintenance{background:${G.amberDim};border-color:rgba(245,158,11,0.2);}
.push-notif.payment{background:${G.tealDim};border-color:${G.tealBorder};}
.pn-top{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
.pn-app{font-size:10px;color:${G.muted};font-weight:600;text-transform:uppercase;letter-spacing:0.08em;}
.pn-time{font-size:10px;color:${G.muted};margin-left:auto;}
.pn-title{font-size:13px;font-weight:700;color:${G.white};margin-bottom:3px;line-height:1.2;}
.pn-body{font-size:12px;color:${G.text};line-height:1.4;}
.pn-actions{display:flex;gap:8px;margin-top:8px;}
.pn-btn{flex:1;background:rgba(255,255,255,0.06);border:none;border-radius:7px;padding:6px;font-size:11px;font-weight:600;color:${G.text};cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:background 0.15s;}
.pn-btn:hover{background:rgba(255,255,255,0.1);}
.pn-btn.primary{color:${G.teal};}

/* OPT-IN SETTINGS */
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);}
.toggle-row:last-child{border-bottom:none;}
.tr-left{display:flex;align-items:center;gap:10px;}
.tr-icon{font-size:18px;}
.tr-label{font-size:13px;color:${G.text};font-weight:500;}
.tr-sub{font-size:11px;color:${G.muted};margin-top:1px;}
.toggle-sw{width:40px;height:22px;border-radius:11px;cursor:pointer;position:relative;transition:background 0.2s;flex-shrink:0;}
.toggle-sw.on{background:${G.teal};}
.toggle-sw.off{background:rgba(255,255,255,0.1);}
.toggle-sw::after{content:'';position:absolute;top:3px;width:16px;height:16px;border-radius:50%;background:white;transition:left 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.3);}
.toggle-sw.on::after{left:21px;}
.toggle-sw.off::after{left:3px;}

/* PWA INSTALL */
.install-banner{background:linear-gradient(135deg,rgba(0,201,167,0.1),rgba(0,201,167,0.03));border:1px solid ${G.tealBorder};border-radius:14px;padding:20px;display:flex;align-items:center;gap:18px;margin-bottom:20px;cursor:pointer;transition:all 0.2s;}
.install-banner:hover{background:rgba(0,201,167,0.08);}
.ib-icon{width:52px;height:52px;border-radius:12px;background:${G.s3};border:1px solid ${G.tealBorder};display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;}
.ib-title{font-size:15px;font-weight:700;color:${G.white};margin-bottom:4px;}
.ib-sub{font-size:12px;color:${G.muted};line-height:1.5;}
.ib-btn{background:${G.teal};color:${G.bg};border:none;border-radius:9px;padding:10px 18px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Space Grotesk',sans-serif;white-space:nowrap;flex-shrink:0;transition:all 0.2s;}
.ib-btn:hover{background:${G.electric};}

/* DELIVERY TABLE */
.del-table{width:100%;border-collapse:collapse;font-size:12px;}
.del-table th{padding:8px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:${G.muted};font-weight:600;border-bottom:1px solid ${G.border};}
.del-table td{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.03);color:${G.text};}
.del-table tr:last-child td{border-bottom:none;}
.del-table tr:hover td{background:rgba(255,255,255,0.015);}
.dt-status{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:600;padding:3px 8px;border-radius:4px;}
.dt-status.delivered{background:rgba(0,201,167,0.1);color:${G.teal};}
.dt-status.pending{background:rgba(245,158,11,0.1);color:${G.amber};}
.dt-status.failed{background:${G.redDim};color:${G.red};}

/* EMERGENCY PANEL */
.em-panel{background:${G.redDim};border:1.5px solid ${G.redBorder};border-radius:14px;padding:20px;margin-bottom:20px;}
.em-panel-title{font-size:14px;font-weight:700;color:#ff9090;margin-bottom:8px;display:flex;align-items:center;gap:8px;}
.em-types{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;}
.em-type{border:1px solid rgba(229,57,53,0.2);border-radius:9px;padding:10px;text-align:center;cursor:pointer;transition:all 0.2s;background:rgba(229,57,53,0.05);}
.em-type.sel{border-color:${G.red};background:rgba(229,57,53,0.12);}
.em-type-icon{font-size:22px;display:block;margin-bottom:4px;}
.em-type-label{font-size:11px;color:rgba(255,180,180,0.8);font-weight:600;}

/* FILE CODE BLOCK */
.code-file{background:${G.bg};border:1px solid ${G.border};border-radius:12px;overflow:hidden;margin-bottom:14px;}
.cf-header{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid ${G.border};background:${G.s1};}
.cf-dots{display:flex;gap:5px;}
.cf-dot{width:10px;height:10px;border-radius:50%;}
.cf-filename{font-size:11px;font-family:'Space Mono',monospace;color:${G.text};letter-spacing:0.04em;}
.cf-body{padding:16px;font-size:11px;line-height:1.8;color:rgba(0,201,167,0.85);font-family:'Space Mono',monospace;overflow-x:auto;}
.cf-body .cm{color:${G.muted};}
.cf-body .ck{color:#93c5fd;}
.cf-body .cv{color:#fcd34d;}
.cf-body .cs{color:#86efac;}

/* RESPONSIVE */
@media(max-width:700px){.two-col{grid-template-columns:1fr;}.three-col{grid-template-columns:1fr 1fr;}.type-grid{grid-template-columns:repeat(2,1fr);}.em-types{grid-template-columns:repeat(2,1fr);}.hero{grid-template-columns:1fr;}.hero-stats{align-items:flex-start;}}
`;

const NOTIFICATIONS = [
  { type:"Emergency", color:G.red, dot:"#ff4444", msg:"⚠️ Water shutoff begins NOW — Unit 14B through 28A. Maintenance crew on-site.", channels:["push","sms"], time:"2m ago", units:"47 units" },
  { type:"Maintenance", color:G.amber, dot:G.amber, msg:"🔧 Your ticket #1042 has been assigned. Technician arriving May 8, 9am–11am.", channels:["push","inapp"], time:"2h ago", units:"Unit 14B" },
  { type:"Payment", color:G.teal, dot:G.teal, msg:"💳 Rent reminder: $850 due June 1st. AutoPay is OFF — tap to pay now.", channels:["push","email"], time:"1d ago", units:"31 units" },
  { type:"Community", color:"#a855f7", dot:"#a855f7", msg:"📰 May newsletter is ready. Pool opens May 20, parking resurfacing May 12–14.", channels:["push","email"], time:"3d ago", units:"47 units" },
  { type:"Security", color:G.red, dot:"#ff4444", msg:"🔒 Reminder: Main entrance gate code changed. New code sent to your email.", channels:["push","sms","email"], time:"5d ago", units:"47 units" },
];

const DELIVERY_LOG = [
  { unit:"14B", name:"Jordan Davis", type:"Maintenance update", push:"✓", sms:"—", email:"✓", status:"delivered", time:"2h ago" },
  { unit:"22", name:"Tamara Ellis", type:"Payment reminder", push:"✓", sms:"✓", email:"✓", status:"delivered", time:"1d ago" },
  { unit:"05", name:"Aisha Thompson", type:"Emergency alert", push:"✓", sms:"✓", email:"✓", status:"delivered", time:"2d ago" },
  { unit:"31", name:"Reginald Moon", type:"Newsletter", push:"—", sms:"—", email:"✓", status:"delivered", time:"3d ago" },
  { unit:"38", name:"Cynthia Park", type:"Payment reminder", push:"✗", sms:"✓", email:"✓", status:"pending", time:"1d ago" },
];

const SETUP_STEPS = [
  {
    label: "Create Free Firebase Project",
    desc: "Go to console.firebase.google.com → click Add Project → name it 'churchview-gardens'. Firebase is Google's free notification server — think of it as a radio tower for your app.",
    status: "active",
    link: "console.firebase.google.com",
    tag: "Free · Google Account Required",
    code: `// 1. Go to console.firebase.google.com
// 2. Add Project → "churchview-gardens"  
// 3. Enable Cloud Messaging (FCM)
// 4. Copy your Firebase config object`,
  },
  {
    label: "Add Firebase to Your App",
    desc: "Install the Firebase SDK and paste your config. This connects your app to Firebase's notification system.",
    status: "pending",
    code: `npm install firebase

// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const app = initializeApp({
  apiKey: "YOUR_API_KEY",
  projectId: "churchview-gardens",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
});

export const messaging = getMessaging(app);`,
  },
  {
    label: "Create the Service Worker",
    desc: "A service worker is a tiny background program that receives push notifications even when the app is closed. Create this file exactly as shown.",
    status: "pending",
    code: `// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({ /* paste config here */ });
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification.title,
    { body: payload.notification.body,
      icon: '/churchview-icon.png',
      badge: '/badge-icon.png',
      data: payload.data }
  );
});`,
  },
  {
    label: "Create the Web App Manifest",
    desc: "This file makes your app installable on phones — like a real app icon on the home screen. No App Store required.",
    status: "pending",
    code: `// public/manifest.json
{
  "name": "Churchview Gardens",
  "short_name": "Churchview",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#080c10",
  "theme_color": "#00c9a7",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "description": "Resident portal for Churchview Gardens, Peoria IL"
}`,
  },
  {
    label: "Add Twilio for SMS Backup",
    desc: "If a tenant has push notifications off, Twilio sends an SMS automatically. Sign up free at twilio.com, get a phone number, and add your credentials.",
    status: "pending",
    code: `npm install twilio

// server/send-sms.js
const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendRentReminder(phone, unit, amount) {
  await client.messages.create({
    body: \`Churchview Gardens: Rent of \$\${amount} for Unit \${unit} is due June 1. Pay: https://churchview.app/pay\`,
    from: '+13095550199', // your Twilio number
    to: phone
  });
}`,
  },
  {
    label: "Deploy to Vercel",
    desc: "Vercel gives your app a live URL in minutes — free. This is how tenants get the link to install the app on their phone.",
    status: "pending",
    code: `# Install Vercel CLI
npm install -g vercel

# Deploy your app
vercel --prod

# Your app goes live at:
# https://churchview-gardens.vercel.app
# 
# Share this link with all 47 tenants.
# On mobile → browser menu → 
# "Add to Home Screen" → installed!`,
  },
];

export default function PWASystem() {
  const [tab, setTab] = useState("broadcast");
  const [notifType, setNotifType] = useState("");
  const [channels, setChannels] = useState({ push: true, sms: true, email: true, inapp: true });
  const [recipient, setRecipient] = useState("all");
  const [emType, setEmType] = useState("");
  const [settings, setSettings] = useState({ rent:true, maint:true, emergency:true, newsletter:true, security:true, updates:false });
  const [sent, setSent] = useState(false);
  const [showMockNotif, setShowMockNotif] = useState(false);
  const [installed, setInstalled] = useState(false);

  const toggleCh = (k) => setChannels(c => ({ ...c, [k]: !c[k] }));
  const toggleSetting = (k) => setSettings(s => ({ ...s, [k]: !s[k] }));

  const handleSend = () => {
    setSent(true);
    setShowMockNotif(true);
    setTimeout(() => setSent(false), 3000);
  };

  const typeColors = { Notice: "sel-teal", Emergency: "sel-red", Maintenance: "sel-amber", Newsletter: "sel-blue" };

  return (
    <div className="shell">
      <style>{CSS}</style>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="tb-logo">
          <div className="tb-dot" />
          <div>
            <div className="tb-name">Churchview Gardens · Push System</div>
            <div className="tb-tag">FCM + Twilio + PWA · Step 3</div>
          </div>
        </div>
        <div className="tb-right">
          <div className="tb-status"><div className="tb-status-dot" />47 devices connected</div>
          <div className="tb-status"><div className="tb-status-dot" />FCM Online</div>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div>
          <div className="hero-eyebrow">Step 3 of 3 — PWA + Push Alerts</div>
          <div className="hero-title">Reach Every<br /><span>Tenant Instantly</span></div>
          <div className="hero-sub">Push notifications, SMS fallback, emergency broadcast, and a fully installable app — no App Store needed. One link gets Churchview Gardens on every tenant's home screen.</div>
        </div>
        <div className="hero-stats">
          <div className="hs-item"><div className="hs-num"><span>47</span></div><div className="hs-label">Total Units</div></div>
          <div className="hs-item"><div className="hs-num"><span>3</span></div><div className="hs-label">Alert Channels</div></div>
          <div className="hs-item"><div className="hs-num"><span>0</span><span style={{fontSize:14}}>$</span></div><div className="hs-label">App Store Fees</div></div>
        </div>
      </div>

      {/* NAV */}
      <div className="nav-tabs">
        {[["broadcast","📣 Broadcast Center"],["emergency","🚨 Emergency Alert"],["notifications","📋 Notification Log"],["tenant","📱 Tenant View"],["setup","⚙️ Setup Guide"]].map(([id,label]) => (
          <button key={id} className={`nt ${tab===id?"active":""}`} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      <div className="body">

        {/* ══ BROADCAST CENTER ══ */}
        {tab==="broadcast" && (
          <>
            <div className="three-col">
              <div className="stat teal"><span className="stat-icon">📱</span><div className="stat-label">Push Opt-In</div><div className="stat-val">43</div><div className="stat-note teal">91% of 47 units</div></div>
              <div className="stat teal"><span className="stat-icon">💬</span><div className="stat-label">SMS Opt-In</div><div className="stat-val">38</div><div className="stat-note teal">81% of 47 units</div></div>
              <div className="stat amber"><span className="stat-icon">📧</span><div className="stat-label">Email Active</div><div className="stat-val">47</div><div className="stat-note teal">100% coverage</div></div>
            </div>

            {/* PWA INSTALL BANNER */}
            <div className="install-banner" onClick={()=>setInstalled(true)}>
              <div className="ib-icon">🏠</div>
              <div style={{flex:1}}>
                <div className="ib-title">{installed?"✅ App Install Prompt Active":"Share App Install Link with Tenants"}</div>
                <div className="ib-sub">{installed?"Tenants visiting churchview-gardens.vercel.app on mobile will see the 'Add to Home Screen' prompt automatically.":"Once deployed, share one link. Tenants tap 'Add to Home Screen' — your app icon appears instantly, no App Store needed."}</div>
              </div>
              <button className="ib-btn" onClick={e=>{e.stopPropagation();setInstalled(true);}}>
                {installed?"Link Active ✓":"Activate Install"}
              </button>
            </div>

            <div className="two-col">
              {/* COMPOSE */}
              <div className="card">
                <div className="card-head">
                  <div className="ch-left">
                    <div className="ch-icon" style={{background:G.tealDim}}>📣</div>
                    <div><div className="ch-title">Compose Broadcast</div><div className="ch-sub">Send to all or specific units</div></div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="compose-wrap">
                    {/* Type */}
                    <div>
                      <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:8}}>Alert Type</div>
                      <div className="type-grid">
                        {[["Notice","📢","sel-teal","Community"],["Emergency","🚨","sel-red","Urgent"],["Maintenance","🔧","sel-amber","Work Order"],["Newsletter","📰","sel-blue","Monthly"]].map(([t,icon,cls,sub])=>(
                          <div key={t} className={`type-card ${notifType===t?cls:""}`} onClick={()=>setNotifType(t)}>
                            <span className="tc-icon">{icon}</span>
                            <div className="tc-label">{t}</div>
                            <div className="tc-sub">{sub}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:8}}>Subject</div>
                      <input className="fi" placeholder="e.g. Parking lot closed May 12–14" />
                    </div>

                    <div>
                      <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:8}}>Message</div>
                      <textarea className="fi" placeholder="Write your message to residents..." />
                    </div>

                    {/* Channels */}
                    <div>
                      <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:8}}>Delivery Channels</div>
                      <div className="channel-row">
                        {[["push","📱 Push","on-push"],["sms","💬 SMS","on-sms"],["email","📧 Email","on-email"],["inapp","🔔 In-App","on-inapp"]].map(([k,label,cls])=>(
                          <div key={k} className={`ch-toggle ${channels[k]?cls:""}`} onClick={()=>toggleCh(k)}>{label}</div>
                        ))}
                      </div>
                    </div>

                    {/* Recipients */}
                    <div>
                      <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:8}}>Send To</div>
                      <div className="recipient-row">
                        {["all","floor-1","floor-2","1BR","2BR","3BR","late-payers"].map(r=>(
                          <div key={r} className={`rec-chip ${recipient===r?"sel":""}`} onClick={()=>setRecipient(r)}>
                            {r==="all"?"All 47 Units":r==="late-payers"?"Late Payers (3)":r==="floor-1"?"Floor 1":r==="floor-2"?"Floor 2":r.toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </div>

                    {sent ? (
                      <div style={{background:G.tealDim,border:`1px solid ${G.tealBorder}`,borderRadius:10,padding:"13px",textAlign:"center",fontSize:13,color:G.teal,fontWeight:600}}>
                        ✓ Broadcast sent to {recipient==="all"?"47":recipient==="late-payers"?"3":"all"} units via {Object.entries(channels).filter(([,v])=>v).map(([k])=>k).join(", ")}
                      </div>
                    ) : (
                      <button className="send-btn" onClick={handleSend}>📣 Send Broadcast Now</button>
                    )}
                  </div>
                </div>
              </div>

              {/* LIVE PHONE MOCK */}
              <div>
                <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:10}}>Live Preview — Tenant Device</div>
                <div className="phone-mock">
                  <div className="pm-header">
                    <div className="pm-title">Lock Screen</div>
                    <div className="pm-time">9:41</div>
                  </div>

                  {showMockNotif && (
                    <div className={`push-notif ${notifType==="Emergency"?"emergency":notifType==="Maintenance"?"maintenance":notifType==="Newsletter"?"":""}`}>
                      <div className="pn-top">
                        <span style={{fontSize:12}}>🏠</span>
                        <div className="pn-app">Churchview Gardens</div>
                        <div className="pn-time">now</div>
                      </div>
                      <div className="pn-title">{notifType||"Community Notice"}</div>
                      <div className="pn-body">Your message will appear here on every opted-in device instantly.</div>
                      <div className="pn-actions">
                        <button className="pn-btn">Dismiss</button>
                        <button className="pn-btn primary">View →</button>
                      </div>
                    </div>
                  )}

                  {NOTIFICATIONS.slice(0,3).map((n,i)=>(
                    <div key={i} className={`push-notif ${n.type==="Emergency"?"emergency":n.type==="Maintenance"?"maintenance":n.type==="Payment"?"payment":""}`}
                      style={{animationDelay:`${i*0.08}s`}}>
                      <div className="pn-top">
                        <span style={{fontSize:12}}>🏠</span>
                        <div className="pn-app">Churchview Gardens</div>
                        <div className="pn-time">{n.time}</div>
                      </div>
                      <div className="pn-title">{n.type}</div>
                      <div className="pn-body">{n.msg}</div>
                      {i===0&&<div className="pn-actions"><button className="pn-btn">Dismiss</button><button className="pn-btn primary">View →</button></div>}
                    </div>
                  ))}
                </div>

                {/* Channel coverage */}
                <div className="card" style={{marginTop:14}}>
                  <div className="card-body" style={{padding:14}}>
                    {[["📱 Push Notifications","43 / 47 units","91%",G.teal],["💬 SMS (Twilio)","38 / 47 units","81%",G.amber],["📧 Email (SendGrid)","47 / 47 units","100%",G.teal]].map(([ch,coverage,pct,c])=>(
                      <div key={ch} style={{marginBottom:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                          <span style={{color:G.text}}>{ch}</span>
                          <span style={{color:c,fontWeight:600,fontFamily:"'Space Mono',monospace"}}>{pct}</span>
                        </div>
                        <div style={{height:4,background:"rgba(255,255,255,0.05)",borderRadius:2,overflow:"hidden"}}>
                          <div style={{height:"100%",background:c,borderRadius:2,width:pct,transition:"width 1s ease"}} />
                        </div>
                        <div style={{fontSize:10,color:G.muted,marginTop:2}}>{coverage}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══ EMERGENCY ALERT ══ */}
        {tab==="emergency" && (
          <>
            <div className="em-panel">
              <div className="em-panel-title">🚨 Emergency Broadcast — Churchview Gardens</div>
              <div style={{fontSize:12,color:"rgba(255,160,160,0.7)",marginBottom:16,lineHeight:1.6}}>
                Activates immediately across ALL 47 units via push + SMS + email simultaneously. Reserved for life-safety events. This button sends before you can second-guess it.
              </div>
              <div className="em-types">
                {[["🔥","Fire / Evacuation"],["⛽","Gas Leak"],["💧","Flood / Water"],["🔒","Security Threat"],["⚡","Power Emergency"],["🌪️","Severe Weather"]].map(([icon,label])=>(
                  <div key={label} className={`em-type ${emType===label?"sel":""}`} onClick={()=>setEmType(label)}>
                    <span className="em-type-icon">{icon}</span>
                    <div className="em-type-label">{label}</div>
                  </div>
                ))}
              </div>
              <textarea className="fi" placeholder="Describe the emergency and required resident action (e.g. 'Evacuate immediately via stairwell B. Do not use elevators.')..." style={{marginBottom:14,borderColor:"rgba(229,57,53,0.3)"}} />
              <div style={{display:"flex",gap:10,marginBottom:12}}>
                {[["📱 Push","ALL 47"],["💬 SMS","38 units"],["📧 Email","ALL 47"]].map(([ch,count])=>(
                  <div key={ch} style={{flex:1,background:"rgba(229,57,53,0.08)",border:"1px solid rgba(229,57,53,0.2)",borderRadius:9,padding:"10px",textAlign:"center"}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#ff9090",marginBottom:2}}>{ch}</div>
                    <div style={{fontSize:10,color:"rgba(255,150,150,0.6)"}}>{count}</div>
                  </div>
                ))}
              </div>
              <button className="em-btn">🚨 SEND EMERGENCY ALERT TO ALL 47 UNITS</button>
            </div>

            {/* POST-SEND WORKFLOW */}
            <div className="card">
              <div className="card-head">
                <div className="ch-left">
                  <div className="ch-icon" style={{background:G.redDim}}>📋</div>
                  <div><div className="ch-title">After Emergency Broadcast — What Happens</div></div>
                </div>
              </div>
              <div className="card-body">
                {[
                  ["1","Push notification appears on all 47 opted-in phones within 3 seconds — even if the app is closed.","immediate"],
                  ["2","Twilio sends SMS to 38 opted-in numbers as fallback within 30 seconds.","30 sec"],
                  ["3","SendGrid sends email to all 47 units as a third layer.","~2 min"],
                  ["4","Admin dashboard logs delivery confirmation per unit.","real-time"],
                  ["5","Tenants tap notification → app opens to full emergency detail screen.","on tap"],
                ].map(([n,desc,time])=>(
                  <div key={n} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                    <div style={{width:26,height:26,borderRadius:"50%",background:G.redDim,border:`1px solid ${G.redBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:G.red,flexShrink:0,marginTop:2}}>{n}</div>
                    <div style={{flex:1,fontSize:12,color:G.text,lineHeight:1.6}}>{desc}</div>
                    <div style={{fontSize:10,color:G.muted,fontFamily:"'Space Mono',monospace",flexShrink:0,paddingTop:3}}>{time}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══ NOTIFICATION LOG ══ */}
        {tab==="notifications" && (
          <>
            <div className="card" style={{marginBottom:16}}>
              <div className="card-head">
                <div className="ch-left">
                  <div className="ch-icon" style={{background:G.tealDim}}>📋</div>
                  <div><div className="ch-title">Recent Broadcasts</div><div className="ch-sub">All channels · Churchview Gardens</div></div>
                </div>
              </div>
              <div className="card-body" style={{padding:"8px 18px"}}>
                {NOTIFICATIONS.map((n,i)=>(
                  <div className="notif-item" key={i}>
                    <div className="ni-dot-wrap">
                      <div className="ni-dot" style={{background:n.dot}} />
                      {i<NOTIFICATIONS.length-1&&<div className="ni-line"/>}
                    </div>
                    <div className="ni-content">
                      <div className="ni-type" style={{color:n.dot}}>{n.type} · {n.units}</div>
                      <div className="ni-msg">{n.msg}</div>
                      <div className="ni-channels">
                        {n.channels.map(c=><span key={c} className={`ni-ch ${c}`}>{c.toUpperCase()}</span>)}
                      </div>
                    </div>
                    <div style={{fontSize:10,color:G.muted,fontFamily:"'Space Mono',monospace",flexShrink:0,paddingTop:4}}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <div className="ch-left">
                  <div className="ch-icon" style={{background:G.tealDim}}>📬</div>
                  <div><div className="ch-title">Delivery Log — Per Unit</div><div className="ch-sub">Last 5 notifications tracked</div></div>
                </div>
              </div>
              <div style={{overflowX:"auto"}}>
                <table className="del-table">
                  <thead>
                    <tr><th>Unit</th><th>Resident</th><th>Notification</th><th>Push</th><th>SMS</th><th>Email</th><th>Status</th><th>Sent</th></tr>
                  </thead>
                  <tbody>
                    {DELIVERY_LOG.map((d,i)=>(
                      <tr key={i}>
                        <td style={{color:G.white,fontWeight:600}}>{d.unit}</td>
                        <td>{d.name}</td>
                        <td>{d.type}</td>
                        <td style={{color:d.push==="✓"?G.teal:d.push==="✗"?G.red:G.muted}}>{d.push}</td>
                        <td style={{color:d.sms==="✓"?G.amber:d.sms==="✗"?G.red:G.muted}}>{d.sms}</td>
                        <td style={{color:d.email==="✓"?"#d8b4fe":d.email==="✗"?G.red:G.muted}}>{d.email}</td>
                        <td><span className={`dt-status ${d.status}`}>{d.status}</span></td>
                        <td style={{color:G.muted,fontFamily:"'Space Mono',monospace",fontSize:11}}>{d.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══ TENANT VIEW ══ */}
        {tab==="tenant" && (
          <div className="two-col">
            <div>
              <div className="card" style={{marginBottom:16}}>
                <div className="card-head">
                  <div className="ch-left">
                    <div className="ch-icon" style={{background:G.tealDim}}>🔔</div>
                    <div><div className="ch-title">My Notification Settings</div><div className="ch-sub">Jordan Davis · Unit 14B</div></div>
                  </div>
                </div>
                <div className="card-body">
                  {[
                    ["emergency","🚨","Emergency Alerts","Fire, gas, security threats — always on","always"],
                    ["rent","💳","Rent Reminders","Due date alerts and payment confirmations",null],
                    ["maint","🔧","Maintenance Updates","Status changes on your work orders",null],
                    ["newsletter","📰","Community Newsletter","Monthly updates and property news",null],
                    ["security","🔒","Security & Access","Gate codes, building access alerts",null],
                    ["updates","📢","General Notices","Parking, amenity closures, property info",null],
                  ].map(([k,icon,label,sub,locked])=>(
                    <div className="toggle-row" key={k}>
                      <div className="tr-left">
                        <div className="tr-icon">{icon}</div>
                        <div>
                          <div className="tr-label">{label}</div>
                          <div className="tr-sub">{locked?"⚠️ Required — cannot be disabled":sub}</div>
                        </div>
                      </div>
                      <div className={`toggle-sw ${locked?"on":settings[k]?"on":"off"}`}
                        onClick={()=>!locked&&toggleSetting(k)} style={{cursor:locked?"not-allowed":"pointer",opacity:locked?0.7:1}} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-head">
                  <div className="ch-left">
                    <div className="ch-icon" style={{background:G.tealDim}}>📱</div>
                    <div><div className="ch-title">Install the App</div><div className="ch-sub">Add Churchview Gardens to your home screen</div></div>
                  </div>
                </div>
                <div className="card-body">
                  <div style={{textAlign:"center",padding:"16px 0"}}>
                    <div style={{width:72,height:72,background:G.s3,border:`1px solid ${G.tealBorder}`,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 14px",boxShadow:`0 0 20px rgba(0,201,167,0.15)`}}>🏠</div>
                    <div style={{fontSize:15,fontWeight:700,color:G.white,marginBottom:6}}>Churchview Gardens</div>
                    <div style={{fontSize:12,color:G.muted,marginBottom:20,lineHeight:1.6}}>Works like a real app. No App Store.<br/>Get push notifications even when browser is closed.</div>
                    {[["iPhone / iPad","Open in Safari → Share → Add to Home Screen","🍎"],["Android","Open in Chrome → ⋮ Menu → Add to Home Screen","🤖"],["Desktop","Click install icon in browser address bar","💻"]].map(([device,steps,icon])=>(
                      <div key={device} style={{display:"flex",gap:10,padding:"10px 0",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"left"}}>
                        <span style={{fontSize:20,flexShrink:0}}>{icon}</span>
                        <div><div style={{fontSize:12,fontWeight:600,color:G.text,marginBottom:2}}>{device}</div><div style={{fontSize:11,color:G.muted}}>{steps}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style={{fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:10}}>Tenant Notification Inbox</div>
              <div className="card">
                <div className="card-body" style={{padding:"8px 16px"}}>
                  {NOTIFICATIONS.map((n,i)=>(
                    <div className="notif-item" key={i}>
                      <div className="ni-dot-wrap">
                        <div className="ni-dot" style={{background:n.dot,boxShadow:`0 0 6px ${n.dot}`}} />
                        {i<NOTIFICATIONS.length-1&&<div className="ni-line"/>}
                      </div>
                      <div className="ni-content">
                        <div className="ni-type" style={{color:n.dot}}>{n.type}</div>
                        <div className="ni-msg">{n.msg}</div>
                        <div className="ni-meta">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ SETUP GUIDE ══ */}
        {tab==="setup" && (
          <>
            <div style={{background:G.tealDim,border:`1px solid ${G.tealBorder}`,borderRadius:12,padding:"14px 18px",marginBottom:20,fontSize:13,color:G.teal,lineHeight:1.6}}>
              ⚡ <strong>Total setup time: ~45 minutes.</strong> You need a Google account (free), a Twilio account (free trial), and your app deployed on Vercel (free). Follow each step in order.
            </div>

            <div className="card" style={{marginBottom:16}}>
              <div className="card-head">
                <div className="ch-left">
                  <div className="ch-icon" style={{background:G.tealDim,fontSize:16}}>🗺️</div>
                  <div><div className="ch-title">Complete Stack — What Gets Built</div></div>
                </div>
              </div>
              <div className="card-body">
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                  {[
                    ["Firebase FCM","Push notifications to all opted-in phones","Free tier","🔔"],
                    ["Twilio SMS","Text message fallback — no push needed","~$0.01/SMS","💬"],
                    ["SendGrid Email","Email delivery for newsletters + alerts","Free 100/day","📧"],
                    ["Vercel Hosting","Your app live at a real URL instantly","Free","🌐"],
                    ["Service Worker","Push works even when app is closed","Built-in","⚙️"],
                    ["Web Manifest","App installs like native on home screen","Built-in","📱"],
                  ].map(([name,desc,cost,icon])=>(
                    <div key={name} style={{background:G.s3,border:`1px solid ${G.border}`,borderRadius:10,padding:14}}>
                      <div style={{fontSize:20,marginBottom:8}}>{icon}</div>
                      <div style={{fontSize:12,fontWeight:600,color:G.white,marginBottom:4}}>{name}</div>
                      <div style={{fontSize:11,color:G.muted,lineHeight:1.5,marginBottom:6}}>{desc}</div>
                      <div style={{fontSize:10,color:G.teal,fontFamily:"'Space Mono',monospace"}}>{cost}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{marginBottom:16}}>
              <div className="card-head">
                <div className="ch-left">
                  <div className="ch-icon" style={{background:G.tealDim}}>📋</div>
                  <div><div className="ch-title">Step-by-Step Setup</div><div className="ch-sub">Follow in order — takes ~45 min total</div></div>
                </div>
              </div>
              <div className="card-body">
                {SETUP_STEPS.map((s,i)=>(
                  <div className="setup-step" key={i}>
                    <div className={`ss-num ${i===0?"active":i<0?"done":"pending"}`}>{i+1}</div>
                    <div>
                      <div className="ss-title">{s.label}</div>
                      <div className="ss-desc">{s.desc}</div>
                      {s.tag&&<div className="ss-tag">ℹ️ {s.tag}</div>}
                      {s.link&&<div className="ss-link">→ {s.link}</div>}
                      {s.code&&(
                        <div className="code-file" style={{marginTop:10}}>
                          <div className="cf-header">
                            <div className="cf-dots"><div className="cf-dot" style={{background:"#ff5f57"}}/><div className="cf-dot" style={{background:"#febc2e"}}/><div className="cf-dot" style={{background:"#28c840"}}/></div>
                            <div className="cf-filename">{i===2?"firebase-messaging-sw.js":i===3?"manifest.json":i===4?"server/send-sms.js":i===5?"terminal":`.js`}</div>
                          </div>
                          <div className="cf-body">{s.code}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ENVIRONMENT VARIABLES */}
            <div className="code-file">
              <div className="cf-header">
                <div className="cf-dots"><div className="cf-dot" style={{background:"#ff5f57"}}/><div className="cf-dot" style={{background:"#febc2e"}}/><div className="cf-dot" style={{background:"#28c840"}}/></div>
                <div className="cf-filename">.env.local — Paste into Vercel Environment Variables</div>
              </div>
              <div className="cf-body">{`# Firebase (from Firebase Console → Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=churchview-gardens
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_ADMIN_SDK_KEY=your_admin_sdk_json

# Twilio (from twilio.com → Console)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+13095550199

# SendGrid (from sendgrid.com → API Keys)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@churchviewgardens.com

# Stripe (from Step 2)
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx`}</div>
            </div>

            <div style={{background:G.tealDim,border:`1px solid ${G.tealBorder}`,borderRadius:12,padding:18,marginTop:16}}>
              <div style={{fontSize:14,fontWeight:700,color:G.white,marginBottom:10}}>✅ App is Launch-Ready When:</div>
              {["Vercel deployment is live at churchview-gardens.vercel.app","Firebase FCM keys are in Vercel env variables","Service worker file is in /public folder","Manifest.json is in /public folder","Twilio number is active and tested (send a test SMS)","You've pushed a test notification from the broadcast panel","All 47 units have been texted the install link"].map((item,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(0,201,167,0.1)",fontSize:13,color:G.text}}>
                  <span style={{color:G.teal,flexShrink:0}}>□</span>{item}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
