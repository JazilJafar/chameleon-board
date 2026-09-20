document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const menuButton = document.getElementById("menuButton");
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".scroll-progress");
  const revealElements = document.querySelectorAll(".reveal");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
      menuButton.textContent = isOpen ? "Close" : "Menu";
    });

    nav.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        menuButton.textContent = "Menu";
      });
    });
  }

  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 20);
    }

    if (progress && documentHeight > 0) {
      progress.style.width = `${(scrollTop / documentHeight) * 100}%`;
    }
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
});