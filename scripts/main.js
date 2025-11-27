document.addEventListener('DOMContentLoaded',function(){
  var filterToggle=document.getElementById('filter-toggle');
  var projectsFilter=document.getElementById('projects-filter');
  if(filterToggle){
    filterToggle.addEventListener('click',function(){
      var expanded=this.getAttribute('aria-expanded')==='true';
      this.setAttribute('aria-expanded',String(!expanded));
      projectsFilter.classList.toggle('show');
    });
  }
  var projectGrid=document.querySelectorAll('.project-card');
  projectGrid.forEach(function(card){
    card.addEventListener('click',openModal);
    card.querySelectorAll('.project-card__btn').forEach(function(btn){
      btn.addEventListener('click',openModal);
    });
    card.addEventListener('keydown',function(e){
      if(e.key==='Enter' || e.key===' '){
        openModal.call(card,e);
      }
    });
  });
  var modal=document.getElementById('project-modal');
  var modalImg=modal && modal.querySelector('.project-modal__img');
  var modalTitle=modal && modal.querySelector('.project-modal__title');
  var modalDesc=modal && modal.querySelector('.project-modal__desc');
  var modalCode=modal && modal.querySelector('#modal-code');
  function openModal(e){
    e.stopPropagation();
    var btn=e.target.closest('.project-card__btn') || e.currentTarget.querySelector('.project-card__btn') || e.currentTarget;
    var src=btn && btn.getAttribute('data-src') || e.currentTarget.querySelector('img') && e.currentTarget.querySelector('img').src;
    var title=btn && btn.getAttribute('data-title') || e.currentTarget.querySelector('.project-card__title') && e.currentTarget.querySelector('.project-card__title').textContent;
    var desc=btn && btn.getAttribute('data-desc') || e.currentTarget.querySelector('.project-card__desc') && e.currentTarget.querySelector('.project-card__desc').textContent;
    if(modal && modalImg && modalTitle && modalDesc){
      modalImg.src=src||'';
      modalImg.alt=title||'';
      modalTitle.textContent=title||'';
      modalDesc.textContent=desc||'';
      modalCode.href='#';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
  }
  var modalClose=document.getElementById('modal-close');
  if(modalClose){
    modalClose.addEventListener('click',closeModal);
  }
  if(modal){
    modal.addEventListener('click',function(e){
      if(e.target===modal)closeModal();
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape' && modal.classList.contains('open'))closeModal();
    });
  }
  function closeModal(){
    if(modal){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      if(modalImg)modalImg.src='';
    }
  }

  var filterForm=document.getElementById('project-filter-form');
  if(filterForm){
    filterForm.addEventListener('change',function(){
      var val=filterForm.querySelector('input[name="category"]:checked').value;
      var cards=document.querySelectorAll('.projects__grid .project-card');
      cards.forEach(function(card){
        if(val==='all'){
          card.style.display='';
        } else {
          var cat=card.getAttribute('data-category')||'';
          if(cat.split(' ').indexOf(val)!==-1)card.style.display='';
          else card.style.display='none';
        }
      });
    });
  }
const dairyForm = document.getElementById('dairy-form');
	const dairyTable = document.getElementById('dairy-table-body');
	
	if (dairyForm && dairyTable) {
		dairyForm.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const title = dairyForm.querySelector('#task-title')?.value.trim();
			const desc = dairyForm.querySelector('#task-desc')?.value.trim();
			const status = dairyForm.querySelector('#task-status')?.value;
			
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
  var contactForm=document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit',function(e){
      e.preventDefault();
      var name=contactForm.querySelector('#name').value.trim();
      var email=contactForm.querySelector('#email').value.trim();
      var message=contactForm.querySelector('#message').value.trim();
      if(!name||!email||!message){showNotification('Заполните все поля','error');return;}
      if(!/^\S+@\S+\.\S+$/.test(email)){showNotification('Неверный email','error');return;}
      contactForm.reset();
      showNotification('Сообщение отправлено','success');
    });
  }

  function showNotification(text,type){
    var el=document.getElementById('notification');
    if(!el)return;
    el.textContent=text;
    el.className='notification show '+(type==='success'?'success':'error');
    setTimeout(function(){
      el.className='notification';
      el.textContent='';
    },3000);
  }
});
