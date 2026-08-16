const BASE_URL = "http://localhost:3000/expenses";

async function getExpensesByAccountId(accountId) {
  const res = await fetch(`${BASE_URL}?accountId=${accountId}`);
  return await res.json();
}

async function getExpenseById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
}

async function createExpense(category, date, description, amount, accountId) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      category,
      date,
      description,
      amount: Number(amount),
      accountId: Number(accountId),
    }),
  });

  const data = await res.json();
  return data;
}

async function updateExpense(
  id,
  category,
  date,
  description,
  amount,
  accountId,
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      category,
      date,
      description,
      amount: Number(amount),
      accountId: accountId,
    }),
  });

  const data = await res.json();
  return data;
}

async function deleteExpense(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
}

export const expenseService = {
  getExpensesByAccountId,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
