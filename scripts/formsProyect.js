import {addProyect} from './firebase.js'

//FORM NEW PROJECT
const proyectForm = document.querySelector('.proyectForm')

let idUser = localStorage.getItem('idUser');

proyectForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    var f = new Date();

    let data = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();

    addProyect(idUser, proyectForm.nameProyect.value, proyectForm.communityName.value, data, proyectForm.description.value,'Soy parte',0,'En proceso')

    proyectForm.reset()

})