/* =========================================================================================================================
FRISSÍTÉS / JAVÍTÁS ÁLLAPOTOK — ezt a részt szerkeszd, ha egy
projekt frissült vagy éppen javítás alatt áll.

Minden bejegyzés kulcsa az app-card projektkulcsával egyezik
meg (lásd az index.html app-grid szekciójában a data-project attribútumait):
    filmek-adatbazis, penzugyi-naplo, monitor-config,
    easyeffects, retro-game-launcher, szoftvertervezo

type: "updated" = Frissült (kék), "fixing" = Javítás alatt (sárga)
Ha egy projektnek nincs bejegyzése (vagy kommentelve van),
nem jelenik meg semmi jelzés sem a kártyáján, sem a Hírek dobozban.

Ha meg akarod szüntetni egy projekt Frissült/Javítás alatt jelzését,
egyszerűen kommenteld ki (vagy töröld) a teljes blokkját a tömbből
— ez egyszerre szedi le a kártyáról a badge-et és a Hírek dobozból is a bejegyzést.
============================================================================================================================= */
const UPDATES_CONFIG = [
    /*{
        project: "filmek-adatbazis",
        type: "updated",
        title: "Új : Első indítási varázsló és hibajavítások",
        date: "2026.07.22",
        details: [
            ,
        ]
    },*/
    {
        project: "monitor-config",
        type: "updated",
        title: "Több infó, részletekért kattints!",
        date: "2026.08.08",
        details: [
            "Ritkán előforduló hiba TV-profilra váltáskor.- Javítva",
            "A letöltési oldalon külön AMD konfigurációkra és külön hybrid laptopokhoz.",
            "A plasma-widgettel való kijelzőváltás után nem jelenik meg a plasma helyesen - Javításra vár."
        ]
    },
    {
        project: "szoftvertervezo",
        type: "updated",
        title: "Új képernyőkép-galéria",
        date: "2026.08.02",
        details: [
            "8 új képernyőkép került fel a projekt oldalára."
        ]
    },
];

const APP_NAMES = {
    "filmek-adatbazis": "Filmek Adatbázis",
    "penzugyi-naplo": "Pénzügyi Napló",
    "monitor-config": "Monitor Config",
    "easyeffects": "EasyEffects Quick Access",
    "retro-game-launcher": "Retro Game Launcher",
    "szoftvertervezo": "Szoftvertervező"
};

function openUpdateModal(entry) {
    const overlay = document.createElement('div');
    overlay.className = 'update-modal-overlay';
    const kindClass = entry.type === 'updated' ? 'kind-updated' : 'kind-fixing';
    const kindLabel = entry.type === 'updated' ? 'Frissült' : 'f';
    overlay.innerHTML = `
        <div class="update-modal" role="dialog" aria-modal="true">
            <button class="update-modal-close" aria-label="Bezárás">&times;</button>
            <span class="update-modal-kind ${kindClass}">${kindLabel}</span>
            <h3>${APP_NAMES[entry.project] || entry.project}</h3>
            <p class="update-modal-date">${entry.date}</p>
            <div class="update-modal-body">
                <p>${entry.title}</p>
                ${entry.details && entry.details.length ? `<ul>${entry.details.map(d => `<li>${d}</li>`).join('')}</ul>` : ''}
            </div>
        </div>`;
    document.body.appendChild(overlay);

    function close() { overlay.remove(); }
    overlay.querySelector('.update-modal-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onEsc); }
    });
}

function renderUpdateBadges() {
    UPDATES_CONFIG.forEach(entry => {
        const card = document.querySelector(`.app-card[data-project="${entry.project}"] .card-thumb`);
        if (!card) return;
        const btn = document.createElement('button');
        btn.className = 'update-badge ' + (entry.type === 'updated' ? 'update-badge-updated' : 'update-badge-fixing');
        btn.textContent = entry.type === 'updated' ? 'Frissült' : 'Javítás alatt';
        btn.addEventListener('click', () => openUpdateModal(entry));
        card.appendChild(btn);
    });
}

function renderUpdatesBox() {
    const box = document.getElementById('updates-box');
    const updated = UPDATES_CONFIG.filter(e => e.type === 'updated');
    const fixing = UPDATES_CONFIG.filter(e => e.type === 'fixing');

    function renderList(entries) {
        if (!entries.length) return '<p class="updates-empty">Nincs jelenleg bejegyzés.</p>';
        return `<ul>${entries.map((e, i) => `
            <li>
                <button class="update-entry" data-list="${e === entries[i] ? '' : ''}" data-idx="${UPDATES_CONFIG.indexOf(e)}">
                    <span class="entry-app">${APP_NAMES[e.project] || e.project}</span>
                    ${e.title}
                </button>
            </li>`).join('')}</ul>`;
    }

    box.innerHTML = `
        <div>
            <h4 class="updates-heading-updated">🔵 Frissítve</h4>
            ${renderList(updated)}
        </div>
        <div>
            <h4 class="updates-heading-fixing">🟠 Javítva / folyamatban</h4>
            ${renderList(fixing)}
        </div>
    `;

    box.querySelectorAll('.update-entry').forEach(btn => {
        btn.addEventListener('click', () => {
            const entry = UPDATES_CONFIG[Number(btn.dataset.idx)];
            if (entry) openUpdateModal(entry);
        });
    });
}

/* ============================================================
REFLEKTORFÉNYBEN CSÚSZKA — ezt a részt szerkeszd, ha a kiemelt
(főoldal tetején lévő) csúszka tartalmát akarod módosítani.
============================================================ */
const FEATURED_CONFIG = {
    ENABLED: true,          // false = csak az első slide jelenik meg, statikus kártyaként, nyilak/pöttyök nélkül
    AUTOPLAY_MS: 5000,      // automatikus váltás ennyi ms-onként (0 = nincs automatikus váltás)
    TRANSITION: 1,          // 1 = áttűnés (fade), 0 = csúsztatás (balról-jobbra)
    SLIDES: [
        {
            eyebrow: "Legújabb",
            title: "Filmek-Adatbázis",
            desc: "Saját film- és sorozatnyilvántartó alkalmazás — kereséssel, értékeléssel és személyes listákkal.",
            ctaText: "Megnézem »",
            ctaHref: "projektek/filmek-adatbazis.html",
            image: "kepernyokepek/Filmek-Adatbazis/1.png",
            bgColor: "#1b1f24",
            theme: "dark"
        },
        {
            eyebrow: "Alkalmazás",
            title: "Pénzügyi Napló",
            desc: "Egyszerű, letölthető Linux (.deb) alkalmazás a napi kiadások és bevételek követésére.",
            ctaText: "Megnézem »",
            ctaHref: "projektek/penzugyi-naplo.html",
            image: null,
            bgColor: "#f5f8fb",
            theme: "light"
        },
        {
            eyebrow: "Alkalmazás",
            title: "Szoftvertervező",
            desc: "Helyi adatkezelésű tervező alkalmazás KDE Plasma környezethez, projektek és feladatok átlátható kezelésére.",
            ctaText: "Megnézem »",
            ctaHref: "projektek/szoftvertervezo.html",
            image: "kepernyokepek/Szoftvertervezo/1.png",
            bgColor: "#f5f8fb",
            theme: "light"
        },
    ]
};

function renderFeatured(config) {
    const root = document.getElementById('featured-root');
    root.innerHTML = '';

    if (!config.ENABLED || config.SLIDES.length <= 1) {
        const s = config.SLIDES[0];
        root.innerHTML = `
        <div class="single-card slide theme-${s.theme} active" style="background-color:${s.bgColor}">
            <p class="featured-inner-title">Reflektorfényben</p>
            <div class="slide-inner">
                <div class="slide-thumb">
                    ${s.image ? `<img src="${s.image}" alt="${s.title}">` : '<span class="slide-thumb-placeholder">Képernyőkép ide</span>'}
                </div>
                <div class="slide-body">
                    <p class="slide-eyebrow">${s.eyebrow}</p>
                    <h2 class="slide-title">${s.title}</h2>
                    <p class="slide-desc">${s.desc}</p>
                    <a class="button primary" href="${s.ctaHref}">${s.ctaText}</a>
                </div>
            </div>
        </div>`;
        return;
    }

    let current = 0;
    let timer = null;

    const wrapper = document.createElement('div');
    wrapper.className = 'featured ' + (config.TRANSITION === 0 ? 'anim-slide' : 'anim-fade');
    wrapper.innerHTML = `
    <div class="featured-track">
        <button class="nav-arrow nav-prev" aria-label="Előző">&#10094;</button>
        <button class="nav-arrow nav-next" aria-label="Következő">&#10095;</button>
        ${config.SLIDES.map((s, i) => `
            <div class="slide theme-${s.theme}${i === 0 ? ' active' : ''}" data-index="${i}" style="background-color:${s.bgColor}">
                <p class="featured-inner-title">Reflektorfényben</p>
                <div class="slide-inner">
                    <div class="slide-thumb">
                        ${s.image ? `<img src="${s.image}" alt="${s.title}">` : '<span class="slide-thumb-placeholder">Képernyőkép ide</span>'}
                    </div>
                    <div class="slide-body">
                        <p class="slide-eyebrow">${s.eyebrow}</p>
                        <h2 class="slide-title">${s.title}</h2>
                        <p class="slide-desc">${s.desc}</p>
                        <a class="button primary" href="${s.ctaHref}">${s.ctaText}</a>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
<div class="dots">
    ${config.SLIDES.map((_, i) => `<button class="dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`).join('')}
</div>
`;
    root.appendChild(wrapper);

    const slides = wrapper.querySelectorAll('.slide');
    const dots = wrapper.querySelectorAll('.dot');

    function goTo(index) {
        current = (index + config.SLIDES.length) % config.SLIDES.length;
        slides.forEach((el, i) => el.classList.toggle('active', i === current));
        dots.forEach((el, i) => el.classList.toggle('active', i === current));
    }

    function startAutoplay() {
        if (config.AUTOPLAY_MS > 0) {
            timer = setInterval(() => goTo(current + 1), config.AUTOPLAY_MS);
        }
    }
    function stopAutoplay() {
        if (timer) clearInterval(timer);
    }

    wrapper.querySelector('.nav-prev').addEventListener('click', () => { goTo(current - 1); });
    wrapper.querySelector('.nav-next').addEventListener('click', () => { goTo(current + 1); });
    dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.index))));

    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
}