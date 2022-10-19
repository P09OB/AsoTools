import { logOut} from './firebase.js'

var nameUser = ''


const nav = document.querySelector('.nav');

nav.innerHTML=`
<div class="nav__menu">
            <a class="nav__logo" href="./index.html"> <img class="nav__logo--img" src="imgs/logo-white.png"></a>
            <a class="nav__element nav__desaparecer textStyles--white" href="./home.html">Inicio</a>
            <a class="nav__element nav__desaparecer textStyles--white" href="./libray.html">Metodologías</a>
        </div>
        <div class="nav__profile">
                <h4 class="nav__element nav__desaparecer">${localStorage.getItem('nameUser')
            }</h4>
                <a class= "logOut">Cerrar sesión</a>
        </div>
`;


const logOutBtt = document.querySelectorAll('.logOut')
logOutBtt.forEach((elem)=>{
    elem.addEventListener('click',()=>{
        logOut()
    })
})
