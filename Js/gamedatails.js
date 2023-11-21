const gameInfo = async () => {
  const id = localStorage.getItem('id');
  const result = await fetch(`http://localhost:3000/games/${id}`);
  const info = await result.json();
  return info;
};


const gameDetails = async () => {
  const game = await gameInfo();
  const card = document.getElementById('details');
  const gamecard = (`
    <div class="titleGame text-light text-center">
      <h5>${game.title}</h5>
    </div>
    <div class="container outStadingContainer d-flex align-items-center justify-content-center">
      <div class="containerBody">
        <div class="row">
          <div class="col-12 col-md-12 col-sm-12 col-lg-8 d-block p-4">
            <img src="${game.coverPage}" alt="${game.title}" class="coverPage img-fluid my-auto">
          </div>
          <div class="col-12 col-md-12 col-sm-12 col-lg-4 p-3">
            <div class="container text-center">
              <img src="${game.image}" alt="${game.title}" class="img-fluid">
            </div>
            <div class="text-light text-center"> <!-- Añadí la clase text-center para centrar el texto -->
              <h2 class="fw-bold py-4">${game.title}</h2>
              <p>${game.description}</p>
              <a href="../pages/page404.html" class="text-decoration-none">
                <button type="button" class="btn btn-secondary">Compralo ya!</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
  `)

  card.innerHTML = gamecard;
};

gameDetails();