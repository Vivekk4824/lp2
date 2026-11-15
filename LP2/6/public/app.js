// --- 1. LOGIN PAGE LOGIC ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: document.getElementById("user").value,
                password: document.getElementById("pass").value
            })
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem("isAdmin", "true");
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("err").textContent = data.message;
        }
    };
}

// --- 2. DASHBOARD CRUD LOGIC ---
const eventForm = document.getElementById("eventForm");
if (eventForm) {
    // Protect route
    if (localStorage.getItem("isAdmin") !== "true") window.location.href = "index.html";

    const loadEvents = async () => {
        const res = await fetch("/events");
        const events = await res.json();
        document.getElementById("eventTable").innerHTML = events.map(ev => `
            <tr>
                <td>${ev.title}</td>
                <td>${ev.category}</td>
                <td>${ev.date}</td>
                <td>${ev.venue}</td>
                <td>
                    <button class="edit" onclick='editEvent(${JSON.stringify(ev)})'>Edit</button>
                    <button class="del" onclick="deleteEvent('${ev._id}')">Delete</button>
                </td>
            </tr>
        `).join("");
    };

    // Create or Update Event
    eventForm.onsubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById("eventId").value;
        const payload = {
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            date: document.getElementById("date").value,
            venue: document.getElementById("venue").value
        };

        await fetch(id ? `/events/${id}` : "/events", {
            method: id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        eventForm.reset();
        document.getElementById("eventId").value = "";
        document.getElementById("saveBtn").textContent = "Add Event";
        loadEvents();
    };

    // Populate Form for Editing
    window.editEvent = (ev) => {
        document.getElementById("eventId").value = ev._id;
        document.getElementById("title").value = ev.title;
        document.getElementById("category").value = ev.category;
        document.getElementById("date").value = ev.date;
        document.getElementById("venue").value = ev.venue;
        document.getElementById("saveBtn").textContent = "Update Event";
    };

    // Delete Event
    window.deleteEvent = async (id) => {
        await fetch(`/events/${id}`, { method: "DELETE" });
        loadEvents();
    };

    window.logout = () => {
        localStorage.removeItem("isAdmin");
        window.location.href = "index.html";
    };

    loadEvents();
}