window.addEventListener("load", () => {
  document.querySelector(".heading").classList.add("visible");
});

window.addEventListener("scroll", () => {
  const quote = document.querySelector(".quote");
  if (quote.getBoundingClientRect().top < window.innerHeight * 0.7) {
    quote.classList.add("visible");
  }
});

const bg = document.querySelector(".bg-image");
window.addEventListener("scroll", () => {
  bg.style.transform = `translateY(${-window.scrollY * 0.3 - 120}px)`;
});

document.querySelectorAll('a[href="songs.html"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.body.classList.add("page-exit");
    document.body.offsetHeight;
    setTimeout(() => {
      window.location.href = "songs.html";
    }, 450);
  });
});


