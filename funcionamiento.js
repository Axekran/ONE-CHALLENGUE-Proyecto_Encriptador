//VARIABLES
var textoRecibido=document.querySelector("#cajaDeTexto");
var listaDeLetrasARevisar=["e","i","a","o","u"];
let palabrasParaDesencriptar=["ai","enter","imes","ober","ufat"];


//FUNCIONES
function desaparecerImagenMensaje(){
    document.getElementById("mensajeDefecto").style.display="none";
}
function aparecerBotonMensaje(){
    document.getElementById("botonCopiar").style.display="block";
}

function desaparecerResultado(){
    document.getElementById("resultadoTexto").style.display="none";
}

function aparecerResultado(){
    document.getElementById("resultadoTexto").style.display="block";
}

function encriptar(){
    var resultadoEncriptado=encriptarTexto(textoRecibido.value);
    document.getElementById("resultadoTexto").innerHTML=resultadoEncriptado;
}

function desencriptar(){
    var resultadoDesencriptado=desencriptarTexto(textoRecibido.value);
    document.getElementById("resultadoTexto").innerHTML=resultadoDesencriptado;
}
function copiar(){
    var contenido=document.getElementById("resultadoTexto");
    var seleccion=document.createRange();
    seleccion.selectNodeContents(contenido);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(seleccion);
    var res=document.execCommand("copy");
    window.getSelection().removeRange(seleccion);
    alert("Copiado!");
}


function cambiarLetraALlaveEncriptacion(letra){

    switch(letra){
        case "a":
            return letra.replace(/a/g,"ai");
            break;
        case "e":
            return letra.replace(/e/g,"enter");
            break;
        case "i":
            return letra.replace(/i/g,"imes");
            break;
        case "o":
            return letra.replace(/o/g,"ober");
            break;
        case "u":
            return letra.replace(/u/g,"ufat");
            break;
        default:
            return letra;
            break;
    }


}
function cambiarLlaveALetraEncriptacion(llave,texto){

    switch(llave){
        case "ai":
            return texto.replace(/ai/g,"a");
            break;
        case "enter":
            return texto.replace(/enter/g,"e");
            break;
        case "imes":
            return texto.replace(/imes/g,"i");
            break;
        case "ober":
            return texto.replace(/ober/g,"o");
            break;
        case "ufat":
            return texto.replace(/ufat/g,"u");
            break;
        default:
            return texto;
            break;
    }


}
function revisarSiIncluyeAlgunaLetra(texto){

    for(var i=0;i<listaDeLetrasARevisar.length;i++){

        if(texto.includes(listaDeLetrasARevisar[i])){
            return true;
        }
    }
    
    return false;

}
function revisarSiIncluyeAlgunaPalabra(texto){

    for(var i=0;i<palabrasParaDesencriptar.length;i++){
        if(texto.includes(palabrasParaDesencriptar[i])){
            return true;
        }
        
    }

    return false;
}
function devolverListaDeLetrasEncontradas(texto){

    var listaDeLetrasEncontradas=[];

    for(var i=0;i<listaDeLetrasARevisar.length;i++){
    
        if(texto.includes(listaDeLetrasARevisar[i])){
            listaDeLetrasEncontradas.push(listaDeLetrasARevisar[i]);
        }
    
    }

    return listaDeLetrasEncontradas;

}
function encriptarTexto(texto){


    if(revisarSiIncluyeAlgunaLetra(texto)){

        listaDeLetrasEncontradas=devolverListaDeLetrasEncontradas(texto);

        var nuevoTexto="";

        for(var i=0;i<texto.length;i++){

            var letraDeTexto=texto[i];

            if(listaDeLetrasEncontradas.includes(letraDeTexto)){

                nuevoTexto+=cambiarLetraALlaveEncriptacion(letraDeTexto);
            }
            else{
                nuevoTexto+=letraDeTexto;
            }

        }

        return nuevoTexto;

    }
    else{
        return texto;
    }


}
function desencriptarTexto(texto){

    var textoDesencriptado="";
    var tienePalabrasEspeciales=revisarSiIncluyeAlgunaPalabra(texto); 
    var contador=0;

    if(tienePalabrasEspeciales){

        while(contador<5){ 

            if(texto.includes([palabrasParaDesencriptar[contador]])){
    
                textoDesencriptado=(cambiarLlaveALetraEncriptacion(palabrasParaDesencriptar[contador],texto)); 
                texto=textoDesencriptado; 
            }
            contador++;
        }

    }

    else{
        textoDesencriptado=texto;
    }

    return textoDesencriptado;

}
function verificar(elemento){
    var texto = elemento.value
    texto = texto.split(/[^a-z/" "/]+/g)
    texto = texto.join("")
    elemento.value = texto
  }

// ONCLICK FUNCTIONS
document.getElementById("botonEncriptador").onclick=function(){

    aparecerBotonMensaje();
    desaparecerImagenMensaje();
    aparecerResultado();
    encriptar();

}

document.getElementById("botonDesencriptador").onclick=function(){
    aparecerBotonMensaje();
    desaparecerImagenMensaje();
    aparecerResultado();
    desencriptar();
}

document.getElementById("botonCopiar").onclick=function(){
    copiar();
}
