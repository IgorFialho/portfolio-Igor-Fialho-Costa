(function () {
  'use strict';

  var header = document.getElementById('header');
  var navToggle = document.querySelector('.nav__toggle');
  var navMenu = document.querySelector('.nav__menu');
  var yearEl = document.getElementById('year');

  // Ano no footer
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Menu mobile
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-label', navMenu.classList.contains('is-open') ? 'Fechar menu' : 'Abrir menu');
    });

    // Fechar ao clicar em um link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
      });
    });
  }

  // Header com fundo ao rolar
  if (header) {
    function updateHeader() {
      if (window.scrollY > 40) {
        header.style.background = 'rgba(10, 10, 12, 0.95)';
      } else {
        header.style.background = 'rgba(10, 10, 12, 0.85)';
      }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // Efeito 3D parallax: disco e foto reagem ao mouse em velocidades diferentes
  var photoWrap = document.getElementById('hero-photo');
  if (photoWrap && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    var photo = photoWrap.querySelector('.hero__photo');
    var disc = photoWrap.querySelector('.hero__photo-disc');
    if (photo && disc) {
      photoWrap.classList.add('hero__photo-wrap--tilt');
      photoWrap.addEventListener('mousemove', function (e) {
        var rect = photoWrap.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        var photoX = x * 12;
        var photoY = y * 10;
        photo.style.transform = 'translate(calc(-50% + ' + photoX + 'px), ' + photoY + 'px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';

        var discX = x * -4;
        var discY = y * -4;
        disc.style.transform = 'translate(calc(-50% + ' + discX + 'px), calc(-50% + ' + discY + 'px))';
      });

      photoWrap.addEventListener('mouseleave', function () {
        photo.style.transform = 'translate(-50%, 0)';
        disc.style.transform = 'translate(-50%, -50%)';
      });
    }
  }
})();
