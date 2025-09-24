// === Sidebar Toggle ===
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

function closeSidebarOnMobile() {
  if (window.innerWidth <= 768) {
    sidebar.classList.add('hidden');
  }
}

// === Modal & Message UI Elements ===
const centerMessage = document.getElementById('centerMessage');
const messageTitle = document.getElementById('messageTitle');
const messageContent = document.getElementById('messageContent');
const closeMessageBtn = document.getElementById('closeMessageBtn');
const messageInputContainer = document.getElementById('messageInputContainer');
const userMessageInput = document.getElementById('userMessageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');

// === Menu Buttons ===
const messageMenu = document.getElementById('messageMenu');
const searchMenu = document.getElementById('searchMenu');
const aboutUsLink = document.getElementById('aboutUsLink');
const accountBtn = document.getElementById('accountBtn');

// === Message History ===
let messageHistory = [];

// === Show Message Input ===
messageMenu.addEventListener('click', (e) => {
  e.preventDefault();
  messageTitle.textContent = 'Send a Message';
  messageContent.textContent = 'Type and send your message below.';
  messageInputContainer.style.display = 'flex';
  centerMessage.style.display = 'flex';
  setTimeout(() => userMessageInput.focus(), 300);
  closeSidebarOnMobile();
});

// === Send Message ===
sendMessageBtn.addEventListener('click', () => {
  const text = userMessageInput.value.trim();
  if (text) {
    messageHistory.push(text);
    messageTitle.textContent = 'Last Sent Message';
    messageContent.textContent = text;
    userMessageInput.value = '';
  }
});

userMessageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessageBtn.click();
});

// === Show Message History ===
searchMenu.addEventListener('click', (e) => {
  e.preventDefault();
  messageTitle.textContent = 'Message History';
  messageInputContainer.style.display = 'none';

  if (messageHistory.length === 0) {
    messageContent.innerHTML = '<p>No messages sent yet.</p>';
  } else {
    messageContent.innerHTML = `
      <ul style="padding-left: 20px;">
        ${messageHistory.map(msg => `<li>${msg}</li>`).join('')}
      </ul>
      <button id="clearHistoryBtn">🗑️ Delete History</button>
    `;
  }

  centerMessage.style.display = 'flex';
  closeSidebarOnMobile();
});

// Delegate clear history button click
messageContent.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'clearHistoryBtn') {
    if (confirm('Are you sure you want to delete all message history?')) {
      messageHistory = [];
      centerMessage.style.display = 'none';
    }
  }
});

// === Close Message Modal ===
closeMessageBtn.addEventListener('click', () => {
  centerMessage.style.display = 'none';
  messageInputContainer.style.display = 'none';
});

// Close modal when clicking outside message box on mobile
centerMessage.addEventListener('click', (e) => {
  if (e.target === centerMessage) {
    centerMessage.style.display = 'none';
    messageInputContainer.style.display = 'none';
  }
});

// === About Us ===
aboutUsLink.addEventListener('click', (e) => {
  e.preventDefault();
  messageTitle.textContent = 'About Us';
  messageInputContainer.style.display = 'none';
  messageContent.innerHTML = `
    <p>Welcome to Renign, your ultimate platform for modern solutions.</p>
  `;
  centerMessage.style.display = 'flex';
  closeSidebarOnMobile();
});

// === Account Modal ===
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

let accounts = [
  { name: "Aditya Adiga K", email: "adityaadiga.k01@gmail.com" }
];
let activeAccountIndex = 0;

accountBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderAccountList();
  accountModal.style.display = 'flex';
  closeSidebarOnMobile();
});

closeModalBtn.addEventListener('click', () => {
  accountModal.style.display = 'none';
});

addAccountBtn.addEventListener('click', () => {
  overlay.style.display = 'flex';
  nameInput.value = '';
  emailInput.value = '';
});

cancelBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

saveAccountBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert('Please fill in both name and email.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Invalid email address.');
    return;
  }

  accounts.push({ name, email });
  activeAccountIndex = accounts.length - 1;
  renderAccountList();
  overlay.style.display = 'none';
});

function renderAccountList() {
  accountList.innerHTML = '';
  if (accounts.length === 0) {
    accountList.textContent = 'No accounts added.';
    return;
  }

  accounts.forEach((acc, index) => {
    const div = document.createElement('div');
    div.className = 'account-item';
    if (index === activeAccountIndex) div.classList.add('active');
    div.textContent = `${acc.name} (${acc.email})`;
    div.addEventListener('click', () => {
      activeAccountIndex = index;
      renderAccountList();
      alert(`Selected account: ${acc.name}`);
    });
    accountList.appendChild(div);
  });
}

signOutBtn.addEventListener('click', () => {
  if (activeAccountIndex === -1) return;
  const acc = accounts[activeAccountIndex];
  if (confirm(`Sign out from ${acc.name}?`)) {
    accounts.splice(activeAccountIndex, 1);
    activeAccountIndex = accounts.length ? 0 : -1;
    renderAccountList();
  }
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.style.display = 'none';
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
