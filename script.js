// DOM Elements
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

const accountBtn = document.getElementById('accountBtn');
const accountModal = document.getElementById('accountModal');
const closeModalBtn = document.getElementById('closeModal');
const addAccountBtn = document.getElementById('addAccountBtn');
const signOutBtn = document.getElementById('signOutBtn');
const accountList = document.getElementById('accountList');

const overlay = document.getElementById('overlay');
const saveAccountBtn = document.getElementById('saveAccountBtn');
const cancelBtn = document.getElementById('cancelBtn');

const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');

const messageMenu = document.getElementById('messageMenu');
const centerMessage = document.getElementById('centerMessage');
const closeMessageBtn = document.getElementById('closeMessageBtn');
const messageContent = document.getElementById('messageContent');
const messageInputContainer = document.getElementById('messageInputContainer');
const userMessageInput = document.getElementById('userMessageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');

const menuItems = document.querySelectorAll('.menu-item');

// Account storage (localStorage)
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
let activeAccountIndex = -1;

// Helper: Lock or unlock body scroll
function lockBodyScroll(lock) {
  document.body.style.overflow = lock ? 'hidden' : '';
}

// Sidebar toggle handler
function toggleSidebar() {
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('visible');
    lockBodyScroll(sidebar.classList.contains('visible'));
  } else {
    sidebar.classList.toggle('hidden');
  }
}
sidebarToggle.addEventListener('click', toggleSidebar);
sidebarToggle.addEventListener('touchstart', (e) => {
  e.preventDefault(); // prevent double triggering
  toggleSidebar();
});

// Close sidebar on resize if desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove('visible');
    lockBodyScroll(false);
  }
});

// Show account modal
function showAccountModal() {
  accountModal.style.display = 'flex';
  lockBodyScroll(true);
  accountModal.focus();
  renderAccountList();
}
accountBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showAccountModal();
});

// Close account modal
function closeAccountModal() {
  accountModal.style.display = 'none';
  lockBodyScroll(false);
}
closeModalBtn.addEventListener('click', closeAccountModal);

// Render account list
function renderAccountList() {
  accountList.innerHTML = '';

  if (accounts.length === 0) {
    accountList.textContent = 'No accounts added yet.';
    return;
  }

  accounts.forEach((acc, index) => {
    const div = document.createElement('div');
    div.classList.add('account-item');
    if (index === activeAccountIndex) div.classList.add('active');
    div.textContent = `${acc.name} (${acc.email})`;
    div.tabIndex = 0;

    div.addEventListener('click', () => {
      activeAccountIndex = index;
      renderAccountList();
      alert(`Selected account: ${acc.name}`);
      closeAccountModal();
    });

    div.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        div.click();
      }
    });

    accountList.appendChild(div);
  });
}

// Show add account form
function showAddAccountForm() {
  overlay.style.display = 'flex';
  lockBodyScroll(true);
  nameInput.value = '';
  emailInput.value = '';
  nameInput.focus();
}
addAccountBtn.addEventListener('click', showAddAccountForm);

// Hide add account form
function hideAddAccountForm() {
  overlay.style.display = 'none';
  lockBodyScroll(false);
}
cancelBtn.addEventListener('click', hideAddAccountForm);

// Save account from form
saveAccountBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert('Please fill in both name and email.');
    return;
  }

  // Simple email validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email.');
    return;
  }

  accounts.push({ name, email });
  localStorage.setItem('accounts', JSON.stringify(accounts));
  hideAddAccountForm();
  renderAccountList();
});

// Sign out (remove active account)
signOutBtn.addEventListener('click', () => {
  if (activeAccountIndex !== -1) {
    const confirmSignOut = confirm(`Sign out from ${accounts[activeAccountIndex].name}?`);
    if (confirmSignOut) {
      accounts.splice(activeAccountIndex, 1);
      activeAccountIndex = -1;
      localStorage.setItem('accounts', JSON.stringify(accounts));
      renderAccountList();
      alert('Signed out.');
      closeAccountModal();
    }
  } else {
    alert('No active account to sign out.');
  }
});

// Message menu open
messageMenu.addEventListener('click', (e) => {
  e.preventDefault();
  centerMessage.style.display = 'block';
  messageInputContainer.style.display = 'block';
  userMessageInput.value = '';
  userMessageInput.focus();
  lockBodyScroll(true);
});

// Close message center
closeMessageBtn.addEventListener('click', () => {
  centerMessage.style.display = 'none';
  lockBodyScroll(false);
});

// Send message handler (you can customize this as needed)
sendMessageBtn.addEventListener('click', () => {
  const msg = userMessageInput.value.trim();
  if (!msg) return;

  const newMessage = document.createElement('p');
  newMessage.textContent = `You: ${msg}`;
  messageContent.appendChild(newMessage);
  userMessageInput.value = '';
  userMessageInput.focus();

  // Scroll to bottom
  messageContent.scrollTop = messageContent.scrollHeight;
});

// Keyboard shortcuts for accessibility (close modals on Esc)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (accountModal.style.display === 'flex') {
      closeAccountModal();
    }
    if (overlay.style.display === 'flex') {
      hideAddAccountForm();
    }
    if (centerMessage.style.display === 'block') {
      centerMessage.style.display = 'none';
      lockBodyScroll(false);
    }
    if (sidebar.classList.contains('visible')) {
      sidebar.classList.remove('visible');
      lockBodyScroll(false);
    }
  }
});

// Menu items messages (example for Home)
menuItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const msg = item.dataset.message;
    if (msg) {
      centerMessage.style.display = 'block';
      messageInputContainer.style.display = 'none';
      messageContent.textContent = msg;
      lockBodyScroll(true);
    }
  });
});
