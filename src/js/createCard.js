import { expenseService } from "../api/expenseService.js";

const form = document.querySelector("[data-form]");

async function createCard(e) {
  e.preventDefault();

  const category = document.querySelector("[data-category]").value;
  const date = document.querySelector("[data-date]").value;
  const [year, month, day] = date.split("-");
  const dateFormat = "".concat(day, "/", month, "/", year);
  const description = document.querySelector("[data-description]").value;
  const amount = document.querySelector("[data-amount]").value;
  const accountId = document.querySelector("[data-account]").value;

  try {
    await expenseService.createExpense(
      category,
      dateFormat,
      description,
      amount,
      accountId,
    );
    window.location.href = "./dashboard.html";
  } catch (e) {
    alert(e);
  }
}

form.addEventListener("submit", (e) => createCard(e));
