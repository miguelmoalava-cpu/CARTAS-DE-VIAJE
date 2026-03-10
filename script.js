const calendario = document.getElementById("calendario");

const inicio = new Date(2026, 2, 23); // 19 de febrero 2026
inicio.setHours(0,0,0,0);

const hoy = new Date();
hoy.setHours(0,0,0,0);

const meses = [
  { nombre: "Febrero", mes: 1, anio: 2026 },
  { nombre: "Marzo", mes: 2, anio: 2026 },
  { nombre: "Abril", mes: 3, anio: 2026 },
  { nombre: "Mayo", mes: 4, anio: 2026 }
];

const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];

function abrirCarta(indice) {
  
  const modal = document.createElement("div");
  modal.className = "modal";

  const carta = document.createElement("div");
  carta.className = "carta";

  const texto = document.createElement("div");
 texto.innerHTML = (cartas[indice - 1] || "💌 Carta pendiente")
  .replace(/\n/g, "<br>");

  const boton = document.createElement("button");
  boton.textContent = "Cerrar";

  boton.onclick = () => {
    localStorage.setItem("carta_" + indice, "abierta");
    modal.remove();
  };

  carta.appendChild(texto);
  carta.appendChild(boton);
  modal.appendChild(carta);
  document.body.appendChild(modal);
}

meses.forEach(m => {
  const contenedorMes = document.createElement("div");
  contenedorMes.className = "mes";

  const titulo = document.createElement("h2");
  titulo.textContent = m.nombre;

  const semana = document.createElement("div");
  semana.className = "semana";

  diasSemana.forEach(d => {
    const el = document.createElement("div");
    el.textContent = d;
    semana.appendChild(el);
  });

  const grid = document.createElement("div");
  grid.className = "grid";

  const primerDia = new Date(m.anio, m.mes, 1);
  let offset = primerDia.getDay();
  offset = offset === 0 ? 6 : offset - 1;

  for (let i = 0; i < offset; i++) {
    const vacio = document.createElement("div");
    vacio.className = "vacio";
    grid.appendChild(vacio);
  }

  const diasMes = new Date(m.anio, m.mes + 1, 0).getDate();

  for (let d = 1; d <= diasMes; d++) {
    const fecha = new Date(m.anio, m.mes, d);
    fecha.setHours(0,0,0,0);

    const box = document.createElement("div");
    box.className = "dia";
    box.textContent = d;

    const indice = Math.floor((fecha - inicio) / 86400000) + 1;

    if (fecha > hoy) {
      box.classList.add("futuro");
    } else {
      box.classList.add("pasado");
      if (fecha.getTime() === hoy.getTime()) {
        box.classList.add("hoy");
      }

      if (indice > 0 && indice <= cartas.length) {
        box.onclick = () => abrirCarta(indice);
      }
    }

    grid.appendChild(box);
  }

  contenedorMes.append(titulo, semana, grid);
  calendario.appendChild(contenedorMes);
});
