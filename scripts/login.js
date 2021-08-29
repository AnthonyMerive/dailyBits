let URL = 'http://localhost:4000/user';

document.addEventListener('submit', async (e) => {
    e.preventDefault();
    let correo = document.getElementById('correo').value;

    let resp = await fetch(URL)
    let data = await resp.json();
    let buscar = data.find(data => data.usuario.toLowerCase() === correo.toLowerCase());

    if (buscar == undefined) {

        alert('El usuario no esta registrado');

        } else {
            alert('entrada')
    }
})