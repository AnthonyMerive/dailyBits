let template = document.getElementById('template').content;
let items = document.getElementById('items');
let menu = document.getElementById('menu');
let comprobar = document.querySelector('.comprobar');
let fragment = document.createDocumentFragment();

let seleccion;
let control = [];
let porcentaje = 0;
let vida = 0;


document.addEventListener('DOMContentLoaded', inicio = () => {
    items.innerHTML = '';
    valoresIni();
})



const valoresIni = () => {
    if (localStorage.getItem('vidas') === null) {
        vida = 4;
        document.getElementById('vida').textContent = vida;
    } else {
        vida = localStorage.getItem('vidas');
        document.getElementById('vida').textContent = vida;
    }


    if (localStorage.getItem('comprobar') === null) {
        control = [];
    } else {
        control = localStorage.getItem('comprobar')
        control = JSON.parse(control);
    }

    idAleatorio();
}

const idAleatorio = () => {

    if (control.length == 0) {//si el objeto control no tiene nada
        //lanza un aleatorio del 1 al 3
        let id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        //cargalo en el local storage para llevar el control
        control.push(id);
        localStorage.setItem('comprobar', JSON.stringify(control));
        getData(id);
    } else if (control.length == 1) {//si el objeto control tiene cargado ya un numero
        //lanza un aleatorio cualquiera
        let id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        const omitir = control; //numero que debemos omitir para que no se repita almacenado en el array
        //repita mientras que el numero que me dio sea igual al numero que quiero omitir
        while (omitir == id) {
            id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        }
        control.push(id);
        console.log(control)
        porcentaje = 25;
        localStorage.setItem('comprobar', JSON.stringify(control));
        getData(id);
        progresion(porcentaje);
    } else if (control.length == 2) {
        let id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        const omitir = control;
        while (omitir[0] == id || omitir[1] == id) {
            id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        }
        control.push(id);
        console.log(control)
        porcentaje = 50;
        localStorage.setItem('comprobar', JSON.stringify(control));
        getData(id);
        progresion(porcentaje);
    } else if (control.length == 3) {
        location.reload();
        localStorage.clear();
    }
}

const getData = async (id) => {//enviamos el id resultante de cada caso
    let res = await fetch(`http://localhost:4000/pregunta${id}`)
    let preg = await res.json();
    pintarData(preg);
}

const pintarData = data => {
    items.innerHTML = '';

    data.forEach(preg => {
        const { image, pregunta, op1, op2, op3 } = preg;
        template.getElementById('image').setAttribute('src', image);
        template.getElementById('answer').textContent = pregunta;
        template.getElementById('option1').textContent = op1;
        template.getElementById('option2').textContent = op2;
        template.getElementById('option3').textContent = op3;
        fragment.appendChild(template);
    })
    items.appendChild(fragment);
    condicionales();
}

const condicionales = () => {

    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');
    let option3 = document.getElementById('option3');

    option1.addEventListener('click', (e) => {

        pintarBoton();

        if (option1.textContent == "main") {
            localStorage.setItem('respuesta', 'correcto');
        }else{
            localStorage.setItem('respuesta', 'incorrecto');
        }
        e.stopPropagation();
    })

    option2.addEventListener('click', (e) => {

        pintarBoton();

        if (option2.textContent == "<script>" || option2.textContent == "Don’t repeat yourself") {
            localStorage.setItem('respuesta', 'correcto');
        }else{
            localStorage.setItem('respuesta', 'incorrecto');
        }
        e.stopPropagation();
    })

    option3.addEventListener('click', (e) => {

        pintarBoton();
        localStorage.setItem('respuesta', 'incorrecto');
        e.stopPropagation();
    })

    respuesta()
}

const respuesta = () => {

    comprobar.addEventListener('click', (e) => {
        let res = localStorage.getItem('respuesta')
        
        if(res == 'incorrecto'){
            console.log('incorrecto')
            localStorage.removeItem('respuesta');
            vida--
            vidas(vida);
        }
        if (res === 'correcto') {
            console.log('correcto')
            localStorage.removeItem('respuesta');
            location.reload();
        }
        e.stopPropagation();
    })

}


const pintarBoton = () => {
    menu.querySelector('button').setAttribute('id', 'comprobarCambio');
}

const progresion = (porcentaje) => {
    document.getElementById('progresion').setAttribute('style', `width: ${porcentaje}%`)
}

const vidas = (vida) => {
    console.log(vida)
    if (vida <= 0) {
        console.log('Game Over')
        localStorage.clear();
        window.location.href = './home.html'
    } else {
        document.getElementById('vida').textContent = vida;
        localStorage.setItem('vidas', vida);
    }
}

