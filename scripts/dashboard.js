import {addProyect, onGetProyects, getUser} from './firebase.js'

const cards = document.querySelector('.dashboard__content')

window.addEventListener('DOMContentLoaded', async ()=>{

   // const onSnapshot = await getUser()


    let idUser = localStorage.getItem('idUser');

    onGetProyects((querySnapshot)=>{

    let html = ''

        querySnapshot.forEach((doc) => {
            const project = doc.data()
            console.log(project)
            html +=  `
            <div class="card">
                <div class="card__states">
                    <div class="card__states--level">
                        <div class="card__states--figure"></div>
                        <p class="cardLevel">${project.level}</p>
                    </div>
                    <div class="card__states--progress">${project.state}</div>
                </div>
                <div class="card__info">
                    <p class="cardName">${project.proyectName}</p>
                    <p class="cardDate">${project.creationDate}</p>
                    <p class="cardDescription">${project.description}</p>
                </div>
                <div class="card__progress">
                    <div class="card__progress--background">
                        <div class="card__progress--progressBar progressBar"></div>
                    </div>
                    <p class="card__porcentaje">4%</p>
                </div>
                
            </div>`

        });

        cards.innerHTML = html;
    })


    
})



