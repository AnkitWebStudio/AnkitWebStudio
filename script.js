function toggleMenu(){
    document.getElementById("sidebar").classList.toggle("active");


document.getElementById("overlay1")
    .classList.toggle("active");



}


function backsidebar(){


document.getElementById("sidebar").classList.remove("active");
document.getElementById("overlay1").classList.remove("active");



}
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

window.onload = function () {
  window.scrollTo(0, 0);
}







const elements = document.querySelectorAll('.fade-up, .fade-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(el => observer.observe(el));
