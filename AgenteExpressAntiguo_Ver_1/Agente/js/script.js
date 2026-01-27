// js/script.js
import { divsOperaciones } from './Operaciones.js';


// Opcion uno para dinamismo en la fecha
document.addEventListener("DOMContentLoaded", function () {
  function updateDateTime() {
    const dateTimeElement = document.getElementById('Date');
    const now = new Date();

    // Formatear la fecha
    const options = { year: 'numeric', month: '2-digit', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDateTime = now.toLocaleDateString('es-ES', options);

    // Actualizar el contenido del párrafo
    dateTimeElement.innerHTML = formattedDateTime;
  };

  // Actualizar la fecha y hora cada segundo
  setInterval(updateDateTime, 1000);

  updateDateTime();

});


const btnInicio = document.getElementById('btnInicio');
const btnCashOut = document.getElementById('btn-Operacion-CashOut');
const btnCashIn = document.getElementById('btn-Operacion-CashIn');
const btnCashOutM = document.getElementById('btn-Operacion-CashOutM');
const btnCashInM = document.getElementById('btn-Operacion-CashInM');


/*const btnRecargas = document.getElementById('btnRecargas');*/
/*const btnPDigital = document.getElementById('btnPDigital');*/
const btnFuncOperativas = document.getElementById('btnFuncOperativas');
const btnResumenOperacion = document.getElementById('btnResumenOperacion');
const btnConfiguracion = document.getElementById('btnConfiguracion');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const btnCerrarSesionL = document.getElementById('btnCerrarSesionL');


const DivViewInicio = document.getElementById('ViewInicio');
const DivViewIndicaciones = document.getElementById('ViewIndicaciones');
const DivViewOperaciones = document.getElementById('ViewOperaciones');
const DivViewRecargas = document.getElementById('ViewRecargas');
const DivViewIProductosDigitales = document.getElementById('ViewIProductosDigitales');
const DivViewFuncionesOperativas = document.getElementById('ViewFuncionesOperativas');
const DivViewHistoralOperaciones = document.getElementById('ViewResumenOperaciones');
const DivViewConfiguracion = document.getElementById('ViewConfiguracion');


// Evento en el Realizar Operacion
const btnReOperacion = document.getElementById('listOption');
const OptionTypeOperation = document.getElementById('div-options');

/*btnReOperacion.addEventListener('click', function () {

    var estado = btnReOperacion.className;

    OptionTypeOperation.classList.toggle('OperTypeEnabled')
    OptionTypeOperation.classList.toggle('OperTypeDisabled')

    DivViewInicio.style.display = "none";
    DivViewIndicaciones.style.display = "block";
    DivViewOperaciones.style.display = "none";
    DivViewRecargas.style.display = "none";
    DivViewIProductosDigitales.style.display = "none";
    DivViewFuncionesOperativas.style.display = "none";
    DivViewHistoralOperaciones.style.display = "none";
    DivViewConfiguracion.style.display = "none";


});*/

/*btnInicio.addEventListener('click', function () {

  DivViewInicio.style.display = "block";
  DivViewIndicaciones.style.display = "none";
  DivViewOperaciones.style.display = "none";
  DivViewRecargas.style.display = "none";
  DivViewIProductosDigitales.style.display = "none";
  DivViewFuncionesOperativas.style.display = "none";
  DivViewHistoralOperaciones.style.display = "none";
  DivViewConfiguracion.style.display = "none";

})*/

btnCashInM.addEventListener('click',  async () => {

  divsOperaciones("divRetiro");
  const esUsuarioValido = await verificarUsuarioDemo();

  if (!esUsuarioValido) {
    Swal.fire({
      title: "Acceso Restringido",
      text: "Esta es una versión de prueba. Para obtener acceso completo, afíliate a Agente Express SAC. contactate a nuestro Call Center (054) 654209 o al WhastApp: 900680170",
      icon: "info",
      confirmButtonText: "Más Información",
      showCancelButton: true,
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "https://wa.link/dadbp6"; // Cambia esto por tu enlace real
      }
    });
    return
  }

  // Define los porcentajes deseados para el ancho y la altura
  const widthPercentage = 74; // Porcentaje del ancho de la pantalla
  const heightPercentage = 62.5; // Porcentaje de la altura de la pantalla

  // Calcula el ancho y la altura en píxeles
  const width = screen.width * (widthPercentage / 100);
  const height = screen.height * (heightPercentage / 100);

  // Define las posiciones para colocar la ventana a la derecha
  const left = screen.width - width; // A la derecha de la pantalla
  const top = 200; // 400px desde la parte superior
  const bottom = screen.height - height - 400; // 40px desde el fondo

  // Asegurar que la ventana no salga de la pantalla en la parte inferior
  const adjustedHeight = screen.height - top - 40;
  const finalHeight = Math.min(height, adjustedHeight);

  // Define las características de la ventana
  const features = `width=${width},height=${finalHeight},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;

  // Abre la nueva ventana

  // Abrir la nueva ventana
  const newWindow = window.open('https://bcpzonasegura.viabcp.com/', '_blank', features);

  // Verificar si la ventana se abrió correctamente
  if (newWindow) {
    newWindow.focus();
  } else {
    alert('La ventana emergente fue bloqueada por el navegador.');
  }
})
btnCashIn.addEventListener('click',  async () => {

    divsOperaciones("divRetiro");
  const esUsuarioValido = await verificarUsuarioDemo();

  if (!esUsuarioValido) {
    Swal.fire({
      title: "Acceso Restringido",
      text: "Esta es una versión de prueba. Para obtener acceso completo, afíliate a Agente Express SAC. contactate a nuestro Call Center (054) 654209 o al WhastApp: 900680170",
      icon: "info",
      confirmButtonText: "Más Información",
      showCancelButton: true,
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "https://wa.link/dadbp6"; // Cambia esto por tu enlace real
      }
    });
    return
  }
    

  // Define los porcentajes deseados para el ancho y la altura
  const widthPercentage = 74; // Porcentaje del ancho de la pantalla
  const heightPercentage = 62.5; // Porcentaje de la altura de la pantalla

  // Calcula el ancho y la altura en píxeles
  const width = screen.width * (widthPercentage / 100);
  const height = screen.height * (heightPercentage / 100);

  // Define las posiciones para colocar la ventana a la derecha
  const left = screen.width - width; // A la derecha de la pantalla
  const top = 200; // 400px desde la parte superior
  const bottom = screen.height - height - 400; // 40px desde el fondo

  // Asegurar que la ventana no salga de la pantalla en la parte inferior
  const adjustedHeight = screen.height - top - 40;
  const finalHeight = Math.min(height, adjustedHeight);

  // Define las características de la ventana
  const features = `width=${width},height=${finalHeight},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;

  // Abre la nueva ventana

  // Abrir la nueva ventana
  const newWindow = window.open('https://micuenta.izipay.pe/seguridad/login/', '_blank', features);

  // Verificar si la ventana se abrió correctamente
  if (newWindow) {
    newWindow.focus();
  } else {
    alert('La ventana emergente fue bloqueada por el navegador.');
  }
})

btnCerrarSesion.addEventListener('click', function () {
  fetch('/Agente/php/logout.php', { // Ruta correcta a logout.php
    method: 'POST',
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '../../login.html'; // Ruta correcta a login.html
      } else {
        alert('Error al cerrar sesión.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

btnCerrarSesionL.addEventListener('click', function () {
  fetch('/Agente/php/logout.php', { // Ruta correcta a logout.php
    method: 'POST',
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '../../login.html'; // Ruta correcta a login.html
      } else {
        alert('Error al cerrar sesión.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});




// Principal

fetch('https://www.agenteexpress.com/Agente/php/consultacomisiones.php?action=ranking_global')  // Aquí pones la URL del archivo PHP y la acción
  .then(response => response.json())  // Convierte la respuesta JSON a un objeto JavaScript
  .then(data => {
    if (data.status === 'success') {

      //console.log(data);  // Revisa el contenido que estás recibiendo


      // Extraer las etiquetas y los valores del ranking
      const labels = data.rankings.map(item => item.tipo_oper);  // Nombres de las operaciones
      const values = data.rankings.map(item => item.total_operaciones);  // Cantidad de operaciones

      // Configurar y crear el gráfico
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'pie',  // Tipo de gráfico: pastel
        data: {
          labels: labels,  // Las etiquetas (tipos de operaciones)
          datasets: [{
            label: '# de Operaciones',
            data: values,  // Los valores (cantidad de operaciones)
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Tipo de Operaciones',
              font: {
                size: 20
              }
            }
          }
        }
      });
    } else {
      NotificacionAlerta('Error', 'Error al obtener los datos:', data.message);
    }
  })
  .catch(error => {
    //console.log(data);
    NotificacionAlerta('error', 'Error en la solicitud:', error);
  });

fetch('https://www.agenteexpress.com/Agente/php/consultacomisiones.php?action=evolutivo_comisiones')  // Asegúrate de usar la URL correcta
  .then(response => response.json())  // Convierte la respuesta en un objeto JSON
  .then(data => {
    if (data.status === 'success') {
      // Extraer las etiquetas (Año y Mes) y los valores (Comisión Total)
      const labels = data.evolutivoComisiones.map(item => item.Anio + '-' + item.Mes);  // Año-Mes
      const values = data.evolutivoComisiones.map(item => item.TotalComision);  // Comisiones Totales

      // Configurar y crear el gráfico de barras
      const bar = document.getElementById('mybar').getContext('2d');
      const mybar = new Chart(bar, {
        type: 'bar',  // Tipo de gráfico: barras
        data: {
          labels: labels,  // Las etiquetas (Año-Mes)
          datasets: [{
            label: 'Comisiones Totales',
            data: values,  // Los valores (Comisiones Totales)
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Evolutivo de Comisiones',
              font: {
                size: 20
              }
            }
          }
        }
      });
    } else {
      NotificacionAlerta('error', 'Error al obtener los datos:', data.message);
    }
  })
  .catch(error => {
    NotificacionAlerta('error', 'Error en la solicitud:', error);
  });

btnCashOutM.addEventListener('click', async () => {

divsOperaciones("divPagoServi");
  const esUsuarioValido = await verificarUsuarioDemo();

  if (!esUsuarioValido) {
    Swal.fire({
      title: "Acceso Restringido",
      text: "Esta es una versión de prueba. Para obtener acceso completo, afíliate a Agente Express SAC. contactate a nuestro Call Center (054) 654209 o al WhastApp: 900680170",
      icon: "info",
      confirmButtonText: "Más Información",
      showCancelButton: true,
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "https://wa.link/dadbp6"; // Cambia esto por tu enlace real
      }
    });
    return
  }


  // Define los porcentajes deseados para el ancho y la altura
  const widthPercentage = 74; // Porcentaje del ancho de la pantalla
  const heightPercentage = 62.5; // Porcentaje de la altura de la pantalla

  // Calcula el ancho y la altura en píxeles
  const width = screen.width * (widthPercentage / 100);
  const height = screen.height * (heightPercentage / 100);

  // Define las posiciones para colocar la ventana a la derecha
  const left = screen.width - width; // A la derecha de la pantalla
  const top = 200; // 400px desde la parte superior
  const bottom = screen.height - height - 400; // 40px desde el fondo

  // Asegurar que la ventana no salga de la pantalla en la parte inferior
  const adjustedHeight = screen.height - top - 40;
  const finalHeight = Math.min(height, adjustedHeight);

  // Define las características de la ventana
  const features = `width=${width},height=${finalHeight},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;

  // Abre la nueva ventana

  // Abrir la nueva ventana
  const newWindow = window.open('https://bcpzonasegura.viabcp.com/', '_blank', features);

  // Verificar si la ventana se abrió correctamente
  if (newWindow) {
    newWindow.focus();
  } else {
    NotificacionAlerta('error', 'La ventana emergente fue bloqueada por el navegador.');
  }
});
btnCashOut.addEventListener('click', async () => {

divsOperaciones("divPagoServi");

  const esUsuarioValido = await verificarUsuarioDemo();

  if (!esUsuarioValido) {
    Swal.fire({
      title: "Acceso Restringido",
      text: "Esta es una versión de prueba. Para obtener acceso completo, afíliate a Agente Express SAC. contactate a nuestro Call Center (054) 654209 o al WhastApp: 900680170",
      icon: "info",
      confirmButtonText: "Más Información",
      showCancelButton: true,
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "https://wa.link/dadbp6"; // Cambia esto por tu enlace real
      }
    });
    return
  }

  // Define los porcentajes deseados para el ancho y la altura
  const widthPercentage = 74; // Porcentaje del ancho de la pantalla
  const heightPercentage = 62.5; // Porcentaje de la altura de la pantalla

  // Calcula el ancho y la altura en píxeles
  const width = screen.width * (widthPercentage / 100);
  const height = screen.height * (heightPercentage / 100);

  // Define las posiciones para colocar la ventana a la derecha
  const left = screen.width - width; // A la derecha de la pantalla
  const top = 200; // 400px desde la parte superior
  const bottom = screen.height - height - 400; // 40px desde el fondo

  // Asegurar que la ventana no salga de la pantalla en la parte inferior
  const adjustedHeight = screen.height - top - 40;
  const finalHeight = Math.min(height, adjustedHeight);

  // Define las características de la ventana
  const features = `width=${width},height=${finalHeight},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;

  // Abre la nueva ventana

  // Abrir la nueva ventana
  const newWindow = window.open('https://bcpzonasegura.viabcp.com/', '_blank', features);

  // Verificar si la ventana se abrió correctamente
  if (newWindow) {
    newWindow.focus();
  } else {
    NotificacionAlerta('error', 'La ventana emergente fue bloqueada por el navegador.');
  }
});

btnResumenOperacion.addEventListener('click', () => {
  /*DivViewInicio.style.display = "none";
  DivViewIndicaciones.style.display = "none";
  DivViewOperaciones.style.display = "none";
  DivViewRecargas.style.display = "none";
  DivViewIProductosDigitales.style.display = "none";
  DivViewFuncionesOperativas.style.display = "none";
  DivViewHistoralOperaciones.style.display = "block";
  DivViewConfiguracion.style.display = "none";*/
})

btnConfiguracion.addEventListener('click', () => {
  /*DivViewInicio.style.display = "none";
  DivViewIndicaciones.style.display = "none";
  DivViewOperaciones.style.display = "none";
  DivViewRecargas.style.display = "none";
  DivViewIProductosDigitales.style.display = "none";
  DivViewFuncionesOperativas.style.display = "none";
  DivViewHistoralOperaciones.style.display = "none";
  DivViewConfiguracion.style.display = "block";*/
})


async function verificarUsuarioDemo() {
  try {
    const response = await fetch('https://www.agenteexpress.com/Agente/php/retornarUsuario.php');
    const usuario = await response.text(); // Obtiene el texto de la respuesta

    console.log("Usuario obtenido:", usuario); // Para depuración

    if (usuario.trim() === 'CGDT-DEMO') {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return false; // En caso de error, tratamos como demo por seguridad
  }
}
