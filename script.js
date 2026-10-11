/**
 * Portfolio JavaScript - Interactive Behaviors & Animations
 * Student: Stuti Varshney - B.Tech 1st Year (JECRC Jaipur)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC TYPING EFFECT IN HERO SECTION
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const roles = [
      'Tech Explorer & Developer',
      'C Language Programmer',
      'AI & Prompt Crafter',
      'Creative Problem Solver',
      'Aspiring Software Engineer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 90;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 45;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeDelay = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 400;
      }

      setTimeout(typeEffect, typeDelay);
    }

    typeEffect();
  }

  // 2. MOBILE NAVIGATION DRAWER TOGGLE
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.classList.remove('open');
      });
    });
  }

  // 3. SCROLL SPY & NAVBAR ACTIVE STATE
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation, { passive: true });

  // 4. TOAST NOTIFICATION UTILITY
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 5. COPY TO CLIPBOARD BUTTONS (Email & Phone)
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          copyFallback(textToCopy);
        });
      } else {
        copyFallback(textToCopy);
      }
    });
  });

  function copyFallback(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copied "${text}" to clipboard!`);
    } catch (err) {
      showToast('Could not auto-copy. Please copy manually.');
    }
    document.body.removeChild(tempInput);
  }

  // 6. RESUME DOWNLOAD BUTTON FEEDBACK
  const resumeBtns = document.querySelectorAll('a[download]');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading resume...');
    });
  });

  // 7. CONTACT FORM VALIDATION & SUBMISSION
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('msgSubject');
  const messageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.closest('.form-group').classList.remove('has-error');
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      if (hasError) return;

      submitBtn.disabled = true;
      const originalText = btnText.textContent;
      btnText.textContent = 'Sending Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.textContent = originalText;

        if (formFeedback) {
          formFeedback.classList.remove('hidden');
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        showToast('Message sent successfully!');

        const mailtoSubject = encodeURIComponent(subjectInput.value.trim() || `Portfolio Contact from ${nameInput.value.trim()}`);
        const mailtoBody = encodeURIComponent(`Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);
        const mailtoUrl = `mailto:stutivarshney2506@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        const feedbackMsg = formFeedback.querySelector('.feedback-msg p');
        if (feedbackMsg) {
          feedbackMsg.innerHTML = `Thank you <strong>${nameInput.value.trim()}</strong>! Your message is recorded. <br><a href="${mailtoUrl}" style="color:#38bdf8; text-decoration:underline; font-size:0.85rem; display:inline-block; margin-top:4px;">Click here to also open your email app</a>`;
        }

        contactForm.reset();
      }, 900);
    });
  }

  // 8. ANIMATE SKILL BARS ON SCROLL
  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar');

  if (skillSection && progressBars.length > 0 && 'IntersectionObserver' in window) {
    progressBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.setAttribute('data-target-width', targetWidth);
      bar.style.width = '0%';
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const target = bar.getAttribute('data-target-width');
            bar.style.width = target;
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillSection);
  }
});
