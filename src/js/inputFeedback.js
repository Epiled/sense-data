const fields = document.querySelectorAll(".form__input");

fields.forEach((item) => {
  item.addEventListener("change", () => {
    isEmpty(item);
  });

  isEmpty(item);
});

function isEmpty(item) {
  const label = item.parentNode.querySelector(".form__label");
  if (item.value) {
    label.classList.add("form__label--active");
  } else {
    label.classList.remove("form__label--active");
  }
}
