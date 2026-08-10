document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.paper-row[data-toggle]').forEach(function (row) {
    row.addEventListener('click', function (event) {
      if (event.target.closest('a')) return;
      var detail = document.getElementById(row.getAttribute('data-toggle'));
      if (!detail) return;
      var isOpen = detail.classList.contains('open');
      detail.classList.toggle('open', !isOpen);
      row.classList.toggle('open', !isOpen);
    });
  });
});
