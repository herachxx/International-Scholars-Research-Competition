/* ══════════════════════════════════════════
   ISRC 2026 · Shared JavaScript
   Auth, DB helpers, Nav, Toast, FAQ, utils
══════════════════════════════════════════ */

/* ── Data helpers ── */
const DB = {
  getUsers:  ()  => JSON.parse(localStorage.getItem('isrc_users') || '[]'),
  saveUsers: (u) => localStorage.setItem('isrc_users', JSON.stringify(u)),
  getUser:   ()  => JSON.parse(localStorage.getItem('isrc_me')    || 'null'),
  saveUser:  (u) => localStorage.setItem('isrc_me',   JSON.stringify(u)),
  clearUser: ()  => localStorage.removeItem('isrc_me'),
  syncUser:  ()  => {           /* re-read from users array to get latest */
    const me = DB.getUser();
    if (!me) return null;
    const found = DB.getUsers().find(u => u.email === me.email);
    if (found) DB.saveUser(found);
    return found || me;
  }
};

/* ── Auth guard – redirect to login if not logged in ── */
function requireAuth(redirectTo) {
  const u = DB.syncUser();
  if (!u) {
    const dest = encodeURIComponent(redirectTo || window.location.href);
    window.location.href = `../pages/login.html?next=${dest}`;
    return null;
  }
  return u;
}

/* ── Sign out ── */
function signOut() {
  DB.clearUser();
  window.location.href = '../index.html';
}

/* ── Toast ── */
function toast(msg) {
  let t = document.getElementById('_toast');
  if (!t) {
    t = Object.assign(document.createElement('div'), { id: '_toast', className: 'toast' });
    t.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span></span>`;
    document.body.appendChild(t);
  }
  t.querySelector('span').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 3400);
}

/* ── FAQ toggle ── */
function faq(btn) { btn.closest('.faq-item').classList.toggle('open'); }

/* ── Build nav logo HTML ── */
function _logoHTML(prefix) {
  return `<a href="${prefix}index.html" class="nav-logo">
    <svg viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="20" fill="#1C2B5A"/>
      <circle cx="22" cy="22" r="14" fill="none" stroke="#B8882A" stroke-width="1" opacity=".7"/>
      <polygon points="22,7 26,17.5 37.5,17.5 28.5,24 31.5,35 22,28.5 12.5,35 15.5,24 6.5,17.5 18,17.5" fill="#ffffff" opacity=".95"/>
      <polygon points="22,11 25,19 34,19 27,24.5 29.5,33 22,28 14.5,33 17,24.5 10,19 19,19" fill="#B8882A" opacity=".85"/>
    </svg>
    <div class="nav-logo-text">
      <span class="brand">ISRC</span>
      <span class="sub">2026 Competition</span>
    </div>
  </a>`;
}

/* ── PUBLIC nav (unauthenticated) ── */
function renderPublicNav(active, prefix = '') {
  const links = ['Home','About','Categories','Timeline','FAQ'];
  const hrefs = { Home:'index.html', About:'index.html#about', Categories:'index.html#categories', Timeline:'index.html#timeline', FAQ:'index.html#faq' };
  const linksHTML = links.map(l => `
    <a href="${prefix}${hrefs[l]}" class="nav-link${active===l?' active':''}">${l}</a>
  `).join('');

  document.getElementById('nav-slot').innerHTML = `
    <nav class="nav-float" id="main-nav">
      ${_logoHTML(prefix)}
      <div class="nav-links">${linksHTML}</div>
      <div class="nav-actions">
        <a href="${prefix}pages/login.html" class="nav-login">Login</a>
        <a href="${prefix}pages/register.html" class="btn btn-navy btn-sm nav-cta">Submit Research</a>
      </div>
    </nav>`;
}

/* ── DASHBOARD nav (authenticated) ── */
function renderDashNav(active) {
  const u = DB.getUser();
  if (!u) return;
  const initials = (u.fname[0] + (u.lname?.[0]||'')).toUpperCase();
  const links = ['Overview','Submit','Submissions','Payment','Profile'];
  const hrefs = { Overview:'dashboard.html', Submit:'submit.html', Submissions:'submissions.html', Payment:'payment.html', Profile:'profile.html' };
  const linksHTML = links.map(l => `
    <a href="${l==='Overview'?'dashboard.html':l.toLowerCase()+'.html'}" class="nav-link${active===l?' active':''}">${l}</a>
  `).join('');

  document.getElementById('nav-slot').innerHTML = `
    <nav class="nav-float" id="main-nav">
      ${_logoHTML('../')}
      <div class="nav-links">${linksHTML}</div>
      <div class="nav-actions">
        <div class="nav-user-pill" onclick="location.href='profile.html'">
          <div class="nav-avatar">${initials}</div>
          <span class="nav-user-name">${u.fname}</span>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="signOut()">Sign out</button>
      </div>
    </nav>`;
}

/* ── Card formatters ── */
function fmtCard(el) { el.value = el.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim(); }
function fmtExp(el)  { let v = el.value.replace(/\D/g,''); if(v.length>=2) v=v.slice(0,2)+' / '+v.slice(2,4); el.value=v; }
