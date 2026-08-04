(function () {
  "use strict";

  /* =========================================================
     Config
     ========================================================= */
  var TALLY_URL = "https://tally.so/r/jaX7Za";

  /* =========================================================
     Footer year
     ========================================================= */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     Tally CTA buttons — every conversion button opens Tally
     ========================================================= */
  document.querySelectorAll(".tally-cta").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.open(TALLY_URL, "_blank", "noopener,noreferrer");
    });
  });

  /* =========================================================
     Sticky nav scroll state
     ========================================================= */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 24) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* =========================================================
     Mobile menu
     ========================================================= */
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobile-menu");

  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
  }

  hamburger.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  /* =========================================================
     Scroll reveal animations (staggered)
     ========================================================= */
  var revealGroups = document.querySelectorAll(
    ".card-grid, .service-list, .integration-grid"
  );
  revealGroups.forEach(function (group) {
    var items = group.querySelectorAll(".reveal");
    items.forEach(function (item, i) {
      item.style.setProperty("--i", i);
    });
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* =========================================================
     How It Works — timeline gold line fill on scroll
     ========================================================= */
  var timeline = document.getElementById("timeline");
  var timelineFill = document.getElementById("timeline-fill");
  var timelineSteps = document.querySelectorAll(".timeline-step");

  if (timeline && "IntersectionObserver" in window) {
    var timelineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            timelineFill.style.width = "100%";
            timelineSteps.forEach(function (step, i) {
              setTimeout(function () {
                step.classList.add("active");
              }, i * 280 + 200);
            });
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    timelineObserver.observe(timeline);
  }

  /* =========================================================
     Performance: pause continuous animations while off-screen.
     Same look whenever a section is actually visible — this
     only stops wasted compositor work while scrolled away,
     which matters most on lower-powered phones.
     ========================================================= */
  if ("IntersectionObserver" in window) {
    var animScopes = document.querySelectorAll(
      ".hero-visual, .command-center"
    );
    var animPauseObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle(
            "anim-paused",
            !entry.isIntersecting
          );
        });
      },
      { threshold: 0.01 }
    );
    animScopes.forEach(function (el) {
      animPauseObserver.observe(el);
    });
  }

  /* =========================================================
     AI Automation Command Center — simulated demo
     ========================================================= */
  var runBtn = document.getElementById("run-demo");
  var ccNodes = document.querySelectorAll(".cc-node");
  var ccLines = document.querySelectorAll(".cc-line");
  var chatMessages = document.getElementById("chat-messages");
  var chatAction = document.getElementById("chat-action");
  var demoRunning = false;

  function resetDemo() {
    ccNodes.forEach(function (n) {
      n.classList.remove("active");
    });
    ccLines.forEach(function (l) {
      l.classList.remove("active");
    });
    chatMessages.innerHTML = "";
    chatAction.innerHTML = "";
  }

  function addMessage(text, cls, delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var el = document.createElement("div");
        el.className = "chat-msg " + cls;
        el.textContent = text;
        chatMessages.appendChild(el);
        resolve();
      }, delay);
    });
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function activateNode(index) {
    if (ccNodes[index]) ccNodes[index].classList.add("active");
    if (ccLines[index]) ccLines[index].classList.add("active");
  }

  async function runSimulation() {
    if (demoRunning) return;
    demoRunning = true;
    runBtn.textContent = "Running…";
    runBtn.disabled = true;
    resetDemo();

    // Pipeline steps
    activateNode(0); // NEW LEAD
    await wait(500);
    activateNode(1); // AI ANALYSIS line + node
    await wait(700);
    activateNode(2); // QUALIFICATION
    await wait(700);
    activateNode(3); // DECISION
    await wait(700);
    activateNode(4); // ACTION

    // Chat conversation
    await addMessage("Hi, I'd like to book an appointment.", "customer", 200);
    await addMessage(
      "Absolutely. I can help with that. What service are you interested in?",
      "ai",
      900
    );
    await addMessage("Premium service.", "customer", 900);
    await addMessage(
      "Great. Let me check the available times for you.",
      "ai",
      900
    );
    await addMessage("AI ACTION — Checking availability…", "system", 700);
    await wait(900);

    var slotsWrap = document.createElement("div");
    slotsWrap.className = "chat-msg ai";
    slotsWrap.style.animationDelay = "0ms";
    slotsWrap.innerHTML =
      'AVAILABLE — here are a few open times:<div class="slots">' +
      '<span class="slot">Tue 2:00 PM</span>' +
      '<span class="slot">Wed 10:30 AM</span>' +
      '<span class="slot">Thu 4:15 PM</span>' +
      "</div>";
    chatMessages.appendChild(slotsWrap);

    var bookBtn = document.createElement("button");
    bookBtn.className = "btn btn-primary";
    bookBtn.type = "button";
    bookBtn.textContent = "Book Appointment";
    chatAction.appendChild(bookBtn);

    bookBtn.addEventListener("click", async function () {
      bookBtn.disabled = true;
      bookBtn.textContent = "Booking…";
      await wait(600);
      await addMessage(
        "Confirmed — you're booked for Tue 2:00 PM. This is a simulated demo confirmation.",
        "system",
        0
      );
      chatAction.innerHTML = "";
    });

    runBtn.textContent = "Run Simulation Again";
    runBtn.disabled = false;
    demoRunning = false;
  }

  if (runBtn) {
    runBtn.addEventListener("click", runSimulation);
  }
})();
