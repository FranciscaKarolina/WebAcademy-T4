//1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

//2. RAW TEXT STRINGS

const storyText = 'Era um dia ensolarado no Peru, com a temperatura de 94 fahrenheit. :insertx: decidiu explorar, mesmo pesando 300 libras. Quando chegaram :inserty:, ficaram maravilhados com o que viram e :insertz:. Bob viu tudo, mas não ficou surpreso — afinal, :insertx: é conhecido por suas aventuras no Peru, e esse dia não foi diferente.';

const insertX = ['Pachacútec', 'Manco Cápac', 'Mama Ocllo'];
const insertY = ['a Machu Picchu', 'as Linhas de Nazca', 'ao Lago Titicaca'];
const insertZ = ['respirou fundo e sentiu a energia ancestral', 'desapareceu na névoa misteriosa', 'dançou com os espíritos dos Incas'];

//3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  //obtém itens aleatórios
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  //substitui pelos itens aleatórios
  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':insertx:', xItem); 
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + ' stone'; // Converte libras em pedras 
    const temperature =  Math.round((94 - 32) * 5 / 9) + ' graus centígrados'; // Converte Fahrenheit para Celsius

    newStory = newStory.replace('300 libras', weight);
    newStory = newStory.replace('94 fahrenheit', temperature);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}