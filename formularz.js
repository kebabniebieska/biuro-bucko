/* Formularz kontaktowy - walidacja i wysyłka przez FormSubmit (bez przeładowania strony). */
(function(){
  const f=document.getElementById('contact-form'); if(!f) return;
  const status=f.querySelector('.cf-status'), btn=f.querySelector('.cf-submit');
  const show=(msg,type)=>{status.textContent=msg;status.className='cf-status '+(type||'')};
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    f.querySelectorAll('.cf-error').forEach(x=>x.classList.remove('cf-error'));
    const bad=[...f.querySelectorAll('[required]')].filter(x=>x.type==='checkbox'?!x.checked:!x.value.trim()||(x.type==='email'&&!/^\S+@\S+\.\S+$/.test(x.value)));
    if(bad.length){bad.forEach(x=>(x.closest('.cf-field,.cf-consent')||x).classList.add('cf-error'));bad[0].focus();show('Uzupełnij wymagane pola zaznaczone na czerwono.','err');return;}
    if(f._honey&&f._honey.value) return;
    btn.disabled=true; btn.textContent='WYSYŁANIE…'; show('');
    try{
      const r=await fetch(f.action.replace('formsubmit.co/','formsubmit.co/ajax/'),{method:'POST',headers:{'Accept':'application/json'},body:new FormData(f)});
      const j=await r.json().catch(()=>({}));
      if(!r.ok||j.success==='false'||j.success===false) throw new Error(j.message||r.status);
      f.reset(); show('Dziękujemy! Wiadomość została wysłana. Odpowiemy wkrótce.','ok');
    }catch(err){
      show('Nie udało się wysłać wiadomości. Zadzwoń: 85 732 60 34 lub napisz na bib@data.pl.','err');
    }finally{btn.disabled=false;btn.textContent='WYŚLIJ WIADOMOŚĆ';}
  });
})();
