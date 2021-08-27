let template = document.getElementById('template').content;
let items = document.getElementById('items');
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
}