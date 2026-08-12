const ipts = document.querySelectorAll(".form__input");

ipts.forEach((item) => {
  item.addEventListener("change", () => {
    verificaVazio(item);
  });

  verificaVazio(item);
});

function verificaVazio(item) {
  const etq = item.parentNode.querySelector(".form__label");
  if (item.value) {
    etq.classList.add("form__label--active");
  } else {
    etq.classList.remove("form__label--active");
  }
}
