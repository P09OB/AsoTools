import {getmethodology} from './firebase.js'

const params = new URLSearchParams(location.search);
const id = params.get('id');
localStorage.setItem('idMethodology',id)

if (!id) {
    location.href = "./libray.html";
}

window.addEventListener('DOMContentLoaded', async()=>{
    const querySnapshot = await getmethodology()
    console.log(querySnapshot)

    querySnapshot.forEach( (doc)=>{
        console.log('hola')

        const project = doc.data()
        var number = project.steps.length
        //HTML
    for (let i = 0; i < number; i++) {
        //PASOS
        console.log(project.steps[i])
    }
    })

})

