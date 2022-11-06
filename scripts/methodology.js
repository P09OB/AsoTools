import {getmethodology} from './firebase.js'

const params = new URLSearchParams(location.search);
const id = params.get('id');
const name = params.get('name');

localStorage.setItem('idMethodology',id)
localStorage.setItem('namePdf',name)



////
const nameMet = document.querySelector('.nameMet')
const beneMet = document.querySelector('.beneMet')
const level = document.querySelector('.level')
const duration = document.querySelector('.duration')
const dificulty = document.querySelector('.dificulty')
const phase = document.querySelector('.phase')
const warning = document.querySelector('.warning')
const cardCaution = document.querySelector('.card__caution')
const download = document.querySelector('.download')

const steps = document.querySelector('.steps')
const plantilla = document.querySelector('.plantilla')
const imageLogo = document.querySelector('.imageLogo')
const background = document.querySelector('.dashboard__methodology--intro')
var number = ''
let color = ''
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
            if(project.level == 'Soy parte'){
                color = '#6700a9'; 
            } 
            if(project.level == 'Somos parte'){
                color = '#0fb000'; 
            }  
            if(project.level == 'Tomamos parte'){
                color =  '#fe9800';
            }

            background.style.backgroundColor = color
            nameMet.innerHTML = project.name
            beneMet.innerHTML = project.benefit
            level.innerHTML = project.level
            duration.innerHTML = project.time+" "+"Minutos"
            dificulty.innerHTML = project.dificulty
            phase.innerHTML = project.phase
            imageLogo.src = project.profilePicture[0].url
            plantilla.src = project.exampleTemplate[0].url

            if(project.caution !== ''){
                cardCaution.classList.remove('hidden')
                warning.innerHTML = project.caution
            }
            
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

download.addEventListener('click', () => {
    var link = document.createElement('a');
    link.href = `./pdfs/${localStorage.getItem('namePdf')}.pdf`;
    link.download = `./pdfs/${localStorage.getItem('namePdf')}.pdf`;
    link.dispatchEvent(new MouseEvent('click'));
})

