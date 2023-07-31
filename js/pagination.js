const buttonPrevPage = document.querySelector(".arrow-prev");
const buttonNextPage = document.querySelector(".arrow-next");

function showPagination() {
  const iconPagination = document.querySelector(".icon-pagination");
  document.body.classList.toggle("active-pagination");
  pageNumber = 1;
  renderPagination(iconPagination);
}

function renderPagination(iconPagination) {
  if (document.body.classList.contains("active-pagination")) {
    renderNumbersPage();
    renderCharacters(true);
    returnDisable();
    iconPagination.setAttribute("src", "./images/scroll.svg");
  } else {
    list.innerHTML = " ";
    renderCharacters();
    iconPagination.setAttribute("src", "./images/pagination.svg");
  }
}

function returnDisable() {
  buttonPrevPage.classList.add("disable");
  buttonNextPage.classList.remove("disable");
}

function nextPage(event) {
  pageNumber++;
  if (pageNumber <= totalPages) {
    renderPage(event, buttonPrevPage, totalPages);
  } else {
    pageNumber = totalPages;
  }
}

function prevPage(event) {
  pageNumber--;
  if (pageNumber) {
    renderPage(event, buttonNextPage, 1);
  } else {
    pageNumber = 1;
  }
}

async function renderPage(event, element, quantity) {
  const target =
    event.target.tagName !== "svg"
      ? event.target
      : event.target.closest(".arrow");
  await renderCharacters(true);
  renderNumbersPage();
  element.classList.remove("disable");
  if (pageNumber === quantity) {
    target.classList.add("disable");
  }
}

function renderNumbersPage() {
  const numbersPage = document.querySelector(".page-numbers");
  numbersPage.innerHTML = `
    <span class="page-quantity">${pageNumber}</span>
    <span class="page-quantity">of</span>
    <span class="page-quantity">${totalPages}</span>
    `;
}
