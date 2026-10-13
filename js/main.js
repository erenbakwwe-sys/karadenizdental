/**
 * Karadeniz Ağız ve Diş Sağlığı Polikliniği - Samsun Atakum Şubesi
 * Ortak Etkileşim ve Mantık Scripti (js/main.js)
 * Vanilla JavaScript - Bağımsız, Erişilebilir, Performans Odaklı
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. SCROLL PROGRESS BAR & STICKY HEADER
  // ==========================================================================
  const scrollProgress = document.getElementById('scroll-progress');
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Scroll progress bar genişliği
    if (scrollProgress && docHeight > 0) {
      const scrollPercentage = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${Math.min(scrollPercentage, 100)}%`;
    }

    // Sticky Header küçülme ve blur gölgesi
    if (siteHeader) {
      if (scrollTop > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Yukarı çık butonu görünürlüğü
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Sayfa yüklendiğinde bir defa çalıştır

  // Yukarı Çık Buton Tıklaması
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 2. RESPONSIVE MOBİL MENÜ & DRAWER
  // ==========================================================================
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileCloseBtn = document.querySelector('.mobile-drawer-close');

  function openMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // ESC tuşu ile menüyü kapatma
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Mobil Menü İçi Hizmetler Akordeon Açma/Kapama
  const mobileServicesToggle = document.querySelector('.mobile-accordion-toggle');
  const mobileSubMenu = document.querySelector('.mobile-sub-menu');

  if (mobileServicesToggle && mobileSubMenu) {
    mobileServicesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = mobileSubMenu.classList.contains('open');
      if (isOpen) {
        mobileSubMenu.classList.remove('open');
        mobileServicesToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileSubMenu.classList.add('open');
        mobileServicesToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // ==========================================================================
  // 3. INTERSECTION OBSERVER İLE ANİMASYONLAR (REVEAL)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
      // Eğer bir parent içinde çoklu kart varsa otomatik kademeli gecikme (staggered) ekle
      const siblings = el.parentElement ? el.parentElement.children : [];
      if (siblings.length > 1 && !el.dataset.delay) {
        const itemIndex = Array.from(siblings).indexOf(el);
        if (itemIndex > 0) {
          el.dataset.delay = itemIndex * 90;
        }
      }
      revealObserver.observe(el);
    });
  } else {
    // Tarayıcı desteklemiyorsa doğrudan görünür yap
    revealElements.forEach(el => el.classList.add('animate-in'));
  }

  // ==========================================================================
  // 4. SAYI SAYAÇLARI (COUNT-UP COUNTERS)
  // ==========================================================================
  const counterElements = document.querySelectorAll('.counter');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing fonksiyonu: easeOutQuad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(easedProgress * (target - start) + start);

      el.textContent = `${prefix}${currentVal.toLocaleString('tr-TR')}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = `${prefix}${target.toLocaleString('tr-TR')}${suffix}`;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(counter => counterObserver.observe(counter));
  } else {
    counterElements.forEach(counter => animateCounter(counter));
  }

  // ==========================================================================
  // 5. AKORDEON (SSS & SSS KATEGORİ FİLTRELEME)
  // ==========================================================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        const parentAccordion = item.closest('.accordion');

        // Tek açık akordeon davranışı: diğer tüm elemanları kapat
        if (parentAccordion) {
          parentAccordion.querySelectorAll('.accordion-item').forEach(sibling => {
            sibling.classList.remove('active');
            const sibHeader = sibling.querySelector('.accordion-header');
            if (sibHeader) sibHeader.setAttribute('aria-expanded', 'false');
          });
        }

        if (!isActive) {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // SSS Sayfasındaki Kategori Sekmeleri
  const faqTabs = document.querySelectorAll('.faq-tab-btn');
  if (faqTabs.length > 0) {
    faqTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        faqTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;

        document.querySelectorAll('.accordion-item').forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 6. HASTA YORUMLARI CAROUSEL (TESTIMONIALS)
  // ==========================================================================
  const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
  if (testimonialsWrapper) {
    const track = testimonialsWrapper.querySelector('.testimonials-track');
    const cards = testimonialsWrapper.querySelectorAll('.testimonial-card');
    const prevBtn = testimonialsWrapper.querySelector('.carousel-btn.prev');
    const nextBtn = testimonialsWrapper.querySelector('.carousel-btn.next');
    const dotsContainer = testimonialsWrapper.querySelector('.carousel-dots');

    let currentIndex = 0;
    let autoPlayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    function getVisibleCardsCount() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }

    function getMaxIndex() {
      const visible = getVisibleCardsCount();
      return Math.max(0, cards.length - visible);
    }

    // Noktaları dinamik oluştur
    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const totalSteps = getMaxIndex() + 1;
      for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Sayfa ${i + 1}`);
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      if (!track || cards.length === 0) return;
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 24; // CSS gap
      const offset = currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      // Noktaları güncelle
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    function goToSlide(index) {
      const max = getMaxIndex();
      if (index < 0) {
        currentIndex = max;
      } else if (index > max) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    testimonialsWrapper.addEventListener('mouseenter', stopAutoPlay);
    testimonialsWrapper.addEventListener('mouseleave', startAutoPlay);

    // Dokunmatik Swipe desteği
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    window.addEventListener('resize', () => {
      renderDots();
      goToSlide(Math.min(currentIndex, getMaxIndex()));
    });

    renderDots();
    updateCarousel();
    startAutoPlay();
  }

  // ==========================================================================
  // 7. ÖNCE / SONRA (BEFORE-AFTER) SLIDER
  // ==========================================================================
  const baContainers = document.querySelectorAll('.before-after-container');

  baContainers.forEach(container => {
    const wrapper = container.querySelector('.before-after-wrapper');
    const handle = container.querySelector('.ba-slider-handle');
    const afterImg = container.querySelector('.after-img');
    const beforeImg = wrapper ? wrapper.querySelector('img') : null;

    if (!wrapper || !handle) return;

    let isDragging = false;

    // Resimlerin genişliğini kapsayıcıya eşitle
    function syncImageWidth() {
      const containerWidth = container.offsetWidth;
      if (beforeImg) {
        beforeImg.style.width = `${containerWidth}px`;
      }
    }

    syncImageWidth();
    window.addEventListener('resize', syncImageWidth);

    function setPosition(xPos) {
      const rect = container.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      wrapper.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    // Mouse olayları
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch olayları
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  });

  // ==========================================================================
  // 8. GALERİ FİLTRELEME & LIGHTBOX
  // ==========================================================================
  const galleryFilters = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
  const lightboxModal = document.querySelector('.lightbox-modal');

  if (galleryFilters.length > 0 && galleryItems.length > 0) {
    galleryFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox Modal Mantığı
  if (lightboxModal) {
    const lightboxImg = lightboxModal.querySelector('.lightbox-content img');
    const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
    const closeBtn = lightboxModal.querySelector('.lightbox-close');
    const prevBtn = lightboxModal.querySelector('.lightbox-prev');
    const nextBtn = lightboxModal.querySelector('.lightbox-next');

    let currentGalleryIndex = 0;
    const visibleGalleryItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

    function openLightbox(index) {
      const items = visibleGalleryItems();
      if (!items[index]) return;
      currentGalleryIndex = index;
      const targetItem = items[index];
      const img = targetItem.querySelector('img');
      const caption = targetItem.dataset.caption || targetItem.querySelector('h3')?.textContent || '';

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = caption;
      }
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    function nextLightbox() {
      const items = visibleGalleryItems();
      currentGalleryIndex = (currentGalleryIndex + 1) % items.length;
      openLightbox(currentGalleryIndex);
    }

    function prevLightbox() {
      const items = visibleGalleryItems();
      currentGalleryIndex = (currentGalleryIndex - 1 + items.length) % items.length;
      openLightbox(currentGalleryIndex);
    }

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const items = visibleGalleryItems();
        const index = items.indexOf(item);
        if (index !== -1) openLightbox(index);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevLightbox);

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    });
  }

  // ==========================================================================
  // 9. TÜRKİYE TELEFON FORMATI MASKELEME (05XX XXX XX XX)
  // ==========================================================================
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let val = input.value.replace(/\D/g, ''); // Sadece rakamları tut

      // 0 ile başlamıyorsa ve en az 1 rakam girilmişse başına 0 ekle
      if (val.length > 0 && !val.startsWith('0')) {
        val = '0' + val;
      }

      // En fazla 11 rakam (05XXXXXXXXX)
      val = val.substring(0, 11);

      // Maskeleme formatı: 05XX XXX XX XX
      let formatted = '';
      if (val.length > 0) {
        formatted = val.substring(0, 4); // 05XX
      }
      if (val.length >= 5) {
        formatted += ' ' + val.substring(4, 7); // 05XX XXX
      }
      if (val.length >= 8) {
        formatted += ' ' + val.substring(7, 9); // 05XX XXX XX
      }
      if (val.length >= 10) {
        formatted += ' ' + val.substring(9, 11); // 05XX XXX XX XX
      }

      input.value = formatted;
    });
  });

  // ==========================================================================
  // 10. ÇOK ADIMLI RANDEVU FORMU (WIZARD)
  // ==========================================================================
  const wizard = document.querySelector('.appointment-wizard');
  if (wizard) {
    const panels = wizard.querySelectorAll('.step-panel');
    const stepItems = wizard.querySelectorAll('.wizard-step-item');
    const prevBtn = wizard.querySelector('.wizard-prev-btn');
    const nextBtn = wizard.querySelector('.wizard-next-btn');
    const submitBtn = wizard.querySelector('.wizard-submit-btn');
    const successScreen = wizard.querySelector('.success-screen');

    let currentStep = 1;
    const totalSteps = 4;

    // Randevu Verileri State
    const appointmentData = {
      service: '',
      doctor: 'Fark etmez (En Erken Uygun Hekim)',
      date: '',
      time: '',
      fullName: '',
      phone: '',
      email: '',
      notes: ''
    };

    // Servis ve Hekim Radyo Kartları
    const serviceCards = wizard.querySelectorAll('.service-option-card');
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          appointmentData.service = radio.value;
        }
      });
    });

    const doctorCards = wizard.querySelectorAll('.doctor-option-card');
    doctorCards.forEach(card => {
      card.addEventListener('click', () => {
        doctorCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          appointmentData.doctor = radio.value;
        }
      });
    });

    // Saat Butonları
    const timeSlots = wizard.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        appointmentData.time = slot.dataset.time;
      });
    });

    // Tarih Girişi min tarih (Bugünden önce seçilemez)
    const dateInput = wizard.querySelector('#appointment-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.addEventListener('change', () => {
        appointmentData.date = dateInput.value;
      });
    }

    function validateCurrentStep() {
      if (currentStep === 1) {
        if (!appointmentData.service) {
          showToast('Lütfen almak istediğiniz tedavi/hizmeti seçiniz.', 'error');
          return false;
        }
        return true;
      }

      if (currentStep === 2) {
        if (!dateInput || !dateInput.value) {
          showToast('Lütfen randevu tarihi seçiniz.', 'error');
          if (dateInput) dateInput.focus();
          return false;
        }
        appointmentData.date = dateInput.value;

        if (!appointmentData.time) {
          showToast('Lütfen uygun bir randevu saati seçiniz.', 'error');
          return false;
        }
        return true;
      }

      if (currentStep === 3) {
        const nameInput = wizard.querySelector('#patient-name');
        const phoneInput = wizard.querySelector('#patient-phone');
        const emailInput = wizard.querySelector('#patient-email');
        const kvkkInput = wizard.querySelector('#patient-kvkk');

        let isValid = true;

        if (!nameInput || nameInput.value.trim().length < 3) {
          if (nameInput) nameInput.classList.add('is-invalid');
          isValid = false;
        } else {
          nameInput.classList.remove('is-invalid');
          nameInput.classList.add('is-valid');
          appointmentData.fullName = nameInput.value.trim();
        }

        const phoneVal = phoneInput ? phoneInput.value.trim() : '';
        if (phoneVal.length < 14) {
          if (phoneInput) phoneInput.classList.add('is-invalid');
          isValid = false;
        } else {
          phoneInput.classList.remove('is-invalid');
          phoneInput.classList.add('is-valid');
          appointmentData.phone = phoneVal;
        }

        const emailVal = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailVal && !emailRegex.test(emailVal)) {
          if (emailInput) emailInput.classList.add('is-invalid');
          isValid = false;
        } else {
          if (emailInput) {
            emailInput.classList.remove('is-invalid');
            if (emailVal) emailInput.classList.add('is-valid');
          }
          appointmentData.email = emailVal;
        }

        if (kvkkInput && !kvkkInput.checked) {
          showToast('Lütfen KVKK Aydınlatma Metnini onaylayınız.', 'error');
          isValid = false;
        }

        const notesInput = wizard.querySelector('#patient-notes');
        if (notesInput) appointmentData.notes = notesInput.value.trim();

        if (!isValid) {
          showToast('Lütfen kırmızıyla işaretli zorunlu alanları eksiksiz doldurunuz.', 'error');
        }

        return isValid;
      }

      return true;
    }

    function updateSummary() {
      const sumService = wizard.querySelector('#summary-service');
      const sumDoctor = wizard.querySelector('#summary-doctor');
      const sumDateTime = wizard.querySelector('#summary-datetime');
      const sumPatient = wizard.querySelector('#summary-patient');
      const sumPhone = wizard.querySelector('#summary-phone');

      if (sumService) sumService.textContent = appointmentData.service || '-';
      if (sumDoctor) sumDoctor.textContent = appointmentData.doctor || '-';
      if (sumDateTime) {
        const formattedDate = appointmentData.date ? new Date(appointmentData.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
        sumDateTime.textContent = `${formattedDate} / Saat: ${appointmentData.time || '-'}`;
      }
      if (sumPatient) sumPatient.textContent = appointmentData.fullName || '-';
      if (sumPhone) sumPhone.textContent = appointmentData.phone || '-';
    }

    function goToStep(step) {
      currentStep = step;

      // Panelleri göster/gizle
      panels.forEach((p, idx) => {
        p.classList.toggle('active', idx + 1 === currentStep);
      });

      // Wizard adımlarını güncelle
      stepItems.forEach((item, idx) => {
        const stepNum = idx + 1;
        item.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
          item.classList.add('active');
        } else if (stepNum < currentStep) {
          item.classList.add('completed');
        }
      });

      // Buton durumları
      if (prevBtn) {
        prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
      }

      if (nextBtn) {
        nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
      }

      if (submitBtn) {
        submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
      }

      if (currentStep === 4) {
        updateSummary();
      }

      // Form tepesine yumuşak kaydır
      wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (validateCurrentStep()) {
          goToStep(currentStep + 1);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          goToStep(currentStep - 1);
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Yükleniyor durumu
        submitBtn.disabled = true;
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width:18px; height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg> Randevunuz Kaydediliyor...`;

        setTimeout(() => {
          // Başarılı Ekranı
          const formPanels = wizard.querySelector('.wizard-content');
          const wizardStepsHeader = wizard.querySelector('.wizard-steps');
          const wizardFooter = wizard.querySelector('.wizard-footer');

          if (formPanels) formPanels.style.display = 'none';
          if (wizardStepsHeader) wizardStepsHeader.style.display = 'none';
          if (wizardFooter) wizardFooter.style.display = 'none';

          if (successScreen) {
            successScreen.classList.add('active');
            const codeEl = successScreen.querySelector('.appointment-badge');
            if (codeEl) {
              const randCode = 'KRD-' + Math.floor(100000 + Math.random() * 900000);
              codeEl.textContent = `Randevu Referans Kodu: ${randCode}`;
            }
          }

          showToast('Randevu talebiniz başarıyla oluşturuldu! Hasta danışmanımız kısa süre içinde sizi arayacaktır.', 'success');
        }, 1200);
      });
    }

    // İlk adım ayarı
    goToStep(1);
  }

  // ==========================================================================
  // 11. İLETİŞİM FORMU VALİDASYONU & GÖNDERİMİ
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector('#contact-name');
      const phoneInput = contactForm.querySelector('#contact-phone');
      const emailInput = contactForm.querySelector('#contact-email');
      const msgInput = contactForm.querySelector('#contact-message');
      const kvkkInput = contactForm.querySelector('#contact-kvkk');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      let isValid = true;

      if (!nameInput || nameInput.value.trim().length < 3) {
        if (nameInput) nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
      }

      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      if (phoneVal.length < 14) {
        if (phoneInput) phoneInput.classList.add('is-invalid');
        isValid = false;
      } else {
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
      }

      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        if (emailInput) emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }

      if (!msgInput || msgInput.value.trim().length < 10) {
        if (msgInput) msgInput.classList.add('is-invalid');
        isValid = false;
      } else {
        msgInput.classList.remove('is-invalid');
        msgInput.classList.add('is-valid');
      }

      if (kvkkInput && !kvkkInput.checked) {
        showToast('Lütfen KVKK Aydınlatma Metnini onaylayınız.', 'error');
        isValid = false;
      }

      if (!isValid) {
        showToast('Lütfen formdaki tüm zorunlu alanları kontrol ediniz.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        const origHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Gönderiliyor...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origHtml;
          contactForm.reset();
          
          // Sınıfları temizle
          contactForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));

          showToast('Mesajınız başarıyla iletildi! En kısa sürede sizinle iletişime geçeceğiz.', 'success', 5000);
        }, 1000);
      }
    });
  }

  // ==========================================================================
  // 12. TOAST BİLDİRİM YARDIMCISI
  // ==========================================================================
  window.showToast = function(message, type = 'info', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }, 300);
    }, duration);
  };
});
