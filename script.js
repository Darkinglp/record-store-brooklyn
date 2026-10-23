document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      
      const bars = navToggle.querySelectorAll('.bar');
      if (!isExpanded) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.transform = 'none';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.transform = 'none';
      });
    });
  }

  // 2. Navbar Backdrop Blur on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Smooth Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Modal promocional de Movie Mondays
  const promoModal = document.getElementById('promoModal');
  const closePromoBtn = document.getElementById('closePromoModal');

  if (promoModal && closePromoBtn) {
    setTimeout(() => {
      promoModal.classList.add('is-visible');
    }, 1000);

    closePromoBtn.addEventListener('click', () => {
      promoModal.classList.remove('is-visible');
    });

    promoModal.addEventListener('click', (e) => {
      if (e.target === promoModal) {
        promoModal.classList.remove('is-visible');
      }
    });
  }

  // ==========================================================
  // 5. SPIN GOLD VIP PASS - GRABADO EN TIEMPO REAL & WHATSAPP
  // ==========================================================
  const vipNameInput = document.getElementById('vipName');
  const vipPhoneInput = document.getElementById('vipPhone');
  const vipIgInput = document.getElementById('vipInstagram');
  const vipVibeSelect = document.getElementById('vipVibe');
  const vipReasonInput = document.getElementById('vipReason');
  const vipIdUpload = document.getElementById('vipIdUpload');
  const vipSubmitBtn = document.getElementById('vipSubmitBtn');

  // Elementos de la tarjeta en vivo
  const cardNameDisplay = document.getElementById('cardNameDisplay');
  const cardContactDisplay = document.getElementById('cardContactDisplay');
  const cardVibeDisplay = document.getElementById('cardVibeDisplay');
  const cardReasonDisplay = document.getElementById('cardReasonDisplay');
  const cardSerialDisplay = document.getElementById('cardSerialDisplay');
  const cardAgeBadge = document.getElementById('cardAgeBadge');
  const cardAgeText = document.getElementById('cardAgeText');
  const cardMiniVinyl = document.getElementById('cardMiniVinyl');
  const goldVinylCard = document.getElementById('goldVinylCard');

  // Elementos de vista previa de ID
  const vipIdPreview = document.getElementById('vipIdPreview');
  const vipUploadTitle = document.getElementById('vipUploadTitle');
  const vipUploadSub = document.getElementById('vipUploadSub');

  let typingTimer;
  let hasUploadedId = false;

  // Genera un serial único basado en el nombre del miembro
  function generateSerial(name) {
    const clean = name.trim().toUpperCase();
    if (!clean) return '#SR-BK-0420';
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = (hash * 31 + clean.charCodeAt(i)) % 9000;
    }
    const num = String(hash + 1000).padStart(4, '0');
    return `#SR-BK-${num}`;
  }

  // Acelera el giro del vinilo cuando el usuario está escribiendo
  function triggerVinylSpinBoost() {
    if (!cardMiniVinyl) return;
    cardMiniVinyl.classList.add('is-typing');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      cardMiniVinyl.classList.remove('is-typing');
    }, 900);
  }

  if (vipNameInput) {
    vipNameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      cardNameDisplay.textContent = val ? val.toUpperCase() : 'YOUR NAME HERE';
      cardSerialDisplay.textContent = generateSerial(val);
      triggerVinylSpinBoost();
    });
  }

  function updateContactOnCard() {
    const ig = vipIgInput ? vipIgInput.value.trim() : '';
    const phone = vipPhoneInput ? vipPhoneInput.value.trim() : '';
    cardContactDisplay.textContent = ig || phone || '@420VINYLS';
    triggerVinylSpinBoost();
  }

  if (vipIgInput) vipIgInput.addEventListener('input', updateContactOnCard);
  if (vipPhoneInput) vipPhoneInput.addEventListener('input', updateContactOnCard);

  if (vipVibeSelect) {
    vipVibeSelect.addEventListener('change', (e) => {
      cardVibeDisplay.textContent = e.target.value;
      triggerVinylSpinBoost();
    });
  }

  if (vipReasonInput) {
    vipReasonInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      cardReasonDisplay.textContent = val ? `"${val}"` : 'Spin Records Inner Circle';
      triggerVinylSpinBoost();
    });
  }

  // Subida y previsualización de ID 21+
  if (vipIdUpload) {
    vipIdUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(evt) {
        if (vipIdPreview) {
          vipIdPreview.src = evt.target.result;
          vipIdPreview.style.display = 'block';
        }
        if (vipUploadTitle) vipUploadTitle.textContent = '✓ Official 21+ ID Attached';
        if (vipUploadSub) vipUploadSub.textContent = file.name;
        if (cardAgeBadge) cardAgeBadge.classList.add('verified');
        if (cardAgeText) cardAgeText.textContent = '✓ 21+ ID VERIFIED';
        hasUploadedId = true;
        triggerVinylSpinBoost();
      };
      reader.readAsDataURL(file);
    });
  }

  // Efecto 3D sutil al mover el mouse sobre la tarjeta en computadora
  if (goldVinylCard) {
    goldVinylCard.addEventListener('mousemove', (e) => {
      const rect = goldVinylCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      goldVinylCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    goldVinylCard.addEventListener('mouseleave', () => {
      goldVinylCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // Enviar solicitud VIP al WhatsApp de Spin Records
  if (vipSubmitBtn) {
    vipSubmitBtn.addEventListener('click', () => {
      const name = vipNameInput ? vipNameInput.value.trim() : '';
      const phone = vipPhoneInput ? vipPhoneInput.value.trim() : '';
      const ig = vipIgInput ? vipIgInput.value.trim() : '';
      const vibe = vipVibeSelect ? vipVibeSelect.value : 'ALL-ACCESS LOUNGE VIP';
      const reason = vipReasonInput ? vipReasonInput.value.trim() : 'Music, Vinyls & Lounge';
      const serial = cardSerialDisplay ? cardSerialDisplay.textContent : '#SR-BK-0420';

      if (!name || !phone) {
        alert('Please enter your Full Name and WhatsApp/Phone number to engrave and activate your VIP Pass.');
        if (vipNameInput && !name) vipNameInput.focus();
        else if (vipPhoneInput) vipPhoneInput.focus();
        return;
      }

      const idStatus = hasUploadedId 
        ? 'Verified (21+ ID photo ready to attach in chat)' 
        : 'Pending 21+ ID check at entrance / chat';

      const message = [
        `Hello Spin Records! I want to activate my *SPIN GOLD VIP PASS*`,
        ``,
        `*Pass No:* ${serial}`,
        `*Member Name:* ${name}`,
        `*Phone:* ${phone}`,
        `*Instagram/Email:* ${ig || 'N/A'}`,
        `*Member Vibe:* ${vibe}`,
        `*Music / Vibe Note:* ${reason || 'Brooklyn Inner Circle'}`,
        `*21+ Status:* ${idStatus}`,
        ``,
        `Looking forward to visiting 420 Humboldt St!`
      ].join('\n');

      const waUrl = `https://wa.me/19293555138?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
});