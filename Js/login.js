const loginUser = async () => {
  
  const name = document.getElementById('nombre').value
  const email = document.getElementById('emailLogin').value
  const password = document.getElementById('passwordlogin').value

  
  const result = await fetch ('http://localhost:3000/users')
  const users = await result.json()
  
  const user = users.find (usuario => usuario.email === email)
  
  if(!user){
    alert('Por favor complete todos los campos')
  }
  if(user.password === password && user.name === name){
    localStorage.setItem ('role', user.role)
    const myModal = new bootstrap.Modal(document.getElementById('ModalFuncional'), {})
    myModal.show()
  } else {
    alert ('los datos son incorrectos')
  }  
}

