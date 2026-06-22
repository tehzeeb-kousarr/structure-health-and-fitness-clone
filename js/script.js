document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initBranchHours();
  initStatCounters();
});

function initStatCounters() {
  const counters = document.querySelectorAll('.numbers h2[data-target]');
  const numbersSection = document.querySelector('.numbers');
  if (!counters.length || !numbersSection) return;

  let started = false;

  function runCounter(counter) {
    const target = Number(counter.getAttribute('data-target'));
    let count = 0;
    const steps = 100; // total animation steps, independent of target size
    const increment = Math.ceil(target / steps) || 1;

    const update = () => {
      if (count < target) {
        count += increment;
        counter.textContent = Math.min(count, target).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    update();
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(runCounter);
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(numbersSection);
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // On small screens, tapping a dropdown's top-level link opens/closes
  // its submenu instead of trying to follow a "#" href.
  document.querySelectorAll('.nav-menu .dropdown > a').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (window.innerWidth > 900) return; // desktop uses :hover
      const parentItem = link.parentElement;
      const isPlaceholder = link.getAttribute('href') === '#';
      if (isPlaceholder) {
        event.preventDefault();
        parentItem.classList.toggle('is-open');
      }
    });
  });
}

function initBranchHours() {
  const buttons = document.querySelectorAll('.locations button[data-branch]');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const branchId = button.getAttribute('data-branch');
      const panel = document.getElementById(branchId);
      const isCurrentlyOpen = panel.classList.contains('is-open');

      // Close all panels first, then open the selected one (accordion behavior).
      document.querySelectorAll('.timing-info').forEach((el) => el.classList.remove('is-open'));
      buttons.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));

      if (!isCurrentlyOpen) {
        panel.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Live-updates the "x/10" label next to the commitment slider.
const commitmentSlider = document.getElementById('commitment');
const commitmentValue = document.getElementById('commitment-value');
if (commitmentSlider && commitmentValue) {
  commitmentSlider.addEventListener('input', () => {
      commitmentValue.textContent = commitmentSlider.value;
  });
}


const counters = document.querySelectorAll('.numbers h2');
    let started = false;

    function runCounter(counter) {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = 200; // lower = faster
        const increment = Math.ceil(target / speed);

        const update = () => {
            if (count < target) {
                count += increment;
                counter.innerText = count.toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.innerText = target.toLocaleString(); // final formatting
            }
        };

        update();
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                counters.forEach(counter => runCounter(counter));
                observer.disconnect(); // run only once
            }
        });
    }, {
        threshold: 0.5 // 50% visible
    });

    observer.observe(document.querySelector('.numbers'));