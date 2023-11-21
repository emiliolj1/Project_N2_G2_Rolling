function enviarMail() {
  const name = document.getElementById('nombre').value
  const email = document.getElementById('email').value
  const mensaje = document.getElementById('mensaje').value

  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "m.belenmartinez99@gmail.com",
    Password : "A226829DD57847DFE1A09F6BB5BDA50EDADF",
    To : 'm.belenmartinez99@gmail.com',
    From : "m.belenmartinez99@gmail.com",
    Subject : `¡${name} a enviado una consulta!`,
    Body : `A traves del mail: ${email}, nos envìa el siguiente mensaje: ${mensaje}`
  }).then(); 
  const myModal = new bootstrap.Modal(document.getElementById('ModalFuncional'), {});
    myModal.show()
}