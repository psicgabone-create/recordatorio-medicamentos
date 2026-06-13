// Obtener datos guardados
let datos = JSON.parse(
    localStorage.getItem("medicamentoActual")
);

let alarmaDisparada = false;
let audioActual = null;

let audioHabilitado = false;

// Activar audio al hacer clic en el botón
document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("activarAudio");

    if(boton){

        boton.addEventListener("click", async () => {

            let audio = new Audio("alarma.mp3");

            try{

                await audio.play();

                audio.pause();
                audio.currentTime = 0;

                audioHabilitado = true;

                alert("Alarmas activadas correctamente");

                boton.style.display = "none";

            }catch(error){

                console.log(error);

            }

        });

    }

});

console.log("Datos cargados:", datos);

function reproducirAlarma(){

    if(!audioHabilitado){

        console.log("Audio no habilitado");
        return;

    }

    console.log("Intentando reproducir MP3");

    audioActual = new Audio("alarma.mp3");

    audioActual.loop = true;
    audioActual.volume = 1;

    audioActual.play()
    .then(() => {

        console.log("MP3 reproduciéndose");

    })
    .catch(error => {

        console.error("Error:", error);

    });
}

function verificarHora(){

    if(!datos){

        console.log("No hay medicamento guardado");
        return;

    }

    let ahora = new Date();

    let horaActual =
        ahora.getHours().toString().padStart(2,'0')
        + ":" +
        ahora.getMinutes().toString().padStart(2,'0');

    console.log(
        "Hora actual:",
        horaActual,
        "Hora programada:",
        datos.hora
    );

    if(
        horaActual === datos.hora &&
        !alarmaDisparada
    ){

        console.log("ALARMA ACTIVADA");

        alarmaDisparada = true;

        // Fondo de pantalla
        document.body.style.backgroundImage =
        `url('${datos.imagen}')`;

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";

        // Ocultar espera
        document.getElementById("espera")
        .style.display = "none";

        // Mostrar recordatorio
        document.getElementById("contenedor")
        .style.display = "block";

        // Mostrar datos
        document.getElementById("nombre").innerHTML =
        "💊 " + datos.nombre;

        document.getElementById("dosis").innerHTML =
        "💉 Dosis: " + datos.dosis;

        document.getElementById("hora").innerHTML =
        "⏰ Hora: " + datos.hora;

        reproducirAlarma();
    }
}

function detenerAlarma(){

    if(audioActual){

        audioActual.pause();
        audioActual.currentTime = 0;

    }

    window.location.href = "index.html";
}

// Ejecutar inmediatamente
verificarHora();

// Revisar cada segundo
setInterval(verificarHora,1000);