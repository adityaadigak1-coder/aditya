// Sidebar toggle
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

// Account modal elements
const accountBtn = document.getElementById("accountBtn");
const accountModal = document.getElementById("accountModal");
const closeModal = document.getElementById("closeModal");
const addAccountBtn = document.getElementById("addAccountBtn");
const overlay = document.getElementById("overlay");
const saveAccountBtn = document.getElementById("saveAccountBtn");
const cancelBtn = document.getElementById("cancelBtn");
const accountList = document.getElementById("accountList");
const signOutBtn = document.getElementById("signOutBtn");

let accounts = [
  { name: "Aditya Adiga K", email: "adityaadiga.k01@gmail.com" }
];
let currentAccountIndex = 0;

// Render accounts
function renderAccounts() {
  accountList.innerHTML = "";
  accounts.forEach((acc, index) => {
    const div = document.createElement("div");
    div.classList.add("account-item");
    if (index === currentAccountIndex) div.classList.add("active");
    div.innerHTML = `<strong>${acc.name}</strong><br>${acc.email}`;
    div.addEventListener("click", () => {
      currentAccountIndex = index;
      renderAccounts();
    });
    accountList.appendChild(div);
  });
}

// Open/close account modal
accountBtn.addEventListener("click", () => {
  accountModal.style.display = "flex";
  renderAccounts();
});
closeModal.addEventListener("click", () => {
  accountModal.style.display = "none";
});

// Add account
addAccountBtn.addEventListener("click", () => overlay.style.display = "flex");
cancelBtn.addEventListener("click", () => overlay.style.display = "none");
saveAccountBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  if (name && email) {
    accounts.push({ name, email });
    overlay.style.display = "none";
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    renderAccounts();
  } else {
    alert("Please enter valid name and email.");
  }
});

// Sign out
signOutBtn.addEventListener("click", () => {
  if (accounts.length > 0) {
    accounts.splice(currentAccountIndex, 1);
    currentAccountIndex = 0;
    renderAccounts();
  }
  if (accounts.length === 0) accountModal.style.display = "none";
});

// Center message box for menu items
const centerMessage = document.getElementById('centerMessage');
const messageTitle = document.getElementById('messageTitle');
const messageContent = document.getElementById('messageContent');
const closeMessageBtn = document.getElementById('closeMessageBtn');

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    sidebar.classList.add('hidden'); // Collapse sidebar
    messageTitle.textContent = item.textContent.trim();
    messageContent.textContent = item.dataset.message;
    centerMessage.style.display = 'flex';
  });
});

// About Us 5 paragraphs
const aboutUsLink = document.getElementById('aboutUsLink');
aboutUsLink.addEventListener('click', (e) => {
  e.preventDefault();
  sidebar.classList.add('hidden');
  messageTitle.textContent = "About Us";
  messageContent.innerHTML = `
    <p>Welcome to Renign, your ultimate platform for modern solutions.</p>
   
  `;
  centerMessage.style.display = 'flex';
});

// Close center message
closeMessageBtn.addEventListener('click', () => {
  centerMessage.style.display = 'none';
});
