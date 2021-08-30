let template = document.getElementById('template').content;
let perfil = document.getElementById('perfil');
let cerrar = document.getElementById('cerrar');
let fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', ()=>{
    perfil.innerHTML = '';
    let correo = localStorage.getItem('usuario');

    template.getElementById('correo').textContent = correo;

    fragment.appendChild(template);

    perfil.appendChild(fragment);
})

document.addEventListener('click', async () =>{
    let correo = localStorage.getItem('usuario');
    let respCorrectas = parseInt(localStorage.getItem('respCorrectas'));
    let respTotales = parseInt(localStorage.getItem('respTotales'));
    let respIncorrectas = parseInt(localStorage.getItem('respIncorrectas'));
    let vida = parseInt(localStorage.getItem('vidas'));
    let control = JSON.parse(localStorage.getItem('comprobar'));

    let resp = await fetch('http://localhost:4000/user')
    let data = await resp.json();
    let buscar = data.find(data => data.usuario.toLowerCase() === correo.toLowerCase());
    
    resp = await fetch(`http://localhost:4000/user/${buscar.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            usuario: correo,
            avance: control,
            correctas: respCorrectas,
            incorrectas: respIncorrectas,
            total: respTotales,
            vidas: vida
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    localStorage.clear();
    location.href="./logo.html"


})