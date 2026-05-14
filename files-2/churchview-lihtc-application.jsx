import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   CHURCHVIEW GARDENS — Section 42 / LIHTC Application Portal
   Managed by: Pivotal Communities
   Administering Agency: IHDA (Illinois Housing Development Authority)
   Program: Low-Income Housing Tax Credit (Section 42 of IRC)
   AMI Source: HUD FY2025 — Peoria, IL MSA (Peoria County)
   ───────────────────────────────────────────────────────────── */

const PROP = {
  name: "Churchview Gardens",
  mgmt: "Pivotal Communities",
  address: "945 South Shelley Street, Peoria, IL 61605",
  phone: "(309) 302-6555",
  email: "churchview@pivotal-communities.com",
  appFee: 17,
  program: "Section 42 / LIHTC",
  ihda: "Illinois Housing Development Authority",
};

/* ─── FY 2025 PEORIA IL MSA — 60% AMI INCOME LIMITS (LIHTC) ───
   Source: HUD MTSP Limits, Peoria County IL, effective April 2025
   These are the MAXIMUM incomes allowed — not minimums.
   ─────────────────────────────────────────────────────────────── */
const AMI_60 = {
  1: 33180, 2: 37920, 3: 42660, 4: 47400,
  5: 51180, 6: 54960, 7: 58740, 8: 62520,
};
const AMI_50 = {
  1: 27650, 2: 31600, 3: 35550, 4: 39500,
  5: 42650, 6: 45800, 7: 48950, 8: 52100,
};

/* ─── FLOOR PLANS — Rent based on HUD utility-adjusted limits ─── */
const PLANS = {
  "1BR-60": { label: "1 Bedroom (60% AMI)", rent: 750, sqft: 642, bath: 1, ami: 60 },
  "2BR-60": { label: "2 Bedroom (60% AMI)", rent: 850, sqft: 842, bath: 1.5, ami: 60 },
  "3BR-60": { label: "3 Bedroom (60% AMI)", rent: 975, sqft: 1113, bath: 2, ami: 60 },
  "3TH-60": { label: "3BR Garden Townhome (60% AMI)", rent: 975, sqft: 1113, bath: 2, ami: 60 },
  "3TH-GR": { label: "3BR Townhome Grand (60% AMI)", rent: 1025, sqft: 1113, bath: 2, ami: 60 },
};

const STEPS = ["Pre-Qualify","Unit","Household","Income & Assets","Student Status","Documents","Certify & Fee"];

const G = {
  bg: "#111318",
  surface: "#171b24",
  card: "#1c2130",
  cardLight: "#222839",
  border: "rgba(255,255,255,0.07)",
  borderBlue: "rgba(74,120,210,0.3)",
  blue: "#4a78d2",
  blueLight: "#6a98e8",
  blueDim: "rgba(74,120,210,0.1)",
  gold: "#c8a84b",
  goldDim: "rgba(200,168,75,0.1)",
  green: "#3aab6d",
  greenDim: "rgba(58,171,109,0.08)",
  white: "#e8edf5",
  text: "#b8c4d8",
  muted: "#5c6e88",
  danger: "#c95050",
  dangerDim: "rgba(201,80,80,0.08)",
  warning: "#c87c35",
  warnDim: "rgba(200,124,53,0.1)",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Instrument Sans',sans-serif;background:${G.bg};color:${G.text};min-height:100vh;}
::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:rgba(74,120,210,0.3);border-radius:4px;}
.wrap{max-width:780px;margin:0 auto;padding:0 0 80px;}

/* HERO */
.hero{background:linear-gradient(180deg,rgba(74,120,210,0.07) 0%,transparent 100%);border-bottom:1px solid ${G.border};padding:36px 28px 28px;text-align:center;}
.hero-prog{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:20px;background:${G.blueDim};border:1px solid ${G.borderBlue};font-size:11px;color:${G.blueLight};font-family:'JetBrains Mono',monospace;letter-spacing:0.08em;margin-bottom:16px;}
.hero-title{font-family:'Fraunces',serif;font-size:30px;font-weight:700;color:${G.white};margin-bottom:8px;line-height:1.15;}
.hero-addr{font-size:13px;color:${G.muted};margin-bottom:16px;}
.badges{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}
.badge{font-size:11px;padding:5px 12px;border-radius:20px;border:1px solid ${G.border};color:${G.muted};font-weight:500;}
.badge.blue{border-color:${G.borderBlue};color:${G.blueLight};background:${G.blueDim};}
.badge.gold{border-color:rgba(200,168,75,0.3);color:${G.gold};background:${G.goldDim};}
.badge.green{border-color:rgba(58,171,109,0.25);color:${G.green};background:${G.greenDim};}

/* PROGRESS */
.prog-bar{background:${G.surface};border-bottom:1px solid ${G.border};padding:0 12px;overflow-x:auto;scrollbar-width:none;}
.prog-bar::-webkit-scrollbar{display:none;}
.prog-steps{display:flex;min-width:max-content;}
.ps{padding:13px 10px 11px;text-align:center;position:relative;min-width:90px;}
.ps-n{width:22px;height:22px;border-radius:50%;margin:0 auto 5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;font-family:'JetBrains Mono',monospace;transition:all 0.2s;}
.ps-l{font-size:9px;color:${G.muted};font-weight:500;line-height:1.2;white-space:nowrap;}
.ps.done .ps-n{background:${G.green};color:#fff;}
.ps.done .ps-l{color:${G.green};}
.ps.active .ps-n{background:${G.blue};color:#fff;box-shadow:0 0 10px rgba(74,120,210,0.4);}
.ps.active .ps-l{color:${G.blueLight};}
.ps.pending .ps-n{background:rgba(255,255,255,0.05);color:${G.muted};}

/* CONTENT */
.content{padding:28px;}
.step-h{font-family:'Fraunces',serif;font-size:22px;font-weight:600;color:${G.white};margin-bottom:4px;}
.step-d{font-size:13px;color:${G.muted};line-height:1.6;margin-bottom:22px;}

/* SECTION */
.sec{margin-bottom:22px;}
.sec-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.13em;text-transform:uppercase;color:${G.blue};margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.sec-label::after{content:'';flex:1;height:1px;background:rgba(74,120,210,0.15);}

/* FORM */
.fg{margin-bottom:13px;}
.fl{display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;color:${G.muted};margin-bottom:6px;}
.fl .req{color:${G.blue};}
.fi{width:100%;background:${G.cardLight};border:1px solid ${G.border};border-radius:9px;padding:11px 14px;font-size:14px;color:${G.white};font-family:'Instrument Sans',sans-serif;outline:none;transition:border-color 0.2s;-webkit-appearance:none;}
.fi:focus{border-color:rgba(74,120,210,0.5);}
.fi::placeholder{color:rgba(255,255,255,0.18);}
.fi-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.fi-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
select.fi{cursor:pointer;}
textarea.fi{resize:none;height:80px;}

/* INFO BOX */
.ib{display:flex;gap:10px;padding:12px 14px;border-radius:10px;margin-bottom:14px;font-size:12px;line-height:1.65;}
.ib.blue{background:${G.blueDim};border:1px solid ${G.borderBlue};color:rgba(160,190,255,0.9);}
.ib.green{background:${G.greenDim};border:1px solid rgba(58,171,109,0.2);color:rgba(120,210,155,0.9);}
.ib.gold{background:${G.goldDim};border:1px solid rgba(200,168,75,0.2);color:rgba(225,190,100,0.9);}
.ib.danger{background:${G.dangerDim};border:1px solid rgba(201,80,80,0.2);color:rgba(255,140,140,0.9);}
.ib.warn{background:${G.warnDim};border:1px solid rgba(200,124,53,0.2);color:rgba(230,160,90,0.9);}

/* OPTION CARDS */
.opt-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}
.opt{border:1.5px solid ${G.border};border-radius:11px;padding:14px;cursor:pointer;transition:all 0.2s;background:${G.card};}
.opt:hover{border-color:rgba(74,120,210,0.35);}
.opt.sel{border-color:${G.blue};background:${G.blueDim};}
.opt.sel-g{border-color:${G.green};background:${G.greenDim};}
.opt.sel-r{border-color:${G.danger};background:${G.dangerDim};}
.opt-icon{font-size:20px;margin-bottom:6px;display:block;}
.opt-label{font-size:13px;font-weight:600;color:${G.white};margin-bottom:2px;}
.opt-sub{font-size:11px;color:${G.muted};line-height:1.3;}
.opt-rent{font-family:'Fraunces',serif;font-size:17px;color:${G.blueLight};font-weight:700;margin-top:5px;}
.opt-ami{font-size:10px;color:${G.blue};font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-top:2px;}

/* RADIO */
.radio-group{display:flex;flex-direction:column;gap:8px;}
.ri{display:flex;align-items:flex-start;gap:10px;padding:11px 14px;border:1.5px solid ${G.border};border-radius:9px;cursor:pointer;transition:all 0.2s;background:${G.card};}
.ri:hover{border-color:rgba(74,120,210,0.3);}
.ri.sel{border-color:${G.blue};background:${G.blueDim};}
.ri.sel-r{border-color:${G.danger};background:${G.dangerDim};}
.ri.sel-g{border-color:${G.green};background:${G.greenDim};}
.rd{width:16px;height:16px;border-radius:50%;border:1.5px solid ${G.border};flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.2s;margin-top:1px;}
.ri.sel .rd{border-color:${G.blue};background:${G.blue};}
.ri.sel .rd::after,.ri.sel-r .rd::after,.ri.sel-g .rd::after{content:'';width:5px;height:5px;border-radius:50%;background:#fff;}
.ri.sel-r .rd{border-color:${G.danger};background:${G.danger};}
.ri.sel-g .rd{border-color:${G.green};background:${G.green};}
.ri-label{font-size:13px;color:${G.text};font-weight:500;flex:1;}
.ri-sub{font-size:11px;color:${G.muted};margin-top:2px;line-height:1.4;}

/* AMI TABLE */
.ami-table{width:100%;border-collapse:collapse;margin-bottom:14px;font-size:12px;}
.ami-table th{background:rgba(74,120,210,0.1);color:${G.blueLight};font-weight:600;text-align:left;padding:8px 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;}
.ami-table td{padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.04);color:${G.text};}
.ami-table tr.active-row td{background:rgba(74,120,210,0.06);color:${G.white};font-weight:600;}
.ami-table tr:last-child td{border-bottom:none;}
.ami-limit{color:${G.danger};font-weight:600;}

/* INCOME SOURCES */
.income-src{display:flex;flex-direction:column;gap:8px;margin-bottom:14px;}
.inc-item{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid ${G.border};border-radius:9px;background:${G.card};cursor:pointer;transition:all 0.2s;}
.inc-item:hover{border-color:rgba(74,120,210,0.2);}
.inc-item.active{border-color:${G.blue};background:${G.blueDim};}
.inc-left{display:flex;align-items:center;gap:10px;}
.inc-check{width:18px;height:18px;border-radius:4px;border:1.5px solid ${G.border};display:flex;align-items:center;justify-content:center;font-size:10px;transition:all 0.2s;flex-shrink:0;}
.inc-item.active .inc-check{background:${G.blue};border-color:${G.blue};color:#fff;font-weight:700;}
.inc-label{font-size:12px;font-weight:500;color:${G.text};}
.inc-input{background:${G.cardLight};border:1px solid ${G.border};border-radius:6px;padding:5px 10px;font-size:13px;color:${G.white};font-family:'Instrument Sans',sans-serif;outline:none;width:120px;text-align:right;}
.inc-input:focus{border-color:rgba(74,120,210,0.4);}

/* DOCS */
.doc-list{display:flex;flex-direction:column;gap:10px;}
.doc-item{border:1.5px dashed ${G.border};border-radius:11px;padding:14px 16px;display:flex;align-items:flex-start;gap:13px;cursor:pointer;transition:all 0.2s;background:${G.card};}
.doc-item:hover{border-color:rgba(74,120,210,0.35);}
.doc-item.up{border-style:solid;border-color:rgba(58,171,109,0.4);background:${G.greenDim};}
.di-icon{width:38px;height:38px;border-radius:9px;background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
.doc-item.up .di-icon{background:rgba(58,171,109,0.12);}
.di-title{font-size:13px;font-weight:600;color:${G.white};margin-bottom:3px;line-height:1.3;}
.di-sub{font-size:11px;color:${G.muted};line-height:1.4;}
.di-sub em{color:${G.blue};font-style:normal;}
.di-badge{font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px;flex-shrink:0;margin-top:2px;}
.di-badge.req{background:rgba(74,120,210,0.12);color:${G.blueLight};}
.di-badge.opt{background:rgba(255,255,255,0.05);color:${G.muted};}
.di-badge.up{background:rgba(58,171,109,0.15);color:${G.green};}

/* CERT CARD */
.cert-card{background:${G.card};border:1px solid ${G.border};border-radius:12px;overflow:hidden;margin-bottom:16px;}
.cc-head{padding:14px 18px;border-bottom:1px solid ${G.border};display:flex;align-items:center;gap:10px;}
.cc-icon{width:28px;height:28px;border-radius:7px;background:${G.blueDim};display:flex;align-items:center;justify-content:center;font-size:13px;}
.cc-title{font-size:14px;font-weight:600;color:${G.white};}
.cc-body{padding:16px 18px;}
.rev-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px;}
.rev-row:last-child{border-bottom:none;}
.rr-l{color:${G.muted};}
.rr-v{color:${G.white};font-weight:500;text-align:right;max-width:55%;}
.rr-v.green{color:${G.green};}
.rr-v.blue{color:${G.blueLight};}

/* FEE BOX */
.fee-box{background:${G.card};border:1px solid ${G.border};border-radius:12px;overflow:hidden;margin-bottom:16px;}
.fee-total-row{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:${G.blueDim};border-top:1px solid ${G.borderBlue};}
.ft-label{font-size:13px;color:rgba(160,190,255,0.7);text-transform:uppercase;letter-spacing:0.08em;font-weight:600;}
.ft-val{font-family:'Fraunces',serif;font-size:26px;font-weight:700;color:${G.blueLight};}

/* LEGAL */
.legal-box{background:rgba(255,255,255,0.02);border:1px solid ${G.border};border-radius:10px;padding:14px;font-size:11px;color:${G.muted};line-height:1.7;margin-bottom:14px;}
.legal-box strong{color:${G.text};}

/* DISQUAL */
.dq-wrap{background:${G.dangerDim};border:1.5px solid rgba(201,80,80,0.3);border-radius:14px;padding:28px;text-align:center;margin-bottom:16px;}
.dq-icon{font-size:40px;margin-bottom:14px;}
.dq-title{font-family:'Fraunces',serif;font-size:21px;color:#ff9a9a;margin-bottom:8px;}
.dq-sub{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:18px;}
.dq-reasons{text-align:left;display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
.dq-r{padding:10px 14px;background:rgba(201,80,80,0.07);border:1px solid rgba(201,80,80,0.18);border-radius:9px;font-size:12px;color:#f8aaaa;line-height:1.5;display:flex;gap:8px;}
.dq-resources{background:rgba(255,255,255,0.03);border-radius:10px;padding:14px;text-align:left;}
.dq-res-title{font-size:11px;font-weight:600;color:${G.muted};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;}
.dq-res-item{font-size:12px;color:${G.muted};padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);line-height:1.5;}
.dq-res-item:last-child{border-bottom:none;}
.dq-res-item a{color:${G.blueLight};}

/* SUCCESS */
.success-wrap{padding:36px 28px;text-align:center;}
.success-ring{width:72px;height:72px;border-radius:50%;background:${G.greenDim};border:2px solid rgba(58,171,109,0.35);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;}
.success-title{font-family:'Fraunces',serif;font-size:26px;color:${G.white};margin-bottom:8px;}
.success-sub{font-size:14px;color:${G.muted};line-height:1.7;margin-bottom:24px;}
.app-id{font-family:'JetBrains Mono',monospace;font-size:13px;color:${G.blueLight};background:${G.card};border:1px solid ${G.border};border-radius:9px;padding:13px 18px;margin-bottom:24px;letter-spacing:0.06em;}
.next-steps{background:${G.card};border:1px solid ${G.border};border-radius:12px;padding:16px 20px;text-align:left;}
.ns-title{font-size:11px;font-weight:600;color:${G.muted};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;}
.ns-row{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px;color:${G.text};line-height:1.5;}
.ns-row:last-child{border-bottom:none;}
.ns-n{width:20px;height:20px;border-radius:50%;background:${G.blueDim};border:1px solid ${G.borderBlue};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:${G.blueLight};flex-shrink:0;margin-top:1px;font-family:'JetBrains Mono',monospace;}

/* BTNS */
.btn-p{width:100%;background:linear-gradient(135deg,${G.blue},${G.blueLight});color:#fff;border:none;border-radius:11px;padding:14px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Instrument Sans',sans-serif;letter-spacing:0.01em;transition:all 0.22s;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;}
.btn-p:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(74,120,210,0.35);}
.btn-p:disabled{opacity:0.45;cursor:not-allowed;transform:none;box-shadow:none;}
.btn-s{width:100%;background:transparent;color:${G.muted};border:1px solid ${G.border};border-radius:11px;padding:13px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Instrument Sans',sans-serif;transition:all 0.2s;}
.btn-s:hover{border-color:rgba(255,255,255,0.15);color:${G.text};}
.btn-row{display:flex;gap:10px;} .btn-row .btn-s{margin-bottom:0;}

@media(max-width:600px){.fi-2,.fi-3,.opt-grid{grid-template-columns:1fr;}.btn-row{flex-direction:column-reverse;}}
`;

/* ─── LIHTC DOCUMENTS ─── */
const DOCS = [
  { id:"id",      icon:"🪪", title:"Government-Issued Photo ID", sub:"Driver's license, state ID, or passport. All adult household members must provide ID.", req:true },
  { id:"ss_card", icon:"🔐", title:"Social Security Card / ITIN", sub:"Preferred but not required per federal law. If unavailable, alternate documentation accepted.", req:false, note:"Optional — SSN not required under LIHTC/IHDA rules" },
  { id:"pay_stub", icon:"💵", title:"Pay Stubs — Most Recent 4 Weeks", sub:"All employed household members. Used to calculate anticipated annual income.", req:true },
  { id:"voe",     icon:"📋", title:"Verification of Employment (VOE)", sub:"Third-party employer verification preferred over pay stubs per HUD Handbook 4350.3.", req:false, note:"Preferred verification method" },
  { id:"award",   icon:"📄", title:"Benefit Award Letters", sub:"Social Security, SSI, disability, pension, child support, alimony, VA benefits — current year letters.", req:false, note:"Required if receiving any benefits" },
  { id:"bank2",   icon:"🏦", title:"Bank / Asset Statements (All Accounts)", sub:"Last 3 months for ALL accounts. Asset income counts toward annual income under LIHTC.", req:true, note:"ALL accounts must be disclosed — checking, savings, retirement, CDs" },
  { id:"tic",     icon:"📝", title:"Tenant Income Certification (TIC)", sub:"Completed & signed at move-in. Property manager provides this form — certifies income accuracy.", req:true, note:"You will complete this with leasing staff" },
  { id:"student", icon:"🎓", title:"Student Status Questionnaire", sub:"Required for all household members. Full-time student households are ineligible under Section 42 federal law.", req:true },
  { id:"voucher", icon:"🏠", title:"Housing Choice Voucher / Section 8 — if applicable", sub:"Churchview Gardens accepts HCV/Section 8. Attach your voucher and PHA contact information.", req:false },
  { id:"birth",   icon:"👶", title:"Birth Certificates (Minors in Household)", sub:"Required to verify household composition and determine applicable income limit tier.", req:false, note:"Required if children in household" },
  { id:"divorce", icon:"⚖️", title:"Divorce Decree / Child Support Order", sub:"If claiming or paying child support or alimony — official court documentation required.", req:false },
];

/* ─── INCOME SOURCES ─── */
const INCOME_SOURCES = [
  { id:"wages",    label:"Wages / Salary (W-2 employment)", icon:"💼" },
  { id:"selfEmp",  label:"Self-Employment / 1099 income", icon:"🔧" },
  { id:"ss",       label:"Social Security / SSI", icon:"🛡️" },
  { id:"disability",label:"Disability income (SSDI, state)", icon:"♿" },
  { id:"pension",  label:"Pension / Retirement income", icon:"🌅" },
  { id:"csupport", label:"Child support / Alimony received", icon:"👶" },
  { id:"unemp",    label:"Unemployment compensation", icon:"📋" },
  { id:"voucher",  label:"Housing Choice Voucher / Section 8", icon:"🏠" },
  { id:"other",    label:"Other income (tips, rental, etc.)", icon:"💰" },
];

/* ─── STUDENT EXEMPTIONS ─── */
const STUDENT_EXEMPTIONS = [
  { id:"s1", text: "At least one household member is NOT a full-time student" },
  { id:"s2", text: "One or more students are married and file (or are entitled to file) a joint return" },
  { id:"s3", text: "A student who is a single parent and their children — none of whom are dependents of another" },
  { id:"s4", text: "A student receiving TANF or similar assistance under Title IV of the Social Security Act" },
  { id:"s5", text: "A student who was previously under foster care (age 18+)" },
];

export default function LIHTCApplication() {
  const [step, setStep] = useState(0);
  const [dq, setDq] = useState(false);
  const [dqReasons, setDqReasons] = useState([]);
  const [done, setDone] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [householdSize, setHouseholdSize] = useState("");
  const [annualIncome, setAnnualIncome] = useState(0);

  const [pre, setPre] = useState({ size: "", estimatedIncome: "", voucher: "", studentAll: "" });
  const [personal, setPersonal] = useState({ first:"", last:"", email:"", phone:"", dob:"", ssn:"", moveIn:"" });
  const [members, setMembers] = useState([{ name:"", dob:"", relation:"", student:"no" }]);
  const [incSources, setIncSources] = useState({});
  const [incAmounts, setIncAmounts] = useState({});
  const [assetTotal, setAssetTotal] = useState("");
  const [assetIncome, setAssetIncome] = useState("");
  const [studentStatus, setStudentStatus] = useState("");
  const [studentExemption, setStudentExemption] = useState("");
  const [uploads, setUploads] = useState({});
  const [payMethod, setPayMethod] = useState("card");

  const plan = PLANS[selectedPlan];
  const hSize = parseInt(pre.size) || 1;
  const maxIncome60 = AMI_60[Math.min(hSize, 8)] || AMI_60[8];
  const maxIncome50 = AMI_50[Math.min(hSize, 8)] || AMI_50[8];
  const totalAnnual = Object.entries(incAmounts).reduce((s, [k,v]) => incSources[k] ? s + (parseFloat(v)||0)*12 : s, 0) + (parseFloat(assetIncome)||0);

  const reqDocs = DOCS.filter(d => d.req);
  const allReqDone = reqDocs.every(d => uploads[d.id]);

  const runPreScreen = () => {
    const reasons = [];
    const est = parseFloat(pre.estimatedIncome) || 0;
    const limit = AMI_60[Math.min(parseInt(pre.size)||1, 8)];

    if (est > limit)
      reasons.push(`Estimated annual household income of $${est.toLocaleString()} exceeds the 60% AMI limit of $${limit.toLocaleString()} for a household of ${pre.size}. Under Section 42 law, income must be AT OR BELOW this limit.`);

    if (pre.studentAll === "yes" && !pre.studentExemption)
      reasons.push("Households in which ALL members are full-time students are ineligible under Section 42 federal law, unless a specific exemption applies. You indicated all members are full-time students with no applicable exemption.");

    if (reasons.length > 0) { setDqReasons(reasons); setDq(true); }
    else { setDq(false); setStep(1); }
  };

  const addMember = () => setMembers(m => [...m, { name:"", dob:"", relation:"", student:"no" }]);
  const updMember = (i, field, val) => setMembers(m => m.map((x, idx) => idx === i ? {...x, [field]:val} : x));

  if (done) return (
    <div className="wrap">
      <style>{CSS}</style>
      <div className="success-wrap">
        <div className="success-ring">✅</div>
        <div className="success-title">Application Submitted</div>
        <div className="success-sub">
          Your Section 42 / LIHTC application for <strong style={{color:G.white}}>Churchview Gardens</strong> has been received.<br />
          The $17 application fee has been processed. Processing time is <strong style={{color:G.white}}>5–10 business days</strong> per IHDA compliance requirements.
        </div>
        <div className="app-id">Application ID: CVG-LIHTC-{Math.floor(Math.random()*90000+10000)}</div>
        <div className="next-steps">
          <div className="ns-title">What Happens Next — Section 42 Process</div>
          {[
            "Income verification: Property staff contacts your employers/benefit agencies directly via third-party VOE.",
            "Asset calculation: All asset income is added to annual gross income per HUD Handbook 4350.3.",
            "Tenant Income Certification (TIC): You'll be called in to sign this official IHDA document.",
            "IHDA compliance review: Your file must meet all Section 42 occupancy requirements before approval.",
            "Lease & move-in: If approved, DocuSign lease packet sent. Security deposit and first month due within 48 hours.",
            "Annual recertification: Every year you must re-verify income to maintain eligibility.",
          ].map((s,i) => <div className="ns-row" key={i}><div className="ns-n">{i+1}</div><div>{s}</div></div>)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="wrap">
      <style>{CSS}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-prog">⚖️ Section 42 / LIHTC Affordable Housing Program</div>
        <div className="hero-title">Churchview Gardens<br />Rental Application</div>
        <div className="hero-addr">945 South Shelley Street · Peoria, IL 61605 · {PROP.phone}<br />Managed by Pivotal Communities · Monitored by IHDA</div>
        <div className="badges">
          <div className="badge blue">$17 Application Fee</div>
          <div className="badge blue">Income Must Be ≤ 60% AMI</div>
          <div className="badge green">HCV / Section 8 Accepted</div>
          <div className="badge gold">Pet Friendly · Smoke-Free</div>
          <div className="badge">Annual Recertification Required</div>
          <div className="badge">U.S. Citizenship NOT Required</div>
        </div>
      </div>

      {/* PROGRESS */}
      {!dq && (
        <div className="prog-bar">
          <div className="prog-steps">
            {STEPS.map((s,i) => (
              <div key={s} className={`ps ${i<step?"done":i===step?"active":"pending"}`}>
                <div className="ps-n">{i<step?"✓":i+1}</div>
                <div className="ps-l">{s}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="content">

        {/* ══ STEP 0: PRE-QUALIFICATION ══ */}
        {step === 0 && !dq && (
          <>
            <div className="step-h">Income Pre-Qualification</div>
            <div className="step-d">Churchview Gardens is an affordable housing community regulated under Section 42 of the federal tax code. This means your income must fall <em>below</em> HUD-established limits — not above them. This 3-question check takes under 60 seconds.</div>

            <div className="ib blue">📋 <span><strong>Important — LIHTC is different from market-rate housing.</strong> There is no income minimum. Instead, your household income must be AT OR BELOW 60% of the Area Median Income (AMI) for Peoria, IL. All income sources count, including assets, benefits, and child support.</span></div>

            <div className="sec"><div className="sec-label">Household Size</div>
              <div className="fg">
                <label className="fl">Total people who will live in the unit <span className="req">*</span></label>
                <select className="fi" value={pre.size} onChange={e => setPre(x=>({...x, size:e.target.value}))}>
                  <option value="">— Select —</option>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?"person":"people"}</option>)}
                </select>
              </div>
            </div>

            {pre.size && (
              <>
                <div className="sec"><div className="sec-label">2025 Income Limits — Peoria, IL MSA</div>
                  <table className="ami-table">
                    <thead><tr><th>Household</th><th>50% AMI Limit</th><th>60% AMI Limit</th></tr></thead>
                    <tbody>
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <tr key={n} className={parseInt(pre.size)===n?"active-row":""}>
                          <td>{n} {n===1?"person":"people"}{parseInt(pre.size)===n?" ← You":""}</td>
                          <td>${AMI_50[n].toLocaleString()}/yr</td>
                          <td className="ami-limit">${AMI_60[n].toLocaleString()}/yr max</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="ib gold">💡 Your income limit is <strong>${AMI_60[parseInt(pre.size)].toLocaleString()}/year</strong> for a household of {pre.size}. All income from all sources combined must be below this number.</div>
                </div>

                <div className="sec"><div className="sec-label">Estimated Annual Household Income</div>
                  <div className="fg">
                    <label className="fl">Combined gross income from ALL sources (all members) <span className="req">*</span></label>
                    <input className="fi" type="number" placeholder="Annual total — before taxes" value={pre.estimatedIncome} onChange={e=>setPre(x=>({...x,estimatedIncome:e.target.value}))} />
                  </div>
                  <div className="ib blue">📌 Include: wages, Social Security, disability, child support, alimony, pension, tips, asset income, rental income, unemployment, and any other source received by any household member.</div>
                </div>

                <div className="sec"><div className="sec-label">Student Status — Federal Requirement</div>
                  <div className="fg">
                    <label className="fl">Are ALL members of your household full-time students? <span className="req">*</span></label>
                    <div className="radio-group">
                      <div className={`ri ${pre.studentAll==="no"?"sel-g":""}`} onClick={()=>setPre(x=>({...x,studentAll:"no"}))}>
                        <div className="rd"/><div><div className="ri-label">No — at least one member is NOT a full-time student</div></div>
                      </div>
                      <div className={`ri ${pre.studentAll==="yes"?"sel-r":""}`} onClick={()=>setPre(x=>({...x,studentAll:"yes"}))}>
                        <div className="rd"/><div><div className="ri-label">Yes — all household members are full-time students</div>
                          <div className="ri-sub">⚠️ All-student households are generally ineligible under Section 42 federal law — exceptions may apply</div></div>
                      </div>
                    </div>
                  </div>

                  {pre.studentAll==="yes" && (
                    <div className="fg">
                      <label className="fl">Does any of the following exceptions apply? <span className="req">*</span></label>
                      <div className="radio-group">
                        {STUDENT_EXEMPTIONS.map(e => (
                          <div key={e.id} className={`ri ${pre.studentExemption===e.id?"sel":""}`} onClick={()=>setPre(x=>({...x,studentExemption:e.id}))}>
                            <div className="rd"/><div className="ri-label">{e.text}</div>
                          </div>
                        ))}
                        <div className={`ri ${pre.studentExemption==="none"?"sel-r":""}`} onClick={()=>setPre(x=>({...x,studentExemption:"none"}))}>
                          <div className="rd"/><div className="ri-label">None of the above apply</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="fg">
                  <label className="fl">Do you have a Housing Choice Voucher (Section 8)? <span className="req">*</span></label>
                  <div className="radio-group">
                    <div className={`ri ${pre.voucher==="yes"?"sel-g":""}`} onClick={()=>setPre(x=>({...x,voucher:"yes"}))}>
                      <div className="rd"/><div><div className="ri-label">Yes — I have an HCV/Section 8 voucher</div>
                        <div className="ri-sub">Churchview Gardens accepts Housing Choice Vouchers ✓</div></div>
                    </div>
                    <div className={`ri ${pre.voucher==="no"?"sel":""}`} onClick={()=>setPre(x=>({...x,voucher:"no"}))}>
                      <div className="rd"/><div className="ri-label">No — I will pay market LIHTC rate</div>
                    </div>
                  </div>
                </div>

                <button className="btn-p"
                  onClick={runPreScreen}
                  disabled={!pre.size||!pre.estimatedIncome||!pre.studentAll||!pre.voucher||(pre.studentAll==="yes"&&!pre.studentExemption)}>
                  Check My Eligibility →
                </button>
              </>
            )}
          </>
        )}

        {/* ══ DISQUALIFIED ══ */}
        {dq && (
          <>
            <div className="dq-wrap">
              <div className="dq-icon">❌</div>
              <div className="dq-title">Eligibility Requirements Not Met</div>
              <div className="dq-sub">Based on your responses, this application does not meet the federal Section 42 / LIHTC eligibility requirements at this time. <strong style={{color:"rgba(255,255,255,0.7)"}}>Your $17 application fee has NOT been charged.</strong></div>
              <div className="dq-reasons">
                {dqReasons.map((r,i) => <div className="dq-r" key={i}><span>⚠️</span><span>{r}</span></div>)}
              </div>
              <div className="dq-resources">
                <div className="dq-res-title">Resources & Next Steps</div>
                <div className="dq-res-item">📞 <strong>Pivotal Communities Leasing Office:</strong> {PROP.phone} — ask about other properties or wait lists</div>
                <div className="dq-res-item">🏛️ <strong>Illinois Housing Development Authority (IHDA):</strong> ihda.org — find other LIHTC properties in Peoria</div>
                <div className="dq-res-item">🏠 <strong>Peoria Housing Authority:</strong> Section 8 voucher assistance for income-over-limit households</div>
                <div className="dq-res-item">📋 <strong>211 Illinois:</strong> Dial 2-1-1 for comprehensive housing referral services in Peoria County</div>
              </div>
            </div>
            <button className="btn-s" onClick={()=>{setDq(false);setPre({size:"",estimatedIncome:"",voucher:"",studentAll:"",studentExemption:""});}}>← Start Over</button>
          </>
        )}

        {/* ══ STEP 1: UNIT SELECTION ══ */}
        {step===1 && (
          <>
            <div className="step-h">You May Qualify ✓</div>
            <div className="step-d">Your initial responses suggest you may be eligible. Let's complete your full application. Select the unit type you're applying for.</div>
            <div className="ib green">✅ Pre-screen passed. Income appears to be within 60% AMI limits for Peoria, IL. Final eligibility is confirmed after full income verification by property staff.</div>

            <div className="sec"><div className="sec-label">Available Floor Plans — 60% AMI</div>
              <div className="opt-grid">
                {Object.entries(PLANS).map(([key,p]) => (
                  <div key={key} className={`opt ${selectedPlan===key?"sel":""}`} onClick={()=>setSelectedPlan(key)}>
                    <span className="opt-icon">🏠</span>
                    <div className="opt-label">{p.label.split("(")[0].trim()}</div>
                    <div className="opt-sub">{p.sqft} sq ft · {p.bath} bath</div>
                    <div className="opt-rent">${p.rent}/mo</div>
                    <div className="opt-ami">Rent at 60% AMI</div>
                  </div>
                ))}
              </div>
              <div className="ib blue">ℹ️ Rents at Churchview Gardens are set based on HUD area median income guidelines — <strong>not on your personal income.</strong> Rent remains fixed as long as you remain income-eligible upon annual recertification. Utility allowance is applied per IHDA schedule.</div>
            </div>

            <div className="fg">
              <label className="fl">Desired Move-In Date <span className="req">*</span></label>
              <input className="fi" type="date" value={personal.moveIn} onChange={e=>setPersonal(x=>({...x,moveIn:e.target.value}))} />
            </div>

            <div className="btn-row">
              <button className="btn-s" onClick={()=>setStep(0)}>← Back</button>
              <button className="btn-p" onClick={()=>setStep(2)} disabled={!selectedPlan||!personal.moveIn}>Continue →</button>
            </div>
          </>
        )}

        {/* ══ STEP 2: HOUSEHOLD COMPOSITION ══ */}
        {step===2 && (
          <>
            <div className="step-h">Household Composition</div>
            <div className="step-d">Under Section 42, all persons who will reside in the unit must be listed and verified. All household members' income counts toward the limit.</div>

            <div className="sec"><div className="sec-label">Primary Applicant</div>
              <div className="fi-2">
                <div className="fg"><label className="fl">First Name <span className="req">*</span></label><input className="fi" placeholder="First" value={personal.first} onChange={e=>setPersonal(x=>({...x,first:e.target.value}))} /></div>
                <div className="fg"><label className="fl">Last Name <span className="req">*</span></label><input className="fi" placeholder="Last" value={personal.last} onChange={e=>setPersonal(x=>({...x,last:e.target.value}))} /></div>
              </div>
              <div className="fi-2">
                <div className="fg"><label className="fl">Email <span className="req">*</span></label><input className="fi" type="email" placeholder="you@email.com" value={personal.email} onChange={e=>setPersonal(x=>({...x,email:e.target.value}))} /></div>
                <div className="fg"><label className="fl">Phone <span className="req">*</span></label><input className="fi" placeholder="(309) 000-0000" value={personal.phone} onChange={e=>setPersonal(x=>({...x,phone:e.target.value}))} /></div>
              </div>
              <div className="fi-2">
                <div className="fg"><label className="fl">Date of Birth <span className="req">*</span></label><input className="fi" type="date" value={personal.dob} onChange={e=>setPersonal(x=>({...x,dob:e.target.value}))} /></div>
                <div className="fg"><label className="fl">SSN / ITIN (Optional)</label><input className="fi" type="password" placeholder="Optional — not required" value={personal.ssn} onChange={e=>setPersonal(x=>({...x,ssn:e.target.value}))} /></div>
              </div>
              <div className="ib blue" style={{marginTop:4}}>🔐 Social Security Numbers are voluntary under federal LIHTC law (IHDA guidelines). Providing an SSN speeds processing but is not required. ITINs are accepted.</div>
            </div>

            <div className="sec"><div className="sec-label">Additional Household Members</div>
              {members.map((m,i) => (
                <div key={i} style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:11,padding:14,marginBottom:10}}>
                  <div style={{fontSize:12,color:G.muted,marginBottom:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>Member {i+1}</div>
                  <div className="fi-3">
                    <div className="fg"><label className="fl">Full Name</label><input className="fi" placeholder="Name" value={m.name} onChange={e=>updMember(i,"name",e.target.value)} /></div>
                    <div className="fg"><label className="fl">Date of Birth</label><input className="fi" type="date" value={m.dob} onChange={e=>updMember(i,"dob",e.target.value)} /></div>
                    <div className="fg"><label className="fl">Relationship</label>
                      <select className="fi" value={m.relation} onChange={e=>updMember(i,"relation",e.target.value)}>
                        <option value="">Select</option>
                        <option>Spouse / Partner</option><option>Child</option><option>Parent</option><option>Sibling</option><option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="fg"><label className="fl">Full-time student?</label>
                    <div style={{display:"flex",gap:8}}>
                      {["no","yes"].map(v=>(
                        <div key={v} className={`ri ${m.student===v?(v==="yes"?"sel-r":"sel-g"):""}`} style={{flex:1,padding:"8px 12px"}} onClick={()=>updMember(i,"student",v)}>
                          <div className="rd"/><div className="ri-label">{v==="yes"?"Yes — full-time student":"No"}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-s" style={{marginBottom:8}} onClick={addMember}>+ Add Another Household Member</button>
            </div>

            <div className="fg">
              <label className="fl">Do you have pets? (Community is pet-friendly)</label>
              <select className="fi">
                <option>No pets</option><option>1 pet</option><option>2 pets</option>
              </select>
            </div>

            <div className="btn-row">
              <button className="btn-s" onClick={()=>setStep(1)}>← Back</button>
              <button className="btn-p" onClick={()=>setStep(3)}>Continue — Income & Assets →</button>
            </div>
          </>
        )}

        {/* ══ STEP 3: INCOME & ASSETS ══ */}
        {step===3 && (
          <>
            <div className="step-h">Income & Asset Verification</div>
            <div className="step-d">Under LIHTC/Section 42 rules, ALL income from ALL sources must be reported and verified. Income is calculated as anticipated annual amount over the next 12 months — not last year's tax return.</div>

            <div className="ib warn">⚖️ <span><strong>LIHTC Income Calculation Method:</strong> Income is calculated under HUD Handbook 4350.3 Chapter 5 — the same method used for Section 8. This differs from IRS tax filing. Anticipated income for the next 12 months is used, not prior-year income.</span></div>

            <div className="sec"><div className="sec-label">Select All Income Sources — All Household Members</div>
              <div className="income-src">
                {INCOME_SOURCES.map(src => (
                  <div key={src.id} className={`inc-item ${incSources[src.id]?"active":""}`} onClick={()=>setIncSources(s=>({...s,[src.id]:!s[src.id]}))}>
                    <div className="inc-left">
                      <div className="inc-check">{incSources[src.id]?"✓":""}</div>
                      <div className="inc-label">{src.icon} {src.label}</div>
                    </div>
                    {incSources[src.id] && (
                      <input className="inc-input" type="number" placeholder="$/mo" onClick={e=>e.stopPropagation()} value={incAmounts[src.id]||""} onChange={e=>setIncAmounts(a=>({...a,[src.id]:e.target.value}))} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Running total */}
            {totalAnnual > 0 && (
              <div style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:10,padding:14,marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,color:G.muted}}>Estimated Annual Income</span>
                <span style={{fontFamily:"'Fraunces',serif",fontSize:20,color:totalAnnual>maxIncome60?G.danger:G.green,fontWeight:700}}>
                  ${totalAnnual.toLocaleString()}/yr
                  {totalAnnual>maxIncome60 && <span style={{fontSize:11,color:G.danger,display:"block",textAlign:"right"}}>⚠ Exceeds 60% AMI limit</span>}
                  {totalAnnual<=maxIncome60 && <span style={{fontSize:11,color:G.green,display:"block",textAlign:"right"}}>✓ Within 60% AMI limit (${maxIncome60.toLocaleString()} max)</span>}
                </span>
              </div>
            )}

            <div className="sec"><div className="sec-label">Assets — Required Under Section 42</div>
              <div className="ib blue">🏦 All assets must be disclosed. If total assets exceed $5,000, imputed income (passbook rate × asset value) is included in annual income even if no actual interest is earned. There is NO asset limit for eligibility.</div>
              <div className="fi-2">
                <div className="fg"><label className="fl">Total Value of All Assets <span className="req">*</span></label>
                  <input className="fi" type="number" placeholder="Checking + savings + retirement + other" value={assetTotal} onChange={e=>setAssetTotal(e.target.value)} /></div>
                <div className="fg"><label className="fl">Annual Asset Income (interest, dividends)</label>
                  <input className="fi" type="number" placeholder="Actual income from assets/yr" value={assetIncome} onChange={e=>setAssetIncome(e.target.value)} /></div>
              </div>
              <div className="fg"><label className="fl">List All Asset Accounts</label>
                <textarea className="fi" placeholder="Example: Chase Checking — $1,200; Chase Savings — $3,400; 401k — $8,000; etc. All accounts required." /></div>
            </div>

            <div className="fg"><label className="fl">Previous Address (last 2 years)</label>
              <input className="fi" placeholder="Street, City, State, ZIP — or 'Same as current'" /></div>
            <div className="fg"><label className="fl">Reason for Moving</label>
              <input className="fi" placeholder="Relocation, lease end, more space, etc." /></div>

            <div className="btn-row">
              <button className="btn-s" onClick={()=>setStep(2)}>← Back</button>
              <button className="btn-p" onClick={()=>setStep(4)}>Continue — Student Status →</button>
            </div>
          </>
        )}

        {/* ══ STEP 4: STUDENT STATUS ══ */}
        {step===4 && (
          <>
            <div className="step-h">Student Status Questionnaire</div>
            <div className="step-d">This questionnaire is required by federal law for all Section 42 properties. A household consisting entirely of full-time students is ineligible unless a specific exemption applies.</div>

            <div className="ib blue">📜 <span><strong>Federal Requirement:</strong> Section 42(i)(3)(D) of the Internal Revenue Code prohibits LIHTC housing from being used primarily as student housing. All households must complete this questionnaire regardless of whether any member is a student.</span></div>

            <div className="sec"><div className="sec-label">Student Status — All Household Members</div>
              <div className="fg">
                <label className="fl">How many household members are currently enrolled as full-time students? <span className="req">*</span></label>
                <select className="fi" value={studentStatus} onChange={e=>setStudentStatus(e.target.value)}>
                  <option value="">— Select —</option>
                  <option value="none">None — no full-time students in household</option>
                  <option value="some">Some — but not all members are full-time students</option>
                  <option value="all">All members are full-time students</option>
                </select>
              </div>

              {studentStatus==="all" && (
                <div className="fg">
                  <label className="fl">Which exemption applies to your household? <span className="req">*</span></label>
                  <div className="radio-group">
                    {STUDENT_EXEMPTIONS.slice(1).map(e => (
                      <div key={e.id} className={`ri ${studentExemption===e.id?"sel":""}`} onClick={()=>setStudentExemption(e.id)}>
                        <div className="rd"/><div className="ri-label">{e.text}</div>
                      </div>
                    ))}
                    <div className={`ri ${studentExemption==="none"?"sel-r":""}`} onClick={()=>setStudentExemption("none")}>
                      <div className="rd"/><div>
                        <div className="ri-label">None of the above apply</div>
                        <div className="ri-sub" style={{color:G.danger}}>⚠️ Without an applicable exemption, an all-student household is ineligible under federal law</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {studentStatus==="some" && (
                <div className="ib green">✅ Because at least one household member is not a full-time student, the student status restriction does not apply to your household.</div>
              )}
              {studentStatus==="none" && (
                <div className="ib green">✅ No full-time students in household — no further student documentation required.</div>
              )}
            </div>

            <div className="fg">
              <label className="fl">Names and schools of all full-time student household members (if any)</label>
              <textarea className="fi" placeholder="Leave blank if no students. Otherwise: Name — School — Full-time or Part-time" />
            </div>

            <div className="btn-row">
              <button className="btn-s" onClick={()=>setStep(3)}>← Back</button>
              <button className="btn-p" onClick={()=>setStep(5)} disabled={!studentStatus||(studentStatus==="all"&&!studentExemption)}>Continue — Upload Documents →</button>
            </div>
          </>
        )}

        {/* ══ STEP 5: DOCUMENTS ══ */}
        {step===5 && (
          <>
            <div className="step-h">Document Uploads</div>
            <div className="step-d">Section 42 requires third-party verification of all income and household information. Tap an item to mark as uploaded. All documents are encrypted and used only for IHDA compliance verification.</div>

            <div className="ib gold">📁 <span><strong>LIHTC Standard:</strong> Third-party written verification (VOE, benefit award letters) is preferred over self-reported documentation per HUD Handbook 4350.3. All required documents must be submitted before your application can be reviewed.</span></div>

            <div className="doc-list" style={{marginBottom:20}}>
              {DOCS.map(d => (
                <div key={d.id} className={`doc-item ${uploads[d.id]?"up":""}`} onClick={()=>setUploads(u=>({...u,[d.id]:!u[d.id]}))}>
                  <div className="di-icon">{uploads[d.id]?"✅":d.icon}</div>
                  <div style={{flex:1}}>
                    <div className="di-title">{d.title}</div>
                    <div className="di-sub">{d.sub} {d.note&&<em>— {d.note}</em>}</div>
                  </div>
                  <div className={`di-badge ${uploads[d.id]?"up":d.req?"req":"opt"}`}>
                    {uploads[d.id]?"Uploaded ✓":d.req?"Required":"Optional"}
                  </div>
                </div>
              ))}
            </div>

            {!allReqDone && (
              <div className="ib danger">⚠️ Required documents still missing: {DOCS.filter(d=>d.req&&!uploads[d.id]).map(d=>d.title).join(" · ")}</div>
            )}

            <div className="btn-row">
              <button className="btn-s" onClick={()=>setStep(4)}>← Back</button>
              <button className="btn-p" onClick={()=>setStep(6)} disabled={!allReqDone}>Continue — Certify & Pay →</button>
            </div>
          </>
        )}

        {/* ══ STEP 6: CERTIFY & FEE ══ */}
        {step===6 && (
          <>
            <div className="step-h">Certification & Application Fee</div>
            <div className="step-d">Review your application summary, sign the certification, and pay the $17 processing fee to submit.</div>

            {/* Summary */}
            <div className="cert-card">
              <div className="cc-head"><div className="cc-icon">📋</div><div className="cc-title">Application Summary</div></div>
              <div className="cc-body">
                <div className="rev-row"><div className="rr-l">Applicant</div><div className="rr-v">{personal.first} {personal.last}</div></div>
                <div className="rev-row"><div className="rr-l">Unit Type</div><div className="rr-v">{plan?.label}</div></div>
                <div className="rev-row"><div className="rr-l">Monthly Rent</div><div className="rr-v blue">${plan?.rent} (60% AMI)</div></div>
                <div className="rev-row"><div className="rr-l">Household Size</div><div className="rr-v">{pre.size} {parseInt(pre.size)===1?"person":"people"}</div></div>
                <div className="rev-row"><div className="rr-l">60% AMI Income Limit</div><div className="rr-v">${maxIncome60.toLocaleString()}/yr</div></div>
                <div className="rev-row"><div className="rr-l">Estimated Annual Income</div><div className={`rr-v ${totalAnnual>maxIncome60?"":"green"}`}>${totalAnnual.toLocaleString()}/yr</div></div>
                <div className="rev-row"><div className="rr-l">HCV Voucher</div><div className="rr-v">{pre.voucher==="yes"?"Yes — attach to file":"No"}</div></div>
                <div className="rev-row"><div className="rr-l">Student Status</div><div className="rr-v">{studentStatus==="none"?"No students":studentStatus==="some"?"Mixed household":"All students — exemption claimed"}</div></div>
                <div className="rev-row"><div className="rr-l">Move-In Date</div><div className="rr-v">{personal.moveIn}</div></div>
                <div className="rev-row"><div className="rr-l">Required Docs</div><div className="rr-v green">{DOCS.filter(d=>d.req&&uploads[d.id]).length}/{DOCS.filter(d=>d.req).length} uploaded ✓</div></div>
              </div>
            </div>

            {/* Legal certification */}
            <div className="legal-box">
              <strong>Applicant Certification (Required by IHDA / Section 42):</strong><br/><br/>
              I certify that the information in this application is true, accurate, and complete to the best of my knowledge. I understand that all income and household information will be verified through third-party sources. I understand that false statements or misrepresentation may result in <strong>immediate disqualification, termination of tenancy, and potential legal liability under federal law.</strong> I consent to Pivotal Communities contacting my employer(s), benefit agencies, and financial institutions to verify income and assets. I acknowledge that my household income must be re-verified annually (recertification) and that I must report changes in household composition immediately. I understand that Churchview Gardens is a Section 42 / LIHTC property governed by the Illinois Housing Development Authority (IHDA) and the IRS.
            </div>

            <div style={{marginBottom:14}}>
              <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13,color:G.text,lineHeight:1.5}}>
                <input type="checkbox" style={{marginTop:3,accentColor:G.blue,width:16,height:16,flexShrink:0}} />
                I have read and agree to the above certification. I understand this is a legal attestation under penalty of perjury.
              </label>
            </div>

            {/* FEE */}
            <div className="fee-box">
              <div className="cc-head"><div className="cc-icon">💳</div><div className="cc-title">Application Fee — $17.00</div></div>
              <div className="cc-body">
                <div className="rev-row"><div className="rr-l">Credit / background screening</div><div className="rr-v">$10.00</div></div>
                <div className="rev-row"><div className="rr-l">Administrative processing</div><div className="rr-v">$7.00</div></div>
              </div>
              <div className="fee-total-row">
                <div className="ft-label">Total Fee</div>
                <div className="ft-val">$17.00</div>
              </div>
            </div>

            <div className="opt-grid" style={{marginBottom:14}}>
              {[["card","💳","Credit / Debit Card"],["ach","🏦","Bank Transfer (ACH)"]].map(([v,icon,label])=>(
                <div key={v} className={`opt ${payMethod===v?"sel":""}`} onClick={()=>setPayMethod(v)}>
                  <span className="opt-icon">{icon}</span>
                  <div className="opt-label">{label}</div>
                </div>
              ))}
            </div>
            {payMethod==="card" && (
              <div style={{marginBottom:14,display:"flex",flexDirection:"column",gap:10}}>
                <input className="fi" placeholder="Card number" />
                <div className="fi-2"><input className="fi" placeholder="MM / YY" /><input className="fi" placeholder="CVV" /></div>
                <input className="fi" placeholder="Name on card" />
              </div>
            )}
            {payMethod==="ach" && (
              <div className="fi-2" style={{marginBottom:14}}>
                <input className="fi" placeholder="Routing number" />
                <input className="fi" placeholder="Account number" />
              </div>
            )}

            <div className="ib blue" style={{marginBottom:14}}>🔒 $17 is non-refundable once processed. Payment secured via Stripe. Churchview Gardens never stores card details.</div>

            <button className="btn-p" onClick={()=>setDone(true)}>🔒 Submit Application & Pay $17.00</button>
            <button className="btn-s" onClick={()=>setStep(5)}>← Back to Documents</button>
          </>
        )}
      </div>
    </div>
  );
}
