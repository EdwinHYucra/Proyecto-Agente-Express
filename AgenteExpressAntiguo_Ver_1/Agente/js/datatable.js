let dataTable;
let dataTableIsInitialized = false;
let dataTable2;
let dataTableIsInitialized2 = false;

const dataTableOptions = {
  //scrollX: "2000px",
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4] },
    { orderable: false, targets: [3, 4] },
    { searchable: false, targets: [1] }
  ],
  pageLength: 4,
  responsive: true,
  destroy: true,
  language: {
    lengthMenu: "_MENU_ Mostrar registros por página",
    zeroRecords: "Ningún usuario encontrado",
    info: "Mostrando de _START_ a _END_ de _TOTAL_ registros",
    infoEmpty: "Ningún usuario encontrado",
    infoFiltered: "(filtrados desde _MAX_ registros totales)",
    search: "Buscar:",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior"

    }
  }
};

const initDataTable = async () => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }

  await listUsers();

  dataTable = $("#datatable_cajas").DataTable(dataTableOptions);

  dataTableIsInitialized = true;
};

const initDataTableOperaciones = async () => {
  {
    if
      (dataTableIsInitialized2) {
      dataTable2.destroy();
    }
    await listarOperacion();

    dataTable2 = $("#datatable_Operaciones").DataTable(dataTableOptions);

    dataTableIsInitialized2 = true;
  }
};

const listUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    let content = ``;
    users.forEach((user, index) => {
      content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                      <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                      <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>`;
    });
    tableBody_cajas.innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

const listarOperacion = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    let content = ``;
    users.forEach((user, index) => {
      content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td><i class="fa-solid fa-check" style="color: green;"></i></td>
                    <td>
                        <button class="btn btn-sm"><i class="fa-solid fa-print" style="color: #005199;"></i></button>
                    </td>
                </tr>`;
    });
    tableBody_Operaciones.innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

window.addEventListener("load", async () => {
  await initDataTable();
  await initDataTableOperaciones();
});