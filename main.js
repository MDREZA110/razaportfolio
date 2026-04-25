const yearNode = document.getElementById("year");
const revealNodes = document.querySelectorAll("[data-reveal]");
const messageForm = document.getElementById("message-form");
const statusNode = document.getElementById("form-status");
const viewResumeBtn = document.getElementById("view-resume-btn");
const resumeAlert = document.getElementById("resume-alert");
const resumeAlertClose = document.getElementById("resume-alert-close");
const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

if (messageForm) {
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const payload = new FormData(messageForm);
    const name = String(payload.get("name") || "").trim();
    const email = String(payload.get("email") || "").trim();
    const message = String(payload.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio message from ${name || "visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    if (statusNode) {
      statusNode.textContent = "Opening your email app...";
    }

    window.location.href = `mailto:this.mohammadraza@gmail.com?subject=${subject}&body=${body}`;
  });
}

const closeResumeAlert = () => {
  if (!resumeAlert) {
    return;
  }
  resumeAlert.classList.remove("is-open");
  resumeAlert.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

if (viewResumeBtn && resumeAlert) {
  viewResumeBtn.addEventListener("click", () => {
    resumeAlert.classList.add("is-open");
    resumeAlert.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
}

if (resumeAlertClose) {
  resumeAlertClose.addEventListener("click", closeResumeAlert);
}

if (resumeAlert) {
  resumeAlert.addEventListener("click", (event) => {
    if (event.target === resumeAlert) {
      closeResumeAlert();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resumeAlert?.classList.contains("is-open")) {
    closeResumeAlert();
  }
});

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}
