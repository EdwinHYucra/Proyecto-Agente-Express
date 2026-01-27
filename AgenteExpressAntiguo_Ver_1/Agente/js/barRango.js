// Variables DOM
const rangoOperConfig = document.getElementById("barRango");
const lblValorRango = document.getElementById("valorRango");

const inputMinimo = document.getElementById("inputMinimo");
const inputMaximo = document.getElementById("inputMaximo");
const inputMontoComision = document.getElementById("inputMontoComision");

const btnEstablecerMin = document.getElementById("btnEstablecerMin");
const btnEstablecerMax = document.getElementById("btnEstablecerMax");
const btnAgregarRango = document.getElementById("btnAgregarRango");

const cardContainer = document.getElementById("configCardContainer");

let configuracionesExistentes = [];

// Slider
function actualizarPosicionValor() {
    const min = rangoOperConfig.min;
    const max = rangoOperConfig.max;
    const val = rangoOperConfig.value;
    const porcentaje = ((val - min) / (max - min)) * 100;
    lblValorRango.style.left = `calc(${porcentaje}% - 10px)`;
    lblValorRango.textContent = val;
}

function resetSlider() {
    rangoOperConfig.value = 0;
    actualizarPosicionValor();
}

rangoOperConfig.addEventListener("input", actualizarPosicionValor);

// Validar solapamiento
function validarSolapamiento(nuevoMin, nuevoMax) {
    return configuracionesExistentes.some(conf => {
        const min = parseFloat(conf.MontoMinimo);
        const max = parseFloat(conf.MontoMaximo);
        return (
            (nuevoMin >= min && nuevoMin <= max) ||
            (nuevoMax >= min && nuevoMax <= max) ||
            (min >= nuevoMin && min <= nuevoMax) ||
            (max >= nuevoMin && max <= nuevoMax)
        );
    });
}

// Mostrar configuraciones existentes
function mostrarCardsConfiguracion(configs) {
    cardContainer.innerHTML = "";
    configs.forEach(conf => {
        const card = document.createElement("div");
        card.classList.add("card", "mt-3");
        card.innerHTML = `
            <div class="card-header bg-primary text-white d-flex justify-content-between">
                Rango
                <button class="btn btn-sm btn-danger" onclick="eliminarConfiguracion(${conf.Id})">Eliminar</button>
            </div>
            <div class="card-body">
                <p><strong>🔹 Monto Mínimo:</strong> S/. ${conf.MontoMinimo}</p>
                <p><strong>🔹 Monto Máximo:</strong> S/. ${(parseFloat(conf.MontoMaximo) + 0.01).toFixed(2)}</p>
                <p><strong>💰 Comisión:</strong> S/. ${conf.MontoFijo}</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function eliminarConfiguracion(id) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción desactivará esta configuración de comisión.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("action", "eliminar");
            formData.append("configId", id);

            fetch("php/controllers/ComisionesController.php", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    Swal.fire("Eliminado", data.message, "success");
                    cargarConfiguracionesDesdeAPI();
                } else {
                    Swal.fire("Error", data.message || "No se pudo eliminar", "error");
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire("Error", "No se pudo conectar al servidor", "error");
            });
        }
    });
}

// Cargar desde API
function cargarConfiguracionesDesdeAPI() {
    obtenerAfiliadoIdDesdeSesion().then(afiliadoId => {
        fetch(`php/controllers/ComisionesController.php?action=listar&afiliadoId=${afiliadoId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    configuracionesExistentes = data.data;
                    mostrarCardsConfiguracion(configuracionesExistentes);
                } else {
                    Swal.fire("Error", data.message, "error");
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire("Error", "Error de red al obtener configuraciones", "error");
            });
    });
}

// Eventos botones
btnEstablecerMin.addEventListener("click", () => {
    if (btnEstablecerMin.textContent === "Establecer") {
        const nuevoMin = parseInt(rangoOperConfig.value);

        if (validarSolapamiento(nuevoMin, nuevoMin)) {
            Swal.fire("Error", "Este valor mínimo ya está dentro de un rango existente.", "error");
            return;
        }

        inputMinimo.value = nuevoMin;
        inputMinimo.readOnly = true;
        btnEstablecerMin.textContent = "Editar";
        inputMaximo.disabled = false;
        btnEstablecerMax.disabled = false;
        resetSlider();
    } else {
        inputMinimo.value = "";
        btnEstablecerMin.textContent = "Establecer";
        inputMaximo.value = "";
        inputMaximo.disabled = true;
        btnEstablecerMax.disabled = true;
        btnAgregarRango.disabled = true;
    }
});

btnEstablecerMax.addEventListener("click", () => {
    if (btnEstablecerMax.textContent === "Establecer") {
        const minimo = parseInt(inputMinimo.value);
        const maximo = parseInt(rangoOperConfig.value);

        if (maximo <= minimo) {
            Swal.fire("Error", "El valor máximo debe ser mayor que el mínimo.", "error");
            return;
        }

        if (validarSolapamiento(minimo, maximo)) {
            Swal.fire("Error", "El rango seleccionado se solapa con una configuración existente.", "error");
            return;
        }

        inputMaximo.value = maximo;
        inputMaximo.readOnly = true;
        btnEstablecerMax.textContent = "Editar";
        btnAgregarRango.disabled = false;
        inputMontoComision.disabled = false;
        inputMontoComision.readOnly = false;
    } else {
        inputMaximo.value = "";
        btnEstablecerMax.textContent = "Establecer";
        btnAgregarRango.disabled = true;
        inputMontoComision.value = "";
        inputMontoComision.disabled = true;
        inputMontoComision.readOnly = true;
        resetSlider();
    }
});

btnAgregarRango.addEventListener("click", () => {
    const minimo = inputMinimo.value;
    const maximo = inputMaximo.value;
    const comision = inputMontoComision.value;

    if (!minimo || !maximo || !comision) {
        Swal.fire("Error", "⚠ Todos los campos son obligatorios.", "error");
        return;
    }

    const formData = new FormData();
    formData.append("action", "insertar");
    formData.append("montoMinimo", minimo);
    formData.append("montoMaximo", parseFloat(maximo) - 0.01);
    formData.append("montoFijo", comision);
    formData.append("fechaInicio", new Date().toISOString().split('T')[0]);

    fetch("php/controllers/ComisionesController.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            Swal.fire("¡Guardado!", data.message, "success");

            inputMinimo.value = "";
            inputMaximo.value = "";
            inputMontoComision.value = "";
            inputMinimo.readOnly = false;
            inputMaximo.readOnly = false;
            inputMaximo.disabled = true;
            inputMontoComision.disabled = true;
            inputMontoComision.readOnly = true;
            btnEstablecerMin.textContent = "Establecer";
            btnEstablecerMax.textContent = "Establecer";
            btnAgregarRango.disabled = true;

            resetSlider();
            cargarConfiguracionesDesdeAPI();
        } else {
            Swal.fire("Error", data.message || "Algo salió mal", "error");
        }
    })
    .catch(err => {
        Swal.fire("Error", "No se pudo conectar al servidor", "error");
        console.error(err);
    });
});

// Iniciar
actualizarPosicionValor();
document.addEventListener("DOMContentLoaded", cargarConfiguracionesDesdeAPI);
