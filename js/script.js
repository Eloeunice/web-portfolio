/**
 * Portfolio - Eloiza Almeida
 * Interatividade: menu mobile, smooth scroll, animações, abas e setas do portfólio
 */

document.addEventListener('DOMContentLoaded', function () {

  // ----- Ano no footer -----
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ----- Menu mobile -----
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar menu ao clicar em um link
    mainMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Header com scroll (fundo mais sólido ao rolar) -----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
      } else {
        header.style.background = '';
      }
    });
  }

  // ----- Smooth scroll para âncoras -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Animação ao entrar na viewport (reveal) -----
  const revealEls = document.querySelectorAll(
    '.section-title, .about-content, .skill-group-card, .timeline-item, .portfolio-card, .service-card, .contact-content'
  );

  function reveal() {
    revealEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  // Adicionar classe inicial para animação
  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  reveal(); // Primeira verificação
  window.addEventListener('scroll', reveal);
  window.addEventListener('resize', reveal);

  // ----- Abas do portfólio (filtrar por categoria) -----
  var portfolioTabs = document.querySelectorAll('.portfolio-tab');
  var portfolioCards = document.querySelectorAll('.portfolio-card');
  if (portfolioTabs.length && portfolioCards.length) {
    portfolioTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var category = this.getAttribute('data-tab');
        portfolioTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        portfolioCards.forEach(function (card) {
          var cardCat = card.getAttribute('data-category');
          card.style.display = (category === 'all' || cardCat === category) ? '' : 'none';
        });
      });
    });
  }

  // ----- Setas do portfólio (rolar grid) -----
  var gridWrap = document.querySelector('.portfolio-grid-wrap');
  var prevBtn = document.querySelector('.portfolio-prev');
  var nextBtn = document.querySelector('.portfolio-next');
  if (gridWrap && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function () {
      gridWrap.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      gridWrap.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
});
