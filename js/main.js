/* js/main.js - navigation toggle, form validation, scroll reveal, tiny helpers */

// Small helper to run once DOM is ready
document.addEventListener('DOMContentLoaded', function(){
  // set copyright years
  document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = new Date().getFullYear());

  // Nav toggles (supports multiple pages with unique toggle ids)
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      // find matching nav (assumes nav next to button)
      const nav = btn.nextElementSibling;
      if(!nav) return;
      nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  });

  // Simple form validation + fake send
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      const out = document.getElementById('form-msg');

      // basic validation
      if(name.length < 2){ out.textContent='Please enter your name.'; out.style.color='crimson'; return; }
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ out.textContent='Please enter a valid email.'; out.style.color='crimson'; return; }
      if(msg.length < 10){ out.textContent='Message must be at least 10 characters.'; out.style.color='crimson'; return; }

      // simulate sending
      out.textContent='Sending...'; out.style.color='black';
      setTimeout(()=>{
        out.textContent='Thanks! Your message has been received.';
        out.style.color='green';
        form.reset();
      }, 800);
    });
  }

  // Scroll reveal using IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal, .reveal-on-scroll');
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        if(entry.target.classList.contains('reveal')) entry.target.classList.add('revealed');
        if(entry.target.classList.contains('reveal-on-scroll')) entry.target.classList.add('revealed-on-scroll');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealEls.forEach(el => io.observe(el));

});