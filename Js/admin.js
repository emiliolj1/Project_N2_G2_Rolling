const tablaJuegosBody = document.getElementById('tablaJuegosBody');
let games; // Definir la variable games en un ámbito accesible globalmente

const getGames = async () => {
  try {
    const response = await fetch('http://localhost:3000/games');
    games = await response.json(); // Almacenar los juegos en la variable games
    console.log(games);

    updateTable(); // Llamar a la función para actualizar la tabla
  } catch (error) {
    console.log('Error al obtener los juegos:', error);
  }
};

const updateTable = () => {
  const juegos = games.map(juego => (
    `<tr>
      <th>${juego.id}</th>
      <th>${juego.title}</th>
      <th>${juego.category}</th>
      <th>${juego.description}</th>
      <td class="text-center align-middle">
        <input class="m-0" type="checkbox" ${juego.published ? 'checked' : ''} onclick="togglePublished(${juego.id})">
      </td>
      <th class="text-center align-middle">
      <span class="bi ${juego.id === juegoDestacadoId ? 'bi-star-fill' : 'bi-star'}" onclick="toggleOutstanding(${juego.id})"></span>
      <span class="bi bi-pencil-square" onclick="toggleEditGame(${juego.id})"></span>
      <span class="bi bi-trash" onclick="toggleDeleteGame(${juego.id})"></span>
        
      </th>
    </tr>`
  )).join('');

  tablaJuegosBody.innerHTML = juegos;
};

//PUBLISHED
async function togglePublished(gameId) {
  // Encontrar juego por id
  const juego = games.find(juego => juego.id === gameId);
  // Cambiar el estado
  juego.published = !juego.published;

  // PATCH del estado de Publicado
  try {
    const response = await fetch(`http://localhost:3000/games/${gameId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ published: juego.published }),
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar el estado del juego en el servidor.');
    }

    // Actualizar la tabla
    updateTable();
  } catch (error) {
    console.error('Error al actualizar el estado del juego:', error);
  }
}
getGames();


//OUTSTANDING
async function updateGame(juego) {
  try {
    const response = await fetch(`http://localhost:3000/games/${juego.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ outstanding: juego.outstanding }),
    });

    if (!response.ok) {
      console.log('No se pudo actualizar el estado en el servidor.');
    }
    // Actualizar la tabla
    await getGames();
  } catch (error) {
    console.error('Error al actualizar el estado en el servidor:', error);
  }
}

let juegoDestacadoId;
toggleOutstanding = async (gameId) =>{
  const juego = games.find(juego => juego.id === gameId);

  if (juegoDestacadoId !== gameId && juego) {
    // Desactiva el destacado en el juego actualmente destacado
    const juegoDestacado = games.find(juego => juego.id === juegoDestacadoId);
    if (juegoDestacado) {
      juegoDestacado.outstanding = false;
      await updateGame(juegoDestacado);
    }

    // Activa el destacado en el juego actual
    juego.outstanding = true;
    await updateGame(juego);
    // Actualiza el juego destacado
    juegoDestacadoId = gameId;
    // Actualiza la tabla con los datos actualizados desde el servidor
    updateTable();
    console.log(juegoDestacado)
  };
  }


//Escuchar el click del Botón "Agregar juego"
document.getElementById('addNewGame').addEventListener('click', function () {
})

//Escuchar el click del Botón "Guardar juego"
document.getElementById('saveNewGame').addEventListener('click', async function () {
  try {
    // Guardar el valor de los input en variables
    const newGameName = document.getElementById('newGameName').value;
    const newGameCategory = Array.from(document.getElementById('newGameCategory').selectedOptions).map(option => option.value);
    const newGameDescription = document.getElementById('newGameDescription').value;
    const newGameId = document.getElementById('newGameId').value;

    // Crear el nuevo juego con los datos
    const newGame = {
      title: newGameName,
      category: newGameCategory,
      description: newGameDescription,
      id: newGameId
    };

    // Hacer el POST del nuevo juego a la Base de Datos
    const response = await fetch('http://localhost:3000/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGame),
    });

    if (!response.ok) {
      console.log('No se pudo agregar el juego a la base de datos.');
    }

    alert(`Nuevo juego creado: ${newGameName}`);

    const agregarJuegoModal = new bootstrap.Modal(document.getElementById('agregarJuegoModal'));
    agregarJuegoModal.hide();

    // Actualizar la tabla después de agregar el juego
    await updateTable();
  } catch (error) {
    console.error('Error al crear el juego:', error);
  }
});



