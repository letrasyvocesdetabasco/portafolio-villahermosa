/**
 * Banquetes Bravata's Servicios & Eventos
 * Calle 120, El Espejo 1, Villahermosa, Tabasco
 * Teléfono / WhatsApp Real: +52 993 354-5500 (529933545500)
 */

const BRAVATAS_DATA = {
  name: "Banquetes Bravata's Servicios",
  address: "Calle 120, El Espejo 1, Villahermosa, Tabasco",
  phone: "+52 993 354-5500",
  whatsapp: "529933545500"
};

let currentGuests = 150;
let currentPricePerGuest = 320;
let currentPkgTitle = "Banquete Imperial";

document.addEventListener("DOMContentLoaded", () => {
  bindSimulator();
});

function bindSimulator() {
  const slider = document.getElementById("guests-slider");
  const displayCount = document.getElementById("guests-display-count");

  slider.addEventListener("input", (e) => {
    currentGuests = parseInt(e.target.value);
    displayCount.textContent = `${currentGuests} personas`;
    calculateBudget();
  });

  document.querySelectorAll(".tier-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".tier-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      currentPricePerGuest = parseInt(card.dataset.price);
      currentPkgTitle = card.dataset.name;
      calculateBudget();
    });
  });

  document.getElementById("btn-send-banquet-wa").addEventListener("click", () => {
    const hostName = document.getElementById("host-name").value.trim() || "Familia Anfitriona";
    const eventType = document.getElementById("event-type").value;
    const eventDate = document.getElementById("event-date").value || "Por definir";
    const total = currentGuests * currentPricePerGuest;
    const anticipo = total * 0.30;

    let msg = `*COTIZACIÓN FORMAL DE EVENTO - BANQUETES BRAVATA'S*\n`;
    msg += `📍 *Ubicación:* Villahermosa, Tabasco\n`;
    msg += `------------------------------------\n`;
    msg += `👰 *Anfitrión / Festejado:* ${hostName}\n`;
    msg += `💍 *Tipo de Celebración:* ${eventType}\n`;
    msg += `👥 *Comensales:* ${currentGuests} invitados\n`;
    msg += `🍽️ *Paquete Seleccionado:* ${currentPkgTitle} ($${currentPricePerGuest} MXN / comensal)\n`;
    msg += `📅 *Fecha Tentativa:* ${eventDate}\n`;
    msg += `------------------------------------\n`;
    msg += `💰 *Presupuesto Estimado:* $${total.toLocaleString("es-MX")} MXN\n`;
    msg += `📌 *Anticipo Sugerido de Apartado (30%):* $${anticipo.toLocaleString("es-MX")} MXN\n`;
    msg += `------------------------------------\n`;
    msg += `Hola Banquetes Bravata's, solicito verificar disponibilidad de fecha en su calendario y agendar una degustación de menú para 2 personas en Villahermosa.`;

    const waUrl = `https://wa.me/${BRAVATAS_DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  });

  calculateBudget();
}

function calculateBudget() {
  const total = currentGuests * currentPricePerGuest;
  const anticipo = total * 0.30;

  document.getElementById("total-budget-display").textContent = `$${total.toLocaleString("es-MX")} MXN`;
  document.getElementById("deposit-estimate-display").textContent = `Anticipo sugerido de apartado (30%): $${anticipo.toLocaleString("es-MX")} MXN`;
  document.getElementById("detail-calculation-display").textContent = `${currentGuests} comensales x $${currentPricePerGuest} MXN (${currentPkgTitle})`;
}
