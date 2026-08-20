import { expenseService } from "../api/expenseService.js";

const login = JSON.parse(localStorage.getItem("editarConta"));
const id = login.accountId;

const amounts = await expenseService.getExpenseById(id);
const form = document.querySelector("[data-form]");
const fields = document.querySelectorAll(".form__input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const category = document.querySelector("[data-category]").value;
  const date = document.querySelector("[data-date]").value;
  const [year, month, day] = date.split("-");
  const dateFormat = "".concat(day, "/", month, "/", year);
  const description = document.querySelector("[data-description]").value;
  const amount = document.querySelector("[data-amount]").value;
  const accountId = 1;

  await expenseService.updateExpense(
    id,
    category,
    dateFormat,
    description,
    amount,
    accountId,
  );
  window.location.href = "./dashboard.html";
});

function fillFielders() {
  fields.forEach((item) => {
    item.value = amounts[item.name];

    if (item.name == "date") {
      const [day, month, year] = amounts[item.name].split("/");
      const dateFormat = "".concat(year, "-", month, "-", day);
      item.value = dateFormat;
    }
  });
}

fillFielders();
