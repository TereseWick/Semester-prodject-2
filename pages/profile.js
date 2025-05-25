/* ──────────────────────────────────────────────
   Konfigurasjon
   ─────────────────────────────────────────── */
   const API_BASE = 'https://v2.api.noroff.dev';
   const API_KEY  = '07017046-84d9-4ec3-9810-750fcee3e6d3';   // <– bytt om ønskelig
   const FALLBACK_AVATAR = 'https://i.imgur.com/MT7Qp9p.jpg';
   
   /* Token / brukernavn fra localStorage  */
   const token    = localStorage.getItem('accessToken');
   const userName = localStorage.getItem('userName');
   
   if (!token || !userName) {
     window.location.href = 'auth.html';
     throw new Error('Not authenticated');
   }
   
   /* Pekere til DOM-elementene vi skal fylle */
   const headerEl  = document.querySelector('header');
   const profileEl = document.getElementById('profile');   // main-container
   const logoutBtn = document.getElementById('logoutBtn');
   
   logoutBtn.addEventListener('click', (e) => {
    e.currentTarget.disabled = true;
     localStorage.clear();
     window.location.href = 'auth.html';
   });
   
   
   async function renderProfile() {
     try {
       const res = await fetch(
         `${API_BASE}/auction/profiles/${userName}`,
         { headers: { Authorization: `Bearer ${token}`, 'X-Noroff-API-Key': API_KEY } }
       );
       const { data, errors } = await res.json();
       if (!res.ok) throw new Error(errors?.[0]?.message || 'Kunne ikke hente profil');
   
       const user   = data;
       const avatar = user.avatar?.url || FALLBACK_AVATAR;
       const banner = user.banner?.url || '';  
   
       /* ───── Banner + avatar i <header> ───── */
       headerEl.classList.add('relative', 'bg-banner', 'min-h-[200px]');   // 200 px ≈ h-48
       headerEl.style.background = banner
         ? `url("${banner}") center/cover`
         : undefined;
   
       headerEl.insertAdjacentHTML(
         'beforeend',
         /*html*/`
         <!-- HIDDEN FILE INPUT + FULL-HEADER LABEL -->
         <input id="bannerUpload" type="file" accept="image/*" class="hidden" />
         <label for="bannerUpload" class="absolute inset-0 cursor-pointer z-0"></label>

         <!-- Avatar (absolutt posisjonert) -->
         <div class="absolute -bottom-16 left-6 w-32 h-32 rounded-full
                     border-4 border-page bg-banner overflow-hidden shadow-avatar">
           <img src="${avatar}" alt="User avatar"
                class="object-cover w-full h-full" />
           <input id="avatarUpload" type="file" accept="image/*" class="hidden" />
           <label for="avatarUpload" class="absolute inset-0 cursor-pointer"></label>
         </div>`
       );
   
       /* ───── Navn + credits (under header) ───── */
       profileEl.innerHTML = /*html*/`
         <div class="mt-16 px-6">                 <!-- mt-20 = 5 rem → plass til avatar-halvsirkel -->
           <h2 class="text-2xl font-bold">${user.name}</h2>
           <p id="creditsText" class="text-accent text-lg ">Credits: ${user.credits}</p>
         </div>
   
         <div class="mt-8 px-6 flex gap-4">
           <button id="editProfileBtn"
                   class="bg-beige px-6 py-2 border border-text-dark shadow hover:bg-beige/80 transition">
             Edit Profile
           </button>
           <button id="addItemBtn"
                   class="bg-beige px-6 py-2 border border-text-dark shadow hover:bg-beige/80 transition">
             Add items to auction
           </button>
         </div>
       `;
   
       /* Lyttere for fil-opplasting – (implementér egen upload-logikk om ønsket) */
       document.getElementById('avatarUpload')
               .addEventListener('change', e => previewAndSave(e, 'avatar'));
       document.getElementById('bannerUpload')
               .addEventListener('change', e => previewAndSave(e, 'banner'));
     } catch (err) {
       console.error(err);
       profileEl.innerHTML =
         `<p class="text-red-600 text-center mt-8">❌ ${err.message}</p>`;
     }
   }
   
   /* ──────────────────────────────────────────────
      Vis forhåndsvisning og PUT til Noroff-API
      ─────────────────────────────────────────── */
   async function previewAndSave(evt, field) {
     const file = evt.target.files?.[0];
     if (!file) return;
   
     /* Demo: bruk lokal blob-URL som forhåndsvisning */
     const blobURL = URL.createObjectURL(file);
     evt.target.parentElement.querySelector('img').src = blobURL;
   
     /* TODO: Last filen til S3/Imgur → få permanent URL (her bruker vi blobURL) */
     try {
       await fetch(
         `${API_BASE}/auction/profiles/${userName}`,
         {
           method: 'PUT',
           headers: {
             Authorization: `Bearer ${token}`,
             'X-Noroff-API-Key': API_KEY,
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             [field]: { url: blobURL, alt: field },
           }),
         }
       );
       alert('✅ Profil oppdatert!');
     } catch (err) {
       console.error(err);
       alert('❌ Feil ved oppdatering: ' + err.message);
     }
   }
   
   /* ──────────────────────────────────────────────
      Kjør
      ─────────────────────────────────────────── */
   renderProfile();
   
   