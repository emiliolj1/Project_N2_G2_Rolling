const validarContraseña = async (event) => {
  event.preventDefault()
  const email = document.getElementById('emailRecovery').value
  const name = document.getElementById('name').value

  const result = await fetch ('http://localhost:3000/users')
  const users = await result.json()

  const user = users.find(usuario => usuario.email === email && usuario.name === name) 
  console.log(user);
  if (user) {
    if(user.email === email && user.name === name){
      const myModal = new bootstrap.Modal(document.getElementById('ModalCambio'), {});
      myModal.show()
    }
  } else{
    const myModal = new bootstrap.Modal(document.getElementById('ModalError'), {});
    myModal.show()
  }
}

document.getElementById('changPassword2').addEventListener('submit', validarContraseña)