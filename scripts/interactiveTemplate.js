import { onGetSesion, setSesion, addAnswer,setSesionCompleted } from './firebase.js'

const addBox = document.querySelector(".add-box")
const containedUsers = document.querySelector('.containedUsers')
const nameCode = document.querySelector('.nameCode')
const bttStart = document.querySelector('.start')
const question = document.querySelector('.question')
const containedAnswers = document.querySelector('.containedAnswers')
const textFinal = document.querySelector('.textFinal')
const resume = document.querySelector('.resume')
const next = document.querySelector('.next')
const sesionVirtual = document.querySelector('.sesionVirtual')
const infoVirtual = document.querySelector('.infoVirtual')

let counter = 0
let numberOfQuestions = 0
let codeObtener = ''
let obtener = ''
var sesion = ''
let date = ''
let arrayAnswer = ''
let start = false
let view = false
let completed = false

nameCode.innerHTML = localStorage.getItem('codeSesion')

onGetSesion((querySnapshot) => {

    let html = ''


    sesion = querySnapshot.data()
    let questions = sesion.objQuestions
    const questionText = document.createElement('question');
    counter = sesion.counter
    completed = sesion.completed
    numberOfQuestions = sesion.objQuestions.length - 2
    date = sesion.objQuestions[counter]
    obtener = date.question
    codeObtener = date.code
    resume.style.backgroundImage = `url(${sesion.template})`

    if (sesion.start) {
        question.innerHTML = obtener
    }

    if(view){
    let liTag = ''
    document.querySelectorAll(".note").forEach(li => li.remove());
        arrayAnswer = sesion[localStorage.getItem("code")]
        arrayAnswer.forEach(e =>{
            liTag = `
            <li class="note">
                        <div class="details">
                            <span>${e}</span>
                        </div>
                    </li>
            `;
            addBox.insertAdjacentHTML("afterend", liTag);
        })
    }

    const user = document.createElement('user');
    user.classList.add('modal');
    sesion.users.forEach(element => {
        console.log(element)
        html += `
            <div class="card--containedUsers--user">${element}</div>
       `;
        containedUsers.innerHTML = html

    });

})

const cardCode = document.querySelector('.card__code')
const title = document.querySelector('.title')
const cardQuestion = document.querySelector('.card__question')
const wrapper = document.querySelector('.wrapper')

bttStart.addEventListener('click', () => {
    //CAMBIAR A TRUE EL START

    if (counter > numberOfQuestions) {
        alert('no hay mas preguntas')
        addBox.classList.add('hidden')
        bttStart.classList.add('hidden')
        cardQuestion.classList.add('hidden')
        textFinal.classList.remove('hidden')
        wrapper.classList.add('hidden')
        resume.classList.remove('hidden')

        completed = true

        setTimeout(() => {
            setSesionCompleted(completed)
        }, 2000);
        
    } else {
        //set cambiar 
        if (start) {
            view = false
            counter++

            setSesion(counter, start)
            setTimeout(() => {
                console.log(codeObtener)
                const answer = {
                    ...sesion,
                }
                answer[codeObtener] = []
                addAnswer(answer)
                localStorage.setItem("code",codeObtener)
            }, 2000);

            setTimeout(() => {view = true}, 2000);

        }

        if (counter == 0) {

            cardCode.classList.add('hidden')
            containedUsers.classList.add('hidden')
            title.classList.add('hidden')
            cardQuestion.classList.remove('hidden')
            wrapper.classList.remove('hidden')
            bttStart.innerHTML = 'Siguiente'
            start = true

            const answer = {
                ...sesion,
                counter,
                start
            }
            answer[codeObtener] = []
            addAnswer(answer)
            localStorage.setItem("code",codeObtener)

            setTimeout(() => {view = true}, 2000);

        }

    }
})

next.addEventListener('click',()=>{
    sesionVirtual.classList.remove('hidden')
    infoVirtual.classList.add('hidden')
})