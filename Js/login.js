const loginUser = async () => {
  
  const name = document.getElementById('nombre').value
  const email = document.getElementById('emailLogin').value
  const password = document.getElementById('passwordlogin').value

  
  const result = await fetch ('http://localhost:3000/users')
  const users = await result.json()
  
  const user = users.find (usuario => usuario.email === email)
  
  if(!user){
    alert('Por favor complete todos los campos')
  } else if (user.password === password && user.name === name) {
    localStorage.setItem('role', user.role);

    if (user.role === 'admin') {
      const myModalAdmin = new bootstrap.Modal(document.getElementById('ModalAdmin'), {
        backdrop: true,
        keyboard: true,
        focus: true
      });
    } else {
      const myModalFuncional = new bootstrap.Modal(document.getElementById('ModalFuncional'), {
        backdrop: true,
        keyboard: true,
        focus: true
      });
      myModalFuncional.show();
    }
  } else {
    alert('Los datos son incorrectos');
  }
  
  
  // if(user.password === password && user.name === name){
  //   localStorage.setItem ('role', user.role)
  //   const myModal = new bootstrap.Modal(document.getElementById('ModalFuncional'), {})
  //   myModal.show()
  // } else {
  //   alert ('los datos son incorrectos')
  // } 
  
  // const roleuser = localStorage.getItem(role)
  // if (roleuser === 'admin'){
  //   const myModal = new bootstrap.Modal(document.getElementById('Modaladmin'), {})
  //   myModal.show()
  // }
};

