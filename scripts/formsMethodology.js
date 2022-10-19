import {addMethodology} from './firebase.js'

//FORM NEW PROJECT
const methodologyForm = document.querySelector('.methodologyForm')

methodologyForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    addMethodology(
        methodologyForm.nameMet.value, 
        methodologyForm.objMet.value, 
        methodologyForm.beneMet.value, 
        methodologyForm.level.value,
        methodologyForm.phase.value,
        methodologyForm.dificulty.value,
        methodologyForm.caution.value,
        methodologyForm.time.value
        )

})