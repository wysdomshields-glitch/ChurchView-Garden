import { useState, useEffect } from "react";

const COLORS = {
  navy: "#0f1923",
  navyMid: "#162030",
  navyLight: "#1e2d40",
  gold: "#c9a84c",
  goldLight: "#e8c96b",
  cream: "#f5f0e8",
  white: "#ffffff",
  text: "#e8e4dc",
  textMuted: "#8a9ab0",
  success: "#4caf82",
  warning: "#e07b39",
  danger: "#e05252",
  cardBg: "rgba(30,45,64,0.85)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${COLORS.navy};
    color: ${COLORS.text};
    min-height: 100vh;
  }

  .app-shell {
    max-width: 420px;
    margin: 0 auto;
    min-height: 100vh;
    background: ${COLORS.navy};
    position: relative;
    overflow: hidden;
  }

  /* BACKGROUND TEXTURE */
  .bg-texture {
    position: fixed;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 420px;
    height: 100vh;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(ellipse 60% 40% at 80% 10%, rgba(201,168,76,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 50% 30% at 10% 80%, rgba(14,90,180,0.06) 0%, transparent 70%);
  }

  .content { position: relative; z-index: 1; }

  /* HEADER */
  .header {
    padding: 18px 20px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(201,168,76,0.15);
  }

  .logo-mark {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight});
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: ${COLORS.navy};
    font-family: 'Playfair Display', serif;
    box-shadow: 0 2px 12px rgba(201,168,76,0.3);
  }

  .logo-text h1 {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: ${COLORS.white};
    line-height: 1.1;
    letter-spacing: 0.01em;
  }

  .logo-text p {
    font-size: 10px;
    color: ${COLORS.gold};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .notif-btn {
    width: 36px; height: 36px;
    background: ${COLORS.navyLight};
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
  }

  .notif-btn:hover { background: rgba(201,168,76,0.15); }

  .notif-dot {
    position: absolute;
    top: 5px; right: 5px;
    width: 8px; height: 8px;
    background: ${COLORS.danger};
    border-radius: 50%;
    border: 2px solid ${COLORS.navy};
  }

  .avatar {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #2d4a6e, #1e2d40);
    border: 2px solid rgba(201,168,76,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.gold};
    cursor: pointer;
  }

  /* HERO CARD */
  .hero-card {
    margin: 16px;
    background: linear-gradient(135deg, ${COLORS.navyLight} 0%, #1a2f45 100%);
    border: 1px solid rgba(201,168,76,0.25);
    border-radius: 18px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .hero-card::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 120px; height: 120px;
    background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero-card::after {
    content: '';
    position: absolute;
    bottom: -20px; left: -20px;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(14,90,180,0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero-greeting {
    font-size: 12px;
    color: ${COLORS.textMuted};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .hero-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: ${COLORS.white};
    margin-bottom: 14px;
  }

  .balance-row {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    margin-bottom: 16px;
  }

  .balance-block {}

  .balance-label {
    font-size: 10px;
    color: ${COLORS.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 2px;
  }

  .balance-amount {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: ${COLORS.white};
  }

  .balance-due {
    font-size: 11px;
    color: ${COLORS.warning};
    font-weight: 500;
    padding-bottom: 4px;
  }

  .pay-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight});
    color: ${COLORS.navy};
    border: none;
    border-radius: 10px;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(201,168,76,0.35);
    letter-spacing: 0.01em;
  }

  .pay-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(201,168,76,0.45);
  }

  .unit-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(201,168,76,0.12);
    border: 1px solid rgba(201,168,76,0.25);
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 11px;
    color: ${COLORS.gold};
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  .hero-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
  }

  .lease-status {
    font-size: 11px;
    color: ${COLORS.success};
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .dot-green {
    width: 6px; height: 6px;
    background: ${COLORS.success};
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(76,175,130,0.6);
  }

  /* SECTION LABEL */
  .section-label {
    padding: 0 20px;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${COLORS.textMuted};
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(201,168,76,0.12);
  }

  /* GRID MENU */
  .grid-menu {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0 16px;
    margin-bottom: 20px;
  }

  .menu-card {
    background: ${COLORS.cardBg};
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 16px 14px;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
  }

  .menu-card:hover {
    border-color: rgba(201,168,76,0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }

  .menu-card.active {
    border-color: rgba(201,168,76,0.4);
    background: rgba(201,168,76,0.06);
  }

  .menu-card-icon {
    font-size: 24px;
    margin-bottom: 10px;
    display: block;
  }

  .menu-card-title {
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.white};
    margin-bottom: 3px;
    line-height: 1.2;
  }

  .menu-card-sub {
    font-size: 10px;
    color: ${COLORS.textMuted};
    line-height: 1.3;
  }

  .menu-card-badge {
    position: absolute;
    top: 10px; right: 10px;
    background: ${COLORS.danger};
    color: white;
    font-size: 10px;
    font-weight: 700;
    width: 18px; height: 18px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  .menu-card-badge.gold {
    background: ${COLORS.gold};
    color: ${COLORS.navy};
  }

  /* ALERT BANNER */
  .alert-banner {
    margin: 0 16px 16px;
    background: linear-gradient(135deg, rgba(224,82,82,0.12), rgba(224,82,82,0.06));
    border: 1px solid rgba(224,82,82,0.3);
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .alert-banner:hover { background: rgba(224,82,82,0.14); }

  .alert-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }

  .alert-content h4 {
    font-size: 12px;
    font-weight: 600;
    color: #ff7b7b;
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .alert-content p {
    font-size: 12px;
    color: rgba(255,255,255,0.7);
    line-height: 1.4;
  }

  /* UPDATE FEED */
  .update-feed {
    padding: 0 16px;
    margin-bottom: 20px;
  }

  .update-item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    transition: all 0.2s;
  }

  .update-item:last-child { border-bottom: none; }
  .update-item:hover .update-title { color: ${COLORS.gold}; }

  .update-dot-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4px;
  }

  .update-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${COLORS.gold};
    flex-shrink: 0;
    box-shadow: 0 0 6px rgba(201,168,76,0.4);
  }

  .update-dot.gray { background: ${COLORS.textMuted}; box-shadow: none; }

  .update-line {
    width: 1px;
    flex: 1;
    background: rgba(255,255,255,0.06);
    margin-top: 4px;
  }

  .update-title {
    font-size: 13px;
    font-weight: 500;
    color: ${COLORS.white};
    margin-bottom: 3px;
    transition: color 0.2s;
    line-height: 1.3;
  }

  .update-meta {
    font-size: 11px;
    color: ${COLORS.textMuted};
  }

  .update-tag {
    display: inline-block;
    background: rgba(201,168,76,0.12);
    color: ${COLORS.gold};
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-right: 6px;
  }

  .update-tag.maint { background: rgba(76,175,130,0.12); color: ${COLORS.success}; }
  .update-tag.notice { background: rgba(224,123,57,0.12); color: ${COLORS.warning}; }

  /* CONTACT BAR */
  .contact-bar {
    margin: 0 16px 20px;
    background: ${COLORS.cardBg};
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 14px 16px;
    backdrop-filter: blur(8px);
  }

  .contact-bar h3 {
    font-size: 11px;
    color: ${COLORS.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .contact-actions {
    display: flex;
    gap: 8px;
  }

  .contact-btn {
    flex: 1;
    background: ${COLORS.navyLight};
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }

  .contact-btn:hover {
    border-color: rgba(201,168,76,0.3);
    background: rgba(201,168,76,0.06);
  }

  .contact-btn span:first-child { font-size: 20px; }
  .contact-btn .cb-label {
    font-size: 10px;
    color: ${COLORS.textMuted};
    font-weight: 500;
  }

  /* BOTTOM NAV */
  .bottom-nav {
    position: sticky;
    bottom: 0;
    background: rgba(15,25,35,0.95);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(201,168,76,0.12);
    display: flex;
    padding: 8px 0 12px;
    z-index: 100;
  }

  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    padding: 4px 0;
    transition: all 0.2s;
  }

  .nav-item .nav-icon { font-size: 20px; }
  .nav-item .nav-label {
    font-size: 9px;
    font-weight: 500;
    color: ${COLORS.textMuted};
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .nav-item.active .nav-label { color: ${COLORS.gold}; }
  .nav-item.active .nav-icon { filter: drop-shadow(0 0 4px rgba(201,168,76,0.5)); }

  /* MODAL OVERLAY */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(10,16,24,0.85);
    z-index: 200;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .modal-sheet {
    width: 100%;
    max-width: 420px;
    background: ${COLORS.navyMid};
    border-radius: 20px 20px 0 0;
    border-top: 1px solid rgba(201,168,76,0.2);
    padding: 12px 20px 32px;
    animation: slideUp 0.3s ease;
    max-height: 88vh;
    overflow-y: auto;
  }

  .modal-handle {
    width: 36px; height: 4px;
    background: rgba(255,255,255,0.15);
    border-radius: 2px;
    margin: 0 auto 18px;
  }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: ${COLORS.white};
    margin-bottom: 4px;
  }

  .modal-sub {
    font-size: 12px;
    color: ${COLORS.textMuted};
    margin-bottom: 20px;
  }

  /* PAYMENT FORM */
  .pay-summary {
    background: ${COLORS.navyLight};
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .pay-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    font-size: 13px;
    color: ${COLORS.textMuted};
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }

  .pay-row:last-child { border-bottom: none; }
  .pay-row.total { color: ${COLORS.white}; font-weight: 600; font-size: 15px; padding-top: 10px; }
  .pay-row .amount { color: ${COLORS.white}; font-weight: 500; }
  .pay-row.total .amount { color: ${COLORS.gold}; font-size: 18px; }

  .input-group { margin-bottom: 14px; }

  .input-label {
    font-size: 11px;
    color: ${COLORS.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    margin-bottom: 6px;
    display: block;
  }

  .input-field {
    width: 100%;
    background: ${COLORS.navyLight};
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 14px;
    color: ${COLORS.white};
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }

  .input-field:focus { border-color: rgba(201,168,76,0.5); }

  .input-row { display: flex; gap: 10px; }
  .input-row .input-group { flex: 1; }

  .primary-btn {
    width: 100%;
    background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight});
    color: ${COLORS.navy};
    border: none;
    border-radius: 12px;
    padding: 15px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.03em;
    transition: all 0.2s;
    box-shadow: 0 4px 16px rgba(201,168,76,0.3);
    margin-top: 6px;
  }

  .primary-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(201,168,76,0.4);
  }

  .secondary-btn {
    width: 100%;
    background: transparent;
    color: ${COLORS.textMuted};
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 13px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    margin-top: 8px;
  }

  .secondary-btn:hover {
    border-color: rgba(255,255,255,0.2);
    color: ${COLORS.white};
  }

  /* MAINTENANCE FORM */
  .category-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  .category-chip {
    background: ${COLORS.navyLight};
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 10px 6px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .category-chip.selected {
    border-color: rgba(201,168,76,0.5);
    background: rgba(201,168,76,0.08);
  }

  .category-chip .cat-icon { font-size: 20px; display: block; margin-bottom: 4px; }
  .category-chip .cat-label { font-size: 10px; color: ${COLORS.textMuted}; font-weight: 500; }
  .category-chip.selected .cat-label { color: ${COLORS.gold}; }

  .priority-row {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .priority-chip {
    flex: 1;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    background: ${COLORS.navyLight};
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .priority-chip.low { color: ${COLORS.success}; }
  .priority-chip.medium { color: ${COLORS.warning}; }
  .priority-chip.high { color: ${COLORS.danger}; }
  .priority-chip.selected.low { background: rgba(76,175,130,0.12); border-color: rgba(76,175,130,0.4); }
  .priority-chip.selected.medium { background: rgba(224,123,57,0.12); border-color: rgba(224,123,57,0.4); }
  .priority-chip.selected.high { background: rgba(224,82,82,0.12); border-color: rgba(224,82,82,0.4); }

  textarea.input-field {
    resize: none;
    height: 90px;
  }

  /* EMERGENCY SCREEN */
  .emergency-header {
    background: linear-gradient(135deg, rgba(224,82,82,0.15), rgba(180,40,40,0.1));
    border: 1px solid rgba(224,82,82,0.3);
    border-radius: 14px;
    padding: 16px;
    text-align: center;
    margin-bottom: 16px;
  }

  .emergency-header .em-icon { font-size: 36px; margin-bottom: 8px; }
  .emergency-header h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: #ff8080;
    margin-bottom: 4px;
  }
  .emergency-header p { font-size: 12px; color: ${COLORS.textMuted}; }

  .emergency-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }

  .em-btn-red {
    background: linear-gradient(135deg, #e05252, #c43c3c);
    color: white;
    box-shadow: 0 4px 14px rgba(224,82,82,0.35);
  }

  .em-btn-orange {
    background: linear-gradient(135deg, #e07b39, #c4602a);
    color: white;
    box-shadow: 0 4px 14px rgba(224,123,57,0.3);
  }

  .em-btn-outline {
    background: transparent;
    color: ${COLORS.textMuted};
    border: 1px solid rgba(255,255,255,0.12);
  }

  /* SUCCESS STATE */
  .success-state {
    text-align: center;
    padding: 20px 0;
  }

  .success-icon {
    width: 64px; height: 64px;
    background: linear-gradient(135deg, rgba(76,175,130,0.15), rgba(76,175,130,0.05));
    border: 2px solid rgba(76,175,130,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin: 0 auto 16px;
  }

  .success-state h3 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: ${COLORS.white};
    margin-bottom: 6px;
  }

  .success-state p {
    font-size: 13px;
    color: ${COLORS.textMuted};
    margin-bottom: 20px;
    line-height: 1.5;
  }

  /* NEWSLETTER */
  .newsletter-card {
    background: ${COLORS.cardBg};
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 16px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(8px);
  }

  .newsletter-card:hover { border-color: rgba(201,168,76,0.2); }

  .nl-date {
    font-size: 10px;
    color: ${COLORS.gold};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .nl-title {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    color: ${COLORS.white};
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .nl-preview {
    font-size: 12px;
    color: ${COLORS.textMuted};
    line-height: 1.5;
  }

  .nl-tag {
    display: inline-block;
    background: rgba(201,168,76,0.1);
    color: ${COLORS.gold};
    border-radius: 4px;
    padding: 2px 7px;
    font-size: 10px;
    font-weight: 600;
    margin-top: 8px;
    letter-spacing: 0.04em;
  }

  /* SCROLL CONTAINER */
  .scroll-body {
    overflow-y: auto;
    padding-bottom: 20px;
  }

  /* TABS */
  .tab-row {
    display: flex;
    gap: 6px;
    padding: 0 16px;
    margin-bottom: 16px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tab-row::-webkit-scrollbar { display: none; }

  .tab-chip {
    flex-shrink: 0;
    padding: 7px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid rgba(255,255,255,0.08);
    background: transparent;
    color: ${COLORS.textMuted};
    white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
  }

  .tab-chip.active {
    background: rgba(201,168,76,0.12);
    border-color: rgba(201,168,76,0.35);
    color: ${COLORS.gold};
  }

  /* TICKET ITEM */
  .ticket-item {
    margin: 0 16px 10px;
    background: ${COLORS.cardBg};
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .ticket-item:hover { border-color: rgba(201,168,76,0.2); }

  .ticket-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
  }

  .ticket-title {
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.white};
  }

  .status-badge {
    font-size: 10px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .status-open { background: rgba(224,123,57,0.15); color: ${COLORS.warning}; }
  .status-progress { background: rgba(14,90,180,0.2); color: #6aacff; }
  .status-done { background: rgba(76,175,130,0.12); color: ${COLORS.success}; }

  .ticket-meta { font-size: 11px; color: ${COLORS.textMuted}; }

  /* PROFILE PAGE */
  .profile-header {
    text-align: center;
    padding: 20px 20px 0;
    margin-bottom: 16px;
  }

  .profile-avatar {
    width: 72px; height: 72px;
    background: linear-gradient(135deg, #2d4a6e, #1e2d40);
    border: 3px solid rgba(201,168,76,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px;
    font-weight: 600;
    color: ${COLORS.gold};
    margin: 0 auto 12px;
    font-family: 'Playfair Display', serif;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  .profile-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: ${COLORS.white};
    margin-bottom: 4px;
  }

  .profile-unit { font-size: 12px; color: ${COLORS.gold}; }

  .profile-list {
    margin: 0 16px;
    background: ${COLORS.cardBg};
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 12px;
  }

  .profile-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    cursor: pointer;
    transition: background 0.2s;
  }

  .profile-item:hover { background: rgba(255,255,255,0.02); }
  .profile-item:last-child { border-bottom: none; }

  .profile-item-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .profile-item-icon {
    width: 32px; height: 32px;
    background: rgba(201,168,76,0.1);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }

  .profile-item-label { font-size: 13px; color: ${COLORS.white}; font-weight: 500; }
  .profile-item-value { font-size: 11px; color: ${COLORS.textMuted}; }
  .profile-item-arrow { color: ${COLORS.textMuted}; font-size: 16px; }

  .logout-btn {
    margin: 0 16px;
    width: calc(100% - 32px);
    background: rgba(224,82,82,0.08);
    border: 1px solid rgba(224,82,82,0.2);
    color: #ff8080;
    border-radius: 12px;
    padding: 13px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .logout-btn:hover { background: rgba(224,82,82,0.14); }
`;

const updates = [
  { tag: "Notice", tagClass: "notice", title: "Parking Lot Resurfacing — May 12–14", meta: "Posted May 1 · Management", read: false },
  { tag: "Maintenance", tagClass: "maint", title: "Water Shutoff Scheduled: May 8, 9am–12pm", meta: "Posted Apr 28 · Maintenance Dept", read: false },
  { tag: "Community", tagClass: "", title: "Welcome New Residents — Spring Move-Ins", meta: "Posted Apr 22 · Office", read: true },
  { tag: "Policy", tagClass: "notice", title: "Updated Pet Policy Effective June 1", meta: "Posted Apr 15 · Management", read: true },
];

const tickets = [
  { title: "Kitchen faucet dripping", status: "In Progress", statusClass: "status-progress", date: "Submitted Apr 29" },
  { title: "Bathroom exhaust fan noise", status: "Open", statusClass: "status-open", date: "Submitted May 1" },
  { title: "Broken outlet cover — bedroom", status: "Resolved", statusClass: "status-done", date: "Completed Apr 20" },
];

const newsletters = [
  { date: "May 2025", title: "Spring Community Update & Amenity Schedule", preview: "Pool opening May 20, new recycling station installed, and updates to the leasing office hours…", tag: "Newsletter" },
  { date: "April 2025", title: "Resident Appreciation Month Recap", preview: "Thank you for joining our spring mixer. Photos from the event and upcoming summer calendar inside…", tag: "Newsletter" },
];

export default function ChurchViewApp() {
  const [activeNav, setActiveNav] = useState("home");
  const [modal, setModal] = useState(null);
  const [mainCategory, setMainCategory] = useState(null);
  const [priority, setPriority] = useState(null);
  const [paySuccess, setPaySuccess] = useState(false);
  const [maintSuccess, setMaintSuccess] = useState(false);
  const [alertFilter, setAlertFilter] = useState("All");

  const closeModal = () => {
    setModal(null);
    setPaySuccess(false);
    setMaintSuccess(false);
  };

  const handlePay = () => {
    setTimeout(() => setPaySuccess(true), 300);
  };

  const handleMaint = () => {
    setTimeout(() => setMaintSuccess(true), 300);
  };

  return (
    <div className="app-shell">
      <style>{styles}</style>
      <div className="bg-texture" />

      <div className="content" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* HEADER */}
        <div className="header">
          <div className="logo-mark">
            <div className="logo-icon">C</div>
            <div className="logo-text">
              <h1>Church View Homes</h1>
              <p>Pivotal Properties · Peoria, IL</p>
            </div>
          </div>
          <div className="header-right">
            <div className="notif-btn" onClick={() => setModal("alerts")}>
              🔔
              <div className="notif-dot" />
            </div>
            <div className="avatar" onClick={() => setActiveNav("profile")}>JD</div>
          </div>
        </div>

        {/* SCROLL BODY */}
        <div className="scroll-body" style={{ flex: 1 }}>

          {/* ── HOME ── */}
          {activeNav === "home" && (
            <>
              {/* HERO */}
              <div className="hero-card">
                <div className="hero-greeting">Good morning</div>
                <div className="hero-name">Jordan Davis</div>
                <div className="balance-row">
                  <div className="balance-block">
                    <div className="balance-label">Rent Due</div>
                    <div className="balance-amount">$875.00</div>
                  </div>
                  <div className="balance-due">Due June 1st</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button className="pay-btn" onClick={() => setModal("pay")}>
                    💳 Pay Now
                  </button>
                  <div className="hero-meta" style={{ flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span className="unit-tag">🏠 Unit 14B</span>
                    <span className="lease-status">
                      <span className="dot-green" />
                      Lease Active
                    </span>
                  </div>
                </div>
              </div>

              {/* ALERT */}
              <div className="alert-banner" onClick={() => setModal("alerts")}>
                <div className="alert-icon">⚠️</div>
                <div className="alert-content">
                  <h4>Active Notice</h4>
                  <p>Water shutoff scheduled May 8, 9am–12pm. Plan accordingly.</p>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="section-label">Quick Actions</div>
              <div className="grid-menu">
                <div className="menu-card" onClick={() => setModal("maintenance")}>
                  <span className="menu-card-icon">🔧</span>
                  <div className="menu-card-title">Maintenance</div>
                  <div className="menu-card-sub">Submit & track requests</div>
                  <div className="menu-card-badge">2</div>
                </div>
                <div className="menu-card" onClick={() => setModal("docs")}>
                  <span className="menu-card-icon">📝</span>
                  <div className="menu-card-title">Documents</div>
                  <div className="menu-card-sub">Sign & view lease docs</div>
                  <div className="menu-card-badge gold">1</div>
                </div>
                <div className="menu-card" onClick={() => setModal("alerts")}>
                  <span className="menu-card-icon">🚨</span>
                  <div className="menu-card-title">Alerts</div>
                  <div className="menu-card-sub">Emergency & security</div>
                </div>
                <div className="menu-card" onClick={() => setModal("apply")}>
                  <span className="menu-card-icon">📋</span>
                  <div className="menu-card-title">Onboarding</div>
                  <div className="menu-card-sub">New resident checklist</div>
                </div>
              </div>

              {/* CONTACT */}
              <div className="contact-bar">
                <h3>Leasing Office Contact</h3>
                <div className="contact-actions">
                  <a className="contact-btn" href="tel:3094445800">
                    <span>📞</span>
                    <span className="cb-label">Call Office</span>
                  </a>
                  <a className="contact-btn" href="mailto:office@churchviewhomes.com">
                    <span>✉️</span>
                    <span className="cb-label">Email Us</span>
                  </a>
                  <div className="contact-btn" onClick={() => setModal("hours")}>
                    <span>🕐</span>
                    <span className="cb-label">Hours</span>
                  </div>
                  <div className="contact-btn" onClick={() => setModal("alerts")}>
                    <span>🚨</span>
                    <span className="cb-label">Emergency</span>
                  </div>
                </div>
              </div>

              {/* UPDATES */}
              <div className="section-label">Property Updates</div>
              <div className="update-feed">
                {updates.map((u, i) => (
                  <div className="update-item" key={i}>
                    <div className="update-dot-wrap">
                      <div className={`update-dot ${u.read ? "gray" : ""}`} />
                      {i < updates.length - 1 && <div className="update-line" />}
                    </div>
                    <div>
                      <div className="update-title">
                        <span className={`update-tag ${u.tagClass}`}>{u.tag}</span>
                        {u.title}
                      </div>
                      <div className="update-meta">{u.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── MAINTENANCE ── */}
          {activeNav === "maintenance" && (
            <>
              <div style={{ padding: "16px 20px 8px" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: COLORS.white, marginBottom: 4 }}>
                  Maintenance
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>Submit requests & track open tickets</div>
              </div>

              <div className="tab-row">
                {["All", "Open", "In Progress", "Resolved"].map(t => (
                  <button key={t} className={`tab-chip ${alertFilter === t ? "active" : ""}`}
                    onClick={() => setAlertFilter(t)}>
                    {t}
                  </button>
                ))}
              </div>

              <div style={{ padding: "0 16px", marginBottom: 14 }}>
                <button className="primary-btn" style={{ marginTop: 0 }} onClick={() => setModal("maintenance")}>
                  + Submit New Request
                </button>
              </div>

              {tickets.map((t, i) => (
                <div className="ticket-item" key={i}>
                  <div className="ticket-header">
                    <div className="ticket-title">{t.title}</div>
                    <span className={`status-badge ${t.statusClass}`}>{t.status}</span>
                  </div>
                  <div className="ticket-meta">{t.date}</div>
                </div>
              ))}
            </>
          )}

          {/* ── UPDATES ── */}
          {activeNav === "updates" && (
            <>
              <div style={{ padding: "16px 20px 8px" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: COLORS.white, marginBottom: 4 }}>
                  Community Updates
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>Newsletters, notices & property news</div>
              </div>

              <div style={{ padding: "0 16px", marginBottom: 16 }}>
                {newsletters.map((n, i) => (
                  <div className="newsletter-card" key={i}>
                    <div className="nl-date">{n.date}</div>
                    <div className="nl-title">{n.title}</div>
                    <div className="nl-preview">{n.preview}</div>
                    <div className="nl-tag">{n.tag}</div>
                  </div>
                ))}
              </div>

              <div className="section-label">Recent Notices</div>
              <div className="update-feed">
                {updates.map((u, i) => (
                  <div className="update-item" key={i}>
                    <div className="update-dot-wrap">
                      <div className={`update-dot ${u.read ? "gray" : ""}`} />
                      {i < updates.length - 1 && <div className="update-line" />}
                    </div>
                    <div>
                      <div className="update-title">
                        <span className={`update-tag ${u.tagClass}`}>{u.tag}</span>
                        {u.title}
                      </div>
                      <div className="update-meta">{u.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── PROFILE ── */}
          {activeNav === "profile" && (
            <>
              <div className="profile-header">
                <div className="profile-avatar">JD</div>
                <div className="profile-name">Jordan Davis</div>
                <div className="profile-unit">Unit 14B · Church View Homes</div>
              </div>

              <div className="profile-list" style={{ marginBottom: 12 }}>
                <div className="profile-item">
                  <div className="profile-item-left">
                    <div className="profile-item-icon">📄</div>
                    <div>
                      <div className="profile-item-label">Lease Agreement</div>
                      <div className="profile-item-value">Jan 1 – Dec 31, 2025</div>
                    </div>
                  </div>
                  <div className="profile-item-arrow">›</div>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    <div className="profile-item-icon">💳</div>
                    <div>
                      <div className="profile-item-label">Payment History</div>
                      <div className="profile-item-value">All payments on time</div>
                    </div>
                  </div>
                  <div className="profile-item-arrow">›</div>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    <div className="profile-item-icon">🔑</div>
                    <div>
                      <div className="profile-item-label">Unit Details</div>
                      <div className="profile-item-value">2 BR · Floor 1 · Shelley St</div>
                    </div>
                  </div>
                  <div className="profile-item-arrow">›</div>
                </div>
              </div>

              <div className="profile-list" style={{ marginBottom: 12 }}>
                <div className="profile-item">
                  <div className="profile-item-left">
                    <div className="profile-item-icon">📱</div>
                    <div>
                      <div className="profile-item-label">Notification Settings</div>
                      <div className="profile-item-value">All alerts enabled</div>
                    </div>
                  </div>
                  <div className="profile-item-arrow">›</div>
                </div>
                <div className="profile-item">
                  <div className="profile-item-left">
                    <div className="profile-item-icon">🛡️</div>
                    <div>
                      <div className="profile-item-label">Privacy & Security</div>
                      <div className="profile-item-value">2FA enabled</div>
                    </div>
                  </div>
                  <div className="profile-item-arrow">›</div>
                </div>
              </div>

              <button className="logout-btn">Sign Out</button>
              <div style={{ height: 20 }} />
            </>
          )}
        </div>

        {/* BOTTOM NAV */}
        <div className="bottom-nav">
          {[
            { key: "home", icon: "🏠", label: "Home" },
            { key: "maintenance", icon: "🔧", label: "Requests" },
            { key: "updates", icon: "📰", label: "Updates" },
            { key: "profile", icon: "👤", label: "Profile" },
          ].map(n => (
            <div key={n.key} className={`nav-item ${activeNav === n.key ? "active" : ""}`}
              onClick={() => setActiveNav(n.key)}>
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ────── MODALS ────── */}

      {/* PAY RENT */}
      {modal === "pay" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            {!paySuccess ? (
              <>
                <div className="modal-title">Pay Rent</div>
                <div className="modal-sub">Church View Homes · Unit 14B · June 2025</div>
                <div className="pay-summary">
                  <div className="pay-row"><span>Monthly Rent</span><span className="amount">$850.00</span></div>
                  <div className="pay-row"><span>Utilities (Est.)</span><span className="amount">$25.00</span></div>
                  <div className="pay-row total"><span>Total Due</span><span className="amount">$875.00</span></div>
                </div>
                <div className="input-group">
                  <label className="input-label">Card Number</label>
                  <input className="input-field" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label className="input-label">Expiry</label>
                    <input className="input-field" placeholder="MM / YY" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">CVV</label>
                    <input className="input-field" placeholder="•••" />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Name on Card</label>
                  <input className="input-field" placeholder="Jordan Davis" />
                </div>
                <button className="primary-btn" onClick={handlePay}>🔒 Pay $875.00 Securely</button>
                <button className="secondary-btn" onClick={closeModal}>Cancel</button>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">✅</div>
                <h3>Payment Successful</h3>
                <p>$875.00 processed for June 2025.<br />A receipt has been sent to your email.</p>
                <button className="primary-btn" onClick={closeModal}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MAINTENANCE */}
      {modal === "maintenance" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            {!maintSuccess ? (
              <>
                <div className="modal-title">Maintenance Request</div>
                <div className="modal-sub">Unit 14B · We'll respond within 24 hours</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 8 }}>Category</div>
                <div className="category-grid">
                  {[["🚰","Plumbing"],["⚡","Electrical"],["❄️","HVAC"],["🚪","Doors/Windows"],["🐛","Pest"],["🔩","Other"]].map(([icon, label]) => (
                    <div key={label} className={`category-chip ${mainCategory === label ? "selected" : ""}`}
                      onClick={() => setMainCategory(label)}>
                      <span className="cat-icon">{icon}</span>
                      <span className="cat-label">{label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 8 }}>Priority</div>
                <div className="priority-row">
                  {["low","medium","high"].map(p => (
                    <div key={p} className={`priority-chip ${p} ${priority === p ? "selected" : ""}`}
                      onClick={() => setPriority(p)}>
                      {p}
                    </div>
                  ))}
                </div>
                <div className="input-group">
                  <label className="input-label">Describe the Issue</label>
                  <textarea className="input-field" placeholder="Please describe the problem in detail..." />
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>📷</span> Tap to attach a photo (optional)
                </div>
                <button className="primary-btn" onClick={handleMaint}>Submit Request</button>
                <button className="secondary-btn" onClick={closeModal}>Cancel</button>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">🔧</div>
                <h3>Request Submitted</h3>
                <p>Ticket #1042 created.<br />Our maintenance team will contact you within 24 hours.</p>
                <button className="primary-btn" onClick={closeModal}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EMERGENCY / ALERTS */}
      {modal === "alerts" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">Emergency & Alerts</div>
            <div className="modal-sub">Church View Homes · Shelley St, Peoria IL</div>
            <div className="emergency-header">
              <div className="em-icon">🚨</div>
              <h3>In case of emergency</h3>
              <p>Use the buttons below to reach emergency services or management immediately</p>
            </div>
            <button className="emergency-btn em-btn-red">🆘 Call 911 — Police / Fire / EMS</button>
            <button className="emergency-btn em-btn-orange">📞 After-Hours Emergency Line</button>
            <div style={{ marginTop: 8, marginBottom: 14, padding: "12px 14px", background: COLORS.navyLight, borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Active Alerts</div>
              <div style={{ fontSize: 13, color: COLORS.warning, marginBottom: 6, display: "flex", gap: 8 }}>
                <span>⚠️</span> Water shutoff May 8, 9am–12pm
              </div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, display: "flex", gap: 8 }}>
                <span>🚧</span> Parking lot closed May 12–14 for resurfacing
              </div>
            </div>
            <button className="emergency-btn em-btn-outline" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* DOCUMENTS */}
      {modal === "docs" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">Documents</div>
            <div className="modal-sub">Review, sign & download your lease documents</div>
            {[
              { icon: "📝", label: "Lease Renewal — 2025–2026", status: "🟡 Signature Required", action: "Sign Now" },
              { icon: "📄", label: "Current Lease Agreement", status: "✅ Signed · Jan 1, 2025", action: "Download" },
              { icon: "📋", label: "Move-In Checklist", status: "✅ Completed", action: "View" },
              { icon: "🏠", label: "Community Rules & Policies", status: "📄 Document", action: "View" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{d.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: COLORS.white, fontWeight: 500, marginBottom: 3 }}>{d.label}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{d.status}</div>
                </div>
                <button style={{ background: i === 0 ? "rgba(201,168,76,0.15)" : "transparent", border: `1px solid ${i === 0 ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.1)"}`, color: i === 0 ? COLORS.gold : COLORS.textMuted, borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
                  {d.action}
                </button>
              </div>
            ))}
            <button className="secondary-btn" style={{ marginTop: 12 }} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* APPLY / ONBOARDING */}
      {modal === "apply" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">New Resident Onboarding</div>
            <div className="modal-sub">Complete your move-in checklist</div>
            {[
              { label: "Identity Verification", done: true },
              { label: "Lease Agreement Signed", done: true },
              { label: "First Month + Deposit Paid", done: true },
              { label: "Renter's Insurance Upload", done: false },
              { label: "Parking Pass Registration", done: false },
              { label: "Key Pickup Scheduled", done: false },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: step.done ? "rgba(76,175,130,0.2)" : COLORS.navyLight, border: `2px solid ${step.done ? COLORS.success : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
                  {step.done ? "✓" : ""}
                </div>
                <div style={{ fontSize: 13, color: step.done ? COLORS.textMuted : COLORS.white, textDecoration: step.done ? "line-through" : "none" }}>{step.label}</div>
                {!step.done && <button style={{ marginLeft: "auto", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: COLORS.gold, borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Start</button>}
              </div>
            ))}
            <div style={{ marginTop: 14, background: COLORS.navyLight, borderRadius: 10, padding: "10px 12px", fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>
              📧 Questions? Email <span style={{ color: COLORS.gold }}>office@churchviewhomes.com</span> or call <span style={{ color: COLORS.gold }}>(309) 444-5800</span>
            </div>
            <button className="secondary-btn" style={{ marginTop: 12 }} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* HOURS */}
      {modal === "hours" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">Office Hours</div>
            <div className="modal-sub">Church View Homes Leasing Office</div>
            {[
              ["Monday – Friday", "9:00 AM – 5:00 PM"],
              ["Saturday", "10:00 AM – 2:00 PM"],
              ["Sunday", "Closed"],
            ].map(([day, hours]) => (
              <div key={day} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13 }}>
                <span style={{ color: COLORS.textMuted }}>{day}</span>
                <span style={{ color: hours === "Closed" ? COLORS.danger : COLORS.white, fontWeight: 500 }}>{hours}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6 }}>
              After-hours emergencies: <span style={{ color: COLORS.warning, fontWeight: 600 }}>(309) 444-5801</span>
            </div>
            <button className="primary-btn" onClick={closeModal}>Got It</button>
          </div>
        </div>
      )}
    </div>
  );
}
