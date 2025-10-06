// This runs after the HTML document has been fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // --- Hamburger Menu Logic ---
  const menuToggle = document.querySelector(".menu_toggle");
  const nav = document.querySelector(".desktop_nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      // Toggle 'is-open' class on both the button (for animation) and nav (to show/hide)
      nav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open");

      // Update ARIA for accessibility (tells screen readers if menu is open)
      const isOpen = nav.classList.contains("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  // --- Mobile Submenu Dropdown Logic ---
  const submenuLinks = document.querySelectorAll(
    "#menu_links li.has-submenu > a"
  );

  submenuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Only activate this click logic on mobile screen sizes
      if (window.innerWidth <= 900) {
        event.preventDefault(); // Prevent link from navigating
        const parentListItem = link.parentElement;

        // Toggle the '.submenu-open' class on the clicked item
        parentListItem.classList.toggle("submenu-open");

        // Optional: Close other submenus that might be open
        submenuLinks.forEach((otherLink) => {
          if (otherLink.parentElement !== parentListItem) {
            otherLink.parentElement.classList.remove("submenu-open");
          }
        });
      }
    });
  });

  // --- Homepage Slideshow Logic ---
  const slidesWrapper = document.querySelector(".slides-wrapper");
  if (slidesWrapper) {
    const slides = slidesWrapper.querySelectorAll(".slide");
    const slideCount = slides.length;
    let currentIndex = 0;

    // 1. Clone the first slide and add it to the end for a seamless loop
    if (slideCount > 0) {
      const firstSlideClone = slides[0].cloneNode(true);
      slidesWrapper.appendChild(firstSlideClone);
    }

    // 2. Set an interval to advance the slide every 3.5 seconds
    setInterval(() => {
      currentIndex++;
      slidesWrapper.style.transition = "transform 1.2s ease-in-out";
      slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

      // 3. Reset to the beginning when it reaches the cloned slide
      if (currentIndex === slideCount) {
        setTimeout(() => {
          slidesWrapper.style.transition = "none"; // Remove animation for the jump
          slidesWrapper.style.transform = `translateX(0)`; // Jump to the start
          currentIndex = 0;
        }, 1200); // This delay must match the transition duration
      }
    }, 3500); // Time between slides
  }

  // --- Archives Page Accordion Logic ---
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const title = item.querySelector(".accordion-title");
      title.addEventListener("click", () => {
        // Close all other items
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open");
          }
        });
        // Toggle the current item
        item.classList.toggle("open");
      });
    });
  }

  // --- Archives Page Media Modal (Popup) Logic ---
  const modal = document.getElementById("media-modal");
  if (modal) {
    const modalContent = document.getElementById("media-modal-content");
    const closeButton = document.querySelector(".media-modal-close");

    // Function to open the modal with specific content
    function openModal(htmlContent) {
      modalContent.innerHTML = htmlContent;
      modal.classList.add("active");
    }

    // Function to close the modal
    function closeModal() {
      modal.classList.remove("active");
      modalContent.innerHTML = ""; // Clear content to stop videos
    }

    // Add click listeners to all images in archive cards
    document.querySelectorAll(".archive-card img").forEach((img) => {
      img.classList.add("modal-trigger");
      img.addEventListener("click", () => {
        openModal(
          `<img src="${img.src}" alt="${img.alt}" class="modal-image">`
        );
      });
    });

    // Add click listeners to all videos in archive cards
    document.querySelectorAll(".archive-card video").forEach((video) => {
      video.classList.add("modal-trigger");
      video.addEventListener("click", () => {
        const source = video.querySelector("source")?.src || video.src;
        if (source) {
          openModal(
            `<video src="${source}" controls autoplay class="modal-video"></video>`
          );
        }
      });
    });

    // Add click listeners to iframe overlays
    document.querySelectorAll(".archive-card iframe").forEach((iframe) => {
      const overlay = document.createElement("div");
      overlay.className = "iframe-click-overlay";
      iframe.parentElement.appendChild(overlay);

      overlay.addEventListener("click", () => {
        openModal(
          `<iframe src="${iframe.src}" allowfullscreen class="modal-iframe"></iframe>`
        );
      });
    });

    // Close modal events
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      // Close if the user clicks on the dark background area
      if (event.target === modal) {
        closeModal();
      }
    });
  }
  // --- NEW: Dynamic Scroll Animation Logic ---
  // Create an observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Find all elements you want to animate
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

  // Tell the observer to watch each of them
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});
