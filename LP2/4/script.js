const events = [
    { name: "CodeFest Hackathon", cat: "Tech", date: "2026-11-20", desc: "24-hour coding challenge." },
    { name: "Annual Cultural Night", cat: "Cultural", date: "2026-11-25", desc: "Music, dance, and drama." },
    { name: "Inter-Dept Cricket", cat: "Sports", date: "2026-11-18", desc: "T20 knockout tournament." },
    { name: "Web Dev Workshop", cat: "Tech", date: "2026-12-01", desc: "Hands-on HTML, CSS & JS." }
];

const searchEl = document.getElementById("search");
const catEl = document.getElementById("cat");
const dateEl = document.getElementById("date");
const sortEl = document.getElementById("sort");
const listEl = document.getElementById("list");
const emptyEl = document.getElementById("empty");

function render() {
    const q = searchEl.value.toLowerCase();
    const c = catEl.value;
    const d = dateEl.value;

    const filtered = events
        .filter(e => (e.name.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q)) && (!c || e.cat === c) && (!d || e.date === d))
        .sort((a, b) => sortEl.value === "date" ? a.date.localeCompare(b.date) : a.name.localeCompare(b.name));

    emptyEl.hidden = filtered.length > 0;
    listEl.innerHTML = filtered.map(e => `
        <div class="card">
            <small>${e.cat}</small>
            <h3>${e.name}</h3>
            <p>Date: ${e.date}</p>
            <p>${e.desc}</p>
        </div>
    `).join("");
}

[searchEl, catEl, dateEl, sortEl].forEach(el => el.oninput = render);
render();