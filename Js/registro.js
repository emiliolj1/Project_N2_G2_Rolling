const createUser = () => {
  const nombre = document.getElementById('nombre').value
  const email = document.getElementById('Email').value
  const password = document.getElementById('Password').value

  if (!nombre || !email || !password) {
    alert("Falta datos");
    return;
  }

  fetch('http://localhost:3000/users',{
    method: 'POST',
    body: JSON.stringify({
      nombre,
      email,
      password,
      role:'client'
    }),
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  }) .then(() => {
    window.location.href= 'index.html'
  })
} 

const loginUser = async () => {
  const nombre = document.getElementById('nombre').value
  const email = document.getElementById('emailLogin').value
  const password = document.getElementById('passwordlogin').value

  
  const result = await fetch ('http://localhost:3000/users')
  const users = await result.json()
  
  const user = users.find (usuario => usuario.email === email)
  
  if(!user){
    alert('Los datos no coinciden')
  }
  if(user.password === password){
    localStorage.setItem ('role', user.role)
    window.location.href = '../pages/registro.html'
    alert('Usuario logueado')
    window.location.href= 'index.html'
  } else {
    alert ('Faltan datos o son incorrectos')
  }  
}