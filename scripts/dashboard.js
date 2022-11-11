import { onGetProyects} from './firebase.js'

const cards = document.querySelector('.dashboard__content')
const dashboardEmpaty = document.querySelector('.dashboard__empty')
const welcomeUser = document.querySelector('.welcomeUser')
var project = ''
var tam = 0
let idUser = localStorage.getItem('idUser');

welcomeUser.innerHTML = "Hola,"+" "+localStorage.getItem('nameUser')
onGetProyects((querySnapshot) => {

    let html = ''
    querySnapshot.forEach((doc) => {
        dashboardEmpaty.classList.add('hidden')
         project = doc.data()
        console.log(project)
        tam = (322*project.progress)/100
        html += `
        <a class="listProducts__edit" href="./proyect.html?id=${doc.id}&name=${project.proyectName}">

            <div class="card">
                <div class="card__states">
                    <div class="card__states--level">
                        <div class="card__states--figure"></div>
                        <b> <p class="cardLevel">${project.level}</p> </b> 
                    </div>
                    <div class="card__states--progress">${project.state}</div>
                </div>
                <div class="card__info">
                   <b> <p class="cardName textStyles__body--large">${project.proyectName}</p> </b> 
                    <p class="cardDate textStyles__body--small">${project.creationDate}</p>
                    <p class="cardDescription textStyles__foornote">${project.description}</p>
                </div>
                <div class="card__progress">
                    <div class="card__progress--background">
                        <div  style='	width:${tam}px ' class="card__progress--progressBar progressBar" ></div>
                    </div>
                    <p class="card__porcentaje">${project.progress}%</p>
                </div>
                
            </div>
            
            </a>`

    });
    cards.innerHTML = html;

    
})
