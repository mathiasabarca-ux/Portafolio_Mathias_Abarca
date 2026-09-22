// ============================================================
// JAURÍA DE PERROS — PORTAFOLIO
// script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- BOTÓN "PERRO REPORTADO" + CONTADOR ---------- */
  const reportBtn   = document.getElementById('reportBtn');
  const btnText     = document.getElementById('btnText');
  const statusMsg   = document.getElementById('statusMsg');
  const memberCount = document.getElementById('memberCount');

  let reported = true;   // estado inicial visible en el diseño
  let count = 9506;

  const formatCount = n => n.toLocaleString('es-MX');

  if (reportBtn) {
    reportBtn.classList.add('active');

    reportBtn.addEventListener('click', () => {
      reported = !reported;
      reportBtn.classList.toggle('active', reported);
      btnText.textContent = reported ? 'INGRSADO' : 'INGRESAR';

      count += reported ? 1 : -1;
      memberCount.textContent = formatCount(count);

      statusMsg.textContent = reported
        ? 'REPORTE RECIBIDO // GRACIAS POR INGRSAR'
        : 'REPORTE RETIRADO // VUELVE CUANDO QUIERAS';
      statusMsg.classList.toggle('active', reported);
    });
  }

  /* ---------- NAV LATERAL DE PISTAS ---------- */
  const trackLinks = document.querySelectorAll('.track-link');
  const sections = [...trackLinks]
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (trackLinks.length && sections.length) {
    const setActive = (id) => {
      trackLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(sec => observer.observe(sec));
  }

  /* ---------- MEDIDORES DE HABILIDADES (animación al entrar) ---------- */
  const skillRows = document.querySelectorAll('.skill-row');
  if (skillRows.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-fill');
          const level = entry.target.getAttribute('data-level') || 0;
          fill.style.width = `${level}%`;
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    skillRows.forEach(row => skillObserver.observe(row));
  }

  /* ---------- REPRODUCTOR DE AUDIO ---------- */
  const audioEl   = document.getElementById('audioEl');
  const playBtn   = document.getElementById('playBtn');
  const stateText = document.getElementById('playerStateText');
  const volume    = document.getElementById('volumeSlider');

  let playing = false;

  if (playBtn) {
    playBtn.addEventListener('click', async () => {
      playing = !playing;

      if (playing) {
        try {
          await audioEl.play();
        } catch (err) {
          // no hay archivo de audio disponible aún — solo actualizamos la interfaz
        }
        playBtn.textContent = '❚❚';
        stateText.textContent = 'REPRODUCIENDO';
      } else {
        audioEl.pause();
        playBtn.textContent = '▶';
        stateText.textContent = 'PAUSADA';
      }
    });
  }

  if (volume && audioEl) {
    audioEl.volume = parseFloat(volume.value);
    volume.addEventListener('input', () => {
      audioEl.volume = parseFloat(volume.value);
    });
  }

  /* ---------- FORMULARIO DE CONTACTO ---------- */
  const contactForm   = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  const sendText       = document.getElementById('sendText');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const msg = document.getElementById('msgInput').value.trim();

      if (!name || !email || !msg) {
        contactStatus.textContent = 'FALTAN DATOS // COMPLETA EL FORMULARIO';
        contactStatus.classList.remove('active');
        contactStatus.classList.add('error');
        return;
      }

      // Aquí puedes conectar un servicio real (Formspree, EmailJS, tu backend, etc.)
      contactStatus.classList.remove('error');
      contactStatus.classList.add('active');
      contactStatus.textContent = `MENSAJE GRABADO // GRACIAS, ${name.split(' ')[0].toUpperCase()}`;
      sendText.textContent = 'ENVIADO ✓';

      contactForm.reset();

      setTimeout(() => { sendText.textContent = 'GRABAR Y ENVIAR'; }, 3000);
    });
  }

  /* ---------- SMOOTH SCROLL PARA ENLACES INTERNOS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});