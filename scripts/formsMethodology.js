import { addMethodology } from './firebase.js'

//FORM NEW PROJECT
const methodologyForm = document.querySelector('.methodologyForm');
const stepsForm = document.querySelector('.stepsForm');
const questionsForm = document.querySelector('.questionsForm')
const methoImages = document.querySelector('.productForm__images');
const porfileImage = document.querySelector('.productForm__image');
const templateExample = document.querySelector('.productForm__examples');

const addStepBttn = document.querySelector('.addStepBttn');
const steps = document.querySelector('.steps')
const questions = document.querySelector('.questions')
const nextBtt = document.querySelector('.nextBtt')
const nextBttQues = document.querySelector('.nextBttQues')
const addQuestionsBttn = document.querySelector('.addQuestionsBttn')
const picturesForm = document.querySelector('.pictures')
const stepsArray = []
const questionsArray = []
let templatesFiles = [];
let profileFiles = [];
let templatesExamples = [];


methodologyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    methodologyForm.classList.add("hidden")
    stepsForm.classList.remove("hidden")

})

addStepBttn.addEventListener('click',(e)=>{
    e.preventDefault()

    stepsArray.push(stepsForm.stepsMet.value)
    nextBtt.classList.remove('hidden')
    steps.innerHTML = ''
    var cantidad = 0
    stepsArray.forEach((docs)=>{
            cantidad += 1
            const step = document.createElement('div');
            step.classList.add('methodology--steps')
            step.innerHTML = `
            <h3 class="textStyles--darkGreen methodology--number">${cantidad}</h3>
            <p class= "productForm__text">${docs}</p>
            <div class= "icono">
            <span class="input__icon glyphicon icon-input icono__edit"></span>
            <span class="input__icon glyphicon icon-input icono__trash"></span>
            </div>
            `
            steps.appendChild(step)
    
    })

})

nextBtt.addEventListener('click',(e)=>{
    e.preventDefault()
    questionsForm.classList.remove('hidden')
    stepsForm.classList.add("hidden")

})

addQuestionsBttn.addEventListener('click',(e)=>{
    e.preventDefault()

    questionsArray.push(questionsForm.questionsMet.value)
    nextBttQues.classList.remove('hidden')
    questions.innerHTML = ''
    var cantidad = 0
    questionsArray.forEach((docs)=>{
            cantidad += 1
            const question = document.createElement('div');
            question.classList.add('methodology--question')
            question.innerHTML = `
            <h3 class="textStyles--darkGreen methodology--number">${cantidad}</h3>
            <p class= "productForm__text">${docs}</p>
            <div class= "icono">
            <span class="input__icon glyphicon icon-input icono__edit"></span>
            <span class="input__icon glyphicon icon-input icono__trash"></span>
            </div>
            `
            questions.appendChild(question)
    
    })
})

nextBttQues.addEventListener('click',(e)=>{
    e.preventDefault()
    questionsForm.classList.add('hidden')
    picturesForm.classList.remove('hidden')
})




picturesForm.image.addEventListener('change', () => {
    const file = picturesForm.image.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        const productImg = document.createElement('img');
        productImg.classList.add('productForm__img');
        productImg.setAttribute('src', e.target.result);
        methoImages.appendChild(productImg);
    }
    reader.readAsDataURL(file);
    templatesFiles.push(file);

});

picturesForm.porfileImag.addEventListener('change',()=>{
    const file = picturesForm.porfileImag.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        const profileImg = document.createElement('img');
        profileImg.classList.add('productForm__imgs');
        profileImg.setAttribute('src', e.target.result);
        porfileImage.appendChild(profileImg);
    }
    reader.readAsDataURL(file);
    profileFiles.push(file);
    
})

picturesForm.templateExample.addEventListener('change',()=>{
    const file = picturesForm.templateExample.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        const profileExample = document.createElement('img');
        profileExample.classList.add('productForm__example');
        profileExample.setAttribute('src', e.target.result);
        templateExample.appendChild(profileExample);
    }
    reader.readAsDataURL(file);
    templatesExamples.push(file);
    
})

picturesForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(questionsArray)
    addMethodology(
        methodologyForm.nameMet.value,
        methodologyForm.objMet.value,
        methodologyForm.beneMet.value,
        methodologyForm.level.value,
        methodologyForm.phase.value,
        methodologyForm.dificulty.value,
        methodologyForm.caution.value,
        methodologyForm.time.value,
        stepsArray,
        questionsArray,
        templatesFiles,
        profileFiles,
        templatesExamples
    )

    methodologyForm.reset()
    stepsForm.reset()
    questionsForm.reset()
    picturesForm.reset()
})
