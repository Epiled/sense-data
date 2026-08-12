import { conectaApi } from "./conectaApi.js";

const contaLogada = JSON.parse(localStorage.getItem("editarConta"));
const id = contaLogada.conta;

const valores = await conectaApi.contaEspecifica(id);
const form = document.querySelector("[data-form]");
const ipts = document.querySelectorAll(".form__input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const categoria = document.querySelector("[data-categoria]").value;

  const data = document.querySelector("[data-data]").value;
  const [ano, mes, dia] = data.split("-");
  const formataData = "".concat(dia, "/", mes, "/", ano);

  const descricao = document.querySelector("[data-descricao]").value;
  const valor = document.querySelector("[data-valor]").value;
  const idConta = 1;

  await conectaApi.editaValorConta(
    id,
    categoria,
    formataData,
    descricao,
    valor,
    idConta,
  );
  window.location.href = "./dashboard.html";
});

function populaCampos() {
  ipts.forEach((item) => {
    item.value = valores[item.name];

    if (item.name == "data") {
      const [dia, mes, ano] = valores[item.name].split("/");
      const formataData = "".concat(ano, "-", mes, "-", dia);
      item.value = formataData;
    }
  });
}

populaCampos();
