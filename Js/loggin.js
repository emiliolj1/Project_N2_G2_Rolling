const loginUser = async () => {
  const name = document.getElementById('nombre').value
  const email = document.getElementById('emailLogin').value
  const password = document.getElementById('passwordlogin').value

  
  const result = await fetch ('http://localhost:3000/users')
  const users = await result.json()
  
  const user = users.find (users => users.email === email)
  
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

//&& user.nombre === nombre && user.password === password
//no puede checkear la similitud entre los datos, saltara directamente al primer alert
//no registra usuarios, necesario ver.