import { onGetMethodologies } from './firebase.js'


const cards = document.querySelector('.dashboard__methodology'),
addBtt = document.querySelector('.addBtt')

window.addEventListener('DOMContentLoaded',()=>{

    onGetMethodologies((querySnapshot)=>{

        let html = ''
        querySnapshot.forEach((doc) => {
            const methodology = doc.data()
            console.log(methodology)
            html += `
            
            <a class="methodology" href="./methodology.html?id=${methodology.id}&name=${methodology.name}">
            <div class="card__methodology">
                    <div class="card__methodology--process">${methodology.phase}</div>
                    <h3 class="">${methodology.name}</h3>
                </div>
             </a>
            `
            
        });
    
        cards.innerHTML = html
    
    })
})

addBtt.addEventListener('click',()=>{
    location.href = "./formsMethodology.html";

})