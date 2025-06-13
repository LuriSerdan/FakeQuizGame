const swipe = Swipe();

const API = {
  BASE_URL: 'http://localhost:8080'
}

const cards = []

function convertKeysToLowerCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToLowerCase(item));
  } else if (obj !== null && obj !== undefined && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.toLowerCase(),
        convertKeysToLowerCase(value)
      ])
    );
  }
  return obj;
}

function Card(text, fake, justificativa) {
  const div = document.createElement('div');
  div.className = 'card';
  div.textContent = text;
  document.querySelector('.card-container').prepend(div);
  return { isFake: fake, justificativa, conteudo: text }
}


function onError() {
  //TODO: implementar caso aconteça um erro
}

swipe.onend = () => {
  localStorage.removeItem('state');
  alert('voce ganhou :)');
}

swipe.onchoice = choice => {
  if (choice == cards[0].isFake) alert(cards[0].justificativa);
  cards.shift();
  document.querySelector('.contador').textContent = `${cards.length}`
  localStorage.setItem('state', JSON.stringify(cards));

}

async function fetchFakes() {
  const res = await fetch(`${API.BASE_URL}/fakes/get`);
  return convertKeysToLowerCase(await res.json());
} 

async function main() {
  const isNewGame = localStorage.getItem('newGame');
  localStorage.removeItem('newGame');

  if (isNewGame) localStorage.removeItem('state')
  const fakes = isNewGame ? await fetchFakes() : JSON.parse(localStorage.getItem('state'));

  fakes.forEach(fake => {
    console.log(fake)
    const card = Card(fake.conteudo, fake.fake, fake.justificativa);
    cards.push(card);
  })
}



window.onload = async ev => {
  await main();
  document.querySelector('.contador').textContent = `${cards.length}`
}