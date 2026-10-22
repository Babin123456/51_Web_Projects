// Pokemon Card Collection & Pokedex Logic
const cardsContainer = document.getElementById("main");
const searchInput = document.getElementById("search-input");
const filterPills = document.querySelectorAll(".filter-pill");
const favoritesCountSpan = document.getElementById("fav-count");
const modal = document.getElementById("card-modal");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.getElementById("close-modal");

const FAVORITES_KEY = "pokemon_card_favorites";
let favorites = new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"));
let activeType = "All";
let searchQuery = "";

const fallbackImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

function updateFavoritesBadge() {
    if (favoritesCountSpan) {
        favoritesCountSpan.textContent = favorites.size;
    }
}

function toggleFavorite(pokemonId, event) {
    if (event) event.stopPropagation();

    if (favorites.has(pokemonId)) {
        favorites.delete(pokemonId);
    } else {
        favorites.add(pokemonId);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    updateFavoritesBadge();
    renderCards();
}

function openPokemonModal(pokemon) {
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <div class="modal-card type-${pokemon.type.toLowerCase()}">
            <div class="modal-badge">#${String(pokemon.id).padStart(3, "0")}</div>
            <img class="modal-img" src="${pokemon.sprite}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <span class="type-tag ${pokemon.type.toLowerCase()}">${pokemon.type}</span>
            <p class="modal-desc">${pokemon.description}</p>
            <div class="stats-grid">
                <div class="stat-item"><span class="stat-name">HP</span><span class="stat-val">${pokemon.hp}</span></div>
                <div class="stat-item"><span class="stat-name">Attack</span><span class="stat-val">${pokemon.attack}</span></div>
                <div class="stat-item"><span class="stat-name">Defense</span><span class="stat-val">${pokemon.defense}</span></div>
                <div class="stat-item"><span class="stat-name">Speed</span><span class="stat-val">${pokemon.speed}</span></div>
            </div>
        </div>
    `;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

function renderCards() {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = "";

    const filtered = POKEMON_DATA.filter(poke => {
        const matchesType = activeType === "All" || (activeType === "Favorites" ? favorites.has(poke.id) : poke.type === activeType);
        const matchesSearch = poke.name.toLowerCase().includes(searchQuery.toLowerCase()) || String(poke.id).includes(searchQuery);
        return matchesType && matchesSearch;
    });

    if (filtered.length === 0) {
        cardsContainer.innerHTML = `
            <div class="empty-state">
                <p>No Pokémon found matching your criteria.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(pokemon => {
        const isFav = favorites.has(pokemon.id);
        const card = document.createElement("div");
        card.className = `pokemon-card type-${pokemon.type.toLowerCase()}`;
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View details for ${pokemon.name}`);

        card.innerHTML = `
            <button class="fav-btn ${isFav ? "active" : ""}" aria-label="Favorite ${pokemon.name}" title="Favorite">
                ${isFav ? "★" : "☆"}
            </button>
            <span class="card-id">#${String(pokemon.id).padStart(3, "0")}</span>
            <div class="card-img-wrapper">
                <img src="${pokemon.sprite}" alt="${pokemon.name}" loading="lazy">
            </div>
            <h3 class="card-name">${pokemon.name}</h3>
            <span class="type-pill ${pokemon.type.toLowerCase()}">${pokemon.type}</span>
            <div class="card-mini-stats">
                <span>HP ${pokemon.hp}</span>
                <span>ATK ${pokemon.attack}</span>
            </div>
        `;

        const img = card.querySelector("img");
        img.addEventListener("error", () => {
            img.src = fallbackImage;
        });

        const favBtn = card.querySelector(".fav-btn");
        favBtn.addEventListener("click", (e) => toggleFavorite(pokemon.id, e));

        card.addEventListener("click", () => openPokemonModal(pokemon));
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPokemonModal(pokemon);
            }
        });

        cardsContainer.appendChild(card);
    });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesBadge();
    renderCards();

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim();
            renderCards();
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            activeType = pill.dataset.type;
            renderCards();
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
    });
});
