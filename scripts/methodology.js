import {getmethodology} from './firebase.js'

const params = new URLSearchParams(location.search);
const id = params.get('id');
localStorage.setItem('idMethodology',id)

////
const nameMet = document.querySelector('.nameMet')
const beneMet = document.querySelector('.beneMet')
const level = document.querySelector('.level')
const duration = document.querySelector('.duration')
const dificulty = document.querySelector('.dificulty')
const phase = document.querySelector('.phase')

const steps = document.querySelector('.steps')
var number = ''
////

window.addEventListener('DOMContentLoaded', async()=>{

    if (!id) {
        location.href = "./libray.html";
    }
    
    getmethodology((querySnapshot) => {

        querySnapshot.forEach( (doc)=>{
            console.log(doc.data())
    
            const project = doc.data()
             number = project.steps
            //HTML
            nameMet.innerHTML = project.name
            beneMet.innerHTML = project.benefit
            level.innerHTML = project.level
            duration.innerHTML = project.time+" "+"Minutos"
            dificulty.innerHTML = project.dificulty
            phase.innerHTML = project.phase
    
            
        })
        steps.innerHTML = ''
        var cantidad = 0
        number.forEach((docs)=>{
            cantidad += 1
            const step = document.createElement('div');
            step.classList.add('methodology--steps')
            step.innerHTML = `
            <h3 class="textStyles--darkGreen methodology--number">${cantidad}</h3>
            <p>${docs}</p>
            `
            steps.appendChild(step)
    
    })
        

    })
    

    

})

