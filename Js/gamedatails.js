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
          <div class="col-12 text-light mx-4">
            <p><strong>Categoria: </strong>${game.category}</p>
            <h6 class="fw-bold fs-3">Recomendado:</h6>
            <ul>
              <li>Procesador: Intel Core i5 9400f a 3,2 GHz (4 CPU)/AMD X8 FX-8350 a 4 GHz (8 CPU).</li>
              <li>Memoria: 16 GB de RAM</li>
              <li>Gráficos: NVIDIA GTX 1650 4 GB/AMD Rx590 4 GB.</li>
            </ul>
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