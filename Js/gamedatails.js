const gameInfo = async () => {
  const id = localStorage.getItem('id');
  const result = await fetch(`http://localhost:3000/games/${id}`);
  const info = await result.json();
  console.log(info);
  return info;
};


const gameDetails = async () => {
  const game = await gameInfo();
  const card = document.getElementById('details');
  const gamecard = generateGameCard(game);
  card.innerHTML = gamecard;
};

const generateGameCard = (game) => {
  return `
  <div class="container">
//   <div class="container text-center">
//   <h1 class="text-light ms-4">${game.title}</h1>
//     <!-- Img -->
//     <div class="row">
//       <div class="col-sm-8">
//         <img src="${game.image}" alt="" width="558px" height="333px" class="img img-fluid">
//       </div>
//       <!--Card-->
//       <div class="col-4 text-light mb-2">
//         <div class="card" style="width: 13rem;">
//         <img src="${game.coverPage}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title text-light">${game.title}</h5>
//           <p class="card-text m-3 p-2">${game.category}</p>
//         </div>
//       </div>
//     </div>
//     </div>
//     <!-- Detalles -->
//     <div class="row">
//       <div class="col-md-8 text-light img">
//         <p class="pt-3 pb-1">${game.description}</p>
//         <a href="../pages/page404.html" class="btn btn-primary">Comprarlo Ya!</a>
//       </div>
//       <div class="col-md-4 text-light img">
//         <h6>
//           RECOMENDADO:
//         </h6>
//         <ul>
//           <li>
//             Procesador: Intel Core i5 9400f a 3,2 GHz (4 CPU)/AMD X8 FX-8350 a 4 GHz (8 CPU).
//           </li>
//           <li>
//            Memoria: 16 GB de RAM
//           </li>
//           <li>
//             Gráficos: NVIDIA GTX 1650 4 GB/AMD Rx590 4 GB.
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
  `;
};

gameDetails();