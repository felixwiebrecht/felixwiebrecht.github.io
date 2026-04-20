document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.abstract-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var abstract = this.nextElementSibling;
      var isOpen = abstract.classList.contains('open');
      abstract.classList.toggle('open', !isOpen);
      this.textContent = isOpen ? 'abstract' : 'hide abstract';
    });
  });
});
