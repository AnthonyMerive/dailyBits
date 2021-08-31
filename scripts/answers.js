let templateSel = document.getElementById('templateSel').content;
let templateSelImg = document.getElementById('templateSelImg').content;
let templateGood = document.getElementById('good').content;
let templateBad = document.getElementById('bad').content;
let templateFinish = document.getElementById('finish').content;
let templateAgotado = document.getElementById('agotado').content;

let items = document.getElementById('items');
let footer = document.getElementById('footer');
let comprobar = document.querySelector('.comprobar');
let fragment = document.createDocumentFragment();

let seleccion;
let control = [];
let porcentaje = 0;
let vida = localStorage.getItem('vidas');
let correctas = localStorage.getItem('respCorrectas');
let incorrectas = localStorage.getItem('respIncorrectas');
let totales = localStorage.getItem('respTotales');

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

    if (control.length == 0) {

        let id = parseInt((Math.random() * (4 - 1 + 1)) + 1);
        control.push(id);
        localStorage.setItem('comprobar', JSON.stringify(control));
        localStorage.setItem('respTotales', parseInt(totales));
        getData(id);

    } else if (control.length == 1) {

        let n = 0;
        let id = localStorage.getItem('comprobar');
        id = JSON.parse(id);

        do { n = parseInt((Math.random() * (4 - 1 + 1)) + 1); }

        while (control[0] == n);

        control.push(n);
        porcentaje = 25;
        localStorage.setItem('comprobar', JSON.stringify(control));
        localStorage.setItem('respTotales', parseInt(totales));
        getData(n);
        progresion(porcentaje);

    } else if (control.length == 2) {

        let n = 0;
        let id = localStorage.getItem('comprobar');
        id = JSON.parse(id);

        do { n = parseInt((Math.random() * (4 - 1 + 1)) + 1); }

        while (control[0] == n || control[1] == n);

        control.push(n);
        console.log(control)
        porcentaje = 50;
        localStorage.setItem('comprobar', JSON.stringify(control));
        localStorage.setItem('respTotales', parseInt(totales));
        getData(n);
        progresion(porcentaje);

    } else if (control.length == 3) {

        let n = 0;
        let id = localStorage.getItem('comprobar');
        id = JSON.parse(id);

        do { n = parseInt((Math.random() * (4 - 1 + 1)) + 1); }

        while (control[0] == n || control[1] == n || control[2] == n);

        control.push(n);
        porcentaje = 75;
        localStorage.setItem('comprobar', JSON.stringify(control));
        localStorage.setItem('respTotales', parseInt(totales));
        getData(n);
        progresion(porcentaje);

    } else if (control.length == 4) {
        porcentaje = 100;
        progresion(porcentaje);
        pintarFin();

    }



}
const getData = async (id) => {
    let res = await fetch(`http://localhost:4000/pregunta${id}`)
    let preg = await res.json();

    if (id > 0 && id <= 3) {
        pintarDataSel(preg);
    }else if (id == 4){
        pintarDataSelImg(preg);
    }
}

const pintarDataSel = data => {
    items.innerHTML = '';

    data.forEach(preg => {
        const { image, pregunta, op1, op2, op3, respuesta } = preg;
        templateSel.getElementById('image').setAttribute('src', image);
        templateSel.getElementById('answer').textContent = pregunta;
        templateSel.getElementById('option1').textContent = op1;
        templateSel.getElementById('option2').textContent = op2;
        templateSel.getElementById('option3').textContent = op3;
        localStorage.setItem('good', respuesta);
        fragment.appendChild(templateSel);
    })
    items.appendChild(fragment);
    condicionalSel();
}

const pintarDataSelImg = data =>{
    items.innerHTML = '';
    
    data.forEach(preg =>{
        const {pregunta, imageOp1, imageOp2, imageOp3, imageOp4, op1, op2, op3, op4, respuesta} = preg;
        templateSelImg.getElementById('answer').textContent = pregunta;
        templateSelImg.getElementById('imgop1').setAttribute('src', imageOp1);
        templateSelImg.getElementById('imgop2').setAttribute('src', imageOp2);
        templateSelImg.getElementById('imgop3').setAttribute('src', imageOp3);
        templateSelImg.getElementById('imgop4').setAttribute('src', imageOp4);
        templateSelImg.getElementById('resp1').textContent = op1;
        templateSelImg.getElementById('resp2').textContent = op2;
        templateSelImg.getElementById('resp3').textContent = op3;
        templateSelImg.getElementById('resp4').textContent = op4;
        localStorage.setItem('good', respuesta);
        fragment.appendChild(templateSelImg);
    })
    items.appendChild(fragment);
    condicionalSelImg();
}

const pintarFin = () => {
    items.innerHTML = '';
    fragment.appendChild(templateFinish);
    items.appendChild(fragment);

    let boton = document.querySelector('.comprobar');
    boton.setAttribute('id', 'finish');
    boton.textContent = 'VOLVER'

    boton.addEventListener('click', () =>{
        localStorage.setItem('comprobar', JSON.stringify([]));
        vida = 4;
        localStorage.setItem('vidas', vida);
        location.href="./home.html"
    })

}

const pintarAgotado = () =>{
    items.innerHTML = '';
    fragment.appendChild(templateAgotado);
    items.appendChild(fragment);

    let boton = document.querySelector('.comprobar');
    boton.setAttribute('id', 'bad');
    boton.textContent = 'VOLVER'
    document.getElementById('vida').textContent = 0;
    boton.addEventListener('click', () =>{
        localStorage.setItem('comprobar', JSON.stringify([]));
        vida = 4;
        localStorage.setItem('vidas', vida);
        location.href="./home.html"
    })
}

const condicionalSel = () => {

    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');
    let option3 = document.getElementById('option3');
    let correct = localStorage.getItem('good');

    option1.addEventListener('click', (e) => {

        pintarBoton();

        if (option1.textContent == correct) {
            localStorage.setItem('respuesta', 'correcto');
        } else {
            localStorage.setItem('respuesta', 'incorrecto');
            option1.setAttribute('class', 'a temp');
        }
        e.stopPropagation();
    })

    option2.addEventListener('click', (e) => {

        pintarBoton();

        if (option2.textContent == correct) {
            localStorage.setItem('respuesta', 'correcto');
        } else {
            localStorage.setItem('respuesta', 'incorrecto');
            option2.setAttribute('class', 'a temp');
        }
        e.stopPropagation();
    })

    option3.addEventListener('click', (e) => {

        pintarBoton();

        if (option3.textContent == correct) {
            localStorage.setItem('respuesta', 'correcto');
        } else {
            localStorage.setItem('respuesta', 'incorrecto');
            option3.setAttribute('class', 'a temp');
        }
        e.stopPropagation();
    })

    respuestaSel()
}

const condicionalSelImg = () =>{
    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');
    let option3 = document.getElementById('option3');
    let option4 = document.getElementById('option4');

    let res1 = document.getElementById('resp1');
    let res2 = document.getElementById('resp2');
    let res3 = document.getElementById('resp3');
    let res4 = document.getElementById('resp4');

    let correct = localStorage.getItem('good');

    option1.addEventListener('click', (e) => {

        pintarBoton();

        if (res1.textContent == correct) {
            localStorage.setItem('respuesta', 'correcto');
        } else {
            localStorage.setItem('respuesta', 'incorrecto');
            option1.setAttribute('class', 'b temp');
        }
        e.stopPropagation();
    })

    option2.addEventListener('click', (e) => {

        pintarBoton();

        if (res2.textContent == correct) {
            localStorage.setItem('respuesta', 'correcto');
        } else {
            localStorage.setItem('respuesta', 'incorrecto');
            option2.setAttribute('class', 'b temp');
        }
        e.stopPropagation();
    })

    option3.addEventListener('click', (e) => {

        pintarBoton();

        if (res3.textContent == correct) {
            localStorage.setItem('respuesta', 'correcto');
        } else {
            localStorage.setItem('respuesta', 'incorrecto');
            option3.setAttribute('class', 'b temp');
        }
        e.stopPropagation();
    })

    option4.addEventListener('click', (e) => {

        pintarBoton();

        if (res4.textContent == correct) {
            localStorage.setItem('respuesta', 'correcto');
        } else {
            localStorage.setItem('respuesta', 'incorrecto');
            option4.setAttribute('class', 'b temp');
        }
        e.stopPropagation();
    })

    respuestaSelImg();
}

const respuestaSel = () => {

    comprobar.addEventListener('click', (e) => {
        totales++
        localStorage.setItem('respTotales',parseInt(totales))
        let res = localStorage.getItem('respuesta')

        if (res == 'incorrecto') {
            localStorage.removeItem('respuesta');
            vida--
            vidas(vida);
            incorrectoSel();
        }
        if (res === 'correcto') {
            localStorage.removeItem('respuesta');
            correcto();
        }
        e.stopPropagation();
    })

}

const respuestaSelImg = () => {
    totales++
    localStorage.setItem('respTotales',parseInt(totales))
    comprobar.addEventListener('click', (e) => {
        let res = localStorage.getItem('respuesta')

        if (res == 'incorrecto') {
            localStorage.removeItem('respuesta');
            vida--
            vidas(vida);
            incorrectoSelImg();
        }
        if (res === 'correcto') {
            localStorage.removeItem('respuesta');
            correcto();
        }
        e.stopPropagation();
    })

}

const correcto = () => {
    console.log('correcto')
    footer.setAttribute('class', 'messageGood');
    footer.innerHTML = '';
    fragment.appendChild(templateGood);
    footer.appendChild(fragment);
    correctas++
    localStorage.setItem('respCorrectas', parseInt(correctas));
    let continuar = document.getElementById('continue');
    continuar.addEventListener('click', () => {
        location.reload();
    })

}

const incorrectoSel = () => {
    let r = localStorage.getItem('good')
    let pinta = document.querySelector('.temp');
    pinta.setAttribute('class', 'a incorrect');
    console.log(`la respuesta es ${r}`)
    footer.setAttribute('class', 'messageBad');
    footer.innerHTML = '';
    templateBad.querySelector('span').textContent = r;
    fragment.appendChild(templateBad);
    footer.appendChild(fragment);
    incorrectas++
    localStorage.setItem('respIncorrectas', parseInt(incorrectas));
    let continuar = document.getElementById('inContinue');
    continuar.addEventListener('click', () => {
        location.reload();
    })
}

const incorrectoSelImg = () => {
    let r = localStorage.getItem('good')
    let pinta = document.querySelector('.temp');
    pinta.setAttribute('class', 'b incorrecto');
    console.log(`la respuesta es ${r}`)
    footer.setAttribute('class', 'messageBad');
    footer.innerHTML = '';
    templateBad.querySelector('span').textContent = r;
    fragment.appendChild(templateBad);
    footer.appendChild(fragment);
    incorrectas++
    localStorage.setItem('respIncorrectas', parseInt(incorrectas));
    let continuar = document.getElementById('inContinue');
    continuar.addEventListener('click', () => {
        location.reload();
    })
}

const pintarBoton = () => {
    footer.querySelector('button').setAttribute('id', 'comprobarCambio');
}

const progresion = (porcentaje) => {
    document.getElementById('progresion').setAttribute('style', `width: ${porcentaje}%`)
}

const vidas = (vida) => {
    if (vida <= 0) {
        console.log('Game Over')
        pintarAgotado();
    } else {
        document.getElementById('vida').textContent = vida;
        localStorage.setItem('vidas', vida);
    }
}