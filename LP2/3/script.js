const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const passEl = document.getElementById("pass");

// Real-time feedback (Events)
nameEl.oninput = () => {
    document.getElementById("preview").textContent = nameEl.value || "Guest";
    document.getElementById("nameErr").textContent = nameEl.value.length < 3 ? "Min 3 chars" : "";
};
emailEl.oninput = () => {
    document.getElementById("emailErr").textContent = !emailEl.value.includes("@") ? "Invalid email" : "";
};
phoneEl.oninput = () => {
    document.getElementById("phoneErr").textContent = !/^\d{10}$/.test(phoneEl.value) ? "Enter 10 digits" : "";
};
passEl.oninput = () => {
    document.getElementById("passErr").textContent = passEl.value.length < 6 ? "Min 6 chars" : "";
};

// Form Validation on Submit
document.getElementById("regForm").onsubmit = (e) => {
    e.preventDefault();
    if (nameEl.value.length < 3 || !emailEl.value.includes("@") || !/^\d{10}$/.test(phoneEl.value) || passEl.value.length < 6) {
        alert("Please fix errors before submitting!");
        return;
    }
    document.getElementById("msg").textContent = "Registration Successful!";
};

// Theme Switcher
document.getElementById("themeBtn").onclick = () => document.body.classList.toggle("dark");

// Hidden Section Toggle
document.getElementById("toggleBtn").onclick = () => {
    const r = document.getElementById("rules");
    r.hidden = !r.hidden;
};

// Text Formatting
function format(type) {
    const t = document.getElementById("text").style;
    if (type === "bold") t.fontWeight = t.fontWeight === "bold" ? "normal" : "bold";
    if (type === "italic") t.fontStyle = t.fontStyle === "italic" ? "normal" : "italic";
    if (type === "upper") t.textTransform = t.textTransform === "uppercase" ? "none" : "uppercase";
}

// Countdown Timer (300 seconds = 5 mins)
let sec = 300;
setInterval(() => {
    if (sec > 0) sec--;
    document.getElementById("timer").textContent = Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
}, 1000);