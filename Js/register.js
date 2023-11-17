const createUser = () => {
  const name = document.getElementById('nombre').value
  const email = document.getElementById('Email').value
  const password = document.getElementById('Password').value

  if (!name || !email || !password) {
    alert("Faltan datos");
    return;
  }

  fetch('http://localhost:3000/users',{
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
      role:'client'
    }),
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  })
  const myModal = new bootstrap.Modal(document.getElementById('ModalFuncional'), {})
    myModal.show()
} 
