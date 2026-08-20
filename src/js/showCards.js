import { expenseService } from "../api/expenseService.js";

const list = document.querySelector("[data-cards-list]");

async function createCard(category, date, description, amount, id) {
  const card = document.createElement("li");
  card.className = "card";

  card.dataset.category = category;
  card.dataset.amount = amount.toFixed(2);

  card.dataset.card = "";
  card.innerHTML = `
    <header class="card__head">
      <span class="card__category">${category}</span>
      <span class="card__date">${date}</span>
    </header>
    <main class="card__main">
      <span class="card__value">R$ ${amount
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
      <p class="card__description">
      ${description}
      </p>
    </main>
    <footer class="card__footer">
      <button class="card__button" data-account-delete=${id}>Deletar</button>
      <button class="card__button card__button--edit" data-account-edit=${id}>Editar</button>
    </footer>
  `;

  card
    .querySelector("[data-account-delete]")
    .addEventListener("click", async (e) => {
      await expenseService.deleteExpense(e.target.dataset.accountDelete);
    });

  card
    .querySelector("[data-account-edit]")
    .addEventListener("click", async (e) => {
      const userData = {
        accountId: id,
      };
      localStorage.setItem("editarConta", JSON.stringify(userData));
      window.location.href = "./editarConta.html";
    });

  return card;
}

async function listCards(accountId) {
  try {
    const listApi = await expenseService.getExpensesByAccountId(accountId);
    listApi.forEach(async (element) => {
      list.appendChild(
        await createCard(
          element.category,
          element.date,
          element.description,
          element.amount,
          element.id,
        ),
      );
    });

    return listApi;
  } catch (e) {
    list.innerHTML = `
      <h2 class="message__title">
        Não foi possível carregar os cardes
      </h2>
    `;
  }
}

const user = JSON.parse(localStorage.getItem("userLogado"));
listCards(user.accountId);

export default listCards;
