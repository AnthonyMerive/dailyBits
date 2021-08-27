let template = document.getElementById('template').content;
let items = document.getElementById('items');
let menu = document.getElementById('menu');
let fragment = document.createDocumentFragment();

//aleatoriedad entre 1 y 3
let id = Math.floor((Math.random() * (3 - 1 + 1)) + 1);

document.addEventListener('DOMContentLoaded',async ()=>{
    let resp = await fetch(`http://localhost:4000/pregunta${id}`)
    let data = await resp.json();
    pintarData(data);
})

const pintarData = data =>{
    items.innerHTML ='';
    console.log(data);
    data.forEach(preg =>{
        const{image,pregunta,op1,op2,op3} = preg;
        template.getElementById('image').setAttribute('src', image);
        template.getElementById('answer').textContent = pregunta;
        template.getElementById('option1').textContent = op1;
        template.getElementById('option2').textContent = op2;
        template.getElementById('option3').textContent = op3;
        fragment.appendChild(template);
    })
    items.appendChild(fragment);

    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');
    let option3 = document.getElementById('option3');

    option1.addEventListener('click', () => {
        cambiarColorBoton();
    })

    option2.addEventListener('click', () => {
        cambiarColorBoton();
    })

    option3.addEventListener('click', () => {
        cambiarColorBoton();
    })

    function cambiarColorBoton(){
        menu.querySelector('button').setAttribute('id', 'comprobarCambio');
    }
}