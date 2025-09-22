document.addEventListener("DOMContentLoaded", () => {
  // --- UPDATED: Hamburger Menu Toggle ---
  const menuToggle = document.querySelector(".menu_toggle");
  const nav = document.querySelector(".desktop_nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      // Toggle the 'is-open' class on the nav
      nav.classList.toggle("is-open");
      // UPDATED: Also toggle 'is-open' on the button for the animation
      menuToggle.classList.toggle("is-open");

      // Update ARIA attribute for accessibility
      const isOpen = nav.classList.contains("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen);

      // REMOVED: The innerHTML change, as we now use CSS for the animation
    });
  }

  // --- NEW: Mobile Submenu Toggle (FIX) ---
  const submenuToggles = document.querySelectorAll(
    "#menu_links li.has-submenu > a"
  );

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      // Only run this logic on mobile screen sizes
      if (window.innerWidth <= 900) {
        e.preventDefault(); // Stop the '#' link from jumping to top
        const parentLi = toggle.parentElement;

        // Toggle the current submenu
        parentLi.classList.toggle("submenu-open");

        // Optional: Close all other open submenus
        document
          .querySelectorAll("#menu_links li.has-submenu")
          .forEach((li) => {
            if (li !== parentLi) {
              li.classList.remove("submenu-open");
            }
          });
      }
    });
  });

  // --- Slideshow Functionality ---
  const slidesWrapper = document.querySelector(".slides-wrapper");
  if (slidesWrapper) {
    const slides = slidesWrapper.querySelectorAll(".slide");
    const slideCount = slides.length;
    let currentIndex = 0;
    const slideInterval = 3500;
    const slideWidth = 100; // in percentage

    if (slideCount > 0) {
      const firstSlideClone = slides[0].cloneNode(true);
      slidesWrapper.appendChild(firstSlideClone);
    }

    function moveToSlide(index) {
      slidesWrapper.style.transition = "transform 1.2s ease-in-out";
      slidesWrapper.style.transform = `translateX(-${index * slideWidth}%)`;
    }

    function nextSlide() {
      currentIndex++;
      moveToSlide(currentIndex);

      if (currentIndex === slideCount) {
        setTimeout(() => {
          slidesWrapper.style.transition = "none";
          slidesWrapper.style.transform = `translateX(0)`;
          currentIndex = 0;
        }, 1200);
      }
    }
    if (slideCount > 0) {
      setInterval(nextSlide, slideInterval);
    }
  }

  // --- Accordion Functionality ---
  const accordionTitles = document.querySelectorAll(".accordion-title");
  if (accordionTitles.length > 0) {
    accordionTitles.forEach((title) => {
      title.addEventListener("click", function () {
        const item = this.parentElement;
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".accordion-item").forEach((i) => {
          if (i !== item) {
            i.classList.remove("open");
          }
        });

        item.classList.toggle("open");
      });
    });
  }

  // --- Modal Functionality ---
  const modal = document.getElementById("media-modal");
  if (modal) {
    const modalContent = document.getElementById("media-modal-content");
    const closeBtn = document.querySelector(".media-modal-close");

    function openModal(html) {
      modalContent.innerHTML = html;
      modal.classList.add("active");
    }

    document.querySelectorAll(".archive-card img").forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        openModal(
          `<img src="${img.src}" alt="${img.alt}" style="max-width:90vw;max-height:80vh;">`
        );
      });
    });

    document.querySelectorAll(".archive-card video").forEach((video) => {
      video.style.cursor = "pointer";
      video.addEventListener("click", function () {
        const sourceSrc = video.querySelector("source")
          ? video.querySelector("source").src
          : video.src;
        if (sourceSrc) {
          openModal(
            `<video src="${sourceSrc}" controls autoplay style="max-width:90vw;max-height:80vh;"></video>`
          );
        }
      });
    });

    document.querySelectorAll(".archive-card iframe").forEach((iframe) => {
      const clickOverlay = document.createElement("div");
      clickOverlay.style.position = "absolute";
      clickOverlay.style.top = 0;
      clickOverlay.style.left = 0;
      clickOverlay.style.width = "100%";
      clickOverlay.style.height = "100%";
      clickOverlay.style.cursor = "pointer";
      clickOverlay.style.zIndex = "1";
      iframe.parentElement.style.position = "relative";
      iframe.parentElement.appendChild(clickOverlay);

      clickOverlay.addEventListener("click", function () {
        openModal(
          `<iframe src="${iframe.src}" frameborder="0" allowfullscreen style="width:80vw;height:45vw;min-height: 400px; max-width:900px;max-height:80vh;"></iframe>`
        );
      });
    });

    closeBtn.onclick = () => {
      modal.classList.remove("active");
      modalContent.innerHTML = "";
    };
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        modalContent.innerHTML = "";
      }
    };
  }
});
