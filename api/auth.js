const API = "https://v2.api.noroff.dev";
const message = document.getElementById("message");

// ---------- REGISTRERING ----------
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const repeatPassword = document.getElementById("repeatPassword").value;

  if (password !== repeatPassword) {
    showMsg("Passwords do not match.", "red");
    return;
  }

  if (!email.endsWith("@stud.noroff.no")) {
    showMsg("Only @stud.noroff.no emails are allowed.", "red");
    return;
  }

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await res.json();
    console.log("Registration response:", json);

    if (!res.ok) throw new Error(json.errors?.[0]?.message || "Registration failed");

    showMsg("Registration successful! Please log in.", "green");
    e.target.reset();
  } catch (err) {
    showMsg(err.message, "red");
  }
});

// ---------- LOGIN ----------
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();
    console.log("Login response:", json.data);

    if (!res.ok) throw new Error(json.errors?.[0]?.message || "Login failed");

    localStorage.setItem("accessToken", json.data.accessToken);
    localStorage.setItem("userName", json.data.name); // ← BRUK EKSAKT NAVN
    console.log("Lagret navn:", json.data.name);
    window.location.href = "profile.html";
  } catch (err) {
    showMsg(err.message, "red");
  }
});

function showMsg(text, color) {
  message.textContent = text;
  message.style.color = color;
}


// auth.js  (legges i /scripts eller /pages)

export const API_BASE = 'https://v2.api.noroff.dev';
export const API_KEY  = '07017046-84d9-4ec3-9810-750fcee3e6d3';

export const token    = localStorage.getItem('accessToken');
export const userName = localStorage.getItem('userName');

export function guard() {
  if (!token || !userName) {
    window.location.replace('auth.html');
    throw new Error('Not authenticated');
  }
}

// Hent profil én gang og cache i sessionStorage
let cachedProfile = null;
export async function getProfile(force = false) {
  if (cachedProfile && !force) return cachedProfile;

  const res = await fetch(
    `${API_BASE}/auction/profiles/${userName}`,
    { headers: { Authorization: `Bearer ${token}`,
                 'X-Noroff-API-Key': API_KEY } }
  );
  const { data, errors } = await res.json();
  if (!res.ok) throw new Error(errors?.[0]?.message || 'Kunne ikke hente profil');

  cachedProfile = data;
  return data;
}

// Kun oppdatere credits-feltet i nav-baren
export async function refreshNavCredits() {
  const { credits } = await getProfile(true);   // force refresh
  document.getElementById('navCredits').textContent = credits;
}
