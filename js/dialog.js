const dialog = document.createElement("div");

dialog.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("dialog-container")) {
    return;
  }
  closeDialog();
});

function showDialog(event) {
  const target = event.target;
  if (!target.classList.contains("avatar")) {
    return;
  }
  document.body.classList.add("scroll-off");
  openDialog(target);
}

async function openDialog(target) {
  const page = document.querySelector(".page");
  const numberPage = target.dataset.page;
  const response = await fetchCharacters(numberPage);
  const character = getCharacter(response, target);
  dialog.classList.add("dialog-container");
  page.append(dialog);
  generateDialog(character);
}

function getCharacter(response, target) {
  const idCharacter = +target.dataset.id;
  return response.results.filter(
    (character) => character.id === idCharacter
  )[0];
}

function getEpisode(character) {
  const episode = character.episode[0].slice(-2);
  return +episode ? episode : character.episode[0].slice(-1);
}

function generateDialog(character) {
  const episode = getEpisode(character);
  dialog.innerHTML = `
  <div class="dialog">
  <button class="button-close" onclick="closeDialog()">close</button>
  <div class="info-container">
    <img class="poster" src="${character.image}" />
    <div class="info">
      <div class="data">
        <div class="data-title">Name:</div>
        <div class="data-text">${character.name}</div>
        <div class="data-title">Status:</div>
        <div class="data-text">${character.status}</div>
        <div class="data-title">Species:</div>
        <div class="data-text">${character.species}</div>
        <div class="data-title">First episode:</div>
        <div class="data-text">${episode}</div>
      </div>
      <div class="data">
        <div class="data-title">Origin:</div>
        <div class="data-text">${character.origin.name}</div>
        <div class="data-title">Location:</div>
        <div class="data-text">${character.location.name}</div>
        <div class="data-title">Gender:</div>
        <div class="data-text">${character.gender}</div>
      </div>
    </div>
  </div>
</div>
  `;
}

function closeDialog() {
  const dialogContainer = document.querySelector(".dialog-container");
  dialogContainer.remove();
  document.body.classList.remove("scroll");
}
