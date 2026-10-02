/**
 * Seguridad Industrial y Ferretería Lamar
 * Blvd. Adolfo Ruiz Cortines & Av. 27 de Febrero, Col. Atasta de Serra, Villahermosa
 * Teléfono Real: (993) 315-1615 | WhatsApp: +52 993 315 1615 | Correo: ventas3@lamarseguridad.com.mx
 */

const LAMAR_DATA = {
  name: "Seguridad Industrial y Ferretería Lamar",
  address: "Blvd. Adolfo Ruiz Cortines & Av. 27 de Febrero, Col. Atasta de Serra, Villahermosa, Tabasco",
  phone: "(993) 315-1615",
  whatsapp: "529933151615",
  email: "ventas3@lamarseguridad.com.mx",
  hours: "Lunes a Viernes: 08:00 - 18:30 | Sábados: 08:00 - 14:00"
};

const PRODUCTS_B2B = [
  {
    id: 1,
    sku: "LAM-BOT-154",
    name: "Bota Berrendo Dieléctrica mod. 154 c/ Casco Poliamida",
    brand: "Berrendo",
    nom: "NOM-113-STPS-2009",
    category: "Calzado Industrial",
    price: 1485.00,
    unit: "Par",
    desc: "Suela de doble densidad PU/Hule resistente a aceites y solventes. Cumplimiento estricto para plantas y refinerías."
  },
  {
    id: 2,
    sku: "LAM-CAS-3M",
    name: "Casco de Seguridad 3M H-700 Suspensión Matraca 4 Puntos",
    brand: "3M",
    nom: "NOM-115-STPS-2009",
    category: "Protección a la Cabeza",
    price: 235.00,
    unit: "Pza",
    desc: "Polietileno de alta densidad tipo 1, dieléctrico clase C, G y E. Ranuras laterales para orejeras."
  },
  {
    id: 3,
    sku: "LAM-ARN-SUR",
    name: "Arnés Contra Caídas Surtek 4 Anillos D con Soporte Lumbar",
    brand: "Surtek Industrial",
    nom: "NOM-009-STPS-2011",
    category: "Alturas y Rescate",
    price: 1690.00,
    unit: "Pza",
    desc: "Cintas de poliéster 45mm con resistencia de ruptura 2,268 kgf. Anillos forjados para posicionamiento y detención."
  },
  {
    id: 4,
    sku: "LAM-CHA-BRI",
    name: "Chaleco Brigadista Gabardina Pesada 100% Algodón",
    brand: "Lamar Seguridad",
    nom: "Alta Visibilidad",
    category: "Ropa de Trabajo",
    price: 295.00,
    unit: "Pza",
    desc: "Bolsa porta-radio, porta-planos y doble cinta reflejante prismática de 2 pulgadas. Apto para contratistas."
  },
  {
    id: 5,
    sku: "LAM-RES-6200",
    name: "Respirador Media Cara 3M mod. 6200 c/ Filtros 6003",
    brand: "3M",
    nom: "NOM-116-STPS-2009",
    category: "Protección Respiratoria",
    price: 640.00,
    unit: "Juego",
    desc: "Protección combinada contra vapores orgánicos y gases ácidos en talleres de pintura y plantas industriales."
  },
  {
    id: 6,
    sku: "LAM-LEN-SPY",
    name: "Lentes de Seguridad Spy Claro Antirrayaduras y Antiempaño",
    brand: "Jackson Safety",
    nom: "ANSI Z87.1 / NOM",
    category: "Protección Ocular",
    price: 78.00,
    unit: "Pza",
    desc: "Protección UV 99.9% con patillas ajustables y almohadillas nasales de confort continuo."
  },
  {
    id: 7,
    sku: "LAM-GUA-SOL",
    name: "Guante Carnaza Largo Forrado para Soldador Profesional",
    brand: "Surtek",
    nom: "Resistencia Térmica",
    category: "Protección Manual",
    price: 135.00,
    unit: "Par",
    desc: "Costuras de hilo Kevlar resistentes a chispas y calor continuo de hasta 250°C. Longitud 14 pulgadas."
  },
  {
    id: 8,
    sku: "LAM-ROT-TRU",
    name: "Rotomartillo SDS Plus 800W Trabajo Continuo 3J",
    brand: "Truper Expert",
    nom: "Herramienta de Obra",
    category: "Herramienta Eléctrica",
    price: 2890.00,
    unit: "Pza",
    desc: "Diseño para demolición y perforación de concreto en cimentaciones y losas de Tabasco."
  }
];

let activeNom = "all";
let searchWord = "";
let rfqItems = [];

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  bindFilterEvents();
  bindRfqDrawer();
});

function renderProducts() {
  const grid = document.getElementById("products-grid");

  const filtered = PRODUCTS_B2B.filter(item => {
    const matchNom = activeNom === "all" || item.nom.includes(activeNom) || item.category === activeNom;
    const q = searchWord.toLowerCase().trim();
    const matchQuery = !q || item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q);
    return matchNom && matchQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-gray);">No se encontraron artículos que coincidan con la búsqueda.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="ind-product-card">
      <div class="ind-card-top">
        <span class="ind-nom-tag">${item.nom}</span>
        <span class="ind-sku-text">${item.sku}</span>
      </div>
      <span class="ind-brand-title">${item.brand}</span>
      <h3 class="ind-product-name">${item.name}</h3>
      <p class="ind-product-desc">${item.desc}</p>
      
      <div class="ind-price-box">
        <div>
          <span style="font-size: 0.72rem; color: var(--text-gray); display: block;">Precio Unitario:</span>
          <span class="price-big-ind">$${item.price.toFixed(2)}</span>
        </div>
        <span style="font-size: 0.78rem; font-weight: 700; color: var(--industrial-yellow);">${item.unit}</span>
      </div>

      <button class="btn-add-rfq" onclick="addToRfq(${item.id})">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        Agregar a Orden de Compra
      </button>
    </article>
  `).join("");
}

function bindFilterEvents() {
  document.querySelectorAll(".nom-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nom-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeNom = btn.dataset.filter;
      renderProducts();
    });
  });

  document.getElementById("ind-search").addEventListener("input", (e) => {
    searchWord = e.target.value;
    renderProducts();
  });
}

window.addToRfq = function(id) {
  const item = PRODUCTS_B2B.find(p => p.id === id);
  if (!item) return;

  const existing = rfqItems.find(i => i.id === id);
  if (existing) {
    existing.qty += 5; // En B2B se agrega por volumen
  } else {
    rfqItems.push({ ...item, qty: 10 }); // Lote inicial de 10 pzas
  }

  updateRfqUI();
  openRfqDrawer();
};

function updateRfqUI() {
  const totalCount = rfqItems.reduce((acc, i) => acc + i.qty, 0);
  document.getElementById("rfq-count-badge").textContent = totalCount;

  const subtotal = rfqItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
  
  let discountRate = 0;
  if (subtotal >= 25000) discountRate = 0.10;
  else if (subtotal >= 10000) discountRate = 0.05;

  const discountAmount = subtotal * discountRate;
  const taxable = subtotal - discountAmount;
  const iva = taxable * 0.16;
  const totalNeto = taxable + iva;

  const banner = document.getElementById("discount-banner");
  if (discountRate > 0) {
    banner.style.display = "block";
    banner.textContent = `⚡ Descuento Mayorista Aplicado: ${discountRate * 100}% (-$${discountAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN)`;
  } else {
    banner.style.display = "none";
  }

  document.getElementById("rfq-subtotal").textContent = `$${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`;
  document.getElementById("rfq-iva").textContent = `$${iva.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`;
  document.getElementById("rfq-total").textContent = `$${totalNeto.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`;

  const container = document.getElementById("rfq-items-list");
  if (rfqItems.length === 0) {
    container.innerHTML = `<p style="color: var(--text-gray); text-align: center; margin: auto;">No has agregado partidas a tu orden de compra.</p>`;
    document.getElementById("btn-submit-rfq").style.display = "none";
    return;
  }

  document.getElementById("btn-submit-rfq").style.display = "flex";

  container.innerHTML = rfqItems.map(item => `
    <div class="rfq-item">
      <div>
        <div style="font-size: 0.88rem; font-weight: 800; color: #fff;">${item.name}</div>
        <div style="font-size: 0.75rem; color: var(--text-gray); font-family: monospace;">SKU: ${item.sku} | $${item.price.toFixed(2)} / ${item.unit}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button style="width: 28px; height: 28px; background: #090d16; border: 1px solid var(--border-dark); color: #fff; border-radius: 4px; font-weight: 900; cursor: pointer;" onclick="changeRfqQty(${item.id}, -5)">-</button>
        <span style="font-weight: 900; color: var(--industrial-yellow); min-width: 24px; text-align: center;">${item.qty}</span>
        <button style="width: 28px; height: 28px; background: #090d16; border: 1px solid var(--border-dark); color: #fff; border-radius: 4px; font-weight: 900; cursor: pointer;" onclick="changeRfqQty(${item.id}, 5)">+</button>
      </div>
    </div>
  `).join("");
}

window.changeRfqQty = function(id, delta) {
  const item = rfqItems.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    rfqItems = rfqItems.filter(i => i.id !== id);
  }
  updateRfqUI();
};

function openRfqDrawer() {
  document.getElementById("rfq-drawer").classList.add("active");
  document.getElementById("rfq-overlay").classList.add("active");
}

function closeRfqDrawer() {
  document.getElementById("rfq-drawer").classList.remove("active");
  document.getElementById("rfq-overlay").classList.remove("active");
}

function bindRfqDrawer() {
  document.getElementById("btn-open-rfq-cart").addEventListener("click", openRfqDrawer);
  document.getElementById("btn-close-rfq").addEventListener("click", closeRfqDrawer);
  document.getElementById("rfq-overlay").addEventListener("click", closeRfqDrawer);

  document.getElementById("btn-submit-rfq").addEventListener("click", () => {
    if (rfqItems.length === 0) return;

    const company = document.getElementById("rfq-company-name").value.trim() || "Constructora en Villahermosa";
    const subtotal = rfqItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
    let discountRate = (subtotal >= 25000) ? 0.10 : (subtotal >= 10000 ? 0.05 : 0);
    const discountAmount = subtotal * discountRate;
    const taxable = subtotal - discountAmount;
    const iva = taxable * 0.16;
    const totalNeto = taxable + iva;

    let msg = `*ORDEN DE COMPRA B2B - SEGURIDAD INDUSTRIAL LAMAR*\n`;
    msg += `📍 Almacén Matriz: Ruiz Cortines & 27 de Febrero, Atasta, Vhsa\n`;
    msg += `📧 Atención: ${LAMAR_DATA.email}\n`;
    msg += `------------------------------------\n`;
    msg += `🏗️ *Empresa / Contratista:* ${company}\n`;
    msg += `📋 *Partidas Solicitadas:*\n`;
    rfqItems.forEach(item => {
      msg += `▫️ *${item.qty} ${item.unit}* x ${item.name} (${item.nom})\n   (SKU: ${item.sku}) → $${(item.price * item.qty).toLocaleString("es-MX", { minimumFractionDigits: 2 })}\n`;
    });
    msg += `------------------------------------\n`;
    msg += `Subtotal: $${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN\n`;
    if (discountRate > 0) {
      msg += `Descuento Mayorista (${discountRate * 100}%): -$${discountAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN\n`;
    }
    msg += `IVA (+16%): $${iva.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN\n`;
    msg += `*TOTAL ESTIMADO:* $${totalNeto.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN\n`;
    msg += `------------------------------------\n`;
    msg += `Hola Departamento de Ventas Lamar, solicito confirmar existencias en bodega Atasta y tiempo de entrega en obra con factura CFDI 4.0.`;

    const waUrl = `https://wa.me/${LAMAR_DATA.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  });
}
