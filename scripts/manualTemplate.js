import { onGetSesion, setSesion, addAnswer,newAnswer } from './firebase.js'
const bttStart = document.querySelector('.start')
const question = document.querySelector('.question')

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
//////

let counter = 0
let numberOfQuestions = 0
let codeObtener = ''
let obtener = ''
var sesion = ''
let date = ''
let arrayAnswer = ''

let start = false
let view = false


onGetSesion((querySnapshot) => {
    let html = ''
    let liTag = ''
    sesion = querySnapshot.data()
    numberOfQuestions = sesion.objQuestions.length - 2
    date = sesion.objQuestions[counter]
    obtener = date.question
    codeObtener = date.code
    if (sesion.start) {
        question.innerHTML = obtener
    }

    if(view){
        document.querySelectorAll(".note").forEach(li => li.remove());
        arrayAnswer = sesion[localStorage.getItem("code")]
        console.log(arrayAnswer)
        arrayAnswer.forEach(e =>{
            liTag = `<li class="note">
                        <div class="details">
                            <span>${e}</span>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);

        })

        
    }


})

bttStart.addEventListener('click', () => {

    if (counter > numberOfQuestions) {
        question.classList.add('hidden')
        wrapper.classList.add('hidden')
        textFinal.classList.remove('hidden')
        bttStart.innerHTML = 'Volver'
        //location.href = "./proyect.html";


        
    } else{
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

            
            setTimeout(() => {view = true} , 2000);
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
            localStorage.setItem("code",codeObtener)
            console.log(view)
            console.log(localStorage.getItem("code"))
            setTimeout(() => {view = true}, 2000);

        }
    }
})


addBox.addEventListener("click", () => {
    popupTitle.innerText = "Nuevo comentario";
    addBtn.innerText = "Agregar";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});


addBtn.addEventListener("click", e => {
    e.preventDefault();
    description = descTag.value;
    if(description) {
        newAnswer(codeObtener, description)
        closeIcon.click();
    }
});