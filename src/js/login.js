import { userService } from "./userService.js";

const form = document.querySelector("[data-form]");
const fields = form.querySelectorAll("[data-field]");

const errorsType = ["valueMissing", "typeMismatch", "tooShort", "customError"];

const messages = {
  iptEmail: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    tooShort: "Por favor, preencha um e-mail válido.",
    typeMismatch: "Por favor, preencha um e-mail válido. Ex: email@contato.com",
    customError: "Nenhum correspondente encontrado",
  },
  iptPassword: {
    valueMissing: "O campo de senha não pode estar vazio.",
    tooShort: "Por favor, preencha um senha válido.",
    customError: "Senha não corresponde com o e-mail",
  },
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fieldsValue = {
    email: e.target.iptEmail.value,
    password: e.target.iptPassword.value,
  };

  await checkLogin(fieldsValue.email, fieldsValue.password);
});

fields.forEach((field) => {
  field.addEventListener("blur", async () => {
    await checkField(field);
  });
  field.addEventListener("invalid", (e) => {
    e.preventDefault();
  });
});

async function checkField(field) {
  let message = "";
  field.setCustomValidity("");

  errorsType.forEach((error) => {
    if (field.validity[error]) {
      message = messages[field.name][error];
    }
  });

  let isFieldValid = field.checkValidity();

  if (isFieldValid && field.name == "iptEmail") {
    const userExist = await checkUserExists(field);

    if (!userExist) {
      field.setCustomValidity("Esse e-mail não está cadastrado");
      message = messages[field.name]["customError"];
      isFieldValid = false;
    }
  }

  const errorSpan = field.parentNode.querySelector("[data-message-error]");

  errorSpan.textContent = isFieldValid ? "" : message;
}

async function checkUserExists(email) {
  const user = await userService.getUserByEmail(email);
  return user && user.length > 0;
}

async function checkLogin(email, password) {
  const errorSpan = document.querySelector("[data-message-error-login]");
  errorSpan.textContent = "";

  try {
    const user = await userService.authenticateUser(email, password);

    if (!user || user.length <= 0) {
      throw new Error("E-mail e senha não correspondem");
    }

    const { nome, email: emailUser, accountId } = user[0];

    const userData = {
      nome,
      email: emailUser,
      accountId,
    };

    localStorage.setItem("userLogado", JSON.stringify(userData));
    window.location.href = "dashboard.html";
  } catch (error) {
    errorSpan.textContent = error.message;
  }
}
