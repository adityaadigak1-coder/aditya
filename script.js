const container = document.getElementById('container');
const toggleBtn = document.getElementById('toggleBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Toggle between login & register
toggleBtn.addEventListener('click', () => {
  container.classList.toggle('register-mode');
  toggleBtn.textContent =
    container.classList.contains('register-mode') ? "Login" : "Register";
});

// Firebase Auth reference
const auth = firebase.auth();

// ==================== Google Login ====================
// ==================== Google Login ====================
const googleLoginBtn = document.getElementById('googleLogin');
googleLoginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  // âœ… Always ask which account to use
  provider.setCustomParameters({
    prompt: "select_account"
  });

  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Google Login Success:", result.user);
      window.location.href = "dashboard.html"; // âœ… Redirect after Google login
    })
    .catch((error) => {
      console.error("Google Login Error:", error);
      alert(error.message);
    });
});


// ==================== Email/Password Register ====================
const registerBtn = document.getElementById('registerBtn');
registerBtn.addEventListener('click', () => {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Registration successful!");
      console.log(userCredential.user);
      window.location.href = "dashboard.html"; // âœ… Redirect after register
    })
    .catch(error => {
      alert(error.message);
    });
});

// ==================== Email/Password Login ====================
const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log("Login successful:", userCredential.user);
      window.location.href = "dashboard.html"; // âœ… Redirect after login
    })
    .catch(error => {
      alert(error.message);
    });
});

// ==================== Logout ====================
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    alert("Logged out successfully!");
    window.location.href = "index.html"; // âœ… Send back to login page
  });
});

// ==================== Track Auth State ====================
// ==================== Track Auth State ====================
auth.onAuthStateChanged(user => {
  if (user) {
    toggleBtn.style.display = "none";
    logoutBtn.style.display = "block";
    console.log("User is logged in:", user);

    // âœ… If the user is on the login page, log them out when they come back
    if (window.location.pathname.includes("index.html")) {
      auth.signOut();
    }

  } else {
    toggleBtn.style.display = "block";
    logoutBtn.style.display = "none";
    console.log("No user logged in");
  }
});
