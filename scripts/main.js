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

  var dairyForm=document.getElementById('dairy-form');
  var dairyTableBody=document.getElementById('dairy-table-body');
  if(dairyForm && dairyTableBody){
    loadTasks();
    dairyForm.addEventListener('submit',function(e){
      e.preventDefault();
      var title=document.getElementById('task-title').value.trim();
      var desc=document.getElementById('task-desc').value.trim();
      var status=document.getElementById('task-status').value;
      if(!title||!desc){showNotification('Заполните все поля','error');return;}
      var tasks=getTasks();
      tasks.push({title:title,desc:desc,status:status});
      localStorage.setItem('dairyTasks',JSON.stringify(tasks));
      appendTask(tasks.length,tasks[tasks.length-1]);
      dairyForm.reset();
      showNotification('Запись добавлена','success');
    });
  }
  function getTasks(){
    try{
      return JSON.parse(localStorage.getItem('dairyTasks')||'[]');
    }catch(e){
      return[];
    }
  }
  function loadTasks(){
    var tasks=getTasks();
    tasks.forEach(function(t,i){
      appendTask(i+1,t);
    });
  }
  function appendTask(index,task){
    if(!dairyTableBody)return;
    var tr=document.createElement('tr');
    var td1=document.createElement('td');
    td1.textContent=index;
    var td2=document.createElement('td');
    td2.textContent=task.title;
    var td3=document.createElement('td');
    td3.textContent=task.desc;
    var td4=document.createElement('td');
    td4.textContent=task.status;
    if(task.status==='Выполнено')td4.classList.add('done');
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    dairyTableBody.appendChild(tr);
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
