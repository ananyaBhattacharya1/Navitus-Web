(function () {
  var base = "";
  function fileProtocolBanner(hEl, fEl) {
    var msg =
      "<div style='padding:16px 20px;background:#fff8e6;border-bottom:1px solid #e6d9a8;color:#333;font-size:15px;line-height:1.5;max-width:100%;'>" +
      "<strong>Preview needs HTTP.</strong> Browsers block loading <code>includes/header.html</code> from a local file. " +
      "From the project folder run: <code style='background:#f0f0f0;padding:2px 6px;border-radius:4px;'>python3 serve.py</code> " +
      "then open <a href='http://127.0.0.1:8765/'>http://127.0.0.1:8765/</a>" +
      "</div>";
    hEl.innerHTML = msg;
    if (fEl) fEl.innerHTML = "";
  }
  function load() {
    var hEl = document.getElementById("site-header");
    var fEl = document.getElementById("site-footer");
    if (!hEl || !fEl) {
      if (window.initNavitus) window.initNavitus();
      return;
    }
    if (window.location.protocol === "file:") {
      fileProtocolBanner(hEl, fEl);
      if (window.initNavitus) window.initNavitus();
      return;
    }
    Promise.all([
      fetch(base + "includes/header.html").then(function (r) {
        return r.text();
      }),
      fetch(base + "includes/footer.html").then(function (r) {
        return r.text();
      }),
    ])
      .then(function (parts) {
        hEl.outerHTML = parts[0];
        fEl.outerHTML = parts[1];
        if (window.initNavitus) window.initNavitus();
      })
      .catch(function () {
        hEl.innerHTML =
          "<p style='padding:20px;color:red'>Could not load includes/header.html — serve this folder over HTTP (not file://).</p>";
        if (window.initNavitus) window.initNavitus();
      });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
