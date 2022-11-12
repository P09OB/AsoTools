import { getMethodologyName, onGetProyect, createSesion, createManualSesion } from './firebase.js'

const problem = document.querySelector('.cardProblem')
const strengths = document.querySelector('.cardStrengths')
const causes = document.querySelector('.cardCauses')
const objectiveG = document.querySelector('.cardObjectiveG')
const objectiveE = document.querySelector('.cardObjectiveE')
const propuesta = document.querySelector('.cardPropuesta')
const impact = document.querySelector('.cardImpact')
const actividades = document.querySelector('.cardActividades')
const recursos = document.querySelector('.cardRecursos')
const partnerships = document.querySelector('.cardPartnerships')
const commitments = document.querySelector('.cardCommitments')

const opcionProblem = document.querySelector('.problemOpcions')
const opcionStrengths = document.querySelector('.strengthsOpcions')
const opcionCauses = document.querySelector('.causesOpcions')
const objGOpcions = document.querySelector('.objectivegOpcions')
const objEOpcions = document.querySelector('.objectiveeOpcions')
const opcionPropuesta = document.querySelector('.propuestaOpcions')
const opcionImpact = document.querySelector('.impactOpcions')
const opcionActividades = document.querySelector('.actividadesOpcions')
const opcionRecursos = document.querySelector('.recursosOpcions')
const opcionPartnerships = document.querySelector('.partnershipsOpcions')
const opcionCommitments = document.querySelector('.commitmentsOpcions')
const addMeth = document.querySelectorAll('.addMethodology')

const librayBtt = document.querySelector('.libray')

const methodologyOne = document.querySelectorAll('.methodologyOne')
const nameProject = document.querySelector('.nameProject')
const community = document.querySelector('.community')
const date = document.querySelector('.date')

const textProblem = document.querySelector('.textProblem')
const textcauses = document.querySelector('.textcauses')

const quadrantCause = document.querySelector('.causes')
const causesSpan = document.querySelector('.causesSpan')
const causesNum = document.querySelector('.causesNum')

const quadrantstrengths = document.querySelector('.strengths')
const strengthsSpan = document.querySelector('.strengthsSpan')
const strengthsNum = document.querySelector('.strengthsNum')

const quadrantOG = document.querySelector('.objGeneral')
const OGSpan = document.querySelector('.objGeneralSpan')
const OGNum = document.querySelector('.objGeneralNum')

var project = ''
var viewDiagnostico = false
var viewFundamentacion = false
var viewObjetivos = false
var viewPropuesta = false
var viewActividades = false
var viewRecursos = false

window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    localStorage.setItem('idProyect', id)

    onGetProyect((querySnapshot) => {
        project = querySnapshot.data()
        console.log(project)
        nameProject.innerHTML = project.proyectName
        community.innerHTML = "Comunidad:" + " " + project.communityName
        date.innerHTML = project.creationDate
        textProblem.innerHTML = project.canva[0].answers

        if(project.canva[2].state){
            textcauses.innerHTML = `${project.canva[2].answers}<br><br>`
            quadrantOG.classList.remove('quadrant--disabled')
            OGSpan.classList.remove('textStyles--disabled')
            OGNum.classList.remove('textStyles__number--disabled')
        }

        if(project.canva[0].state){
    
            quadrantCause.classList.remove('quadrant--disabled')
            causesSpan.classList.remove('textStyles--disabled')
            causesNum.classList.remove('textStyles__number--disabled')

            quadrantstrengths.classList.remove('quadrant--disabled')
            strengthsSpan.classList.remove('textStyles--disabled')
            strengthsNum.classList.remove('textStyles__number--disabled')


        }

    })
})

const authModal = document.createElement('section');
authModal.classList.add('modal');

function create(methodologyName, methodologyId, methodologyObjetive, methodologyTemplate) {
    authModal.innerHTML = `
    <div class="modal__backdrop"></div>

    <article class="modal__content">
    
    <input class="images--icon modal__close" type="image" src="./imgs/x-icon.svg">

        <div class="modal__head">
            <div class= "button--tam">
                <h2 class="textStyles__space--medium">${methodologyName}</h2>
                    <div class="button--container">
                        <a class= "button button--big button--auto bttManual">Modalidad tradicional</a>
                        <a class= "button--border button--big button--auto bttInteractive">Modalidad digital</a>
                    </div>
            </div>

            <div class= "modal__head--img">
                <img class="images--big" src="${methodologyTemplate}">
            </div>
        </div>

    <h3 class="textStyles__space">Acerca de la metodologia</h3>
    <p>${methodologyObjetive}</p> <a href="./methodology.html?id=${methodologyId}&name=${methodologyName}" target="_blank">Lee más acerca de la metodología →</a>

    </article>
`;

    document.body.appendChild(authModal);
}

function appear() {
    const authModalContent = document.querySelector('.modal__content');
    const modalClose = document.querySelector('.modal__close')
    const bttManual = document.querySelector('.bttManual')
    const bttInteractive = document.querySelector('.bttInteractive')


    authModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(handleModalAppear, 1);

    function handleModalAppear() {
        authModal.style.opacity = 1;
        authModalContent.style.transform = 'translate(0px, 0px)';
    }


    function handleCloseModal() {
        authModal.style.opacity = 0;
        authModalContent.style.transform = 'translate(0px, -500px)';
        document.body.style.overflow = 'hidden scroll';
        setTimeout(function () {
            authModal.style.display = 'none';
        }, 500);
    }

    modalClose.addEventListener('click', handleCloseModal);
    bttManual.addEventListener('click', () => {
        getMethodologyName((querySnapshot) => {
            let questions = ''
            let template = ''
            let level = ''
            let evaluate = ''
            var evaluateAns = false

            querySnapshot.forEach((doc) => {

                const methodology = doc.data()
                questions = methodology.questions
                template = methodology.templates[0].url
                level = methodology.level
            });

            if (localStorage.getItem('nameMethodology') === 'Análisis diferenciado del bienestar') {
                evaluate = project.stages[0].answers[counter].answer
                evaluateAns = true
                
            } else {
                evaluate = []
            }
            setTimeout(function () {

                createManualSesion(localStorage.getItem('idUser'), localStorage.getItem('nameMethodology')
                    , questions, evaluate, level, template, localStorage.getItem('idProyect'),evaluateAns)
            }, 500);

        })
    })

    function code() {
        let randomOne = Math.floor(Math.random() * 9)
        let randomTwo = Math.floor(Math.random() * 9)
        let randomThree = Math.floor(Math.random() * 9)
        let randomFour = Math.floor(Math.random() * 9)
        let randomFive = Math.floor(Math.random() * 9)
        let code = randomOne + "" + randomTwo + "" + randomThree + "" + randomFour + "" + randomFive
        return code
    }

    bttInteractive.addEventListener('click', () => {
        localStorage.setItem('codeSesion', code())
        getMethodologyName((querySnapshot) => {
            let questions = ''
            let template = ''
            let level = ''
            let evaluate = ''
            var evaluateAns = false


            querySnapshot.forEach((doc) => {

                const methodology = doc.data()
                questions = methodology.questions
                template = methodology.templates[0].url
                level = methodology.level
            });

            if (localStorage.getItem('nameMethodology') === 'Análisis diferenciado del bienestar') {
                evaluate = project.stages[0].answers
                evaluateAns = true
            } else {
                evaluate = []
            }

            setTimeout(function () {

                createSesion(localStorage.getItem('codeSesion'), localStorage.getItem('idUser'), localStorage.getItem('nameMethodology')
                    ,questions,evaluate, level, template, localStorage.getItem('idProyect'),evaluateAns)
            }, 500);

        })
    })



}

methodologyOne.forEach((elem) => {

    elem.addEventListener('click', (e) => {
        let nameMethodology = elem.textContent
        localStorage.setItem('nameMethodology', nameMethodology)

        getMethodologyName((querySnapshot) => {

            querySnapshot.forEach((doc) => {

                const methodology = doc.data()
                let methodologyName = methodology.name
                let methodologyId = methodology.id
                let methodologyObjetive = methodology.objetive
                let methodologyTemplate = methodology.templates[0].url
                create(methodologyName, methodologyId, methodologyObjetive, methodologyTemplate)
                appear()

            });

        })

    })
})

problem.addEventListener('click', (e) => {

    if (viewDiagnostico) {
        opcionProblem.classList.add('hidden')
        viewDiagnostico = false

    } else {
        opcionProblem.classList.remove('hidden')
        opcionStrengths.classList.add('hidden')
        opcionCauses.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')
        viewDiagnostico = true
    }
})

strengths.addEventListener('click', (e) => {

    if (viewFundamentacion) {
        opcionStrengths.classList.add('hidden')
        viewFundamentacion = false
    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.remove('hidden')
        opcionCauses.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')


        viewFundamentacion = true
    }

})

causes.addEventListener('click', (e) => {

    if (viewFundamentacion) {
        opcionCauses.classList.add('hidden')
        viewFundamentacion = false
    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        opcionCauses.classList.remove('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')


        viewFundamentacion = true
    }

})

objectiveG.addEventListener('click', (e) => {

    if (viewObjetivos) {
        objGOpcions.classList.add('hidden')
        viewObjetivos = false

    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        opcionCauses.classList.add('hidden')
        objGOpcions.classList.remove('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')

        viewObjetivos = true

    }

})

objectiveE.addEventListener('click', (e) => {

    if (viewObjetivos) {
        objEOpcions.classList.add('hidden')
        viewObjetivos = false

    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        opcionCauses.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.remove('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')

        viewObjetivos = true

    }

})
propuesta.addEventListener('click', (e) => {

    if (viewPropuesta) {
        opcionPropuesta.classList.add('hidden')
        viewPropuesta = false
    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        opcionCauses.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.remove('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')

        viewPropuesta = true
    }

})

impact.addEventListener('click', (e) => {

    if (viewPropuesta) {
        opcionImpact.classList.add('hidden')
        viewPropuesta = false
    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        opcionCauses.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.remove('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')

        viewPropuesta = true
    }

})

actividades.addEventListener('click', (e) => {

    if (viewActividades) {
        opcionActividades.classList.add('hidden')
        viewActividades = false
    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.remove('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')

        viewActividades = true
    }

})

recursos.addEventListener('click', (e) => {

    if (viewRecursos) {
        opcionRecursos.classList.add('hidden')
        viewRecursos = false
    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.remove('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.add('hidden')

        viewRecursos = true
    }

})

partnerships.addEventListener('click', (e) => {

    if (viewRecursos) {
        opcionPartnerships.classList.add('hidden')
        viewRecursos = false
    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.remove('hidden')
        opcionCommitments.classList.add('hidden')

        viewRecursos = true
    }

})

commitments.addEventListener('click', (e) => {
    if (viewRecursos) {
        opcionCommitments.classList.add('hidden')
        viewRecursos = false
    } else {
        opcionProblem.classList.add('hidden')
        opcionStrengths.classList.add('hidden')
        objGOpcions.classList.add('hidden')
        objEOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionImpact.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        opcionPartnerships.classList.add('hidden')
        opcionCommitments.classList.remove('hidden')

        viewRecursos = true
    }

})



librayBtt.addEventListener('click', (e) => {
    location.href = './libray.html'
})
//HOVERS

const problemDiv = document.querySelector('.problem')
problemDiv.addEventListener('click', (e) => {
    opcionProblem.classList.remove('hidden')

})

quadrantstrengths.addEventListener('click',()=>{
    opcionStrengths.classList.remove('hidden')

})

quadrantCause.addEventListener('click',()=>{
    opcionCauses.classList.remove('hidden')

})

quadrantOG.addEventListener('click',()=>{
    objectiveG.classList.remove('hidden')

})

addMeth.forEach((elem)=>{
    elem.addEventListener('click',()=>{
        location.href = './libray.html'
    })
})



