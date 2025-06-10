const body = document.querySelector('body');

const navBtn = document.querySelector('.nav-btn');
const sideBar = document.querySelector('.side-bar');
const closeBtn = document.querySelector('.close-btn');
const closeBtns = document.querySelector('.close-btns');

const barLinks = document.querySelector('.bar-links');
const bar = document.querySelectorAll('.bar');

const overlay = document.querySelector('.overlay');
const sectionOverlay = document.querySelectorAll('.sections');

const section1 = document.querySelector('.section1');
const section1Id = document.getElementById('section1');
const btnScrollTo = document.querySelector('.btn-header');
const aboutMore = document.querySelector('.more-overall');

const tabBlock = document.querySelectorAll('.block_header');
const tabContent = document.querySelectorAll('.block_info');

const book = document.querySelector('.book-btn');
const modal = document.querySelector('.modal');

const nav = document.querySelector('.nav-center');

const openBook = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeBook = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const openBar = function () {
  sideBar.style.transform = 'translateX(100px)';
  overlay.classList.remove('hidden');
};

const closeBar = function () {
  sideBar.style.transform = '';
  overlay.classList.add('hidden');
};

navBtn.addEventListener('click', openBar);
closeBtn.addEventListener('click', closeBar);

book.addEventListener('click', openBook);
closeBtns.addEventListener('click', closeBook);

overlay.addEventListener('click', closeBar);
overlay.addEventListener('click', closeBook);

document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key === 'Escape') closeBar();
});
document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key === 'Escape') closeBook();
});

barLinks.addEventListener('click', closeBar);

document.querySelector('.nav-bar').addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('link')) {
    // console.log(this, e.currentTarget);
    // console.log(e.target);
    const link = e.target;
    const siblings = link.closest('.nav-bar').querySelectorAll('.link');
    const logo = link.closest('.nav-bar').querySelector('img');

    siblings.forEach(link => {
      if (link !== e.target) link.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});
document.querySelector('.nav-bar').addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('link')) {
    // console.log(this, e.currentTarget);
    // console.log(e.target);
    const link = e.target;
    const siblings = link.closest('.nav-bar').querySelectorAll('.link');
    const logo = link.closest('.nav-bar').querySelector('img');

    siblings.forEach(link => {
      if (link !== e.target) link.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

// matching strategy for navbar

document.querySelector('.nav-links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('link')) {
    const links = e.target;
    // console.log(links);
    const siblings = links.getAttribute('href');
    // console.log(siblings);
    document.querySelector(siblings).scrollIntoView({ behavior: 'smooth' });
  }
});

// matching strategy for navbar

document.querySelector('.bar-body').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('alone-bar')) {
    const links = e.target;
    // console.log(links);
    const siblings = links.getAttribute('href');
    // console.log(siblings);
    document.querySelector(siblings).scrollIntoView({ behavior: 'smooth' });
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coods = aboutMore.getBoundingClientRect();
  // console.log(s1coods);

  // console.log(e.target.getBoundingClientRect());

  // console.log('current scroll (X/Y) ', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  aboutMore.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.block-body').addEventListener('click', function (e) {
  const clicked = e.target.closest('.block_header');
  // console.log(clicked);
  if (!clicked) return;
  tabBlock.forEach(el => el.classList.remove('block_header--active'));
  tabContent.forEach(el => el.classList.remove('block_info--active'));
  clicked.classList.add('block_header--active');
  // console.log(clicked.dataset.block);
  document
    .querySelector(`.block_info--${clicked.dataset.block}`)
    .classList.add('block_info--active');
  document
    .querySelector(`.img--${clicked.dataset.block}`)
    .classList.add('img-active');
});

// slides
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dots = document.querySelector('.dots');
  let curSlide = 0;
  let maxSlide = slides.length;

  const createDot = function () {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        'beforeend',
        `
      <button class="dots__dot" data-slide="${i}"></button> `
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // slider.style.transform = 'translateX(10px)';
  slider.style.overflow = 'hidden';
  // loop to be at 0% 100% 200% 300%
  slides.forEach((s, i) => (s.style.transform = `translate(${100 * i}%)`));
  // curSlide: -100% 0% 100% 200%
  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    gotoSlide(curSlide);
    activeDot(curSlide);
  };
  btnRight.addEventListener('click', nextSlide);

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    gotoSlide(curSlide);
    activeDot(curSlide);
  };

  const init = function () {
    gotoSlide(0);
    createDot();
    activeDot(0);
  };
  init();

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    // if (e.key === 'ArrowLeft') prevSlide();
    // else {
    //   nextSlide();
    // }
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  // document.querySelectorAll('.dots__dot').forEach(d => d.style.margin-right = '5rem' )
  dots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot'));
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activeDot(slide);
  });
};
sliders();

document.querySelector('.page').addEventListener('click', function () {
  window.location.href = 'shop.html';
});
document.querySelector('.pages').addEventListener('click', function () {
  window.location.href = 'shop.html';
});

const firstName = document.querySelector('.name-text');
const lastName = document.querySelector('.names-text');
const email = document.querySelector('.email');

document.querySelector('.btn-form').addEventListener('click', function (e) {
  e.preventDefault();
  firstName.value;
  lastName.value;
  email.value;

  const subject = 'Form Submission';
  const body = `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`;
  const mailto = `mailto:adenijipeter2018@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  firstName.value = lastName.value = email.value = '';
  closeBook();
});

const allSection = document.querySelectorAll('.sections');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.18,
});

allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
