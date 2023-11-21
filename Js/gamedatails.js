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
  const gamecard = (`
    
  `)

  card.innerHTML = gamecard;
};

gameDetails();