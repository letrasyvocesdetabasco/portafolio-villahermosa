/**
 * Hub de Clientes Reales - Demostrador Móvil
 * Villahermosa, Tabasco
 */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("phone-modal");
  const iframe = document.getElementById("phone-iframe");
  const closeBtn = document.getElementById("phone-close-btn");

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    iframe.src = "about:blank";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      iframe.src = "about:blank";
    }
  });
});

window.openPhonePreview = function(url) {
  const modal = document.getElementById("phone-modal");
  const iframe = document.getElementById("phone-iframe");
  iframe.src = url;
  modal.classList.add("active");
};
