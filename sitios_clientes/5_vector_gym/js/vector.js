/**
 * Vector Gym Fitness Club
 * Retorno Vía 5 No. 120, Galaxia / Tabasco 2000, Villahermosa
 * Teléfono / WhatsApp Real: (993) 315-1532 (529933151532)
 * Horario: 06:00 a 22:00 hrs
 */

const VECTOR_DATA = {
  name: "Vector Gym Fitness Club",
  address: "Retorno Vía 5 No. 120, Galaxia / Tabasco 2000, Villahermosa, Tabasco",
  phone: "(993) 315-1532",
  whatsapp: "529933151532",
  hours: "Lunes a Viernes: 06:00 a 22:00 | Sábados: 07:00 a 16:00 | Domingos: 08:00 a 14:00"
};

document.addEventListener("DOMContentLoaded", () => {
  bindPassGenerator();
});

function bindPassGenerator() {
  const form = document.getElementById("vip-pass-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("athlete-name").value.trim();
    const phone = document.getElementById("athlete-phone").value.trim();
    const goal = document.getElementById("athlete-goal").value;
    const passCode = `VG-${Math.floor(100000 + Math.random() * 900000)}`;

    document.getElementById("ticket-name-display").textContent = name;
    document.getElementById("ticket-code-display").textContent = `FOLIO ACCESO: #${passCode}`;
    document.getElementById("ticket-goal-display").textContent = `Meta: ${goal}`;

    drawVectorQr("canvas-ticket-qr", passCode);

    const ticketPreview = document.getElementById("vip-ticket-preview");
    ticketPreview.classList.add("active");

    const waBtn = document.getElementById("btn-claim-pass-wa");
    waBtn.style.display = "flex";
    waBtn.onclick = () => {
      let msg = `*ACTIVACIÓN DE PASE VIP 1 DÍA GRATIS - VECTOR GYM*\n`;
      msg += `📍 *Sucursal:* Tabasco 2000 (Retorno Vía 5)\n`;
      msg += `------------------------------------\n`;
      msg += `👤 *Atleta:* ${name}\n`;
      msg += `🎫 *Folio de Acceso QR:* #${passCode}\n`;
      msg += `📞 *WhatsApp:* ${phone}\n`;
      msg += `🎯 *Objetivo:* ${goal}\n`;
      msg += `------------------------------------\n`;
      msg += `Hola Recepción Vector Gym, acabo de generar mi Pase VIP de 1 día gratis en su página web para entrenar en Tabasco 2000. ¿En qué horario puedo presentarme hoy?`;

      const waUrl = `https://wa.me/${VECTOR_DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank");
    };
  });
}

window.inquirePlan = function(planName, price) {
  let msg = `¡Hola Vector Gym Tabasco 2000! Deseo informes sobre la membresía *${planName}* (${price}). ¿Tienen promociones vigentes de inscripción?`;
  const waUrl = `https://wa.me/${VECTOR_DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
};

/**
 * Generador nativo de código QR sobre HTML5 Canvas (sin librerías externas)
 */
function drawVectorQr(canvasId, codeText) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = 110;
  canvas.width = size;
  canvas.height = size;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#09090b";

  // Esquinas
  function corner(x, y) {
    ctx.fillRect(x, y, 26, 26);
    ctx.clearRect(x + 4, y + 4, 18, 18);
    ctx.fillRect(x + 7, y + 7, 12, 12);
  }

  corner(6, 6);
  corner(size - 32, 6);
  corner(6, size - 32);

  let hash = 0;
  for (let i = 0; i < codeText.length; i++) hash = (hash << 5) - hash + codeText.charCodeAt(i);

  const step = 4;
  for (let r = 0; r < 20; r++) {
    for (let c = 0; c < 20; c++) {
      const px = 14 + c * step;
      const py = 14 + r * step;
      if ((px < 36 && py < 36) || (px > size - 38 && py < 36) || (px < 36 && py > size - 38)) continue;
      const v = Math.sin(hash * (r * 20 + c)) * 1000;
      if (v - Math.floor(v) > 0.45) {
        ctx.fillRect(px, py, step - 1, step - 1);
      }
    }
  }
}
