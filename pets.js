/* ==========================================================================
   RAREST PETS INDEX MODULE (DECOUPLED LOGIC)
   ========================================================================== */

const PETS_DATA = [
    { rank: "✦", name: "Mega Rainbow Black Dragon", rarity: "Super", size: "Mega", rainbow: true, exist: null, odds: "???,???,???,???", image: "black-dragon-huge" },
    { rank: "1", name: "Mega Bear", rarity: "Mythic", size: "Mega", rainbow: false, exist: 1, odds: "50,000,000", image: "bear-huge" },
    { rank: "2", name: "Rainbow Bear", rarity: "Mythic", size: "Normal", rainbow: true, exist: 1, odds: "50,000,000", image: "bear" },
    { rank: "3", name: "Mega Rainbow Unicorn", rarity: "Mythic", size: "Mega", rainbow: true, exist: 1, odds: "50,000,000", image: "unicorn-huge" },
    { rank: "4", name: "Mega Rainbow Bee", rarity: "Legendary", size: "Mega", rainbow: true, exist: 1, odds: "50,000,000", image: "bee-huge" },
    { rank: "5", name: "Mega Rainbow Robin", rarity: "Legendary", size: "Mega", rainbow: true, exist: 1, odds: "50,000,000", image: "robin-huge" },
    { rank: "6", name: "Mega Raccoon", rarity: "Super", size: "Mega", rainbow: false, exist: 3, odds: "17,000,000", image: "raccoon-huge" },
    { rank: "7", name: "Rainbow Monkey", rarity: "Mythic", size: "Normal", rainbow: true, exist: 6, odds: "8,300,000", image: "monkey" },
    { rank: "8", name: "Mega Unicorn", rarity: "Mythic", size: "Mega", rainbow: false, exist: 6, odds: "8,300,000", image: "unicorn-huge" },
    { rank: "9", name: "Mega Rainbow Frog", rarity: "Common", size: "Mega", rainbow: true, exist: 6, odds: "8,300,000", image: "frog-huge" },
    { rank: "10", name: "Big Rainbow Owl", rarity: "Uncommon", size: "Big", rainbow: true, exist: 9, odds: "5,600,000", image: "owl-big" },
    { rank: "11", name: "Mega Rainbow Bunny", rarity: "Common", size: "Mega", rainbow: true, exist: 9, odds: "5,600,000", image: "bunny-huge" },
    { rank: "12", name: "Mega Rainbow Deer", rarity: "Rare", size: "Mega", rainbow: true, exist: 10, odds: "5,000,000", image: "deer-huge" },
    { rank: "13", name: "Big Rainbow Robin", rarity: "Legendary", size: "Big", rainbow: true, exist: 22, odds: "2,300,000", image: "robin-big" },
    { rank: "14", name: "Big Rainbow Bee", rarity: "Legendary", size: "Big", rainbow: true, exist: 25, odds: "2,000,000", image: "bee-big" },
    { rank: "15", name: "Big Monkey", rarity: "Mythic", size: "Big", rainbow: false, exist: 26, odds: "1,900,000", image: "monkey-big" },
    { rank: "16", name: "Rainbow Raccoon", rarity: "Super", size: "Normal", rainbow: true, exist: 27, odds: "1,900,000", image: "raccoon" },
    { rank: "17", name: "Rainbow Unicorn", rarity: "Mythic", size: "Normal", rainbow: true, exist: 31, odds: "1,600,000", image: "unicorn" },
    { rank: "18", name: "Big Raccoon", rarity: "Super", size: "Big", rainbow: false, exist: 48, odds: "1,000,000", image: "raccoon-big" },
    { rank: "19", name: "Big Bear", rarity: "Mythic", size: "Big", rainbow: false, exist: 57, odds: "880,000", image: "bear-big" },
    { rank: "20", name: "Rainbow Golden Dragonfly", rarity: "Mythic", size: "Normal", rainbow: true, exist: 66, odds: "760,000", image: "golden-dragonfly" },
    { rank: "21", name: "Mega Rainbow Ice Serpent", rarity: "Super", size: "Mega", rainbow: true, exist: 73, odds: "680,000", image: "ice-serpent-huge" },
    { rank: "22", name: "Big Rainbow Deer", rarity: "Rare", size: "Big", rainbow: true, exist: 106, odds: "470,000", image: "deer-big" },
    { rank: "23", name: "Big Golden Dragonfly", rarity: "Mythic", size: "Big", rainbow: false, exist: 141, odds: "350,000", image: "golden-dragonfly-big" },
    { rank: "24", name: "Turtle", rarity: "Rare", size: "Normal", rainbow: false, exist: null, odds: "27", image: "turtle" }
];

let currentPetFilter = 'all';

function renderPets() {
    const list = document.getElementById('petsList');
    const empty = document.getElementById('petsEmpty');
    if (!list) return;
    list.innerHTML = '';

    let visibleCount = 0;

    PETS_DATA.forEach(pet => {
        let show = false;
        if (currentPetFilter === 'all') {
            show = true;
        } else if (currentPetFilter === 'normal') {
            show = (pet.size === 'Normal' && !pet.rainbow);
        } else if (currentPetFilter === 'rainbow') {
            show = pet.rainbow;
        } else if (currentPetFilter === 'big') {
            show = (pet.size === 'Big');
        } else if (currentPetFilter === 'mega') {
            show = (pet.size === 'Mega');
        }

        if (!show) return;

        visibleCount++;

        const row = document.createElement('li');
        const isLegendStyle = ['super', 'mythic', 'legendary'].includes(pet.rarity.toLowerCase());
        row.className = 'prp__row' + (isLegendStyle ? ' prp__row--legend' : '');
        row.style.setProperty('--rar', `var(--rar-${pet.rarity.toLowerCase()})`);

        let rankHtml = pet.rank === '✦'
            ? `<span class="prp__rank" style="font-size:1.2rem;">✦</span>`
            : `<span class="prp__rank">${pet.rank}</span>`;

        const avatarClass = 'prp__avatar' + (pet.rainbow ? ' is-rainbow' : '');
        const badgeHtml = pet.size === 'Mega'
            ? `<span class="prp__badge">MEGA</span>`
            : (pet.size === 'Big' ? `<span class="prp__badge">BIG</span>` : '');
        const imgSrc = `https://gag.gg/pets/${pet.image}.png`;
        const existHtml = pet.exist !== null ? `<span class="prp__count">${pet.exist} exist</span>` : '';

        const isZeroScore = pet.odds.includes('?');
        const scoreClass = 'prp__score' + (isZeroScore ? ' prp__score--zero' : '');

        row.innerHTML = `
            ${rankHtml}
            <div class="${avatarClass}">
                <img class="prp__img" src="${imgSrc}" alt="${pet.name}" loading="lazy">
                ${badgeHtml}
            </div>
            <div class="prp__body">
                <div class="prp__meta">
                    <div class="prp__name">${pet.name}</div>
                    <div class="prp__subline">
                        <span class="prp__rartag" style="--rar: var(--rar-${pet.rarity.toLowerCase()})">${pet.rarity}</span>
                        ${existHtml}
                    </div>
                </div>
                <div class="${scoreClass}">1 in ${pet.odds}</div>
            </div>
        `;

        list.appendChild(row);
    });

    if (visibleCount === 0) {
        empty.classList.remove('hidden');
    } else {
        empty.classList.add('hidden');
    }
}

// --------------------------------------------------------------------------
// DECOUPLED CONTROLLER OVERRIDES
// --------------------------------------------------------------------------

// Store references to the original controller functions
const originalSetTab = window.setTab;
const originalRender = window.render;
const originalTickGlobal = window.tickGlobal;

// Override Tab Switcher logic
window.setTab = function (tab) {
    window.TAB = tab; // Set global active tab tracker

    // Call original setTab to update script-scoped TAB and toggle standard classes
    if (originalSetTab) {
        originalSetTab(tab);
    }

    // Toggle active state for standard tabs using original elements
    const tSeeds = document.getElementById('tabSeeds');
    const tGears = document.getElementById('tabGears');
    const tWeather = document.getElementById('tabWeather');
    const tPets = document.getElementById('tabPets');

    if (tSeeds) tSeeds.classList.toggle('active', tab === 'seeds');
    if (tGears) tGears.classList.toggle('active', tab === 'gears');
    if (tWeather) tWeather.classList.toggle('active', tab === 'weather');
    if (tPets) tPets.classList.toggle('active', tab === 'pets');

    window.lastWKey = '';
    window.render();
    window.tickGlobal();
};

// Override Render loop to route layout components
window.render = function () {
    const gridSec = document.querySelector('.grid-section');
    const petsContainer = document.getElementById('petsContainer');
    const shopHead = document.getElementById('shopHead');
    const countdownVal = document.getElementById('globalCountdown');

    if (window.TAB === 'pets') {
        // Render pets page index elements
        if (gridSec) gridSec.classList.add('hidden');
        if (petsContainer) petsContainer.classList.remove('hidden');
        if (shopHead) {
            shopHead.classList.remove('hidden');
            shopHead.style.display = '';
            shopHead.classList.remove('gears', 'weather', 'pets');
            shopHead.classList.add('pets');
        }

        // Setup header titles and icons manually
        const shopTitle = document.getElementById('shopTitle');
        if (shopTitle) shopTitle.textContent = 'Rarest Pets';

        const headLabel = document.getElementById('headLabel');
        if (headLabel) headLabel.textContent = 'Data updated as of June 24, 2026';

        if (countdownVal) {
            countdownVal.textContent = 'Updated';
            countdownVal.style.color = '#10b981'; // Sleek green active color
        }

        const badge = document.getElementById('weatherPhaseBadge');
        if (badge) badge.style.display = 'none';

        const leaf = document.getElementById('leafIcon');
        const gi = document.getElementById('gearIcon');
        if (leaf) leaf.style.display = 'none';
        if (gi) {
            gi.style.display = '';
            gi.src = 'logo_raccoon.png';
        }

        renderPets();
        return;
    }

    // Switch layout components back to active predictor grids
    if (petsContainer) petsContainer.classList.add('hidden');
    if (gridSec) gridSec.classList.remove('hidden');
    if (shopHead) {
        shopHead.classList.remove('pets');
    }
    if (countdownVal) {
        countdownVal.style.color = ''; // Reset to default theme color
    }

    if (originalRender) {
        originalRender();
    }
};

// Override Global header timer loop
window.tickGlobal = function () {
    const badge = document.getElementById('weatherPhaseBadge');
    const countdownVal = document.getElementById('globalCountdown');

    if (window.TAB === 'pets') {
        // Keep header ticking updated text and updates sky backgrounds
        if (window.updateSkyBackground) {
            window.updateSkyBackground();
        }

        if (countdownVal) {
            countdownVal.textContent = 'Updated';
            countdownVal.style.color = '#10b981';
        }

        if (badge) badge.style.display = 'none';
        return;
    }

    if (countdownVal) {
        countdownVal.style.color = ''; // Reset to default theme color
    }

    if (originalTickGlobal) {
        originalTickGlobal();
    }
};

// Bind onclick event listeners on tab load
const tabPetsBtn = document.getElementById('tabPets');
if (tabPetsBtn) {
    tabPetsBtn.onclick = () => window.setTab('pets');
}

// Bind filter chip handlers
const filters = document.getElementById('petsFilters');
if (filters) {
    filters.querySelectorAll('.prp__chip').forEach(btn => {
        btn.onclick = () => {
            filters.querySelectorAll('.prp__chip').forEach(c => c.classList.remove('is-on'));
            btn.classList.add('is-on');
            currentPetFilter = btn.dataset.filter;
            renderPets();
        };
    });
}
