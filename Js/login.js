const loginUser = async () => {
  const name = document.getElementById('nombre').value
  const email = document.getElementById('emailLogin').value
  const password = document.getElementById('passwordlogin').value

  
  const result = await fetch ('http://localhost:3000/users')
  const users = await result.json()
  
  const user = users.find (usuario => usuario.email === email)
  
  if(!user){
    alert('Los datos no coinciden')
  }
  if(user.password === password && user.name === name){
    localStorage.setItem ('role', user.role)
    window.location.href = '../index.html'
    alert('Usuario logueado')
  } else {
    alert ('los datos son incorrectos')
  }  
}
