import { logOut} from './firebase.js'

const nav = document.querySelector('.nav');

nav.innerHTML=`
<div class="nav__menu">
            <a class="nav__logo logo" href="./home.html"> <img class="nav__logo--img" src="imgs/logo-white.png"></a>
            <a class="nav__element nav__desaparecer textStyles--white hidden inicio" href="./index.html">Inicio</a>
            <a class="nav__element nav__desaparecer proyects textStyles--white" href="./home.html">Mis proyectos</a>
            <a class="nav__element nav__desaparecer metho textStyles--white" href="./libray.html">Metodologías</a>
            <a class="nav__element nav__desaparecer textStyles--white" href="./levels.html">Ruta</a>
        </div>
        <div class="nav__profile profile">
                <h4 class="textStyles__space--small">${localStorage.getItem('nameUser')
            }</h4>
                <a class= "nav__element logOut">Cerrar sesión</a>
        </div>
`;


const logOutBtt = document.querySelectorAll('.logOut')
logOutBtt.forEach((elem)=>{
    elem.addEventListener('click',()=>{
        logOut()
    })
})


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {

    nav.style.backgroundColor = "#126A3A";
    
  } else {
    nav.style.backgroundColor = "#5C9247";
  
  }
}

const proyects = document.querySelectorAll('.proyects')
const metho = document.querySelectorAll('.metho')
const profile = document.querySelectorAll('.profile')
const inicio = document.querySelectorAll('.inicio')
const logo = document.querySelectorAll('.logo')

if(localStorage.getItem('idUser')== null){

  proyects.forEach((elem)=>{
    elem.classList.add('hidden')

  })
  metho.forEach((elem)=>{
    elem.classList.add('hidden')

  })
  profile.forEach((elem)=>{
    elem.classList.add('hidden')
  })

  inicio.forEach((elem)=>{
    elem.classList.remove('hidden')
  })

  logo.forEach((enlace)=>{
    enlace.href = './index.html'
  })

} else{
  proyects.forEach((elem)=>{
    elem.classList.remove('hidden')

  })
  metho.forEach((elem)=>{
    elem.classList.remove('hidden')

  })
  profile.forEach((elem)=>{
    elem.classList.remove('hidden')
  })
  inicio.forEach((elem)=>{
    elem.classList.add('hidden')
  })
}
