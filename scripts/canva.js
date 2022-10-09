
const diagnostico = document.querySelector('.cardDiagnostico')
const fundamentacion = document.querySelector('.cardFundamentacion')
const objetivos = document.querySelector('.cardObj')
const propuesta = document.querySelector('.cardPropuesta')
const actividades = document.querySelector('.cardActividades')
const recursos = document.querySelector('.cardRecursos')

const opcionDiagnostico = document.querySelector('.diagnosticoOpcions')
const opcionFundamentacion = document.querySelector('.fundamentacionOpcions')
const objOpcions = document.querySelector('.objOpcions')
const opcionPropuesta = document.querySelector('.propuestaOpcions')
const opcionActividades = document.querySelector('.actividadesOpcions')
const opcionRecursos = document.querySelector('.recursosOpcions')

var viewDiagnostico = false
var viewFundamentacion = false
var viewObjetivos = false
var viewPropuesta = false
var viewActividades = false
var viewRecursos = false


diagnostico.addEventListener('click',(e)=>{
    
    if(viewDiagnostico){
        opcionDiagnostico.classList.add('hidden')
        viewDiagnostico = false

    } else{
        opcionDiagnostico.classList.remove('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        viewDiagnostico = true
    }
})

fundamentacion.addEventListener('click',(e)=>{

    if(viewFundamentacion){
        opcionFundamentacion.classList.add('hidden')
        viewFundamentacion = false
    }else{
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.remove('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        viewFundamentacion = true
    }
    
})

objetivos.addEventListener('click',(e)=>{

    if(viewObjetivos){
        objOpcions.classList.add('hidden')
        viewObjetivos = false

    } else{
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.remove('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        viewObjetivos = true

    }
    
})

propuesta.addEventListener('click',(e)=>{

    if(viewPropuesta){
        opcionPropuesta.classList.add('hidden')
        viewPropuesta = false
    } else{
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.remove('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        viewPropuesta = true
    }
    
})

actividades.addEventListener('click',(e)=>{

    if(viewActividades){
        opcionActividades.classList.add('hidden')
        viewActividades = false
    } else{
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.remove('hidden')
        opcionRecursos.classList.add('hidden')
        viewActividades = true
    }
    
})

recursos.addEventListener('click',(e)=>{

    if(viewRecursos){
        opcionRecursos.classList.add('hidden')
        viewRecursos = false
    } else {
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.remove('hidden')
        viewRecursos = true
    }
    
})