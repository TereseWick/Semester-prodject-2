const API_BASE = 'https://v2.api.noroff.dev';
const PAGE_SIZE = 16;  

(async function initCarousel() {
    const track   = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
  
    const res  = await fetch(
      `${API_BASE}/auction/listings` +
      `?limit=5&offset=0&_active=true&_bids=true` +
      `&_sort=created&sortOrder=desc`
    );
    const { data } = await res.json();
  
    /* bygg kortene (samme layout som grid) */
    data.forEach(item => track.appendChild(buildCard(item)));
  
    /* gi hvert kort 100 % bredde = full “slide” */
    track.querySelectorAll('a').forEach(el => {
      el.classList.add('min-w-full');   // flex-barn dekker hele synsfeltet
    });
  
    /* indeks & navigasjon */
    let idx = 0;
    const slide = () =>
      track.style.transform = `translateX(-${idx * 100}%)`;
  
    nextBtn.onclick = () => {
      idx = (idx + 1) % data.length;
      slide();
    };
  
    prevBtn.onclick = () => {
      idx = (idx - 1 + data.length) % data.length;
      slide();
    };
  })();
  
  /* helper: lag ett kort */
  function buildCard(item) {
    const thumb = item.media?.[0]?.url
               || 'https://via.placeholder.com/400x300?text=No+image';
    const bids  = item.bids ?? [];
    const top   = bids.length ? Math.max(...bids.map(b => b.amount)) : 0;
    const left  = timeLeftString(item.endsAt);
  
    const card = document.createElement('a');
    card.href  = `/pages/item.html?id=${item.id}`;
    card.className =
      'block bg-white rounded shadow border border-gray-200 overflow-hidden';
  
    card.innerHTML = `
    <div class="aspect-video w-full">
      <img src="${thumb}" alt="${item.title}"
           class="w-full h-56 object-cover">
      <div class="p-3 space-y-1">
        <h3 class="font-semibold line-clamp-2 min-h-[3rem]">${item.title}</h3>
        <p class="text-sm text-gray-600">${left}</p>
        <p class="font-medium">Top bid: ${top} cr</p>

        <a href="/listing.html?id=${item.id}"
        class="block text-center bg-banner text-yext-dark py-1 mt-2 rounded
        hover:bg-banner/90">VIEW DETAILS!</a>
      </div>`;
    return card;
  }
  


/* ------------ DOM-peker ------------ */
const grid  = document.getElementById('listingGrid');
const moreBtn = document.getElementById('loadMoreBtn');

/* ------------ paginering-tellere ------------ */
let offset = 0;
let reachedEnd = false;

/* ------------ hent og vis listings ------------ */
async function loadListings() {
  if (reachedEnd) return;

  moreBtn.disabled = true;          // grå ut knappen mens vi henter
  
    const res = await fetch(
      `${API_BASE}/auction/listings?limit=${PAGE_SIZE}&offset=${offset}&_active=true`
    );
    const { data } = await res.json();

    // legg nye kort i grid
    data.forEach(renderCard);

    // oppdater paginering
    offset += data.length;
    if (data.length < PAGE_SIZE) {
      reachedEnd = true;
      moreBtn.classList.add('hidden');
    }
    
  
    moreBtn.disabled = false;
  }




/* ------------ kort-komponent ------------ */
function renderCard(item) {
  const {
    id, title, media, endsAt, 
    bids = []
  } = item;

  const thumb = media?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+image';

  // høyeste bud
  const topBid = bids.length ? Math.max(...bids.map(b => b.amount)) : 0;
  const timeLeft = timeLeftString(endsAt);

  const card = document.createElement('a');
  card.href = `/pages/item.html?id=${id}`;
  card.className =
    'block bg-white rounded shadow-card hover:shadow-lg transition ' +
    'border border-gray-200 overflow-hidden';

  card.innerHTML = /*html*/`
  <div class="aspect-video w-full">
      <img src="${thumb}" alt="${title}"
           class="h-56 w-full object-cover">

      <div class="p-4 flex flex-col gap-1">
        <h2 class="font-semibold line-clamp-2 min-h-[3rem]">${title}</h2>
        <p class="text-sm text-gray-600">${timeLeft}</p>
        <p class="font-medium">Top bid: ${topBid} cr</p>

        <a href="/listing.html?id=${id}"
        class="block text-center bg-banner text-yext-dark py-1 mt-2 rounded
        hover:bg-banner/90">VIEW DETAILS!</a>
      </div>
    
  `;
  grid.appendChild(card);
}

/* ------------ hjelpefunksjon ------------ */
function timeLeftString(dateStr) {
  const diff = new Date(dateStr) - Date.now();
  if (diff <= 0) return 'Auction ended';

  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor((diff / 1000 / 60) % 60);
  return `${h}h ${m}m left`;
}

/* ------------ event listeners & kick-off ------------ */
moreBtn.addEventListener('click', loadListings);
loadListings();        // kjør første “side” med én gang

