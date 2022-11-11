import { onGetSesion, setSesion, addAnswer, setSesionCompleted, onGetProyect, modifyProyect, addCalculation, modifyCanvaProject } from './firebase.js'

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
const problemBienestar = document.querySelector('.problemBienestar')
const problem = document.querySelector('.problem')
const cards = document.querySelector('.resume')


const counterText = document.querySelector('.counter')
const nameMetho = document.querySelector('.nameMetho')
const level = document.querySelector('.level')
const veryBadTx = document.querySelector('.veryBad--text')
const badTx = document.querySelector('.bad--text')
const regTx = document.querySelector('.regular--text')
const niceTx = document.querySelector('.nice--text')
const emojis = document.querySelector('.dashboard__emojis')

let tag = document.querySelector('.resumeAnswers')
let tag1 = document.querySelector('.resumeAnswers1')
let tag2 = document.querySelector('.resumeAnswers2')

let numberOfEvaluate, dateEvaluate, obtEvaluate, codeEvaluate = ''
let veryBad = ''
let bad = ''
let regular = ''
let nice = ''
let counter = 0
let numberOfQuestions = 0
let codeObtener = ''
let obtener = ''
var sesion = ''
var proyect = ''
var arrayEnd = ''
let date = ''
let arrayAnswer = ''
let arrayEvaluate = ''
let canva = ''
let problemCanva = ''
let answerEvaluate = ''
let start = false
let view = false
let completed = false
let evaluate = false

nameCode.innerHTML = localStorage.getItem('codeSesion')

onGetProyect((querySnapshot) => {

    proyect = querySnapshot.data()
    arrayEnd = proyect.stages
    canva = proyect.canva

})

onGetSesion((querySnapshot) => {
    sesion = querySnapshot.data()
    let questions = sesion.objQuestions
    const questionText = document.createElement('question');
    counter = sesion.counter
    completed = sesion.completed
    evaluate = sesion.evaluateAns
    arrayEvaluate = sesion.objEvaluate

    if (!evaluate) {

        numberOfQuestions = sesion.objQuestions.length - 2
        date = sesion.objQuestions[counter]
        obtener = date.question
        codeObtener = date.code
    }
    if (evaluate) {

        numberOfEvaluate = sesion.objEvaluate.length - 2
        dateEvaluate = sesion.objEvaluate[counter]
        obtEvaluate = dateEvaluate.evaluate.answer
        codeEvaluate = dateEvaluate.code

    }

    resume.style.backgroundImage = `url(${sesion.template})`
    resume.src = sesion.template

    if (!evaluate) counterText.innerHTML = counter + 1 + " de " + sesion.objQuestions.length
    if (evaluate) counterText.innerHTML = counter + 1 + " de " + sesion.objEvaluate.length

    if (sesion.start) {

        nameMetho.innerHTML = sesion.idMethodology
        level.innerHTML = sesion.level
    }
    if (sesion.idMethodology === 'Árbol de sueños, preocupaciones y compromisos') {
        question.innerHTML = obtener
    } else if (sesion.idMethodology === 'Análisis diferenciado del bienestar') {
        emojis.classList.remove('hidden')
        question.innerHTML = obtEvaluate
    }


    if (view) {
        let liTag = ''
        let name = ''
        let arrayName = []

        document.querySelectorAll(".note").forEach(li => li.remove());
        arrayAnswer = sesion[localStorage.getItem("code")]
        
        arrayAnswer.forEach(e => {

            if (!evaluate) {
                liTag = `
            <li class="note">
                        <div class="details">
                            <span>${e.answer}</span>
                        </div>
                    </li>
            `;
                addBox.insertAdjacentHTML("afterend", liTag);

            }

            if (!arrayName.includes(e.name)) {
                arrayName.push(e.name);
            }
        })

        if (evaluate) {

        veryBad = arrayAnswer.filter((doc)=>{
            return doc.answer == 'veryBad'
        })

        bad = arrayAnswer.filter((doc)=>{
            return doc.answer == 'bad'
        })

        regular = arrayAnswer.filter((doc)=>{
            return doc.answer == 'regular'
        })

        nice = arrayAnswer.filter((doc)=>{
            return doc.answer == 'nice'
        })


        veryBadTx.innerHTML = veryBad.length
        badTx.innerHTML = bad.length
        regTx.innerHTML = regular.length
        niceTx.innerHTML = nice.length

        }

        participants.innerHTML = ''

        arrayName.forEach(elem => {
            name = `
            <di class="card--containedUsers--user card--transparentWhite">${elem}</div>
            `;

            participants.innerHTML += name

        })
    }

    if (sesion.users.length <= 0) {
        containedUsers.innerText = "Esperando a que se unan....";

    } else {
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

bttStart.forEach((e) => {
    e.addEventListener('click', () => {
        //CAMBIAR A TRUE EL START
        interactive.classList.remove('hidden')
        sesionVirtual.classList.add('hidden')

        if (evaluate) {

            if (counter > numberOfEvaluate) {

                addCalculation(codeEvaluate, veryBad.length, bad.length, regular.length, nice.length)

                interactive.classList.add('hidden')
                finish.classList.remove('hidden')   
                problemBienestar.classList.remove('hidden')             

                setTimeout(() => {
                    completed = true
                    let html = ''

                    setSesionCompleted(completed)
                    sesion.calculateAnswers.forEach((doc) => {
                        answerEvaluate = ''
                        let numerodeParticipantes = doc.veryBad +doc.bad+doc.regular+doc.nice
                        let veryBad =doc.veryBad  * 0
                        let bad = doc.bad * 1
                        let regular = doc.regular * 2
                        let good = doc.nice * 3
                        let porcentajeCien = numerodeParticipantes * 3
    
                        let sum = veryBad+bad+regular+good
                        let multiplicacion = sum * 100
                        let division = multiplicacion/porcentajeCien
                        
    
                        console.log(doc.code+" "+division)
    
    
                        if (division < 50) {
                            console.log('Tenemos problemas con: '+doc.code)
                            var problemShow = sesion.objEvaluate.filter(function(search) {
                                return search.code === doc.code;
                            });

                            problemShow.forEach((doc)=>{
                                problemCanva = doc.evaluate.answer
                                problem.innerHTML = doc.evaluate.answer
                            })
                        } 

                            var result = sesion.objEvaluate.filter(function(search) {
                                return search.code === doc.code;
                            });

                            result.forEach((doc)=>{
                                answerEvaluate = doc.evaluate.answer

                            })

                        

                        html += `<div>
                        <div class="dashboard--flex--group">${answerEvaluate}</div>
                        <div class="dashboard--flex--group">
                            <h3>${doc.veryBad}</h3>
                            <h3>${doc.bad}</h3>
                            <h3>${doc.regular}</h3>
                            <h3>${doc.nice}</h3>
                        </div>
                        </div>`
                        cards.innerHTML = html;

                                                
                    })
                canva.map((doc)=>{
                    if(doc.phase == 'problema'){
                        doc.answers = problemCanva
                        doc.state = true
                    }
                    return doc;

                })

                var progress = 100/15

                modifyCanvaProject(canva,progress)

                console.log(canva)
                }, 2000);


                



            } else {
                //set cambiar 
                if (start) {
                    view = false
                    addCalculation(codeEvaluate, veryBad.length, bad.length, regular.length, nice.length)
                    counter++
                    veryBad = []
                    bad = []
                    regular = []
                    nice = []

                    veryBadTx.innerHTML = veryBad.length
                    badTx.innerHTML = bad.length
                    regTx.innerHTML = regular.length
                    niceTx.innerHTML = nice.length

                    setSesion(counter, start)
                    setTimeout(() => {
                        const answer = {
                            ...sesion,
                        }
                        answer[codeEvaluate] = []
                        addAnswer(answer)
                        localStorage.setItem("code", codeEvaluate)
                    }, 2000);

                    setTimeout(() => { view = true }, 2000);



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
                    answer[codeEvaluate] = []
                    addAnswer(answer)
                    localStorage.setItem("code", codeEvaluate)

                    setTimeout(() => { view = true }, 2000);

                }
            }
        }

        if (!evaluate) {

            if (counter > numberOfQuestions) {

                interactive.classList.add('hidden')
                finish.classList.remove('hidden')

                completed = true

                setTimeout(() => {
                    setSesionCompleted(completed)
                }, 2000);

                //MOSTRAR RESPUESTAS AL FINAL 
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

                //AQUI MANDAR LE INFORMACIÓN A FIREBASE A LA PARTE DE PROYECTO

                arrayEnd.map((dato) => {
                    if (dato.methodology === sesion.idMethodology) {
                        dato.answers = array
                    }

                    return dato
                })

                var progress = 100/15

                modifyProyect(arrayEnd,progress)


            } else {
                //set cambiar 
                if (start) {
                    view = false
                    counter++

                    setSesion(counter, start)
                    setTimeout(() => {
                        const answer = {
                            ...sesion,
                        }
                        answer[codeObtener] = []
                        addAnswer(answer)
                        localStorage.setItem("code", codeObtener)
                    }, 2000);

                    setTimeout(() => { view = true }, 2000);

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
                    localStorage.setItem("code", codeObtener)

                    setTimeout(() => { view = true }, 2000);

                }

            }
        }
    })


})

function createArray() {


}




next.addEventListener('click', () => {
    sesionVirtual.classList.remove('hidden')
    infoVirtual.classList.add('hidden')
})

finishBtt.addEventListener('click', () => {
    location.href = `./proyect.html?id=${sesion.idProyect}`
})