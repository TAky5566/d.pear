const fillterbuttons = document.querySelectorAll(".filter li");

fillterbuttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    fillterbuttons.forEach((Element) => {
      Element.classList.remove("active");
    });
    let boxes = document.querySelectorAll(".filter-content .all");
    let target = e.target.dataset.target;

    // Add smooth transition
    boxes.forEach((box) => {
      if (box.classList.contains(target)) {
        box.classList.remove("hide");
        box.classList.add("show");
      } else {
        box.classList.remove("show");
        box.classList.add("hide");
        box.style.animation="";
      }
    });
    e.target.classList.add("active");
  });
});

  const myCarousel = document.querySelector('#clientCarousel');
  const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000, // كل 3 ثواني
    ride: 'carousel'
  });