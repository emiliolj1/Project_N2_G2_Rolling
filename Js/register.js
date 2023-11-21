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


function enviarMail () {
  const name = document.getElementById('nombre').value
  const email = document.getElementById('Email').value
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "m.belenmartinez99@gmail.com",
    Password : "A226829DD57847DFE1A09F6BB5BDA50EDADF",
    To : 'm.belenmartinez99@gmail.com',
    From : "m.belenmartinez99@gmail.com",
    Subject : `¡Crearon una nueva cuenta!`,
    Body : `${name} se registro a Infinity Games con el email: ${email}`
  }).then();
}
