const form = document.getElementById("regForm");
const msg = document.getElementById("msg");
const userList = document.getElementById("userList");

// Load users from MongoDB
async function loadUsers() {
    const res = await fetch("/users");
    const users = await res.json();
    userList.innerHTML = users.map(u => `<li>${u.name} (${u.email}) - ${u.track}</li>`).join("");
}

// Submit form to Backend
form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        track: document.getElementById("track").value
    };

    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    msg.textContent = result.message;
    form.reset();
    loadUsers();
};

loadUsers();