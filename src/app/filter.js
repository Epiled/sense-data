// DOM Elements
const categoryFilter = document.querySelector("[data-filter-categories]");
const applyFiltersBtn = document.querySelector("[data-btn-filter-amount]");
const minAmountInput = document.querySelector("[data-filter-min]");
const maxAmountInput = document.querySelector("[data-filter-max]");

// Notice the change from "filter" to "sort"
const sortBySelect = document.querySelector("[data-filter-type]");
const sortDirectionSelect = document.querySelector("[data-filter-order]");

// State Management
let filterResults = {
  categories: [],
  amounts: [],
};

let visibleCards = [];

// Event Listeners
categoryFilter.addEventListener("change", (e) => {
  const cards = document.querySelectorAll("[data-card]");
  const selectedCategory = e.target.value;
  filterByCategory(cards, selectedCategory);
});

applyFiltersBtn.addEventListener("click", () => {
  const minAmount = parseFloat(minAmountInput.value).toFixed(2);
  const maxAmount = parseFloat(maxAmountInput.value).toFixed(2);
  const cards = document.querySelectorAll("[data-card]");

  filterByAmountRange(cards, minAmount, maxAmount);
});

sortBySelect.addEventListener("change", (e) => {
  const cards = document.querySelectorAll("[data-card]");
  const criterion = e.target.value;
  const direction = sortDirectionSelect.value;
  sortCards(cards, criterion, direction);
});

sortDirectionSelect.addEventListener("change", (e) => {
  const cards = document.querySelectorAll("[data-card]");
  const criterion = sortBySelect.value;
  const direction = e.target.value;
  sortCards(cards, criterion, direction);
});

// Functions
function filterByCategory(cards, category) {
  filterResults.categories = [];

  cards.forEach((item) => {
    if (category === "Todos" || item.dataset.category === category) {
      filterResults.categories.push(item);
    }
  });

  applyFilters(cards); // Chama a função de filtragem geral
}

function filterByAmountRange(cards, minAmount, maxAmount) {
  filterResults.amounts = [];

  cards.forEach((item) => {
    let cardAmount = parseFloat(item.dataset.amount);

    if (cardAmount >= minAmount && cardAmount <= maxAmount) {
      filterResults.amounts.push(item);
    }
  });

  applyFilters(cards);
}

function applyFilters(cards) {
  if (filterResults.categories.length > 0 && filterResults.amounts.length > 0) {
    // Se ambos os filters estão ativos, pegar a interseção
    visibleCards = filterResults.categories.filter((item) =>
      filterResults.amounts.includes(item),
    );
  } else if (filterResults.categories.length > 0) {
    // Se só o filter de categoria está ativo
    visibleCards = filterResults.categories;
  } else if (filterResults.amounts.length > 0) {
    // Se só o filter de valor está ativo
    visibleCards = filterResults.amounts;
  } else {
    // Se nenhum filter está ativo, mostrar todos os cards
    visibleCards = [...cards];
  }

  // Atualiza a visualização dos cards
  cards.forEach((item) => {
    if (visibleCards.includes(item)) {
      item.classList.remove("card--hidden");
    } else {
      item.classList.add("card--hidden");
    }
  });
}

function sortCards(cards, criterion, direction) {
  const cardsArray = Array.from(cards);
  let sortedCards;

  if (criterion == "Categoria" || criterion == "") {
    sortedCards = cardsArray.sort((a, b) => {
      return a.dataset.category.localeCompare(b.dataset.category);
    });
  } else {
    sortedCards = cardsArray.sort((a, b) => {
      // Comparar os valores de 'data-amount' dos elementos
      return parseFloat(a.dataset.amount) - parseFloat(b.dataset.amount);
    });
  }

  // Verificar se a ordem é decrescente e reverter
  if (direction === "Decrescente") {
    sortedCards.reverse();
  }

  // Aplicar a ordem correta nos itens
  sortedCards.forEach((item, index) => {
    item.style.order = index;
  });
}
