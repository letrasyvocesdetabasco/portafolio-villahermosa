/**
 * Colegio Villahermosa y María Teresa
 * Belisario Domínguez 182, Col. Primero de Mayo, Villahermosa, Tabasco
 * Teléfono: (993) 351-1254 | WhatsApp Admisiones: +52 993 516 4933
 */

const SCHOOL_DATA = {
  name: "Colegio Villahermosa y María Teresa",
  motto: "Formando Líderes con Valores y Excelencia Bilingüe",
  cct: "CCT Oficial SETAB 27PPR0142Z / SEC 27PES0089K",
  address: "Belisario Domínguez 182, Col. Primero de Mayo, C.P. 86190, Villahermosa, Tabasco",
  phone: "(993) 351-1254",
  whatsapp: "529935164933"
};

const TOUR_SPACES = [
  {
    id: "aulas",
    title: "Aulas Ergonómicas 100% Climatizadas (24°C)",
    desc: "Aulas diseñadas con aislamiento térmico y equipos inverter silenciosos para asegurar el máximo confort y concentración frente a las altas temperaturas de Villahermosa.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "steam",
    title: "Laboratorio STEAM, Robótica y Cómputo",
    desc: "Espacio equipado con kits de robótica educativa Lego Education, impresoras 3D y conexión de fibra óptica simétrica para proyectos de innovación y ciencias.",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "deportes",
    title: "Domo Polideportivo Techado Multiusos",
    desc: "Cancha techada con piso amortiguante para básquetbol, voleibol y fútbol de salón, protegida contra la radiación solar y la lluvia tropical.",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "estancia",
    title: "Comedor Balanceado & Horario Extendido (17:00 hrs)",
    desc: "Servicio de comedor supervisado por nutrióloga infantil y estancia vespertina con club de tareas y talleres extracurriculares de música, arte y taekwondo.",
    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initTour();
  bindAdmissionForm();
});

function initTour() {
  const tabsContainer = document.getElementById("tour-tabs-bar");
  const imgEl = document.getElementById("tour-img");
  const titleEl = document.getElementById("tour-title");
  const descEl = document.getElementById("tour-desc");

  tabsContainer.innerHTML = TOUR_SPACES.map((t, idx) => `
    <button class="tour-btn ${idx === 0 ? 'active' : ''}" data-id="${t.id}">
      ${t.title.split("(")[0].split("&")[0].trim()}
    </button>
  `).join("");

  function showSpace(id) {
    const space = TOUR_SPACES.find(s => s.id === id) || TOUR_SPACES[0];
    imgEl.src = space.img;
    imgEl.alt = space.title;
    titleEl.textContent = space.title;
    descEl.textContent = space.desc;
  }

  tabsContainer.querySelectorAll(".tour-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      tabsContainer.querySelectorAll(".tour-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showSpace(btn.dataset.id);
    });
  });

  showSpace(TOUR_SPACES[0].id);
}

function bindAdmissionForm() {
  const form = document.getElementById("admissions-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const parent = document.getElementById("adm-parent").value.trim();
    const student = document.getElementById("adm-student").value.trim();
    const level = document.getElementById("adm-level").value;
    const phone = document.getElementById("adm-phone").value.trim();
    const schedule = document.getElementById("adm-schedule").value;

    let msg = `*SOLICITUD DE ADMISIÓN Y VISITA AL CAMPUS*\n`;
    msg += `🏫 *Colegio Villahermosa y María Teresa*\n`;
    msg += `📍 Belisario Domínguez 182, Col. Primero de Mayo\n`;
    msg += `------------------------------------\n`;
    msg += `👨‍👩‍👦 *Padre / Tutor:* ${parent}\n`;
    msg += `🎒 *Aspirante:* ${student}\n`;
    msg += `📚 *Grado Escolar:* ${level}\n`;
    msg += `📞 *Teléfono:* ${phone}\n`;
    msg += `⏰ *Horario Preferido:* ${schedule}\n`;
    msg += `------------------------------------\n`;
    msg += `Estimada Lic. de Admisiones, solicito agendar una visita guiada a sus instalaciones climatizadas para conocer el plan educativo de nuevo ingreso.`;

    const waUrl = `https://wa.me/${SCHOOL_DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  });
}
