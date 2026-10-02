/**
 * Pastelería y Repostería Fina Fresa y Chocolate
 * Calle Alijadores 112, Col. Nueva Villahermosa
 * Diseñador Interactivo de Pasteles y Apartado Express a WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initCakeBuilder();
  initVitrinaExpress();
});

/* ==========================================================================
   1. Diseñador Interactivo de Pasteles (Cake Builder)
   ========================================================================== */
function initCakeBuilder() {
  const tierBtns = document.querySelectorAll('.tier-btn');
  const spongeCards = document.querySelectorAll('.sponge-card');
  const fillingCards = document.querySelectorAll('.filling-card');
  const finishCards = document.querySelectorAll('.finish-card');

  const summaryTiers = document.getElementById('summary-tiers');
  const summarySponge = document.getElementById('summary-sponge');
  const summaryFilling = document.getElementById('summary-filling');
  const summaryFinish = document.getElementById('summary-finish');
  const summaryTotal = document.getElementById('summary-total');
  const sendWhatsAppBtn = document.getElementById('btn-send-cake-quote');

  // Estado del pastel
  const cakeState = {
    tiers: { name: '2 Pisos (40-60 personas)', price: 1400 },
    sponge: { name: 'Cacao Chontalpa 70% & Ron Tabasqueño', extra: 0 },
    filling: { name: 'Fresas Frescas & Queso Crema', extra: 0 },
    finish: { name: 'Buttercream Suizo & Flores Naturales', extra: 0 }
  };

  // Selector de Pisos
  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cakeState.tiers.name = btn.dataset.tierName;
      cakeState.tiers.price = parseInt(btn.dataset.tierPrice, 10);
      recalculate();
    });
  });

  // Selector de Bizcocho
  spongeCards.forEach(card => {
    card.addEventListener('click', () => {
      spongeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      cakeState.sponge.name = card.dataset.name;
      cakeState.sponge.extra = parseInt(card.dataset.extra, 10);
      recalculate();
    });
  });

  // Selector de Relleno
  fillingCards.forEach(card => {
    card.addEventListener('click', () => {
      fillingCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      cakeState.filling.name = card.dataset.name;
      cakeState.filling.extra = parseInt(card.dataset.extra, 10);
      recalculate();
    });
  });

  // Selector de Acabado
  finishCards.forEach(card => {
    card.addEventListener('click', () => {
      finishCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      cakeState.finish.name = card.dataset.name;
      cakeState.finish.extra = parseInt(card.dataset.extra, 10);
      recalculate();
    });
  });

  function recalculate() {
    const total = cakeState.tiers.price + 
                  cakeState.sponge.extra + 
                  cakeState.filling.extra + 
                  cakeState.finish.extra;

    summaryTiers.textContent = cakeState.tiers.name;
    summarySponge.textContent = cakeState.sponge.name;
    summaryFilling.textContent = cakeState.filling.name;
    summaryFinish.textContent = cakeState.finish.name;
    summaryTotal.textContent = `$${total.toLocaleString('es-MX')} MXN`;
  }

  // Disparador a WhatsApp Oficial
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const eventType = document.getElementById('cake-event-type').value;
      const eventDate = document.getElementById('cake-event-date').value || 'Fecha por confirmar (min. 48h)';
      const celebrantName = document.getElementById('cake-celebrant-name').value.trim() || 'Festejado';
      const clientName = document.getElementById('cake-client-name').value.trim() || 'Cliente';
      const notes = document.getElementById('cake-notes').value.trim() || 'Sin notas especiales';

      const totalFormatted = summaryTotal.textContent;

      const message = `🎂 *COTIZACIÓN DE PASTEL ARTESANAL - FRESA Y CHOCOLATE*%0A%0A` +
        `¡Hola, Chef Elena! Deseo cotizar mi pastel personalizado para evento en Villahermosa:%0A%0A` +
        `*Celebración:* ${encodeURIComponent(eventType)}%0A` +
        `*Festejado(a):* ${encodeURIComponent(celebrantName)}%0A` +
        `*Fecha del Evento:* ${encodeURIComponent(eventDate)}%0A%0A` +
        `*Especificaciones del Pastel:*%0A` +
        `• *Estructura:* ${encodeURIComponent(cakeState.tiers.name)}%0A` +
        `• *Bizcocho:* ${encodeURIComponent(cakeState.sponge.name)}%0A` +
        `• *Relleno:* ${encodeURIComponent(cakeState.filling.name)}%0A` +
        `• *Cobertura:* ${encodeURIComponent(cakeState.finish.name)}%0A` +
        `• *Notas/Temática:* ${encodeURIComponent(notes)}%0A%0A` +
        `*Presupuesto Estimado:* *${totalFormatted}*%0A` +
        `*Cliente:* ${encodeURIComponent(clientName)}%0A%0A` +
        `*Sucursal de Entrega:* Calle Alijadores 112, Col. Nueva Villahermosa.%0A` +
        `¿Tienen disponibilidad en agenda para esta fecha?`;

      window.open(`https://wa.me/529933158280?text=${message}`, '_blank');
    });
  }
}

/* ==========================================================================
   2. Apartado Express de Vitrina del Día
   ========================================================================== */
function initVitrinaExpress() {
  const apartarBtns = document.querySelectorAll('.btn-apartar-mini');

  apartarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cakeName = btn.dataset.cakeName;
      const cakePrice = btn.dataset.cakePrice;

      const message = `🍰 *APARTADO EXPRÉS DE VITRINA - FRESA Y CHOCOLATE*%0A%0A` +
        `Hola, deseo apartar para recoger hoy mismo en la sucursal de Nueva Villahermosa:%0A%0A` +
        `• *Pastel:* ${encodeURIComponent(cakeName)}%0A` +
        `• *Precio de Lista:* ${encodeURIComponent(cakePrice)}%0A%0A` +
        `Por favor confírmenme si aún lo tienen en vitrina para pasar en un momento.`;

      window.open(`https://wa.me/529933158280?text=${message}`, '_blank');
    });
  });
}
