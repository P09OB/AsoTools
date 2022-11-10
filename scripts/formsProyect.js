import {addProyect} from './firebase.js'

//FORM NEW PROJECT
const proyectForm = document.querySelector('.proyectForm')

let idUser = localStorage.getItem('idUser');

const fases = ['problema','fortalezas','causas','objetivo general','objetivos especificos',
                'propuesta','impacto (beneficios)', 'impacto (problemas que pueden resultar)',
            'actividades','recursos','alianzas actuales','alianzas por establecer', 'compromisos']

const methodologies = ['Árbol de sueños, preocupaciones y compromisos','Análisis diferenciado del bienestar','Análisis DAFO',
                        'Árbol del problema', 'Árbol de objetivos', 'Análisis de alternativas', 'Identificación de soluciones locales o introducidas',
                        'Matriz de evaluación de soluciones', 'La gran idea', 'Análisis de impacto', 'Matriz de actividades',
                        'Matriz de necesidad y disponibilidad de recursos', 'Análisis PESTEL','Mapa de intercambios', 'Matriz de responsabilidades']

const stages = []
const canva = []

proyectForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    var f = new Date();

    methodologies.forEach((e)=>{

        stages.push({
            methodology: e,
            state: false,
            answers: []

        })

    })

    fases.forEach((e)=>{
        canva.push({
            phase: e,
            state: false,
            answers: []
        })
    })

    let data = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();

    addProyect(idUser, proyectForm.nameProyect.value, proyectForm.communityName.value, data, proyectForm.description.value,'Soy parte',0,'En proceso',stages,canva)

    proyectForm.reset()

})