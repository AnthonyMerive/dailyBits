let template = document.getElementById('template').content;
let estadisticas = document.getElementById('estadisticas');
let fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', ()=>{
    estadisticas.innerHTML = '';
    let correctas = localStorage.getItem('respCorrectas');
    let incorrectas = localStorage.getItem('respIncorrectas');
    let totales = localStorage.getItem('respTotales');

    template.getElementById('contestadas').textContent = totales;
    template.getElementById('correctas').textContent = correctas;
    template.getElementById('incorrectas').textContent = incorrectas;

    fragment.appendChild(template);

    estadisticas.appendChild(fragment);
})