
const esBisiesto = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const nombresMeses = [
    "Enero","Febrero","Marzo","Abril",
    "Mayo","Junio","Julio","Agosto",
    "Septiembre","Octubre","Noviembre","Diciembre"
];



const listaDeHitos = [

    {
        dia:11,
        mes:10,
        descripcion:"Evaluacion de saberes proyecto anual"
    },

    {
        dia:12,
        mes:7,
        descripcion:"Evaluación materia"
    },

    {
        dia:18,
        mes:8,
        descripcion:"Recuperatorio"
    },

    {
        dia:19,
        mes:10,
        descripcion:"Recuperatorio Grupo "
    },

    {
        dia:20,
        mes:8,
        descripcion:"Entrega parcial proyecto"
    }

];



let fechaActual = new Date();

let mesActual = fechaActual.getMonth();
let anioActual = fechaActual.getFullYear();



function generarCalendario(mes, anio){

    const contenedor =
    document.getElementById("contenedorDias");

    const nombreMes =
    document.getElementById("nombreMes");

    const fechaTexto =
    document.getElementById("fechaActualTexto");

    const listaEventos =
    document.getElementById("listaEventos");

    contenedor.innerHTML = "";
    listaEventos.innerHTML = "";


    nombreMes.textContent =
    `${nombresMeses[mes]} ${anio}`;

    fechaTexto.textContent =
    `Visualizando el mes de ${nombresMeses[mes]} del año ${anio}`;

    const primerDiaSemana =
    new Date(anio,mes,1).getDay();

    // TOTAL DE DÍAS
    let totalDias =
    new Date(anio,mes + 1,0).getDate();

    
    if(mes === 1){
        totalDias = esBisiesto(anio) ? 29 : 28;
    }

  
    for(let i=0;i<primerDiaSemana;i++){

        const vacio =
        document.createElement("div");

        vacio.classList.add("dia-vacio");

        contenedor.appendChild(vacio);
    }


    for(let dia=1; dia<=totalDias; dia++){

        const celda =
        document.createElement("div");

        celda.classList.add("dia-celda");

        celda.textContent = dia;

        const hoy =
        new Date();

        if(
            dia === hoy.getDate() &&
            mes === hoy.getMonth() &&
            anio === hoy.getFullYear()
        ){
            celda.classList.add("hoy");
        }


        const evento =
        listaDeHitos.find(hito =>
            hito.dia === dia &&
            hito.mes === mes
        );

        if(evento){

            celda.classList.add("evento-marcado");

            celda.title =
            evento.descripcion;

         
            listaEventos.innerHTML += `
                <div class="evento-item">
                    <strong>${dia} ${nombresMeses[mes]}</strong>
                    <p>${evento.descripcion}</p>
                </div>
            `;
        }

        // ALERTA
        celda.addEventListener("click",()=>{

            if(evento){
                alert(
                    `📌 Evento:\n${evento.descripcion}`
                );
            }else{
                alert(
                    `📅 Día ${dia} seleccionado`
                );
            }

        });

        contenedor.appendChild(celda);
    }

}



document.getElementById("btnAnterior")
.addEventListener("click",()=>{

    mesActual--;

    if(mesActual < 0){
        mesActual = 11;
        anioActual--;
    }

    generarCalendario(mesActual,anioActual);

});

document.getElementById("btnSiguiente")
.addEventListener("click",()=>{

    mesActual++;

    if(mesActual > 11){
        mesActual = 0;
        anioActual++;
    }

    generarCalendario(mesActual,anioActual);

});

document.getElementById("btnHoy")
.addEventListener("click",()=>{

    const hoy = new Date();

    mesActual = hoy.getMonth();
    anioActual = hoy.getFullYear();

    generarCalendario(mesActual,anioActual);

});



generarCalendario(mesActual,anioActual);