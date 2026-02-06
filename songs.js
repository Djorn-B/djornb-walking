// ------------------ SONG DROPDOWN ------------------
function openSong(song) {
  const dropdown = song.querySelector(".song-dropdown");
  const audio = song.querySelector(".preview-audio");
  const volume = song.querySelector(".volume-slider");
  const pauseBtn = song.querySelector(".pause-btn");

  const openDropdown =
    document.querySelector(".song-dropdown.open");

  // stop all audio immediately
  document.querySelectorAll("audio").forEach(a => {
    a.pause();
    a.currentTime = 0;
  });

  // function that actually opens + scrolls
  function openAndScroll() {
    dropdown.classList.add("open");

    audio.volume = 0.5;
    volume.value = 0.5;
    audio.muted = false;
    audio.play().catch(() => {});
    pauseBtn.textContent = "⏸";

    // wait one frame AFTER open so layout is final
    requestAnimationFrame(() => {
      const headerOffset =
        document.querySelector(".chapter-head").offsetHeight;

      const image =
        song.querySelector(".song-image-wrapper");
      if (!image) return;

      const rect = image.getBoundingClientRect();
      const imageCenter =
        rect.top +
        window.pageYOffset +
        rect.height / 2;

      const y =
        imageCenter -
        window.innerHeight / 2 -
        headerOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    });
  }

  // if another dropdown is open, wait for it to FINISH closing
  if (openDropdown && openDropdown !== dropdown) {
    openDropdown.addEventListener(
      "transitionend",
      function handler(e) {
        if (e.propertyName !== "max-height") return;
        openDropdown.removeEventListener(
          "transitionend",
          handler
        );
        openAndScroll();
      }
    );

    openDropdown.classList.remove("open");
  } else {
    openAndScroll();
  }
}


// ------------------ CLICK HANDLERS ------------------
document.querySelectorAll(".song").forEach(song => {
  const button = song.querySelector(".song-button");
  const dropdown = song.querySelector(".song-dropdown");
  const audio = song.querySelector(".preview-audio");
  const pauseBtn = song.querySelector(".pause-btn");
  const volume = song.querySelector(".volume-slider");
  const muteBtn = song.querySelector(".mute-btn");
  const volLow = song.querySelector(".vol-icon.low");

  // open / close on title click
  button.addEventListener("click", () => {
    if (dropdown.classList.contains("open")) {
      dropdown.classList.remove("open");
      audio.pause();
      audio.currentTime = 0;
      return;
    }
    openSong(song);
  });

  // pause button
  pauseBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      pauseBtn.textContent = "⏸";
    } else {
      audio.pause();
      pauseBtn.textContent = "▶";
    }
  });

  // volume slider
  volume.addEventListener("input", () => {
    audio.volume = volume.value;
    audio.muted = volume.value == 0;
  });

  // mute icon
  volLow.addEventListener("click", () => {
    audio.muted = true;
    volume.value = 0;
  });

  // mute button
  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
  });
});

// ------------------ BACKGROUND PARALLAX ------------------
const bg = document.querySelector(".bg-container img");
window.addEventListener("scroll", () => {
  bg.style.transform = `translateY(${window.scrollY * -0.15}px) scale(1.1)`;
});

// ------------------ SCROLL PROGRESS & ACTIVE SONG TITLE ------------------
const chapterTitle = document.querySelector(".chapter-title");
const chapterFill = document.querySelector(".chapter-fill");
const songs = [...document.querySelectorAll(".song")];

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  chapterFill.style.width = `${(scrollTop / docHeight) * 100}%`;

  const viewportMid = window.innerHeight * 0.45;
  let activeSong = null;

  songs.forEach(song => {
    const rect = song.getBoundingClientRect();
    if (rect.top < viewportMid && rect.bottom > viewportMid) {
      activeSong = song;
    }
  });

  if (activeSong) {
    const titleEl = activeSong.querySelector(".song-title");
    if (titleEl) chapterTitle.textContent = titleEl.textContent;
  }
});

// ------------------ HOME BUTTON ------------------
document.getElementById("home-button").addEventListener("click", () => {
  window.location.href = "index.html";
});

// ------------------ BACK TO TOP BUTTON ------------------
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

