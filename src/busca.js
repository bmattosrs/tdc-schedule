var termo = document.getElementById('termo')
const containerResultados = document.getElementById('results');
let palestras

(function() {
    fetch('./src/palestras.json')
    .then(response => response.json())
    .then(data => {
        palestras = data;
    })
    .catch(error => console.error('Erro ao carregar o arquivo de palestras. ', error))
})();

termo.addEventListener('input', busca);
termo.addEventListener('keyup', limpaResultados);


function busca(){
        const palestrasEncontradas = palestras.filter(palestra => palestra.titulo.toLowerCase().includes(termo.value.toLowerCase()) || palestra.palestrante.toLowerCase().includes(termo.value.toLowerCase()));
        console.log(palestrasEncontradas)
        exibirResultados(palestrasEncontradas);
}

function exibirResultados(resultados){
    containerResultados.innerHTML = '';

    if(resultados.length === 0){
        containerResultados.innerHTML = '<p>Nenhum resultado encontrado</p>';
    }

    resultados.forEach(resultado => {
        const div = document.createElement('div');

        div.innerHTML = `<h4>${resultado.titulo} - ${resultado.palestrante}</h4><p>Dia: ${resultado.dia} - Horário: ${resultado.horario} - Local: ${resultado.local}</p>`;
        containerResultados.appendChild(div);
    });
}

function limpaResultados() {
    if (termo.value.length === 0) {
        containerResultados.innerHTML = '';
    }
}