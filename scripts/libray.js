import { onGetMethodologies } from './firebase.js'


const cards = document.querySelector('.dashboard__methodology'),
addBtt = document.querySelector('.addBtt'),
cardMeth = document.querySelectorAll('.card__methodology')
let level = ''


window.addEventListener('DOMContentLoaded',()=>{

    onGetMethodologies((querySnapshot)=>{

        let html = ''
        let color = ''
        let secondColor = ''
        querySnapshot.forEach((doc) => {
            const methodology = doc.data()
            if(methodology.level == 'Soy parte'){
                color = 'card--soyParte'; 
                secondColor = 'card--soyParte--second';
            } 
            if(methodology.level == 'Somos parte'){
                color = 'card--somosParte'; 
                secondColor = 'card--somosParte--second';
            }  
            if(methodology.level == 'Tomamos parte'){
                color =  'card--tomamosParte';
                secondColor = 'card--tomamosParte--second';
            }

            html += `
            
            <a class="methodology" href="./methodology.html?id=${methodology.id}&name=${methodology.name}">
            <div class="card__methodology ${color}" style="background-image: url(${methodology.profilePicture[0].url})">
                    <div class="card__methodology--process ${secondColor}">${methodology.phase}</div>
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
