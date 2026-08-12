import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-cards-lista]");

async function criaCard(categoria, data, descricao, valor, id) {
  const card = document.createElement("li");
  card.className = "card";

  card.dataset.categoria = categoria;
  card.dataset.valor = valor.toFixed(2);

  card.dataset.card = "";
  card.innerHTML = `
    <header class="card__head">
      <span class="card__category">${categoria}</span>
      <span class="card__data">${data}</span>
    </header>
    <main class="card__main">
      <span class="card__value">R$ ${valor
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
      <p class="card__description">
      ${descricao}
      </p>
    </main>
    <footer class="card__footer">
      <button class="card__button" data-conta-deleta=${id}>Deletar</button>
      <button class="card__button card__button--edit" data-conta-edita=${id}>Editar</button>
    </footer>
  `;

  card
    .querySelector("[data-conta-deleta]")
    .addEventListener("click", async (e) => {
      await conectaApi.deletaValorConta(e.target.dataset.contaDeleta);
    });

  card
    .querySelector("[data-conta-edita]")
    .addEventListener("click", async (e) => {
      const userData = {
        conta: id,
      };
      localStorage.setItem("editarConta", JSON.stringify(userData));
      window.location.href = "./editarConta.html";
      // await conectaApi.editaValorConta(e.target.dataset.contaEdita);
    });

  return card;
}

async function listaCards(conta) {
  try {
    const listaApi = await conectaApi.listaValoresConta(conta);
    listaApi.forEach(async (element) => {
      lista.appendChild(
        await criaCard(
          element.categoria,
          element.data,
          element.descricao,
          element.valor,
          element.id,
        ),
      );
    });

    return listaApi;
  } catch (e) {
    lista.innerHTML = `
      <h2 class="mensagem__titulo">
        Não foi possível carregar os cardes
      </h2>
    `;
  }
}

const contaLogada = JSON.parse(localStorage.getItem("userLogado"));
listaCards(contaLogada.idGastos);

export default listaCards;
