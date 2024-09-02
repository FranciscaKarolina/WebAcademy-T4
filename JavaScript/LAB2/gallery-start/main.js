const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altTexts = {
    'pic1.jpg' : 'Olho humano',
    'pic2.jpg' : 'Rocha',
    'pic3.jpg' : 'Flores roxas',
    'pic4.jpg' : 'Desenho Egipcio',
    'pic5.jpg' : 'Borboleta'
  }
  
/* Looping through images */
for (const img of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${img}`);
    newImage.setAttribute('alt', altTexts[img]);
    thumbBar.appendChild(newImage);

    newImage.addEventListener('click', function(e){
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
    });
}
 /* Wiring up the Darken/Lighten button */
 btn.addEventListener('click', () =>{
    const btnClass = btn.getAttribute('class');

    if (btnClass === 'dark') {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  });
