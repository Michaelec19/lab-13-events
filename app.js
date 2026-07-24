const visorRotulo = document.getElementById('visorRotulo');
const visorNumero = document.getElementById('visorNumero');
const visorModulo = document.getElementById('visorModulo');
const btnLlamar = document.getElementById('btnLlamar');
const panelInput = document.getElementById('panelInput');
const conteoCifra = document.getElementById('conteoCifra');
const filaLista = document.getElementById('filaLista');
const mensajeVacio = document.getElementById('mensajeVacio');
let moduloActual = 1


let turnos = [
  { id: "A1", documento: "10203040" },
  { id: "B2", documento: "98765432" },
  { id: "C3", documento: "11223344" },
  { id: "A2", documento: "55667788" },
  { id: "D1", documento: "99887766" },
  { id: "B3", documento: "10020030" },
  { id: "E1", documento: "40050060" },
  { id: "A3", documento: "77889900" },
  { id: "C4", documento: "12312312" },
  { id: "F1", documento: "32132132" },
  { id: "B4", documento: "45645645" },
  { id: "D2", documento: "65465465" },
  { id: "A4", documento: "78978978" },
  { id: "G1", documento: "98798798" },
  { id: "E2", documento: "14725836" },
  { id: "C5", documento: "36925814" },
  { id: "H1", documento: "15935728" },
  { id: "B5", documento: "75395148" },
  { id: "A5", documento: "85245697" },
  { id: "D3", documento: "95175362" }
];


function actualizarPantalla(listaTurnos = turnos) {
    conteoCifra.textContent = listaTurnos.length;
    if (listaTurnos.length === 0) {
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
    }


    filaLista.innerHTML = '';
    listaTurnos.forEach(function(turnoActual) {
        const turnosPorDelante = turnos.indexOf(turnoActual);
        const li = document.createElement('li');
        li.textContent = `Turno: ${turnoActual.id} - Doc: ${turnoActual.documento} (Faltan: ${turnosPorDelante + 1} turnos)`;
        filaLista.appendChild(li);
    });
}

btnLlamar.addEventListener('click', function() {
    if (turnos.length > 0) {
        const turnoAtendido = turnos.shift(); 
        
        visorNumero.textContent = turnoAtendido.id;
        visorModulo.textContent = `Módulo ${moduloActual}`;
        moduloActual = moduloActual + 1;

        if (moduloActual > 6) {
            moduloActual = 1;
        }
        
        actualizarPantalla();
    } else {
        visorNumero.textContent = "— — —";
        visorModulo.textContent = "Esperando llamado";
        moduloActual = 1;
    }
});

panelInput.addEventListener('input', function() {
  const textoBuscado = panelInput.value.toLowerCase(); 
  const turnosFiltrados = turnos.filter(function(turno) {
    const idMinusculas = turno.id.toLowerCase();
    const docMinusculas = turno.documento.toLowerCase();
    return idMinusculas.includes(textoBuscado) || docMinusculas.includes(textoBuscado);
  });
  actualizarPantalla(turnosFiltrados);
});

actualizarPantalla();