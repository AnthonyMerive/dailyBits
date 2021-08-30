let URL = 'http://localhost:4000/user';
localStorage.clear();
document.addEventListener('submit', async (e) => {
    e.preventDefault();
    let correo = document.getElementById('correo').value;

    let resp = await fetch(URL)
    let data = await resp.json();
    let buscar = data.find(data => data.usuario.toLowerCase() === correo.toLowerCase());

    if (buscar == undefined) {

        alert('El usuario no esta registrado');
        location.href='./register.html'

        } else {
            localStorage.setItem('comprobar', JSON.stringify(buscar.avance))
            localStorage.setItem('respCorrectas', buscar.correctas)
            localStorage.setItem('respIncorrectas',buscar.incorrectas)
            localStorage.setItem('respTotales',buscar.total)
            localStorage.setItem('usuario',buscar.usuario)
            localStorage.setItem('vidas',buscar.vidas)
            location.href='./home.html'
    }
})