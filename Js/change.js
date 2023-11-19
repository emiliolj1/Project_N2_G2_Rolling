const changePassword = async() => {
  const email = document.getElementById('emailRecovery').value
  const password = document.getElementById('passwordRecovery').value
  const passwordNew = document.getElementById('passwordNew').value
  const passwordConfirm = document.getElementById('passwordConfirm').value

  const result = await fetch ('http://localhost:3000/users')
  const users = await result.json()

  const user = users.find(usuario => usuario.email === email && usuario.password === password)
  
  const id = user.id
  console.log(id)

  if (user){ 
    if (passwordNew === passwordConfirm) {
      fetch(`http://localhost:3000/users/${id}` , {
        method: 'PATCH',
        body: JSON.stringify({
          password: passwordNew
        }),
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }
      })
      alert('Cambiaste la Contraseña')
    } else {
      alert('las contraseñas no coinciden')
    }
  } else { 
    alert ('El usuario no existes')
  }
} 