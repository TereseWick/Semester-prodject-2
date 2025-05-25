

const API_BASE = 'https://v2.api.noroff.dev';
const params   = new URLSearchParams(location.search);
const id       = params.get('id');

const root = document.getElementById('itemView');

(async function renderItem() {
  try {
    const res = await fetch(
      `${API_BASE}/auction/listings/${id}?_seller=true&_bids=true`
    );
    if (!res.ok) throw new Error('Listing not found');
    const { data: item } = await res.json();

    /* enkel visning */
    const topBid = item.bids.length
      ? Math.max(...item.bids.map(b => b.amount))
      : 0;

    root.innerHTML = `
      <h1 class="text-2xl font-bold mb-4">${item.title}</h1>

      <img src="${item.media?.[0]?.url || 'https://via.placeholder.com/800x400'}"
           alt="${item.title}" class="w-full max-h-96 object-cover rounded mb-4">

      <p class="mb-2"><strong>Description:</strong> ${item.description || '—'}</p>
      <p class="mb-2"><strong>Time left:</strong> ${timeLeftString(item.endsAt)}</p>
      <p class="mb-6"><strong>Top bid:</strong> ${topBid} cr</p>

      <button id="bidBtn"
              class="bg-banner text-text-dark px-4 py-2 rounded hover:bg-banner/90">
        Place bid
      </button>
    `;
  } catch (err) {
    root.innerHTML = `<p class="text-red-600">❌ ${err.message}</p>`;
  }
})();

function timeLeftString(dateStr) {
  const diff = new Date(dateStr) - Date.now();
  if (diff <= 0) return 'Auction ended';
  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor((diff / 1000 / 60) % 60);
  return `${h}h ${m}m left`;
}
