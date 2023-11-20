const getGames = async () => {
  const result = await fetch('http://localhost:3000/games');
  const games = await result.json();
  return games;
}

const createCard = async () => {
  const juegos = await getGames();
  const card = document.getElementById('card');
  const cardGame = juegos.map(game => (`
    <div class="col pb-3">
      <div class="card">
        <div class="card-body">
          <img src="${game.image}" class="card-img-top" alt="${game.title}"> 
          <div class="card-text d-flex flex-column text-center align-items-center">
            <h5 class="card-title py-3">${game.title}</h5>
            <div>
              <button type="button" class="button" onclick="gameDetail(${game.id})">
                <span class="button__text">Ver más!</span>
                <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)).join('');

  card.innerHTML = cardGame;
}

createCard();

const gameDetail = id => {
  localStorage.setItem("id",id);
  window.location.href = '../pages/gameDetails.html'
};
