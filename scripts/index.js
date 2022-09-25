import {saveUser} from './firebase.js'

window.addEventListener('DOMContentLoaded',()=>{
    console.log("comenzar")
})

const userForm = document.querySelector('.authform')

userForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('submitted')

    //const emailAddress = userForm.email.value;

    saveUser(userForm.email.value)

    userForm.reset()

})