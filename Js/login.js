const loginUser = async (event) => {
  event.preventDefault(); // Prevenimos que el submit haga un refresco de la página

  // Traemos los values de los inputs
  const name = document.getElementById('nombre').value;
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordlogin').value;

  // Traemos los datos de la DB y hacemos el find del email ingresado
  const result = await fetch('http://localhost:3000/users');
  const users = await result.json();

  const user = users.find(usuario => usuario.email === email);

  // Primero chequeamos que el email ingreado exista en la DB:
  if(user === undefined){
    alert('El email ingresado no existe en nuestra base de datos')
    return //Si no existe, arrojamos error y retornamos nada para detener la funcion
  }

  // Si el email existe, validamos que la contraseñá y el username sean correctos:
  if(user.password !== password || user.name !== name){
    alert('Nombre de usuario o contraseña incorrectos')
    return //Si alguno de los 2 datos no estan ok, arrojamos error y retornamos nada para detener la funcion.
  }

  // Si todo está ok, continuamos con el resto
  localStorage.setItem('role', user.role)

  // Por ultimo validamos el rol del usuario, si es cliente, disparamos modal de cliente, si es admin, disparamos modal de admin:
  if(user.role === 'admin'){
    const myModal = new bootstrap.Modal(document.getElementById('Modaladmin'), {});
    myModal.show()
  } else {
    const myModal = new bootstrap.Modal(document.getElementById('ModalFuncional'), {});
    myModal.show()
  }
};

document.getElementById('loginForm').addEventListener('submit', loginUser)
