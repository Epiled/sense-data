import { conectaApi } from "./conectaApi.js";

const form = document.querySelector("[data-form]");

async function criaCard(evento) {
  evento.preventDefault();

  const categoria = document.querySelector("[data-categoria]").value;
  const data = document.querySelector("[data-data]").value;
  const [ano, mes, dia] = data.split("-");
  const formataData = "".concat(dia, "/", mes, "/", ano);
  const descricao = document.querySelector("[data-descricao]").value;
  const valor = document.querySelector("[data-valor]").value;
  const conta = document.querySelector("[data-conta]").value;

  try {
    await conectaApi.criaValorConta(
      categoria,
      formataData,
      descricao,
      valor,
      conta,
    );
    window.location.href = "./dashboard.html";
  } catch (e) {
    alert(e);
  }
}

form.addEventListener("submit", (evento) => criaCard(evento));
