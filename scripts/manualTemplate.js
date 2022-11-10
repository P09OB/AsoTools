import { onGetSesion, setSesion, addAnswer, newAnswer, onGetProyect } from './firebase.js'
const bttStart = document.querySelectorAll('.start')
const question = document.querySelector('.question')
const cardUsers = document.querySelector('.card__users')
const cardButton = document.querySelector('.card__button')
const desc = document.querySelector('.desc')
const counterText = document.querySelector('.counter')
const nameMetho = document.querySelector('.nameMetho')
const level = document.querySelector('.level')
const interactive = document.querySelector('.interactive')
const finish = document.querySelector('.finish')
//////

const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button"); 
let description = document.querySelector("text")
let isUpdate = false, updateId;


const explain = document.querySelector(".explain")
const wrapper = document.querySelector('.wrapper')
const textFinal = document.querySelector('.textFinal')
const resume = document.querySelector('.resume')
const download = document.querySelector('.download')
let tag = document.querySelector('.resumeAnswers')
let tag1 = document.querySelector('.resumeAnswers1')
let tag2 = document.querySelector('.resumeAnswers2')


//////

let counter = 0
let numberOfQuestions = 0
let codeObtener = ''
let obtener = ''
var sesion = ''
let date = ''
let arrayAnswer = ''
let template = ''
let start = false
let view = false
let nameMethodology = ''


onGetSesion((querySnapshot) => {
    let html = ''
    let liTag = ''
    sesion = querySnapshot.data()
    numberOfQuestions = sesion.objQuestions.length - 2
    date = sesion.objQuestions[counter]
    obtener = date.question
    codeObtener = date.code
    resume.style.backgroundImage = `url(${sesion.template})`
    resume.src = sesion.template
    template = sesion.template
    if (sesion.start) {
        question.innerHTML = obtener
        counterText.innerHTML = counter+1+" de "+sesion.objQuestions.length
        nameMetho.innerHTML = sesion.idMethodology
        level.innerHTML = sesion.level

        if(sesion.level === 'Soy parte'){
            level.style.backgroundColor = '#6700a9'
        }
    }

    if (view) {
        document.querySelectorAll(".note").forEach(li => li.remove());
        arrayAnswer = sesion[localStorage.getItem("code")]
        console.log(arrayAnswer)
        arrayAnswer.forEach(e => {
            liTag = `<li class="note">
                        <div class="details">
                            <span>${e}</span>
                        </div>
                    </li>`;
            addBox.insertAdjacentHTML("afterend", liTag);
        })
    }

})

onGetProyect((querySnapshot)=>{

})

download.addEventListener('click', () => {
    var link = document.createElement('a');
    link.href = `./pdfs/${localStorage.getItem('nameMethodology')}.pdf`;
    link.download = `./pdfs/${localStorage.getItem('nameMethodology')}.pdf`;
    link.dispatchEvent(new MouseEvent('click'));
})
bttStart.forEach((elem)=>{

    elem.addEventListener('click', () => {
        cardButton.classList.remove('hidden')
        cardUsers.classList.remove('hidden')
        interactive.classList.remove('hidden')
        if (counter > numberOfQuestions) {
            question.classList.add('hidden')
            wrapper.classList.add('hidden')
            textFinal.classList.remove('hidden')
            finish.classList.remove('hidden')
            resume.classList.remove('hidden')
            interactive.classList.add('hidden')

            bttStart.innerHTML = 'Volver'
    
            const array = sesion.questions0
            const array1 = sesion.questions1
            const array2 = sesion.questions2

            tag.innerHTML = ''
            array.forEach((info) => {
                const resumeAnswers = document.createElement('div');
    
                resumeAnswers.innerHTML = `
                    <div class="card--post">${info}</div>
                `;
                tag.appendChild(resumeAnswers)
    
            })
            tag1.innerHTML = ''
            array1.forEach((info) => {
                const resumeAnswers1 = document.createElement('div');
    
                resumeAnswers1.innerHTML = `
                    <div class="card--post">${info}</div>
                `;
                tag1.appendChild(resumeAnswers1)
    
            })
            tag2.innerHTML = ''
            array2.forEach((info) => {
                const resumeAnswers2 = document.createElement('div');
    
                resumeAnswers2.innerHTML = `
                    <div class="card--post">${info}</div>
                `;
                tag2.appendChild(resumeAnswers2)
    
            })
    
        } else {
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
                    localStorage.setItem("code", codeObtener)
                }, 2000);
    
    
                setTimeout(() => { view = true }, 2000);
                console.log(view)
            }
    
            if (counter == 0) {
                question.classList.remove('hidden')
                explain.classList.add('hidden')
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
                localStorage.setItem("code", codeObtener)
                console.log(view)
                console.log(localStorage.getItem("code"))
                setTimeout(() => { view = true }, 2000);
    
            }
        }
    })
})

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Nuevo comentario";
    addBtn.innerText = "Agregar";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    desc.value = ''
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

addBtn.addEventListener("click", e => {
    e.preventDefault();
    description = descTag.value;
    if (description) {
        newAnswer(codeObtener, description)
        closeIcon.click();
    }
});

finish.addEventListener('click',()=>{
    location.href = `./proyect.html?id=${sesion.idProyect}`
})