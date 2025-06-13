const state = JSON.parse(localStorage.getItem('state'));

document.querySelector('.novo-jogo').onclick = function(ev) {
    ev.preventDefault();
    localStorage.setItem('newGame', true)
    window.location.replace(this.getAttribute('href'));
}

if (!state) document.querySelector('.continue').onclick = ev => ev.preventDefault();
document.querySelector('.continue').disabled = state == null;