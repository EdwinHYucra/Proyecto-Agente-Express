let paginaActual = 1;
const filasPorPagina = 3;

document.getElementById("filtroId").addEventListener("input", () => {
  paginaActual = 1;
  renderTabla();
});

function renderTabla() {
  const body = document.getElementById("tablaBody");
  body.innerHTML = "";

  const filtro = document.getElementById("filtroId").value.toLowerCase();
  const filtrados = planes.filter(p => p.id.toString().includes(filtro));

  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const visibles = filtrados.slice(inicio, fin);

  visibles.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.plataforma}</td>
      <td contenteditable onblur="editarPlan(${p.id}, 'plan', this.innerText)">${p.plan}</td>
      <td contenteditable onblur="editarPlan(${p.id}, 'precio', this.innerText)">${p.precio}</td>
      <td contenteditable onblur="editarPlan(${p.id}, 'perfiles', this.innerText)">${p.perfiles}</td>
      <td><button onclick="eliminar(${p.id})">🗑️</button></td>
    `;
    body.appendChild(fila);
  });

  renderPaginacion(filtrados.length);
}

function renderPaginacion(total) {
  const contenedor = document.getElementById("paginacion");
  contenedor.innerHTML = "";

  const totalPaginas = Math.ceil(total / filasPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = i === paginaActual ? "activo" : "";
    btn.onclick = () => {
      paginaActual = i;
      renderTabla();
    };
    contenedor.appendChild(btn);
  }
}

function editarPlan(id, campo, valor) {
  const index = planes.findIndex(p => p.id === id);
  if (index !== -1) {
    planes[index][campo] = campo === 'precio' || campo === 'perfiles' ? parseFloat(valor) : valor;
  }
}

function eliminar(id) {
  const index = planes.findIndex(p => p.id === id);
  if (index !== -1) {
    planes.splice(index, 1);
    renderTabla();
  }
}

function exportarCSV() {
  const encabezado = "ID,Plataforma,Plan,Precio,Perfiles\n";
  const filas = planes.map(p => `${p.id},${p.plataforma},${p.plan},${p.precio},${p.perfiles}`).join("\n");
  const blob = new Blob([encabezado + filas], { type: "text/csv" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "planes.csv";
  link.click();
}

document.addEventListener("DOMContentLoaded", renderTabla);
