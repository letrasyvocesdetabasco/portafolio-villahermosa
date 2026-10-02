/**
 * Taller Mecánico City Garage JJ
 * Av. Gregorio Méndez Magaña 3718, Col. Tamulté de las Barrancas, Villahermosa
 * Teléfono / WhatsApp Real: +52 993 324-4014 (529933244014)
 */

const GARAGE_DATA = {
  name: "Taller Mecánico City Garage JJ",
  address: "Av. Gregorio Méndez Magaña 3718, Col. Tamulté de las Barrancas, Villahermosa, Tabasco",
  phone: "+52 993 324-4014",
  whatsapp: "529933244014",
  hours: "Lunes a Sábado: 08:00 - 19:00 hrs"
};

document.addEventListener("DOMContentLoaded", () => {
  bindBookingForm();
  bindEmergencyTrigger();
});

window.selectServiceForBay = function(serviceName) {
  const select = document.getElementById("select-service");
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  const section = document.getElementById("agendar-bahia");
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

function bindBookingForm() {
  const form = document.getElementById("garage-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("client-name").value.trim();
    const phone = document.getElementById("client-phone").value.trim();
    const vehicle = document.getElementById("client-car").value.trim();
    const service = document.getElementById("select-service").value;
    const date = document.getElementById("client-date").value;
    const shift = document.getElementById("select-shift").value;

    let msg = `*SOLICITUD DE CITA EN BAHÍA - CITY GARAGE JJ*\n`;
    msg += `📍 Av. Gregorio Méndez Magaña 3718, Tamulté\n`;
    msg += `------------------------------------\n`;
    msg += `👤 *Cliente:* ${name}\n`;
    msg += `📞 *Teléfono:* ${phone}\n`;
    msg += `🚘 *Vehículo:* ${vehicle}\n`;
    msg += `🔧 *Servicio:* ${service}\n`;
    msg += `📅 *Fecha solicitada:* ${date || 'Lo más pronto posible'}\n`;
    msg += `⏰ *Turno:* ${shift}\n`;
    msg += `------------------------------------\n`;
    msg += `Hola City Garage JJ, solicito confirmar disponibilidad para ingresar mi auto a revisión en Tamulté.`;

    const waUrl = `https://wa.me/${GARAGE_DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  });
}

function bindEmergencyTrigger() {
  document.querySelectorAll(".btn-auxilio-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let msg = `*🚨 AUXILIO MECÁNICO URGENTE - CITY GARAGE JJ*\n`;
      msg += `Mi vehículo se quedó varado en Tamulté / Av. Méndez en Villahermosa.\n`;
      msg += `Requiero apoyo con diagnóstico express o servicio de grúa al taller.`;
      
      const waUrl = `https://wa.me/${GARAGE_DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank");
    });
  });
}
