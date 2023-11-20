// const changePassword = async() => {
//   const email = document.getElementById('emailRecovery').value
//   const passwordNew = document.getElementById('passwordNew').value
//   const passwordConfirm = document.getElementById('passwordConfirm').value

//   const result = await fetch ('')
//   const users = await result.json()

//   const user = users.find(usuario => usuario.email === email)
  
//   const id = user.id
//   console.log(id)

//   if (user){ 
//     if (passwordNew === passwordConfirm) {
//       fetch(`` , {
//         method: 'PATCH',
//         body: JSON.stringify({
//           password: passwordNew
//         }),
//         headers: {
//           'content-type': 'application/json; charset=UTF-8'
//         }
//       })
//       alert('Cambiaste la Contraseña')
//       const myModal = new bootstrap.Modal(document.getElementById('ModalFuncional'), {});
//       myModal.show()
//     } else {
//       alert('las contraseñas no coinciden')
//     }
//   } else { 
//     alert ('El usuario no existes')
//   }
// } 

// document.getElementById('changPassword2').addEventListener('submit', changePassword)


const validarContraseña = async () => {
  const email = document.getElementById('emailRecovery').value
  const name = document.getElementById('name').value

  const result = await fetch ('http://localhost:3000/users')
  const users = await result.json()

  const user = users.find(usuario => usuario.email === email && usuario.name === name) 

  if(user.email === email || user.name === name){
    const myModal = new bootstrap.Modal(document.getElementById('ModalCambio'), {});
    myModal.show()
  } else{
    alert('el email no coinciden con el nombre')
  }
}

document.getElementById('changPassword2').addEventListener('submit', validarContraseña)