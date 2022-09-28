import {addProyect} from './firebase.js'

//FORM NEW PROJECT
const proyectForm = document.querySelector('.proyectForm')

proyectForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    var f = new Date();
    let data = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();

    addProyect(proyectForm.nameProyect.value,
        proyectForm.communityName.value,
        data,
        proyectForm.description.value,
        'somos parte',
        0,
        'En proceso'
        )

})