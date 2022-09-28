import {createUser, checkUser} from './firebase.js'

window.addEventListener('DOMContentLoaded',()=>{
})

//FORM
const userForm = document.querySelector('.authform')
const username = document.querySelector('.label-name')
const userEmail = document.querySelector('.email')
const userPassword = document.querySelector('.password')

const titleForm = document.querySelector('.titleForm')
const textForm = document.querySelector('.textForm')

const loginButton = document.querySelector('.button-login')
const signUpButton = document.querySelector('.button-signUp')

const loginLink = document.querySelector('.link-login')
const signUpLink = document.querySelector('.link-signUp')
let isLogin = true;



loginLink.addEventListener('click',(e)=>{
    e.preventDefault()

    titleForm.innerHTML = 'Inicia Sesión'
    textForm.innerHTML = 'Ingresa con tu correo y contraseña para acceder a los recursos que te ofrecemos.'

    username.classList.add('hidden')
    signUpButton.classList.add('hidden')
    loginLink.classList.add('hidden')

    signUpLink.classList.remove('hidden')
    loginButton.classList.remove('hidden')


})

signUpLink.addEventListener('click',(e)=>{
    e.preventDefault()

    titleForm.innerHTML = 'Regístrate'
    textForm.innerHTML = 'Unete AsoTools para acceder a los recursos que te ofrecemos.'

    username.classList.remove('hidden')
    signUpButton.classList.remove('hidden')
    loginLink.classList.remove('hidden')

    signUpLink.classList.add('hidden')
    loginButton.classList.add('hidden')

    //createUser(userEmail.value,userPassword.value)

    
})

loginButton.addEventListener('click',()=> isLogin = true)
signUpButton.addEventListener('click',()=> isLogin = false)


userForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(isLogin){

        checkUser(userForm.email.value,userForm.password.value)

    } else{
        createUser(userForm.name.value,userForm.email.value,userForm.password.value)
    }

    userForm.reset()

})