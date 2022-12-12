// I use Glider library to show my fotos
//
//
window.addEventListener('load', function(){
  new Glider(document.querySelector('.glider'), {
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });

  // I show an overlay with a big version of foto on click
  //
  //
  const initClickHandler = () => {
    const imageOverview = document.querySelectorAll('.zoomable');
    imageOverview.forEach((el) => {
    el.addEventListener('click', (event) => {
      const image = event.target.querySelector('img');
      const src = image.getAttribute('src'); 
      createOverlay(src);
      });
  })}; 
   initClickHandler();
  const createOverlay = (src) => {
    const fullPage = document.querySelector('#fullpage');
    fullPage.style.backgroundImage = "url('" + src + "')";
    fullPage.style.display = 'block';
  };

// I found an API with random Cats fotos and use a random foto for a comment. 
// By a click on the button "Bild ändern" you can get another random foto of a cat

const changeFoto = document.querySelector('#bildNew');
changeFoto.addEventListener('click', (event) => {
const url = `https://api.thecatapi.com/v1/images/search`;  
fetch(url)
.then((response) => {
return response.json();
})
.then((data) => {
  let imagesData = data;
  imagesData.map(function(imageData) {
    
    let image = document.getElementById('fotoKomment');
    //use the url from the image object
    image.src = `${imageData.url}`;
    });
})
.catch(function(error) {
   console.log(error);
});
  
});
});

// I take data from the form and create a comment in DOM

function submitKomment(theForm) {
  console.log(theForm);
  const Vorname = theForm.vorname.value;
  const Nachname = theForm.nachname.value;
  const Kommentar = theForm.frage2.value;
  const rad = theForm.country.value;
  const email = theForm.email.value;

  // I ask user to tell about the contry they are from
  //
  //
  if (!rad) { 
    alert('Enter Location');
    return false;
   }

   // I take the Template, copy it and put data from the form
   //
   // 
  else {
  const MyDivKomment = document.querySelector('#kommentFormTemplate');
  var clone = MyDivKomment.cloneNode(true);
  clone.id='kommentForm';

  clone.querySelector('#KommentorName').innerHTML = Vorname;
  clone.querySelector('#KommentarText').innerHTML = rad;
  clone.querySelector('#KommentorSecondName').innerHTML = Nachname;
  clone.querySelector('#KommentarMy').innerHTML = Kommentar;
  clone.querySelector('#thisFoto').src = theForm.querySelector('#fotoKomment').src;
  document.querySelector('#CommentList').appendChild(clone);
  return false;
  }
  } 

