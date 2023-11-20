function enviarMail() {
  const name = document.getElementById('nombre').value
  const email = document.getElementById('email').value
  const mensaje = document.getElementById('mensaje').value

  Email.send({
    SecureToken: "A226829DD57847DFE1A09F6BB5BDA50EDADF",
    To : "m.belenmartinez99@gmail.com",
    From : `${email}`,
    Subject : "¡Gracias por contactarnos!",
    Body : `Hola ${name} ! Gracias por contactarte con InfinityGames. Tu consulta:" ${mensaje} " se registró con exito en nuestro sistema. A la brevedad uno de nuestros agentes se pondrá en contacto contigo.`
  }).then(message => alert(message));
}