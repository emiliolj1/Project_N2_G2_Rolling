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

const gameDetail = id => {
  localStorage.setItem("id",id);
  window.location.href = '../pages/gameDetails.html'
};

const createContainer = async () => {
  const juegos = await getGames();
  const container = document.getElementById('outStandingGame');
  const destacado = juegos.find(juego => juego.outstanding === true);
  console.log(destacado);
  const containerGame = (`
    <div class="container outStadingContainer d-flex align-items-center justify-content-center mb-4">
      <div class="containerBody">
        <div class="row">
          <div class="col-12 col-md-12 col-sm-12 col-lg-8 d-block pt-3 px-4 pb-3">
            <img src="${destacado.coverPage}" alt="${destacado.title}" class="coverPage img-fluid rounded-3">
          </div>
          <div class="col-12 col-md-12 col-sm-12 col-lg-4 p-3">
            <div class="text-center text-light my-3">
              <h3>Disponible!</h3>
            </div>
            <div class="text-light text-center">
              <h2 class="fw-bold py-4">${destacado.title}</h2>
              <p class="p-2">${destacado.description}</p>
              <a class="text-decoration-none">
                <button type="button" class="btn btn-secondary" onclick="gameDetail(${destacado.id})">Ver Mas!</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)
  container.innerHTML = containerGame;
}

createCard();
createContainer();