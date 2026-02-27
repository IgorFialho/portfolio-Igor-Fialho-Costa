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

  // Efeito 3D na foto do hero (inclina conforme o mouse)
  var photoWrap = document.getElementById('hero-photo');
  if (photoWrap && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    var photo = photoWrap.querySelector('.hero__photo');
    if (photo) {
      photoWrap.classList.add('hero__photo-wrap--tilt');
      photoWrap.addEventListener('mouseenter', function () {
        photoWrap.addEventListener('mousemove', onMouseMove);
      });
      var baseX = 4;
      var baseY = -6;
      photo.style.transform = 'rotateX(' + baseX + 'deg) rotateY(' + baseY + 'deg)';
      photoWrap.addEventListener('mouseleave', function () {
        photoWrap.removeEventListener('mousemove', onMouseMove);
        photo.style.transform = 'rotateX(' + baseX + 'deg) rotateY(' + baseY + 'deg)';
      });
      function onMouseMove(e) {
        var rect = photoWrap.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        var rotateY = baseY + x * 14;
        var rotateX = baseX - y * 14;
        photo.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      }
    }
  }
})();
