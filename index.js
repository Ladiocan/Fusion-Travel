let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementById("slide-point");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex"; 
}

window.setInterval(function(){
  plusSlides(1);
}, 2000);

function calculatePrice (){
  
  roomsNumber = document.getElementById("room").value;
  nightsNumber = document.getElementById("night").value;
  personsNumber = document.getElementById("person").value;
  document.getElementById("result").innerHTML = ((personsNumber * nightsNumber) * roomsNumber) * 75 + " " + "lei";
}

function openForm(){
  var elms = document.getElementsByClassName ("center hideform")
  
  Array.from(elms).forEach((x) => {
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  })
}

