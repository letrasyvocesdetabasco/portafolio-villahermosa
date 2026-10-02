/**
 * Clínica Dental Ortho-U | Dr. Ulín García
 * Zona Médica de Villahermosa, Tabasco
 * Teléfono Real: (993) 427-0449 | WhatsApp: +52 993 427 0449
 */

const CLINIC_INFO = {
  name: "Clínica Dental Ortho-U & Especialidades",
  doctor: "Dr. Ulín García",
  speciality: "Especialista en Ortodoncia & Estética Dental Avanzada",
  cedula: "Céd. Prof. Odontología y Posgrado Ortodoncia Reg. SSA 27-0941",
  address: "Av. Paseo Tabasco s/n (Zona Médica y Hospitalaria), Villahermosa, Tabasco",
  phoneDisplay: "(993) 427-0449",
  whatsappNumber: "529934270449",
  hours: "Lunes a Viernes: 09:00 a 19:30 | Sábados: 09:00 a 14:30"
};

const CLINICAL_CASES = [
  {
    id: "ortodoncia",
    title: "Ortodoncia con Brackets de Zafiro & Alineación",
    beforeImg: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80",
    beforeDesc: "Apiñamiento severo clase II, mordida profunda y desalineación de caninos superiores.",
    afterImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80",
    afterDesc: "Arco dental perfectamente nivelado, oclusión funcional clase I y sonrisa armónica en 14 meses."
  },
  {
    id: "carillas",
    title: "Diseño de Sonrisa con Carillas E-Max",
    beforeImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    beforeDesc: "Desgaste dental por bruxismo, manchas por tetraciclina y diastemas entre incisivos centrales.",
    afterImg: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=600&q=80",
    afterDesc: "Colocación de 8 carillas de disilicato de litio ultradelgadas sin desgaste agresivo."
  },
  {
    id: "blanqueamiento",
    title: "Blanqueamiento Dental Clínico Láser",
    beforeImg: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=600&q=80",
    beforeDesc: "Pigmentación severa por café, té y tabaco grado A3 en escala VITA.",
    afterImg: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    afterDesc: "Aclaramiento de 6 tonos en 1 sola sesión de 45 minutos libre de sensibilidad postoperatoria."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initCasesTabs();
  bindBookingForm();
  bindEmergencyButtons();
});

function initCasesTabs() {
  const tabsContainer = document.getElementById("cases-tabs-container");
  const display = document.getElementById("cases-comparison-display");

  tabsContainer.innerHTML = CLINICAL_CASES.map((c, i) => `
    <button class="case-nav-btn ${i === 0 ? 'active' : ''}" data-id="${c.id}">
      ${c.title.split("&")[0].trim()}
    </button>
  `).join("");

  function showCase(id) {
    const item = CLINICAL_CASES.find(c => c.id === id) || CLINICAL_CASES[0];
    display.innerHTML = `
      <div class="case-card-visual">
        <div class="case-badge-label badge-before">Antes del Tratamiento</div>
        <img src="${item.beforeImg}" alt="Antes" class="case-visual-img">
        <div class="case-desc-box">
          <strong>Diagnóstico Inicial:</strong> ${item.beforeDesc}
        </div>
      </div>
      <div class="case-card-visual">
        <div class="case-badge-label badge-after">Resultado Final Garantizado</div>
        <img src="${item.afterImg}" alt="Después" class="case-visual-img">
        <div class="case-desc-box">
          <strong>Tratamiento Aplicado:</strong> ${item.afterDesc}
        </div>
      </div>
    `;
  }

  tabsContainer.querySelectorAll(".case-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      tabsContainer.querySelectorAll(".case-nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showCase(btn.dataset.id);
    });
  });

  showCase(CLINICAL_CASES[0].id);
}

// Botón para seleccionar tratamiento directamente desde las tarjetas
window.selectTreatmentForBooking = function(treatmentName) {
  const select = document.getElementById("booking-treatment");
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(treatmentName.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  const formEl = document.getElementById("agendar-cita");
  if (formEl) {
    formEl.scrollIntoView({ behavior: "smooth" });
  }
};

function bindBookingForm() {
  const form = document.getElementById("dental-booking-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("booking-name").value.trim();
    const phone = document.getElementById("booking-phone").value.trim();
    const treatment = document.getElementById("booking-treatment").value;
    const date = document.getElementById("booking-date").value;
    const shift = document.getElementById("booking-shift").value;
    const insurance = document.getElementById("booking-insurance").value;

    let msg = `*SOLICITUD DE CITA ODONTOLÓGICA - ORTHO-U VILLAHERMOSA*\n`;
    msg += `📍 *Zona Médica / Paseo Tabasco*\n`;
    msg += `👨‍⚕️ *Atención:* Dr. Ulín García\n`;
    msg += `------------------------------------\n`;
    msg += `👤 *Paciente:* ${name}\n`;
    msg += `📞 *Teléfono:* ${phone}\n`;
    msg += `🦷 *Tratamiento solicitado:* ${treatment}\n`;
    msg += `📅 *Fecha sugerida:* ${date || 'Lo antes posible'}\n`;
    msg += `⏰ *Turno preferido:* ${shift}\n`;
    msg += `🏥 *Aseguradora:* ${insurance}\n`;
    msg += `------------------------------------\n`;
    msg += `Hola Dr. Ulín, solicito confirmar disponibilidad para acudir a valoración clínica. Muchas gracias.`;

    const waUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  });
}

function bindEmergencyButtons() {
  const emergencyBtns = document.querySelectorAll(".btn-emergency-trigger");
  emergencyBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let emergencyMsg = `*🚨 URGENCIA DENTAL - CLÍNICA ORTHO-U VILLAHERMOSA*\n`;
      emergencyMsg += `Dr. Ulín García:\n`;
      emergencyMsg += `Presento un dolor dental agudo / molestia severa y requiero valoración clínica de urgencia en Villahermosa.\n`;
      emergencyMsg += `¿Tienen espacio disponible hoy en su consultorio?`;

      const waUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(emergencyMsg)}`;
      window.open(waUrl, "_blank");
    });
  });
}
