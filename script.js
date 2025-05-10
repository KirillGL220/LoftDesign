
const projectImages = {
    Bathroom: ['bathroom_1','bathroom_2','bathroom_3','bathroom_4','bathroom_5','bathroom_6','bathroom_7','bathroom_8'],
    Kitchen: ['kitchen_1', 'kitchen_2', 'kitchen_3', 'kitchen_4', 'kitchen_5', 'kitchen_6', 'kitchen_7', 'kitchen_8', 'kitchen_9', 'kitchen_10',
'kitchen_11', 'kitchen_12', 'kitchen_13', 'kitchen_14', 'kitchen_15', 'kitchen_16', 'kitchen_17', 'kitchen_18', 'kitchen_19', 'kitchen_20',
'kitchen_21', 'kitchen_22', 'kitchen_23', 'kitchen_24', 'kitchen_25', 'kitchen_26', 'kitchen_27', 'kitchen_28', 'kitchen_29', 'kitchen_30',
'kitchen_31', 'kitchen_32', 'kitchen_33', 'kitchen_34', 'kitchen_35', 'kitchen_36', 'kitchen_37', 'kitchen_38', 'kitchen_39', 'kitchen_40',
'kitchen_41', 'kitchen_42', 'kitchen_43', 'kitchen_44', 'kitchen_45', 'kitchen_46', 'kitchen_47', 'kitchen_48', 'kitchen_49', 'kitchen_50',
'kitchen_51', 'kitchen_52', 'kitchen_53', 'kitchen_54', 'kitchen_55', 'kitchen_56', 'kitchen_57', 'kitchen_58', 'kitchen_59', 'kitchen_60',
'kitchen_61'],
    Wardrobe: ['wardrobe_1', 'wardrobe_2', 'wardrobe_3', 'wardrobe_4', 'wardrobe_5', 'wardrobe_6', 'wardrobe_7', 'wardrobe_8', 'wardrobe_9', 'wardrobe_10',
'wardrobe_11', 'wardrobe_12', 'wardrobe_13', 'wardrobe_14', 'wardrobe_15', 'wardrobe_16', 'wardrobe_17', 'wardrobe_18', 'wardrobe_19', 'wardrobe_20',
'wardrobe_21', 'wardrobe_22', 'wardrobe_23', 'wardrobe_24', 'wardrobe_25', 'wardrobe_26', 'wardrobe_27', 'wardrobe_28', 'wardrobe_29', 'wardrobe_30',
'wardrobe_31', 'wardrobe_32', 'wardrobe_33', 'wardrobe_34', 'wardrobe_35', 'wardrobe_36', 'wardrobe_37', 'wardrobe_38', 'wardrobe_39', 'wardrobe_40'],
    Hallway: ['hallway_1','hallway_2','hallway_3','hallway_4','hallway_5','hallway_6', 'hallway_7', 'hallway_8', 'hallway_9', 'hallway_10', 'hallway_11',],
    Table: ['table_1', 'table_2', 'table_3', 'table_4', 'table_5', 'table_6', 'table_7', 'table_8', 'table_9']
  };
  
  function getImagePath(category, filename) {
    return `assets/images/${category}/${filename}.png`;
  }
  

  let currentIndex = 0;
  
  const categoriesEls   = document.querySelectorAll('.projects-categories span');
  const leftImgEl       = document.querySelector('.left-img');
  const centerImgEl     = document.querySelector('.center-img');
  const rightImgEl      = document.querySelector('.right-img');
  const arrowLeftEl     = document.querySelector('.arrow-left');
  const arrowRightEl    = document.querySelector('.arrow-right');
  const indicatorsWrap  = document.querySelector('.projects-indicators');
  

  


const $slider      = $('.projects-images');          
const $catSpans    = $('.projects-categories span'); 
const $projPrev    = $('.projects-prev');            
const $projNext    = $('.projects-next');

let currentCategory = 'Bathroom';


function buildProjectsSlider(cat){
  currentCategory = cat;

  
  $catSpans.removeClass('clicked-cat')
           .filter(`[data-category="${cat}"]`).addClass('clicked-cat');

  
  if($slider.hasClass('slick-initialized')) $slider.slick('unslick');

  
  const markup = projectImages[cat]
  .map((file,idx) => `<div>
                         <img src="${getImagePath(cat,file)}"
                              alt="${file}"
                              class="proj-img"
                              data-idx="${idx}">
                       </div>`)
    .join('');
  $slider.html(markup);


const $indWrap = $('.projects-indicators').empty();      
projectImages[cat].forEach((_, i)=>{
  const $rect = $('<div>', { class: 'projects-rect' });
  if (i === 0) $rect.addClass('projects-rect-active');   
  $indWrap.append($rect);
});

  
  $slider.slick({
    infinite: true,
    slidesToShow: 3,          
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    arrows: false,
    waitForAnimate:false,            
    dots: false,
    speed: 800,
    responsive: [{
      breakpoint: 781,
      settings:{ slidesToShow: 1, centerMode:true }
    }]
  });

  $slider.off('afterChange').on('afterChange', function(){
    const centerIdx = +$('.projects-images .slick-center .proj-img').data('idx');
    const $rects    = $('.projects-rect');
    $rects.removeClass('projects-rect-active')
          .eq(centerIdx).addClass('projects-rect-active');
  });

  
  $slider.on('click','.proj-img', function(){
    const src = $(this).attr('src');
    $('.lightbox-img').attr('src',src);
    $('.lightbox-overlay').css('display','flex');
  });
}




$projPrev.on('click', ()=> $slider.slick('slickPrev'));
$projNext.on('click', ()=> $slider.slick('slickNext'));


$catSpans.on('click', function(){
  buildProjectsSlider( $(this).data('category') );
});


$(document).ready(()=> buildProjectsSlider('Bathroom'));


const lightboxOverlay   = document.querySelector('.lightbox-overlay');
const lightboxImg       = document.querySelector('.lightbox-img');
const lightboxClose     = document.querySelector('.lightbox-close');
const lbLeft            = document.querySelector('.lightbox-arrow-left');
const lbRight           = document.querySelector('.lightbox-arrow-right');

let lbCat  = '';        
let lbIdx  = 0;         

function showLb(){
  lightboxImg.src = getImagePath(lbCat, projectImages[lbCat][lbIdx]);
}


$slider.on('click','.proj-img', function () {
  lbCat = currentCategory;          
  lbIdx = +this.dataset.idx;        
  showLb();
  lightboxOverlay.style.display = 'flex';
});


lbLeft.addEventListener('click',  e => {
  e.stopPropagation();
  lbIdx = (lbIdx - 1 + projectImages[lbCat].length) % projectImages[lbCat].length;
  showLb();
});
lbRight.addEventListener('click', e => {
  e.stopPropagation();
  lbIdx = (lbIdx + 1) % projectImages[lbCat].length;
  showLb();
});


lightboxClose .addEventListener('click', () => lightboxOverlay.style.display='none');
lightboxOverlay.addEventListener('click',  e => {
  if (e.target === lightboxOverlay) lightboxOverlay.style.display='none';
});



  
  document.body.contentEditable = false;
  document.designMode = "off";



$(document).ready(function(){
  $('.reviews-slider').slick({
    infinite: true,
    slidesToShow: 3,            
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: true,
    waitForAnimate:false,
    dots: false,
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="assets/svg/arrow_left.svg" alt="Prev"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="assets/svg/arrow_right.svg" alt="Next"></button>',
    centerMode: true,
    centerPadding: '0px',

    
    
    responsive: [
      {
        breakpoint: 1020, 
        settings: {
          slidesToShow: 2,
          arrows: true,
          centerMode: true,
          centerPadding: '0px'
        }
      },
      {
        breakpoint: 781, 
        settings: {
          slidesToShow: 1,
          arrows: true, 
          centerMode: false, 
          centerPadding: '0px'
        }
      },
      {
        breakpoint: 360, 
        settings: {
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '0px'
        }
      },
    ]
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector('.furniture-video');

  if (video) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.currentTime = 0; 
          video.play();          
        }
      });
    }, { threshold: 0.1 }); 

    observer.observe(video);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  
  emailjs.init('u9n54Ufke11xtwRyj');

  
  const contactForm   = document.getElementById('contactForm');
  const submitBtn     = document.querySelector('.popup-submit-btn');
  const requestForm   = document.getElementById('requestForm');
  const thankYouPopup = document.getElementById('thankYouPopup');
  const overlay       = document.querySelector('.popup-overlay');
  const checkboxInput = document.getElementById('consent');
  const ctaButtons    = document.querySelectorAll('.cta-btn:not(.popup-submit-btn)');
  const closeButtons  = document.querySelectorAll('.popup-close');
  const customCheckbox = document.querySelector('.custom-checkbox');
  const checkedImg    = document.querySelector('.checkbox-checked');
  const uncheckedImg  = document.querySelector('.checkbox-unchecked');

  document.querySelector('.footer-privacy').addEventListener('click', e=>{
  e.preventDefault();
  openModal( document.getElementById('privacyPopup') );
});
  
  
  function openModal(modal) {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    
    
    setTimeout(function() {
      overlay.classList.add('active');
      modal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden'; 
  }
    
  
  function closeModal(modal) {
    overlay.classList.remove('active');
    modal.classList.remove('active');
    
    
    setTimeout(function() {
      if (!document.querySelector('.popup.active')) { 
        overlay.style.display = 'none';
      }
      modal.style.display = 'none';
      document.body.style.overflow = ''; 
    }, 400); 
  }
  
  
  function validateForm() {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const project = document.getElementById('project');
    
    let isValid = true;
    
    
    if (!name.value.trim()) {
      markAsError(name);
      isValid = false;
    } else {
      markAsValid(name);
    }
    
    
    if (!phone.value.trim()) {
      markAsError(phone);
      isValid = false;
    } else {
      markAsValid(phone);
    }
    
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      markAsError(email);
      isValid = false;
    } else {
      markAsValid(email);
    }
    
    
    if (!project.value.trim()) {
      markAsError(project);
      isValid = false;
    } else {
      markAsValid(project);
    }
    
    
    if (!checkboxInput.checked) {
      isValid = false;
    }
    
    return isValid;
  }
  
  
  function markAsError(input) {
    input.parentElement.parentElement.classList.add('error');
  }
  
  
  function markAsValid(input) {
    input.parentElement.parentElement.classList.remove('error');
  }

  

  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(requestForm);
    });
  });
  
  
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = button.closest('.popup');
      if (modal) closeModal(modal);
    });
  });
  
  
  overlay.addEventListener('click', function() {
    document.querySelectorAll('.popup.active')
    .forEach(popup => closeModal(popup));
  });
  
  
  customCheckbox.addEventListener('click', function() {
    checkboxInput.checked = !checkboxInput.checked;
  
    if (checkboxInput.checked) {
      checkedImg.classList.remove('hidden'); 
      submitBtn.disabled = false; 
    } else {
      checkedImg.classList.add('hidden'); 
      submitBtn.disabled = true; 
    }
  });
  checkboxInput.addEventListener('change', function () {
  if (this.checked) {
    checkedImg.classList.remove('hidden');   
    submitBtn.disabled = false;              
  } else {
    checkedImg.classList.add('hidden');      
    submitBtn.disabled = true;               
  }
});

  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    
    if (!validateForm()) return;

    
    submitBtn.disabled = true;
    
    try {
      
      await emailjs.send('service_et3r9ity', 'template_jksbvha', {
        name   : contactForm.name.value.trim(),
        phone  : contactForm.phone.value.trim(),
        email  : contactForm.email.value.trim(),
        project: contactForm.project.value.trim()
      });
      
      
      closeModal(requestForm);
      
      
      setTimeout(() => {
        openModal(thankYouPopup);
      }, 450);
      
      
      contactForm.reset();
      
      
      checkedImg.classList.add('hidden');
      uncheckedImg.classList.remove('hidden');
      
    } catch (err) {
      console.error('EmailJS error', err);
      alert('Не удалось отправить письмо. Попробуйте позже.');
    } finally {
      submitBtn.disabled = false;
    }
  });

  
  const inputs = document.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(input => {
    input.setAttribute('placeholder', ' '); 
    
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('.main-nav');

  if (!burger) return;

  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
});




   document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.hero-anim');
    if (!container) return;
  
    
    const wait = setInterval(() => {
      if (!window.lottie) return;
      clearInterval(wait);
  
      
      const anim = lottie.loadAnimation({
        container,
        renderer : 'svg',            
        loop     : false,            
        autoplay : false,
        path     : 'assets/anim/furniture.json'
      });
  
      
      let played = false;
  
      
      anim.addEventListener('DOMLoaded', () => anim.play());
  
      
      anim.addEventListener('complete', () => {
        const last = anim.totalFrames - 1;     
        anim.goToAndStop(last, true, true);    
        played = true;
      });
  
      
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!played) {
              anim.goToAndStop(0, true);
              anim.play();
            }
          } else {
            
            played = false;
          }
        });
      }, { threshold: 0.1 });
  
      io.observe(container);
  
      
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      function toggleMotion(disable){
        if (disable){
          const last = anim.totalFrames - 1;
          anim.goToAndStop(last, true, true);
          played = true;
        }else{
          
          played = false;
          if (container.getBoundingClientRect().top < window.innerHeight * 0.3){
            anim.goToAndStop(0, true);
            anim.play();
          }
        }
      }
      toggleMotion(mq.matches);
      mq.addEventListener('change', e => toggleMotion(e.matches));
    }, 40);
  });


  document.querySelector('.nav-overlay')
        .addEventListener('click', ()=> burger.click());


        document.addEventListener('DOMContentLoaded', () => {

          const DURATION = 800;        
        
          document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
              const target = document.querySelector(link.getAttribute('href'));
              if (!target) return;          
        
              e.preventDefault();           
              const start   = window.pageYOffset;
              const end     = target.getBoundingClientRect().top + start;
              const dist    = end - start;
              const startT  = performance.now();
        
              function step(time){
                const prog = Math.min((time - startT) / DURATION, 1);   
                const ease = prog < .5 ? 2*prog*prog : -1+(4-2*prog)*prog; 
                window.scrollTo(0, start + dist * ease);
                if (prog < 1) requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            });
          });
        
        });

        /* ----------  Переход по клику на отзыв  ---------- */
$(document).on('click', '.review-block', function(){
  window.open('https://www.facebook.com/LOFTWEEDESIGN/reviews', '_blank');
});