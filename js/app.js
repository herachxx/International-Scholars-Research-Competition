const DB = {
  getUsers:  ()  => JSON.parse(localStorage.getItem('isrc_users') || '[]'),
  saveUsers: (u) => localStorage.setItem('isrc_users', JSON.stringify(u)),
  getUser:   ()  => JSON.parse(localStorage.getItem('isrc_me')    || 'null'),
  saveUser:  (u) => localStorage.setItem('isrc_me',   JSON.stringify(u)),
  clearUser: ()  => localStorage.removeItem('isrc_me'),
   
  syncUser:  () => {
    const me = DB.getUser();
    if (!me) return null;
    const fresh = DB.getUsers().find(u => u.email === me.email);
    if (fresh) DB.saveUser(fresh);
    return fresh || me;
  }
};

function requireAuth() {
  const u = DB.syncUser();
  if (!u) {
    const dest = encodeURIComponent(window.location.href);
    window.location.href = '../pages/login.html?next=' + dest;
    return null;
  }
  return u;
}

function DB_updateUser(updates) {
  const me = Object.assign(DB.getUser(), updates);
  const users = DB.getUsers();
  const idx = users.findIndex(u => u.email === me.email);
  if (idx >= 0) users[idx] = me;
  DB.saveUsers(users);
  DB.saveUser(me);
  return me;
}

function signOut() {
  DB.clearUser();
  window.location.href = '../index.html';
}

function toast(msg) {
  let t = document.getElementById('_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_toast';
    t.className = 'toast';
    t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span></span>';
    document.body.appendChild(t);
  }
  t.querySelector('span').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 3400);
}

function faq(btn) {
  btn.closest('.faq-item').classList.toggle('open');
}

function _logoHTML(prefix) {
  return `<a href="${prefix}index.html" class="nav-logo">
    <svg viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="20" fill="#1C2B5A"/>
      <circle cx="22" cy="22" r="14" fill="none" stroke="#B8882A" stroke-width="1" opacity=".7"/>
      <polygon points="22,7 26,17.5 37.5,17.5 28.5,24 31.5,35 22,28.5 12.5,35 15.5,24 6.5,17.5 18,17.5" fill="#fff" opacity=".95"/>
      <polygon points="22,11 25,19 34,19 27,24.5 29.5,33 22,28 14.5,33 17,24.5 10,19 19,19" fill="#B8882A" opacity=".85"/>
    </svg>
    <div class="nav-logo-text">
      <span class="brand">ISRC</span>
      <span class="sub">2026 Competition</span>
    </div>
  </a>`;
}

function renderPublicNav(active, prefix) {
  prefix = prefix || '';
  const links = ['Home','About','Categories','Timeline','FAQ'];
  const hrefs = {
    Home:'index.html', About:'index.html#about',
    Categories:'index.html#categories', Timeline:'index.html#timeline', FAQ:'index.html#faq'
  };
  const linksHTML = links.map(l =>
    `<a href="${prefix}${hrefs[l]}" class="nav-link${active===l?' active':''}">${l}</a>`
  ).join('');

  document.getElementById('nav-slot').innerHTML = `
    <nav class="nav-float">
      ${_logoHTML(prefix)}
      <div class="nav-links">${linksHTML}</div>
      <div class="nav-actions">
        <a href="${prefix}pages/login.html" class="nav-login">Login</a>
        <a href="${prefix}pages/register.html" class="btn btn-navy btn-sm">Submit Research</a>
      </div>
    </nav>`;
}

function renderDashNav(active) {
  const u = DB.getUser();
  if (!u) return;
  const initials = (u.fname[0] + (u.lname ? u.lname[0] : '')).toUpperCase();
  const links = ['Overview','Submit','Submissions','Payment'];
  const hrefs = {
    Overview:'dashboard.html', Submit:'submit.html',
    Submissions:'submissions.html', Payment:'payment.html'
  };
  const linksHTML = links.map(l =>
    `<a href="${hrefs[l]}" class="nav-link${active===l?' active':''}">${l}</a>`
  ).join('');

  document.getElementById('nav-slot').innerHTML = `
    <nav class="nav-float">
      ${_logoHTML('../')}
      <div class="nav-links">${linksHTML}</div>
      <div class="nav-actions">
        <div class="nav-avatar-wrap" id="_aw">
          <button class="nav-avatar" onclick="toggleAvatarMenu()" title="Account menu" aria-haspopup="true">
            ${initials}
          </button>
          <div class="avatar-menu" id="_am" role="menu">
            <div class="avatar-menu-header">
              <strong>${u.fname} ${u.lname||''}</strong>
              <span>${u.email}</span>
            </div>
            <a href="profile.html" class="avatar-menu-item" role="menuitem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              My Profile
            </a>
            <a href="certificate.html" class="avatar-menu-item" role="menuitem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
              Certificate
            </a>
            <div class="avatar-menu-divider"></div>
            <button class="avatar-menu-item avatar-menu-signout" onclick="signOut()" role="menuitem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>`;

  document.addEventListener('click', function handler(e) {
    const wrap = document.getElementById('_aw');
    if (wrap && !wrap.contains(e.target)) {
      const menu = document.getElementById('_am');
      if (menu) menu.classList.remove('open');
    }
  });
}

function toggleAvatarMenu() {
  document.getElementById('_am').classList.toggle('open');
}

function fmtCard(el) {
  el.value = el.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
}

function fmtExp(el) {
  let v = el.value.replace(/\D/g,'');
  if (v.length >= 2) v = v.slice(0,2) + ' / ' + v.slice(2,4);
  el.value = v;
}

function showAlert(el, message, type) {
  el.textContent = message;
  el.className = 'alert show alert-' + type;
  setTimeout(() => {
    el.classList.remove('show');
  }, 4000);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(pwd) {
  return pwd.length >= 8;
}

let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-float');
  if (!nav) return;
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 60) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }
  lastScrollY = currentScrollY;
});

/**
 * Parse numeric display string into { value, prefix, suffix }.
 * Handles: "2,400+", "48", "$120K", "89", "1", "0". Returns null if not numeric.
 */
function parseNumberDisplay(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  const match = trimmed.match(/^([^0-9.,]*)([0-9,]+(?:\.[0-9]+)?)([^0-9.,]*)$/);
  if (!match) return null;
  const rawNum = match[2].replace(/,/g, '');
  const num = parseFloat(rawNum, 10);
  if (Number.isNaN(num)) return null;
  return { value: num, prefix: match[1] || '', suffix: match[3] || '' };
}

function formatNumberDisplay(value, prefix, suffix) {
  const intVal = Math.round(value);
  const str = intVal.toLocaleString();
  return prefix + str + suffix;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

const NUMBER_ANIM_DURATION = 1500; // ms
const NUMBER_ANIM_START_RATIO = 0.8;

/**
 * Animate a single element's numeric content from 80% to 100% over 1.5s.
 */
function animateElementNumber(el) {
  const parsed = parseNumberDisplay(el.textContent);
  if (!parsed) return;
  const { value, prefix, suffix } = parsed;
  const startVal = value * NUMBER_ANIM_START_RATIO;
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const t = Math.min(elapsed / NUMBER_ANIM_DURATION, 1);
    const eased = easeOutCubic(t);
    const current = startVal + (value - startVal) * eased;
    el.textContent = formatNumberDisplay(current, prefix, suffix);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/**
 * Find all number elements (.stat-val, .stat-card .num, .num) and run 80%→100% animation over 1.5s.
 */
function animateNumbers(root) {
  root = root || document;
  const selectors = '.stat-val, .stat-card .num, .num';
  root.querySelectorAll(selectors).forEach(el => {
    if (parseNumberDisplay(el.textContent)) animateElementNumber(el);
  });
}

function initNumberAnimations() {
  animateNumbers();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNumberAnimations);
} else {
  initNumberAnimations();
}
