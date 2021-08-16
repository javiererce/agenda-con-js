// CODER AGENDA.

// Variables globales
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];
// Funciones
const CrearItem = (actividad) => {
  let item = {
    actividad: actividad,
    estado: false
  }
  arrayActividades.push(item);
  return item;
}

const GuardarDB = () => {
  localStorage.setItem('tarea', JSON.stringify(arrayActividades));
  PintarDB();
}

const PintarDB = () => {
  listaActividadesUI.innerHTML = '';
  arrayActividades = JSON.parse(localStorage.getItem('tarea'));
  
  if(arrayActividades === null){
    arrayActividades = [];
  }else{
    arrayActividades.forEach(element => {
      if(element.estado){
        listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }else{
        listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }
    });
  }
}

const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    
    if(elemento.actividad === actividad){
      indexArray = index;
    }    
  });

  arrayActividades.splice(indexArray,1);
  GuardarDB();
}

const EditarDB = (actividad) => {
  let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);
  arrayActividades[indexArray].estado = true;
  GuardarDB();
}
// Agrego el EventListener
formularioUI.addEventListener('submit', (e) => {
  e.preventDefault();
  let actividadUI = document.querySelector('#actividad').value;
  CrearItem(actividadUI);
  GuardarDB();
  formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', PintarDB);
listaActividadesUI.addEventListener('click', (e) => {
  e.preventDefault();

  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
    let texto = e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML === 'delete'){
      // Accción de eliminar
      EliminarDB(texto);
    }
    if(e.target.innerHTML === 'done'){
      // Accción de editar
      EditarDB(texto);
    }
  }
});
//-------------------------------------------
// Jquiery----------------------
$(document).ready(function(){

 //Aplicamos Jquery a los <p> : 
 $("#btn1").click(function(){
  $(".frf").show(1000);
})
// cambiar el h1 por otro texto
 $(".display-4").html("!Coder Agenda¡")
//agregar h3 antes de parrafo
$(".frf").prepend("<H3>Terminos y condiciones:</h3>");
});

//----------------------------------------------------------------
//Declaro la información a enviar
  const infoPost= "./datos.json"
//Escucho el evento click del botón
$("#btn2").click(() => { 
    $.getJSON(infoPost,(respuesta, estado) => {
     // console.log(respuesta);
        if(estado === "success"){
            for(const data of respuesta){
             $("body").append(`<div>Se guardo usuario correctamente: ${data.nombre} ${data.apellido}</div>`);
        }
      }  
    });
});
// FIN---------------------------
