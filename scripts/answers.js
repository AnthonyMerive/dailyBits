let template = document.getElementById('template').content;
let items = document.getElementById('items');
let menu = document.getElementById('menu');
let fragment = document.createDocumentFragment();

let seleccion = false;
let control = [];

if (localStorage.getItem('comprobar') === null) {
    control = [];
} else {
    control = localStorage.getItem('comprobar')
    control = JSON.parse(control);
}

document.addEventListener('DOMContentLoaded', () => {
    idAleatorio();
})

const idAleatorio = () => {
    if (control.length == 0) {//si el objeto control no tiene nada
        //lanza un aleatorio del 1 al 3
        let id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        //cargalo en el local storage para llevar el control
        control.push(id);
        console.log(control)
        localStorage.setItem('comprobar', JSON.stringify(control));
        getData(id);
    } else if (control.length == 1) {//si el objeto control tiene cargado ya un numero
        //lanza un aleatorio cualquiera
        let id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        const omitir = control; //numero que debemos omitir para que no se repita almacenado en el array
        //repita mientras que el numero que me dio sea igual al numero que quiero omitir
        while(omitir == id){
        id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        }
        control.push(id);
        console.log(control)
        localStorage.setItem('comprobar', JSON.stringify(control));
        getData(id);
    }else if(control.length ==2){
        let id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        const omitir = control; 
        while(omitir[0] == id || omitir[1] == id){
        id = parseInt((Math.random() * (3 - 1 + 1)) + 1);
        }
        control.push(id);
        console.log(control)
        localStorage.setItem('comprobar', JSON.stringify(control));
        getData(id);
    }
}

const getData = async (id) => {
    let res = await fetch(`http://localhost:4000/pregunta${id}`)
    let preg = await res.json();
    pintarData(preg);
}

const pintarData = data => {
    items.innerHTML = '';
    console.log(data);
    data.forEach(preg => {
        const { image, pregunta, op1, op2, op3, id } = preg;
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
        e.stopPropagation();
        if (option1.textContent == "main") {
            respuestaCorrecta();
            seleccion = true;
        } else {
            respuestaIncorrecta();
        }
    })

    option2.addEventListener('click', (e) => {
        e.stopPropagation();
        if (option2.textContent == "<script>" || option2.textContent == "Don’t repeat yourself") {
            respuestaCorrecta();
            seleccion = true;
        } else {
            respuestaIncorrecta();
        }
    })

    option3.addEventListener('click', (e) => {
        e.stopPropagation();
        respuestaIncorrecta();
    })

}

const respuestaIncorrecta = () => {
    menu.querySelector('button').setAttribute('id', 'comprobarCambio');
    let comprobar = document.getElementById('comprobarCambio');

    comprobar.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('incorrecta');
    })

}

const respuestaCorrecta = () => {

    menu.querySelector('button').setAttribute('id', 'comprobarCambio');
    let comprobar = document.getElementById('comprobarCambio');

    comprobar.addEventListener('click', (e) => {
        e.stopPropagation();
        if (seleccion == true) {
            // console.log(control);
            console.log('correcto')
            location.reload();
        } else {
            console.log('incorrecto')

        }

    })

}


