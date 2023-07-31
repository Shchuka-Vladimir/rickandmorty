const list = document.querySelector(".list");
const main = document.querySelector(".main");
const spinnerContainer = document.querySelector(".spinner-container");
let pageNumber = 1;
const totalPages = 42;

renderCharacters();
list.addEventListener("click", (event) => {
  showDialog(event);
});
main.addEventListener("scroll", scrollActions);

async function fetchCharacters(i) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${i}`
  );
  return response.json();
}

function generateCharacter(character, pageNext) {
  const pageCharacter = getPageCharacter(pageNext);
  return `
  <div class="character">
  <img
    class="avatar"
    src="${character.image}"
    data-id="${character.id}"
    data-page="${pageCharacter}"
  />
  <div class="name">${character.name}</div>
</div>
           `;
}

function getPageCharacter(pageNext) {
  return !pageNext
    ? totalPages
    : new URL(pageNext).searchParams.get("page") - 1;
}

async function renderCharacters(isPagination) {
  showSpinner();
  const response = await fetchCharacters(pageNumber);
  const pageNext = response.info.next;
  let promises = [];
  response.results.forEach((character) => {
    promises.push(generateCharacter(character, pageNext));
  });
  const characters = await Promise.all(promises);
  renderCharactersByCondition(isPagination, characters);
  hiddenSpinner();
}

function renderCharactersByCondition(isPagination, characters) {
  if (isPagination) {
    main.scrollTop = 0;
    let html = "";
    characters.forEach((character) => (html += character));
    list.innerHTML = html;
  } else {
    characters.forEach((character) => (list.innerHTML += character));
  }
}

function showSpinner() {
  spinnerContainer.classList.add("show");
}

function hiddenSpinner() {
  spinnerContainer.classList.remove("show");
}

function scrollActions() {
  showAnchor();
  if (
    document.body.classList.contains("active-pagination") ||
    pageNumber >= totalPages
  ) {
    return;
  }
  if (list.getBoundingClientRect().bottom < main.clientHeight + 10) {
    pageNumber++;
    renderCharacters();
  }
}

function showAnchor() {
  const anchor = document.querySelector(".anchor");
  if (main.scrollTop > 50) {
    anchor.classList.add("show-anchor");
  } else {
    anchor.classList.remove("show-anchor");
  }
}
