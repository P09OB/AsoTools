import { onGetSesion} from './firebase.js'

const containedUsers = document.querySelector('.containedUsers')

console.log(localStorage.getItem('codeSesion'))

const nameCode = document.querySelector('.nameCode')

nameCode.innerHTML = localStorage.getItem('codeSesion')

onGetSesion((querySnapshot)=>{
    const sesion = querySnapshot.data()
    let html = ''

    const user = document.createElement('user');
    user.classList.add('modal');
    sesion.users.forEach(element => {
        console.log(element)
       html += `
            <div>${element}</div>
       `;
       containedUsers.innerHTML = html

    });

})