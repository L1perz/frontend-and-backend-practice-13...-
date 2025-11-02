document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const modalImg = modal.querySelector('.project-modal__img');
  const modalTitle = modal.querySelector('.project-modal__title');
  const modalDesc = modal.querySelector('.project-modal__desc');
  const modalCode = modal.querySelector('#modal-code');
  const modalClose = modal.querySelector('#modal-close');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.project-card__title');
      const desc = card.querySelector('.project-card__desc');
      const link = card.querySelector('a');

      if (img) modalImg.src = img.src;
      if (title) modalTitle.textContent = title.textContent;
      if (desc) modalDesc.textContent = desc.textContent;

      modalCode.href = link ? link.href : '';

      modal.classList.add('open');
      });
    });

    modalClose.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });
  });

  const filterToggle = document.getElementById('filter-toggle');
  const filterBlock = document.getElementById('projects-filter');
  if (filterToggle && filterBlock) {
    filterToggle.addEventListener('click', () => {
      filterBlock.classList.toggle('show');
    });
  }

  const filterForm = document.getElementById('project-filter-form');
  if (filterForm) {
    const cards = document.querySelectorAll('.project-card');
    const inputs = filterForm.querySelectorAll('input[type="radio"][name="category"]');

    const applyFilter = (value) => {
      const target = (value || 'all').toLowerCase();
      cards.forEach(card => {
        const cats = (card.dataset.category || '').toLowerCase().split(/\s+/).filter(Boolean);
        card.style.display = target === 'all' || cats.includes(target) ? '' : 'none';
      });
    };

    inputs.forEach(input => {
      input.addEventListener('change', () => applyFilter(input.value));
    });

    const checked = filterForm.querySelector('input[name="category"]:checked');
    applyFilter(checked ? checked.value : 'all');
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');

      if (!name?.value.trim()) {
        showNotification('Введите имя', 'error');
        name?.focus();
        return;
      }
      if (!validateEmail(email?.value || '')) {
        showNotification('Введите корректный email', 'error');
        email?.focus();
        return;
      }
      if (!message?.value.trim()) {
        showNotification('Введите сообщение', 'error');
        message?.focus();
        return;
      }

      showNotification('Сообщение успешно отправлено!', 'success');
      contactForm.reset();
    });
  }

  const dairyForm = document.getElementById('dairy-form');
  const dairyTable = document.getElementById('dairy-table-body');
  if (dairyForm && dairyTable) {
    dairyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = dairyForm.querySelector('#task-title')?.value.trim() || '';
      const desc = dairyForm.querySelector('#task-desc')?.value.trim() || '';
      const status = dairyForm.querySelector('#task-status')?.value || '';

      if (!title || !desc) {
        showNotification('Заполните все поля!', 'error');
        return;
      }

      const index = dairyTable.children.length + 1;
      dairyTable.insertAdjacentHTML(
        'beforeend',
        `<tr>
          <td>${index}</td>
          <td>${title}</td>
          <td>${desc}</td>
          <td class="${status === 'Выполнено' ? 'done' : ''}">${status}</td>
        </tr>`
      );

      showNotification('Запись добавлена!', 'success');
      dairyForm.reset();
    });
  }

  const courses = document.querySelectorAll('.course__progress');
  if (courses.length) {
    courses.forEach(bar => {
      const width = bar.style.width || '0%';
      bar.style.width = '0';
      setTimeout(() => (bar.style.width = width), 300);
    });
  }

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function showNotification(text, type = 'success') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const note = document.createElement('div');
  note.className = `notification ${type}`;
  note.textContent = text;
  document.body.appendChild(note);

  requestAnimationFrame(() => note.classList.add('show'));
  setTimeout(() => {
    note.classList.remove('show');
    setTimeout(() => note.remove(), 300);
  }, 3000);
}
