export function renderFooter() {
    const footer = document.createElement("footer");
    footer.className = "bg-[#F8F3EB] text-gray-600 text-sm mt-10 py-6";
  
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; ${new Date().getFullYear()} BidUp. All rights reserved.</p>
         <div class="flex gap-4">

         <!-- Instagram -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm6-1a1 1 0 110 2 1 1 0 010-2z"/>
      </svg>

      <!-- Facebook -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"/>
      </svg>

      <!-- Twitter -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    </div>
  </div>
       `;
        document.body.appendChild(footer);
      }

      