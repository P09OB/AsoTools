import { onGetSesion, setSesion, addAnswer,setSesionCompleted } from './firebase.js'

const addBox = document.querySelector(".add-box")
const containedUsers = document.querySelector('.containedUsers')
const nameCode = document.querySelector('.nameCode')
const bttStart = document.querySelectorAll('.start')
const startSesionBtt = document.querySelector('.startSesion')
const question = document.querySelector('.question')
const containedAnswers = document.querySelector('.containedAnswers')
const textFinal = document.querySelector('.textFinal')
const resume = document.querySelector('.resume')
const next = document.querySelector('.next')
const sesionVirtual = document.querySelector('.sesionVirtual')
const infoVirtual = document.querySelector('.infoVirtual')
const interactive = document.querySelector('.interactive')
const participants = document.querySelector('.participants')
const numberUsers = document.querySelector('.numberOfUsers')
const finish = document.querySelector('.finish')
const finishBtt = document.querySelector('.finishBtt')


const counterText = document.querySelector('.counter')
const nameMetho = document.querySelector('.nameMetho')
const level = document.querySelector('.level')

let tag = document.querySelector('.resumeAnswers')
let tag1 = document.querySelector('.resumeAnswers1')
let tag2 = document.querySelector('.resumeAnswers2')

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
    resume.src = sesion.template

    if (sesion.start) {
        question.innerHTML = obtener
        counterText.innerHTML = counter+1+" de "+sesion.objQuestions.length
        nameMetho.innerHTML = sesion.idMethodology
        level.innerHTML = sesion.level
    }

    if(view){
    let liTag = ''
    let name = ''
    let arrayName = []
    document.querySelectorAll(".note").forEach(li => li.remove());
        arrayAnswer = sesion[localStorage.getItem("code")]
        arrayAnswer.forEach(e =>{
            liTag = `
            <li class="note">
                        <div class="details">
                            <span>${e.answer}</span>
                        </div>
                    </li>
            `;
            addBox.insertAdjacentHTML("afterend", liTag);

            if (!arrayName.includes(e.name)) {
                arrayName.push(e.name);
              }
        })
        participants.innerHTML = ''

        arrayName.forEach(elem=>{
            name =  `
            <di class="card--containedUsers--user card--transparentWhite">${elem}</div>
            `;

            participants.innerHTML+=name

        })
    }

    if(sesion.users.length <= 0){
        containedUsers.innerText = "Esperando a que se unan....";

    } else{
        containedUsers.innerText = ''
        numberUsers.innerHTML = sesion.users.length
        startSesionBtt.disabled = false
        startSesionBtt.classList.remove('button--disable')
        startSesionBtt.classList.add('button')

    }
    sesion.users.forEach(element => {
        const user = document.createElement('div');
        user.innerHTML = `
            <div class="card--containedUsers--user card--transparentWhite">${element}</div>
       `;
        containedUsers.appendChild(user)

    });

})

const cardCode = document.querySelector('.card__code')
const title = document.querySelector('.title')
const cardQuestion = document.querySelector('.card__question')
const wrapper = document.querySelector('.wrapper')

bttStart.forEach((e)=>{
    e.addEventListener('click', () => {
        //CAMBIAR A TRUE EL START
        interactive.classList.remove('hidden')
        sesionVirtual.classList.add('hidden')

        if (counter > numberOfQuestions) {
           
            interactive.classList.add('hidden')
            finish.classList.remove('hidden')
    
            completed = true
    
            setTimeout(() => {
                setSesionCompleted(completed)
            }, 2000);

            const array = sesion.questions0
            const array1 = sesion.questions1
            const array2 = sesion.questions2

            tag.innerHTML = ''
            array.forEach((info) => {
                const resumeAnswers = document.createElement('div');
    
                resumeAnswers.innerHTML = `
                    <div class="card--post">${info.answer}</div>
                `;
                tag.appendChild(resumeAnswers)
    
            })
            tag1.innerHTML = ''
            array1.forEach((info) => {
                const resumeAnswers1 = document.createElement('div');
    
                resumeAnswers1.innerHTML = `
                    <div class="card--post">${info.answer}</div>
                `;
                tag1.appendChild(resumeAnswers1)
    
            })
            tag2.innerHTML = ''
            array2.forEach((info) => {
                const resumeAnswers2 = document.createElement('div');
    
                resumeAnswers2.innerHTML = `
                    <div class="card--post">${info.answer}</div>
                `;
                tag2.appendChild(resumeAnswers2)
    
            })
            
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
})


next.addEventListener('click',()=>{
    sesionVirtual.classList.remove('hidden')
    infoVirtual.classList.add('hidden')
})

finishBtt.addEventListener('click',()=>{
    location.href = '../proyect.html'
})