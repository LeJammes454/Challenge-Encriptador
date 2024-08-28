let botonEncriptar = document.getElementById("button_encrypt");
let botonDesencriptar = document.getElementById("button_decrypt");
let botonCopiar = document.getElementById("button_copiar");
let textoEntrada = document.getElementById("input_text_encrypt");
let textoSalida = document.getElementById("output_text_decrypt");
let contenedorPadre = document.querySelector(".result");

function habilitarBotones() {
    botonEncriptar.disabled = false;
    botonDesencriptar.disabled = false;
}

function habilitarCopiado() {
    botonCopiar.disabled = false;
}

function actualizarPagina() {
    if (textoEntrada.value !== "") {
        contenedorPadre.classList.remove("no_texto");
    }
    textoEntrada.focus();
}

function myAlert(message) { // mensaje modificado de alerta
    let alert = document.getElementById('custom-alert');
    alert.innerHTML = message;
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 2000); // Oculta el alert después de 2 segundos
}

function focusTextArea() {
    textoEntrada.focus();
}

function encriptarMensaje() {
    let mensaje = textoEntrada.value.trim(); // Eliminamos espacios al inicio y al final
    if (mensaje) {
        // expresión regular para verificar minúsculas y espacios
        let regExp = /^[a-z\s]+$/;

        if (regExp.test(mensaje)) {
            const reemplazos = {
                e: "enter",
                i: "imes",
                a: "ai",
                o: "ober",
                u: "ufat"
            };
            let mensajeEncriptado = mensaje.replace(/[eioua]/g, match => reemplazos[match]);
            textoSalida.innerHTML = mensajeEncriptado;
            textoSalida.value = mensajeEncriptado;
            habilitarCopiado();
            actualizarPagina();
        } else {
            myAlert("Por favor escribe un texto válido, solo letras minúsculas y espacios.");
            focusTextArea();
        }
    } else {
        myAlert("Por favor escribe un texto");
        focusTextArea();
    }
}

function desencriptarMensaje() {
    let mensaje = textoEntrada.value.trim();
    if (mensaje) {
        const reemplazos = {
            enter: "e",
            imes: "i",
            ai: "a",
            ober: "o",
            ufat: "u"
        };
        let mensajeDesencriptado = mensaje.replace(/enter|imes|ai|ober|ufat/g, match => reemplazos[match]);
        textoSalida.innerHTML = mensajeDesencriptado;
        textoSalida.value = mensajeDesencriptado;
        habilitarCopiado();
        actualizarPagina();
    } else {
        myAlert("Para desencriptar un mensaje, usa la caja de texto");
        focusTextArea();
    }
}

function copiarMensaje() {
    if (textoSalida.value) {
        navigator.clipboard.writeText(textoSalida.value);
        myAlert("Mensaje copiado");
    } else {
        myAlert("Nada que copiar");
    }
}

//--script del formulario--//

const form = document.getElementById("my_form");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto.

    const formData = new FormData(form); // Recopila los datos del formulario.

    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            Accept: "application/json",
        },
    }); // Envía los datos del formulario a la URL del formulario.

    if (response.ok) {
        myAlert("¡Gracias por enviar tu consulta!"); // Mensaje de confirmación.
        form.reset(); // Vacía el formulario
    } else {
        myAlert("Ha ocurrido un error al enviar el formulario."); // Mensaje de error.
    }
});

botonEncriptar.onclick = encriptarMensaje;
botonDesencriptar.onclick = desencriptarMensaje;
botonCopiar.onclick = copiarMensaje;
textoEntrada.onclick = habilitarBotones;
