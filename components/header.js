// js/header.js

export function renderHeader() {
    const header = document.createElement("header");
    header.className = "bg-[#2E2929] text-white shadow-md";
  
    header.innerHTML = `
      <!-- Øverste rad: logo, søk, ikoner -->
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold tracking-wide font-logo">BidUp</a>
  
        <div class="flex-1 px-8 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search items"
            class="w-full px-4 py-2 rounded-md text-black placeholder-gray-500 focus:outline-none"
          />
        </div>
  
        <div class="flex items-center gap-3">
        <span id="navUserName" class="font-medium"></span>

        <span id="navCredits"
        class="text-white px-2 py-0.5 rounded text-sm"
      ></span>

      <button id="navLogout" class="bg-white text-black px-4 py-1 font-medium hover:opacity-90">
        LOG OUT!
       </button>
        </div>
      </div>
  
      <nav class="bg-[#F8F3EB] text-black">
        <div class="max-w-7xl mx-auto px-4 py-2 flex space-x-6 border-t border-gray-200 justify-center">
          <a href="/" class="hover:underline">Home</a>
          <a href="/listings.html" class="hover:underline">Auctions</a>
          <a href="/profile.html" class="hover:underline">My Profile</a>
        </div>
      </nav>
    `;
  
    document.body.prepend(header);
  
 header.querySelector('#navLogout').addEventListener('click', () => {
   localStorage.clear();
   window.location.href = '/auth.html';
 });
  }