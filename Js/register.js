const createUser = (event) => {
  event.preventDefault();
  const name = document.getElementById('nombre').value
  const email = document.getElementById('Email').value
  const password = document.getElementById('Password').value

  if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
    alert("Por favor complete todos los campos");
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
  const myModal = new bootstrap.Modal(document.getElementById('ModalFuncional'),{});
  myModal.show()
  
} ;
document.getElementById('registerForm').addEventListener('submit', createUser)


// function enviarMail () {
//   const name = document.getElementById('nombre').value
//   const email = document.getElementById('Email').value
//   Email.send({
//     Host : "smtp.elasticemail.com",
//     Username : "m.belenmartinez99@gmail.com",
//     Password : "C4E9AF0F126E01CCDFD664844C6CFC2CB03C",
//     To : 'mbmartinez3099@gmail.com',
//     From : `m.belenmartinez99@gmail.com`,
//     Subject : "Se crearon una cuenta",
//     Body : `${name} se creo una cuenta en InfinityGames`
//   }).then(message => alert(message));
// }
