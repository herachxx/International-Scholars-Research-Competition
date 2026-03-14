/**
 * Index page script — nav (logged-in vs public) and avatar menu
 */
(function () {
  const me = DB.getUser();

  if (me) {
    renderPublicNav('Home');

    const initials = (me.fname[0] + (me.lname ? me.lname[0] : '')).toUpperCase();
    document.querySelector('.nav-actions').innerHTML = `
      <a href="pages/dashboard.html" class="btn btn-navy btn-sm">My Dashboard</a>
      <div class="nav-avatar-wrap" id="_aw">
        <button class="nav-avatar" onclick="toggleAvatarMenuHome()" title="Account menu">
          ${initials}
        </button>
        <div class="avatar-menu" id="_am" role="menu">
          <div class="avatar-menu-header">
            <strong>${me.fname} ${me.lname || ''}</strong>
            <span>${me.email}</span>
          </div>
          <a href="pages/profile.html" class="avatar-menu-item" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            My Profile
          </a>
          <a href="pages/certificate.html" class="avatar-menu-item" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
            Certificate
          </a>
          <div class="avatar-menu-divider"></div>
          <button class="avatar-menu-item avatar-menu-signout" onclick="signOutHome()" role="menuitem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </div>
    `;

    document.addEventListener('click', function (e) {
      const w = document.getElementById('_aw');
      if (w && !w.contains(e.target)) {
        document.getElementById('_am')?.classList.remove('open');
      }
    });
  } else {
    renderPublicNav('Home');
  }

  window.toggleAvatarMenuHome = function () {
    document.getElementById('_am').classList.toggle('open');
  };

  window.signOutHome = function () {
    DB.clearUser();
    location.reload();
  };
})();
