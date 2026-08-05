(function () {
  "use strict";

  var TALLY_URL = "https://tally.so/embed/jaX7Za";

  /* =========================================================
     CREATE POPUP
     ========================================================= */

  var modal = document.createElement("div");

  modal.className = "tally-modal";

  modal.innerHTML = `
    <div class="tally-modal-container">

      <div class="tally-modal-header">

        <div class="tally-modal-title">
          BOOK A FREE AI AUDIT
        </div>

        <button
          type="button"
          class="tally-modal-close"
          aria-label="Close"
        >
          ×
        </button>

      </div>

      <iframe
        class="tally-modal-iframe"
        src="${TALLY_URL}"
        title="Meridian AI Free AI Audit"
        frameborder="0"
        allow="fullscreen"
      ></iframe>

    </div>
  `;

  document.body.appendChild(modal);

  var closeButton = modal.querySelector(".tally-modal-close");


  /* =========================================================
     OPEN
     ========================================================= */

  function openPopup() {

    modal.classList.add("open");

    document.body.classList.add("tally-modal-open");

    /* Fix iPhone/iPad viewport behavior */
    document.documentElement.classList.add("tally-popup-active");

  }


  /* =========================================================
     CLOSE
     ========================================================= */

  function closePopup() {

    modal.classList.remove("open");

    document.body.classList.remove("tally-modal-open");

    document.documentElement.classList.remove("tally-popup-active");

  }


  /* =========================================================
     CATCH ALL TALLY BUTTONS
     ========================================================= */

  document.addEventListener(
    "click",
    function (event) {

      var button = event.target.closest(".tally-cta");

      if (!button) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      openPopup();

    },
    true
  );


  /* =========================================================
     CLOSE BUTTON
     ========================================================= */

  closeButton.addEventListener("click", function (event) {

    event.preventDefault();

    closePopup();

  });


  /* =========================================================
     BACKDROP
     ========================================================= */

  modal.addEventListener("click", function (event) {

    if (event.target === modal) {
      closePopup();
    }

  });


  /* =========================================================
     ESC
     ========================================================= */

  document.addEventListener("keydown", function (event) {

    if (
      event.key === "Escape" &&
      modal.classList.contains("open")
    ) {

      closePopup();

    }

  });

})();
  });

})();
