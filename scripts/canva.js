
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


diagnostico.addEventListener('click',(e)=>{
    opcionDiagnostico.classList.remove('hidden')
    opcionFundamentacion.classList.add('hidden')
    objOpcions.classList.add('hidden')
    opcionPropuesta.classList.add('hidden')
    opcionActividades.classList.add('hidden')
    opcionRecursos.classList.add('hidden')
})

fundamentacion.addEventListener('click',(e)=>{
    opcionDiagnostico.classList.add('hidden')
    opcionFundamentacion.classList.remove('hidden')
    objOpcions.classList.add('hidden')
    opcionPropuesta.classList.add('hidden')
    opcionActividades.classList.add('hidden')
    opcionRecursos.classList.add('hidden')
})

objetivos.addEventListener('click',(e)=>{
    opcionDiagnostico.classList.add('hidden')
    opcionFundamentacion.classList.add('hidden')
    objOpcions.classList.remove('hidden')
    opcionPropuesta.classList.add('hidden')
    opcionActividades.classList.add('hidden')
    opcionRecursos.classList.add('hidden')
})

propuesta.addEventListener('click',(e)=>{
    opcionDiagnostico.classList.add('hidden')
    opcionFundamentacion.classList.add('hidden')
    objOpcions.classList.add('hidden')
    opcionPropuesta.classList.remove('hidden')
    opcionActividades.classList.add('hidden')
    opcionRecursos.classList.add('hidden')
})

actividades.addEventListener('click',(e)=>{
    opcionDiagnostico.classList.add('hidden')
    opcionFundamentacion.classList.add('hidden')
    objOpcions.classList.add('hidden')
    opcionPropuesta.classList.add('hidden')
    opcionActividades.classList.remove('hidden')
    opcionRecursos.classList.add('hidden')
})

opcionRecursos.addEventListener('click',(e)=>{
    opcionDiagnostico.classList.add('hidden')
    opcionFundamentacion.classList.add('hidden')
    objOpcions.classList.add('hidden')
    opcionPropuesta.classList.add('hidden')
    opcionActividades.classList.add('hidden')
    opcionRecursos.classList.remove('hidden')
})