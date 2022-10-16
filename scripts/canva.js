import { getMethodologyName, onGetProyect,createSesion } from './firebase.js'

const params = new URLSearchParams(location.search);
const id = params.get('id');
localStorage.setItem('idProyect',id)

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

const methodologyOne = document.querySelectorAll('.methodologyOne')

var viewDiagnostico = false
var viewFundamentacion = false
var viewObjetivos = false
var viewPropuesta = false
var viewActividades = false
var viewRecursos = false

window.addEventListener('DOMContentLoaded', async()=>{

const querySnapshot = await onGetProyect()

querySnapshot.forEach( (doc)=>{
    const project = doc.data()
    console.log(project)


})
})

const authModal = document.createElement('section');
authModal.classList.add('modal');

function create (methodologyName,methodologyId,methodologyObjetive) {
    authModal.innerHTML = `
    <div class="modal__backdrop"></div>

    <article class="modal__content">
    
    <input class="images--icon modal__close" type="image" src="./imgs/x-icon.svg">

        <div class="modal__head">
            <div class= "modal__head--items">
                <h2>${methodologyName}</h2>
                <a class= "button button--simple bttManual" href="./manualTemplate.html?id=${methodologyId}&name=${methodologyName}">Llenar manualmente</a>
                <a class= "button--border button--simple bttInteractive">Desarrollar ahora</a>
            </div>

            <div class= "modal__head--img">
                <img class="images--big" src="arbolCompromisos.png">
            </div>
        </div>

    <h3>Acerca de la metodologia</h3>
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
    bttManual.addEventListener('click', ()=>{

    })

    function code () {
        let randomOne = Math.floor(Math.random() * 9)
        let randomTwo = Math.floor(Math.random() * 9)
        let randomThree = Math.floor(Math.random() * 9)
        let randomFour = Math.floor(Math.random() * 9)
        let randomFive = Math.floor(Math.random() * 9)
        let code = randomOne+""+randomTwo+""+randomThree+""+randomFour+""+randomFive
        return code
    }
    
    bttInteractive.addEventListener('click',()=>{
        localStorage.setItem('codeSesion', code())
        createSesion(localStorage.getItem('codeSesion'), localStorage.getItem('idUser'), localStorage.getItem('nameMethodology'))
    })



}

methodologyOne.forEach((elem) => {

    elem.addEventListener('click', (e) => {
        let nameMethodology = elem.textContent
        localStorage.setItem('nameMethodology', nameMethodology)
        console.log(localStorage.getItem('nameMethodology'))

        getMethodologyName((querySnapshot) => {

            querySnapshot.forEach((doc) => {
        
                const methodology = doc.data()
                 let methodologyName = methodology.name
                 let methodologyId = methodology.id
                 let methodologyObjetive = methodology.objetive
                 create(methodologyName,methodologyId,methodologyObjetive)
                 appear()

            });
        
        })

    })
})

diagnostico.addEventListener('click', (e) => {

    if (viewDiagnostico) {
        opcionDiagnostico.classList.add('hidden')
        viewDiagnostico = false

    } else {
        opcionDiagnostico.classList.remove('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        viewDiagnostico = true
    }
})

fundamentacion.addEventListener('click', (e) => {

    if (viewFundamentacion) {
        opcionFundamentacion.classList.add('hidden')
        viewFundamentacion = false
    } else {
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.remove('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        viewFundamentacion = true
    }

})

objetivos.addEventListener('click', (e) => {

    if (viewObjetivos) {
        objOpcions.classList.add('hidden')
        viewObjetivos = false

    } else {
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.remove('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        viewObjetivos = true

    }

})

propuesta.addEventListener('click', (e) => {

    if (viewPropuesta) {
        opcionPropuesta.classList.add('hidden')
        viewPropuesta = false
    } else {
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.remove('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.add('hidden')
        viewPropuesta = true
    }

})

actividades.addEventListener('click', (e) => {

    if (viewActividades) {
        opcionActividades.classList.add('hidden')
        viewActividades = false
    } else {
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.remove('hidden')
        opcionRecursos.classList.add('hidden')
        viewActividades = true
    }

})

recursos.addEventListener('click', (e) => {

    if (viewRecursos) {
        opcionRecursos.classList.add('hidden')
        viewRecursos = false
    } else {
        opcionDiagnostico.classList.add('hidden')
        opcionFundamentacion.classList.add('hidden')
        objOpcions.classList.add('hidden')
        opcionPropuesta.classList.add('hidden')
        opcionActividades.classList.add('hidden')
        opcionRecursos.classList.remove('hidden')
        viewRecursos = true
    }

})



