import { expenseService } from "./expenseService.js";

const tableContainer = document.querySelector("[data-expenses-table]");

async function createTable(quantity, amount) {
  const table = document.createElement("table");
  table.className = "table__text";

  table.innerHTML = `
          <tr>
              <th>Categorias</th>
              <td>Contagem de Itens</td>
              <td>Valor Total</td>
          </tr>
          <tr>
              <th>Saúde</th>
              <td>5</td>
              <td>6</td>
          </tr>
          <tr>
              <th>Lazer</th>
              <td>8</td>
              <td>9</td>
          </tr>
          <tr>
              <th>Transporte</th>
              <td>11</td>
              <td>12</td>
          </tr>
          <tr>
            <th>Todos</th>
            <td>11</td>
            <td>12</td>
        </tr>
`;
}

async function listCards(accountId) {
  try {
    const res = await expenseService.getExpensesByAccountId(accountId);
    res.forEach(async (element) => {
      // list.appendChild(await createCard(
      //   element.category,
      //   element.date,
      //   element.description,
      //   element.amount,
      //   element.id
      // ))
    });
    console.log(res);

    return res;
  } catch (e) {
    tableContainer.innerHTML = `
      <h2 class="message__title">
        Não foi possível carregar os cardes
      </h2>
    `;
  }
}

const user = JSON.parse(localStorage.getItem("userLogado"));
listCards(user.accountId);
