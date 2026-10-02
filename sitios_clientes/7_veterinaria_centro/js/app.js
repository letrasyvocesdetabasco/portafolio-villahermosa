/**
 * Clínica Veterinaria del Centro - Tamulté, Villahermosa
 * Módulos Interactivos:
 * 1. Triage de Urgencias Médicas 24/7 y Despacho WhatsApp
 * 2. Calculador de Estética Canina y Spa Antipulgas
 */

document.addEventListener('DOMContentLoaded', () => {
  initTriageModule();
  initGroomingCalculator();
});

/* ==========================================================================
   1. Módulo Triage de Urgencias Médicas 24/7
   ========================================================================== */
function initTriageModule() {
  const symptomCheckboxes = document.querySelectorAll('.symptom-checkbox');
  const symptomItems = document.querySelectorAll('.symptom-item');
  const statusBadge = document.getElementById('triage-status-badge');
  const instructionText = document.getElementById('triage-instruction');
  const detailsText = document.getElementById('triage-details');
  const dispatchBtn = document.getElementById('btn-dispatch-triage');

  // Permitir click en toda la fila del síntoma
  symptomItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
      }
      item.classList.toggle('active', item.querySelector('input[type="checkbox"]').checked);
      evaluateTriage();
    });
  });

  symptomCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      chk.closest('.symptom-item').classList.toggle('active', chk.checked);
      evaluateTriage();
    });
  });

  function evaluateTriage() {
    const checked = Array.from(document.querySelectorAll('.symptom-checkbox:checked'));
    
    let highestSeverity = 'green';
    let redCount = 0;
    let amberCount = 0;

    checked.forEach(input => {
      const severity = input.dataset.severity;
      if (severity === 'red') redCount++;
      if (severity === 'amber') amberCount++;
    });

    if (redCount > 0) {
      highestSeverity = 'red';
    } else if (amberCount > 0) {
      highestSeverity = 'amber';
    } else {
      highestSeverity = 'green';
    }

    // Actualizar UI del Triage
    statusBadge.className = 'result-status-badge';
    if (highestSeverity === 'red') {
      statusBadge.classList.add('status-red');
      statusBadge.innerHTML = '🚨 CÓDIGO ROJO: URGENCIAS VITALES INMEDIATAS';
      instructionText.textContent = '¡Acuda de inmediato a quirófano! El equipo de guardia está activo.';
      detailsText.innerHTML = 'La sintomatología marcada (golpe de calor tabasqueño, intoxicación por sapo o trauma) compromete la vida de su mascota en minutos. No administre medicamentos humanos ni leche. <strong>Envíe el aviso al médico de guardia ahora mismo</strong> para tener el suero y oxigenador listos a su llegada.';
    } else if (highestSeverity === 'amber') {
      statusBadge.classList.add('status-amber');
      statusBadge.innerHTML = '⚠️ CÓDIGO AMARILLO: PRIORIDAD ALTA EN CONSULTA';
      instructionText.textContent = 'Requiere valoración médica en las próximas 1 a 3 horas.';
      detailsText.innerHTML = 'Síntomas como vómitos continuos, diarrea con deshidratación o heridas moderadas requieren canalización y analgésicos veterinarios para evitar complicaciones.';
    } else {
      statusBadge.classList.add('status-green');
      statusBadge.innerHTML = '🟢 CÓDIGO VERDE: ESTABLE / CONTROL PREVENTIVO';
      instructionText.textContent = 'Paciente estable. Recomendamos cita para diagnóstico o vacunación.';
      detailsText.innerHTML = 'No se detecta riesgo inminente. Puede agendar su revisión médica, aplicación de vacunas o desparasitación contra dirofilaria (gusano del corazón) en horario regular.';
    }
  }

  // Despacho directo a WhatsApp
  if (dispatchBtn) {
    dispatchBtn.addEventListener('click', () => {
      const petName = document.getElementById('triage-pet-name').value.trim() || 'Mi Mascota';
      const petType = document.getElementById('triage-pet-species').value;
      const ownerName = document.getElementById('triage-owner-name').value.trim() || 'Dueño/Tutor';
      const colony = document.getElementById('triage-colony').value.trim() || 'Villahermosa';
      
      const checkedBoxes = Array.from(document.querySelectorAll('.symptom-checkbox:checked'));
      const symptomsList = checkedBoxes.length > 0 
        ? checkedBoxes.map(b => '• ' + b.dataset.name).join('%0A')
        : '• Consulta médica general / Evaluación preventiva';

      const codeLevel = statusBadge.textContent;

      const message = `🚨 *ALERTA DE TRIAGE VETERINARIO - CLÍNICA DEL CENTRO (TAMULTÉ)*%0A%0A` +
        `*Nivel de Triage:* ${encodeURIComponent(codeLevel)}%0A` +
        `*Paciente:* ${encodeURIComponent(petName)} (${encodeURIComponent(petType)})%0A` +
        `*Tutor:* ${encodeURIComponent(ownerName)}%0A` +
        `*Ubicación / Colonia:* ${encodeURIComponent(colony)}%0A%0A` +
        `*Signos y Síntomas Notificados:*%0A${symptomsList}%0A%0A` +
        `*Dirección de Clínica:* Av. Gregorio Méndez 3721, Tamulté%0A` +
        `*Mensaje:* Solicito atención médica inmediata / confirmación de quirófano en guardia nocturna.`;

      window.open(`https://wa.me/529933515328?text=${message}`, '_blank');
    });
  }
}

/* ==========================================================================
   2. Calculadora de Estética Canina y Spa Antipulgas
   ========================================================================== */
function initGroomingCalculator() {
  const sizeBtns = document.querySelectorAll('.size-btn');
  const addonCards = document.querySelectorAll('.addon-card');
  const summarySize = document.getElementById('summary-size-name');
  const summaryBase = document.getElementById('summary-base-price');
  const summaryAddons = document.getElementById('summary-addons-price');
  const summaryTotal = document.getElementById('summary-total-price');
  const bookBtn = document.getElementById('btn-book-grooming');

  let currentSize = {
    name: 'Chico (1 - 9 kg)',
    price: 250
  };

  let selectedAddons = [];

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentSize.name = btn.dataset.sizeName;
      currentSize.price = parseInt(btn.dataset.sizePrice, 10);
      recalculate();
    });
  });

  addonCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const addonName = card.dataset.addonName;
      const addonPrice = parseInt(card.dataset.addonPrice, 10);

      if (card.classList.contains('selected')) {
        selectedAddons.push({ name: addonName, price: addonPrice });
      } else {
        selectedAddons = selectedAddons.filter(item => item.name !== addonName);
      }
      recalculate();
    });
  });

  function recalculate() {
    const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
    const grandTotal = currentSize.price + addonsTotal;

    summarySize.textContent = currentSize.name;
    summaryBase.textContent = `$${currentSize.price.toLocaleString('es-MX')} MXN`;
    summaryAddons.textContent = `$${addonsTotal.toLocaleString('es-MX')} MXN`;
    summaryTotal.textContent = `$${grandTotal.toLocaleString('es-MX')} MXN`;
  }

  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      const petName = document.getElementById('grooming-pet-name').value.trim() || 'Mi Mascota';
      const petBreed = document.getElementById('grooming-pet-breed').value.trim() || 'Mestizo';
      const preferredDate = document.getElementById('grooming-date').value || 'Esta semana';
      const addonsList = selectedAddons.length > 0 
        ? selectedAddons.map(a => `+ ${a.name} ($${a.price} MXN)`).join('%0A')
        : 'Solo Baño Básico Antipulgas con Secado';

      const totalFormatted = summaryTotal.textContent;

      const message = `✂️ *RESERVA DE ESTÉTICA & SPA CANINO - VETERINARIA DEL CENTRO*%0A%0A` +
        `*Mascota:* ${encodeURIComponent(petName)} (${encodeURIComponent(petBreed)})%0A` +
        `*Tamaño:* ${encodeURIComponent(currentSize.name)}%0A` +
        `*Servicios Adicionales:*%0A${addonsList}%0A` +
        `*Presupuesto Estimado:* *${totalFormatted}*%0A` +
        `*Fecha y Horario Deseado:* ${encodeURIComponent(preferredDate)}%0A%0A` +
        `*Sucursal:* Av. Gregorio Méndez 3721, Col. Tamulté, Villahermosa.%0A` +
        `Por favor confírmenme disponibilidad de horario para llevar a mi perrito.`;

      window.open(`https://wa.me/529933515328?text=${message}`, '_blank');
    });
  }
}
