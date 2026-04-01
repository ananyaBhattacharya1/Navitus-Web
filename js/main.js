(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  window.initNavitus = function initNavitus() {
    setActiveNav();
    fixedHeader();
    bannerCarousel();
    aboutSlides();
    clientMarqueeDup();
    mobileNav();
    searchUi();
    submenuMobile();
    contactFormStatic();
  };

  function contactFormStatic() {
    var form = qs(".contact_form form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Static preview only: the live site uses WordPress Contact Form 7 to send mail. Connect this form to your backend or a form service to enable sending."
      );
    });
  }

  function fixedHeader() {
    var header = qs(".header");
    var menu = qs("#main-menu");
    if (!header) return;
    function tick() {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      var wide = window.matchMedia("(min-width: 992px)").matches;
      if (wide) {
        header.classList.toggle("header--compact", y > 48);
        if (y <= 48 && menu) menu.classList.remove("is-open");
      } else {
        header.classList.add("header--compact");
      }
      if (y > 40) header.classList.add("fixed_header");
      else header.classList.remove("fixed_header");
    }
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
  }

  function bannerCarousel() {
    var items = qsa(".carousel-inner .item");
    if (items.length < 2) return;
    var i = 0;
    setInterval(function () {
      items[i].classList.remove("active");
      i = (i + 1) % items.length;
      items[i].classList.add("active");
    }, 5000);
  }

  function aboutSlides() {
    var textDivs = qsa(".slide_sec .text_slide > div");
    var imgDivs = qsa(".slide_sec .img_slide > div");
    if (!textDivs.length) return;
    var j = 0;
    function show(idx) {
      textDivs.forEach(function (el, k) {
        el.classList.toggle("is-active", k === idx);
      });
      imgDivs.forEach(function (el, k) {
        el.classList.toggle("is-active", k === idx);
      });
    }
    show(0);
    setInterval(function () {
      j = (j + 1) % textDivs.length;
      show(j);
    }, 6000);
  }

  function clientMarqueeDup() {
    var track = qs(".client_slider_track");
    if (!track) return;
    var logos = qsa(".client_logo", track);
    if (!logos.length) return;
    logos.forEach(function (node) {
      track.appendChild(node.cloneNode(true));
    });
  }

  function mobileNav() {
    var btn = qs(".menu-toggle");
    var menu = qs("#main-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("is-open")) return;
      if (btn.contains(e.target) || menu.contains(e.target)) return;
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  }

  function submenuMobile() {
    var parents = qsa(".menu > ul > li.menu-item-has-children");
    parents.forEach(function (li) {
      var a = li.querySelector(":scope > a");
      if (!a) return;
      a.addEventListener("click", function (e) {
        var header = qs(".header");
        var compact = header && header.classList.contains("header--compact");
        if (window.innerWidth >= 992 && !compact) return;
        e.preventDefault();
        li.classList.toggle("sub-open");
      });
    });
  }

  function searchUi() {
    var icon = qs(".header .search .fa-search");
    var overlay = qs("#search-overlay");
    if (!icon || !overlay) return;
    var closeBtn = qs(".search-overlay-close", overlay);
    var inp = qs('input[type="search"]', overlay);
    icon.addEventListener("click", function () {
      overlay.classList.add("is-open");
      if (inp) inp.focus();
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("is-open");
    });
    if (closeBtn)
      closeBtn.addEventListener("click", function () {
        overlay.classList.remove("is-open");
      });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") overlay.classList.remove("is-open");
    });
  }

  function setActiveNav() {
    var page = document.body.getAttribute("data-page");
    if (!page) return;
    var subToServices = { rtc: true, fos: true, industrial: true, consultancy: true };
    var navKey = subToServices[page] ? "services" : page;
    qsa("[data-nav]").forEach(function (el) {
      if (el.getAttribute("data-nav") === navKey) {
        el.classList.add("current-menu-item");
      }
    });
  }

})();
