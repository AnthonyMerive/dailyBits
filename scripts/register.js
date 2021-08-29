let URL = 'http://localhost:4000/user';

document.addEventListener('submit', async (e) => {
    e.preventDefault();
    let correo = document.getElementById('correo').value;

    let resp = await fetch(URL)
    let data = await resp.json();
    let buscar = data.find(data => data.usuario.toLowerCase() === correo.toLowerCase());

    if (buscar == undefined) {

        let resp = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                usuario: correo,
                avance: [],
                correctas: 0,
                incorrectas: 0,
                total: 0
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        alert('usuario creado satisfactoriamente');
        
     } else {

        alert('Este correo ya esta siendo usado')
    }
})