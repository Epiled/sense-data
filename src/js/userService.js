const BASE_URL = "http://localhost:3000/users";

async function getUsers() {
  const res = await fetch(BASE_URL);
  const users = await res.json();
  return users;
}

async function getUserByEmail(email) {
  const res = await fetch(`${BASE_URL}?email=${email}`);
  const user = await res.json();

  if (user.length === 0) {
    return `
    <h2 class="message__title">
      Nenhum usuario encontrado
    </h2>`;
  }
  return user;
}

async function authenticateUser(email, password) {
  const res = await fetch(`${BASE_URL}?email=${email}&password=${password}`);
  const user = await res.json();
  return user;
}

export const userService = {
  getUsers,
  getUserByEmail,
  authenticateUser,
};
