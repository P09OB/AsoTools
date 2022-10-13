import { onGetProyects } from './firebase.js'

const cards = document.querySelector('.dashboard__content')
const dashboardEmpaty = document.querySelector('.dashboard__empty')

let idUser = localStorage.getItem('idUser');

onGetProyects((querySnapshot) => {

    let html = ''
    querySnapshot.forEach((doc) => {
        dashboardEmpaty.classList.add('hidden')
        const project = doc.data()
        console.log(project)
        html += `
        <a class="listProducts__edit" href="./proyect.html?id=${doc.id}&name=${project.proyectName}">

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
                
            </div>
            
            </a>`

    });

    cards.innerHTML = html;
})
