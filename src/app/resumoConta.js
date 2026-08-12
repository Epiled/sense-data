import { conectaApi } from "./conectaApi.js";

const tabelaContainer = document.querySelector("[data-container-tabela]");

async function criaTabela(quantidade, valor) {
  const tabela = document.createElement("table");
  tabela.className = "table__text";

  tabela.innerHTML = `
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

async function listaCards(conta) {
  try {
    const listaApi = await conectaApi.listaValoresConta(conta);
    listaApi.forEach(async (element) => {
      // lista.appendChild(await criaCard(
      //   element.categoria,
      //   element.data,
      //   element.descricao,
      //   element.valor,
      //   element.id
      // ))
    });
    console.log(listaApi);

    return listaApi;
  } catch (e) {
    tabelaContainer.innerHTML = `
      <h2 class="mensagem__titulo">
        Não foi possível carregar os cardes
      </h2>
    `;
  }
}

const contaLogada = JSON.parse(localStorage.getItem("userLogado"));
listaCards(contaLogada.idGastos);
