const responses = [
  {
    terms: ["iss", "orbit", "reboost", "station"],
    answer: "The ISS gradually loses altitude because of thin atmospheric drag. Progress spacecraft and other visiting vehicles periodically fire their thrusters in the direction of travel, adding velocity and raising the station's orbit. The ISS travels about 7.66 km/s and circles Earth roughly every 90 minutes."
  },
  {
    terms: ["isro", "nasa", "compare", "comparison", "launch vehicle", "rocket"],
    answer: "ISRO and NASA have different scales and missions, so a fair comparison depends on the goal. ISRO operates launchers such as PSLV and LVM3, with strong Earth-observation and planetary missions. NASA leads large scientific, human-spaceflight, and deep-space programs, often working with international and commercial partners."
  },
  {
    terms: ["geostationary", "geo orbit"],
    answer: "A geostationary orbit is a circular equatorial orbit where a satellite takes one sidereal day to circle Earth. Because its orbital period matches Earth's rotation, it appears fixed above one longitude. The orbit is about 35,786 km above the equator."
  },
  {
    terms: ["moon", "artemis", "chandrayaan"],
    answer: "NASA's Artemis program is designed to return humans to the Moon and build a sustained lunar exploration architecture. ISRO's Chandrayaan missions have advanced lunar orbital mapping, impact studies, and soft-landing technology. Ask for a specific mission and I can go deeper."
  },
  {
    terms: ["mars", "mangalyaan", "perseverance"],
    answer: "India's Mars Orbiter Mission, Mangalyaan, entered Mars orbit in 2014 and demonstrated ISRO's interplanetary navigation and operations. NASA's Perseverance rover landed in Jezero Crater in 2021 to study ancient Martian environments and collect samples for a possible future return."
  },
  {
    terms: ["astronaut", "crew", "human", "spacewalk"],
    answer: "Astronauts work in microgravity, where routine tasks require careful procedures and restraints. On the ISS they maintain systems, run experiments, exercise to protect their health, and perform spacewalks when external hardware needs inspection or repair."
  },
  {
    terms: ["gravity", "orbit", "weightless", "microgravity"],
    answer: "Astronauts in orbit are not outside Earth's gravity. They feel weightless because the spacecraft and everything inside it are continuously falling around Earth together. The sideways orbital velocity makes the fall follow Earth's curvature instead of reaching the ground."
  }
];

const messages = document.querySelector("#messages");
const form = document.querySelector("#chatForm");
const input = document.querySelector("#question");
const quickPrompts = document.querySelector("#quickPrompts");
const clearChat = document.querySelector("#clearChat");

function addMessage(text, sender) {
  const article = document.createElement("article");
  article.className = `message ${sender === "user" ? "user-message" : "tars-message"}`;
  article.innerHTML = `
    <div class="avatar">${sender === "user" ? "Y" : "T"}</div>
    <div class="message-body">
      <div class="message-label">${sender === "user" ? "YOU" : "TARS"} <time>NOW</time></div>
      <p>${text}</p>
    </div>`;
  messages.append(article);
  article.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function findResponse(question) {
  const normalized = question.toLowerCase();
  const match = responses.find((entry) => entry.terms.some((term) => normalized.includes(term)));
  return match?.answer || "I can help with ISRO, NASA, the ISS, spacecraft, astronauts, launch vehicles, orbital mechanics, and planetary missions. Try naming a mission or asking how something works.";
}

function ask(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addMessage(cleanQuestion, "user");
  input.value = "";
  window.setTimeout(() => addMessage(findResponse(cleanQuestion), "tars"), 350);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  ask(input.value);
});

quickPrompts.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) ask(button.dataset.question);
});

clearChat.addEventListener("click", () => {
  messages.innerHTML = `<article class="message tars-message"><div class="avatar">T</div><div class="message-body"><div class="message-label">TARS <time>NOW</time></div><p>Session cleared. Ask me about a mission, a spacecraft, or the physics behind an orbit.</p></div></article>`;
});
