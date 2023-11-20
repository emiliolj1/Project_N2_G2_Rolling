const tablaJuegosBody = document.getElementById('tablaJuegosBody');
let games;

const getGames = async () => {
  try {
    const response = await fetch('http://localhost:3000/games');
    games = await response.json(); // Almacenar juegos en la variable games
    console.log(games);

    updateTable(); // Llamar a la función para actualizar la tabla
  } catch (error) {
    console.log('Error al obtener los juegos:', error);
  }
};

const updateTable = () => {
  const juegos = games.map(juego => (
    // Filas de los juegos con información dinámica traida de la base datos
    `<tr>
      <th class="text-center">${juego.id}</th>
      <th>${juego.title}</th>
      <th>${juego.category}</th>
      <th class="description">${juego.description}</th>
      <td class="text-center align-middle">
        <input class="m-0" type="checkbox" ${juego.published ? 'checked' : ''} onclick="togglePublished(${juego.id})">
      </td>
      <th class="text-center align-middle acciones">
      <span class="bi ${juego.outstanding === true ? 'bi-star-fill' : 'bi-star'} destacado" onclick="toggleOutstanding(${juego.id})"></span>
        <i class="bi bi-pencil-square" onclick="openEditModal(${juego.id})"></i>
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

let juegoDestacadoId;
toggleOutstanding = async (gameId) => {
  const juego = games.find(juego => juego.id === gameId);
  const idJuego = juego.id;
  if (idJuego) {
      juego.outstanding = !juego.outstanding

    }
  try {
    const response = await fetch(`http://localhost:3000/games/${idJuego}`, {
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
const juegoDestacado = games.find(juego => juego.outstanding === true);
if (juegoDestacado && juegoDestacadoId !== gameId) {
  juegoDestacado.outstanding = false;
  await updateGame(juegoDestacado);
}

  // Actualiza la tabla con los datos actualizados desde el la base de datos
  // updateTable();
};


//EDIT GAME
let gameId;

function openEditModal(gameId) {
  // Obtener el juego por su ID
  const juego = games.find(juego => juego.id === gameId);

  // Llenar los campos del formulario en el modal con los datos actuales del juego
  document.getElementById('editGameTitle').value = juego.title;
  document.getElementById('editGameCategory').value = juego.category;
  document.getElementById('editGameDescription').value = juego.description;

  // Guardar el ID del juego en el botón de "Guardar Cambios"
  const saveChangesButton = document.getElementById('saveChangesButton');
  saveChangesButton.setAttribute('data-game-id', gameId);

  // Mostrar el modal
  const editModal = new bootstrap.Modal(document.getElementById('editModal'));
  editModal.show();
}

let editModal;
// Escuchar el evento de clic en el botón Guardar Cambios
saveChangesButton.addEventListener('click', async () => {
  // Obtener el gameId desde el atributo del botón de guardar cambios
  const gameIdToSave = saveChangesButton.getAttribute('data-game-id');
  // Obtener los nuevos valores desde los input del formulario en el modal
  const newTitle = document.getElementById('editGameTitle').value;
  const newCategory = document.getElementById('editGameCategory').value;
  const newDescription = document.getElementById('editGameDescription').value;
  // PUT para actualizar los datos del juego en la base de datos
  try {
    const response = await fetch(`http://localhost:3000/games/${gameIdToSave}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
        category: newCategory,
        description: newDescription,
        published: true,
        outstanding: false,
      }),
    });

    if (!response.ok) {
      console.log('No se pudo actualizar el juego en el servidor.');
    }

    // Actualizar la tabla con los datos actualizados desde la base de datos
    updateTable();
  } catch (error) {
    console.error('Error al actualizar el juego:', error);
  } finally {
    // Cerrar modal
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.hide();
    await getGames();
  }
});


// DELETE
toggleDeleteGame = async (gameId) => {
  // Obtener el juego por su ID (puedes utilizar tu propia función para obtener el juego)
  const juego = games.find(juego => juego.id === gameId);

  try {
    // DELETE para eliminar el juego de la base de datos
    const response = await fetch(`http://localhost:3000/games/${gameId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      console.log('No se pudo eliminar el juego de la base de datos.');
    }

    // Actualizar la tabla con los datos actualizados desde la base de datos
    updateTable();
  } catch (error) {
    console.error('Error al eliminar el juego:', error);
  }finally { // Cerrar modal
    const editModal = document.getElementById('editModal');
    editModal.setAttribute('aria-hidden', 'true');
    await getGames();
  }
}



//AGREGAR JUEGO
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
      id: newGameId,
      published: false,
      outstanding: false,
      image: 'La imagen de este juego no se encuentra disponible',
      coverPage: 'la portada de este juego no se encuentra disponible'
    };

    // POST del nuevo juego a la base de datos
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
  }finally{
    const editModal = document.getElementById('editModal');
    editModal.setAttribute('aria-hidden', 'true');
    await getGames();
  }
});



