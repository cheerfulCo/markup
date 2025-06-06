document.addEventListener('DOMContentLoaded', () => {
  initSearchFormOpenerListener();
  initCustomLangSwitcherSelect();
  initPromoSaleTabs();
  initCopyCodeListener();
  initRulesBtnListener();
  initMoreGoodsSwiper();
})


function initSearchFormOpenerListener() {
  const formOpener = document.querySelector('.header__top .search-form-opener');
  const form = document.querySelector('.header__top .search-form');
  const formClasses = form.classList;


  formOpener.addEventListener('click', (e) => {
    formClasses.toggle('active');
  })
}

function initCustomLangSwitcherSelect() {
  const languageOptions = [
    { value: 'en', text: 'English', flag: 'gb.jpg' },
    { value: 'uk', text: 'Українська', flag: 'flag.jpg' },
  ];

  new TomSelect('#language-select', {
    controlInput: false,
    options: languageOptions.map(lang => ({
      value: lang.value,
      text: lang.text,
      customProperties: { flag: lang.flag }
    })),
    items: ['uk'],
    render: {
      option: (data, escape) => `
          <div class="language-option">
            <img class="flag" src="./assets/images/icons/${escape(data.customProperties.flag)}" alt="" />
            <span>${escape(data.text)}</span>
          </div>
        `,
      item: (data, escape) => `
          <div class="language-option">
            <img class="flag" src="./assets/images/icons/${escape(data.customProperties.flag)}" alt="" />
            <span>${escape(data.text)}</span>
          </div>
        `
    }
  });
}

function initPromoSaleTabs() {
  const tabs = new Tabby('[data-tabs]');
}

function initCopyCodeListener() {
  const button = document.getElementById('copy-btn');
  const code = document.getElementById('code').innerText;
  const alert = document.querySelector('.copy-code');

  button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(code)
    alert.innerText = 'Код скопійовано';
  })
}

function initRulesBtnListener() {
  const buttonWrapper = document.querySelector('.rules__buttons');
  const buttons = document.querySelectorAll('.rules-button')

  buttonWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('active')) {
      return;
    }

    buttons.forEach((button) => {
      button.classList.remove('active');
    })

    event.target.classList.add('active');
  })
}

function initMoreGoodsSwiper() {
  const swiper = new Swiper('#more-goods', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    spaceBetween: 10,
    speed: 400,
    centeredSlides: true,
    loop: true,
    slidesPerView: 2.5,
    braakPoints: {
      640: {
        slidesPerView: 3.5,
      },
      768: {
       slidesPerView: 5.5 
      }
    },
    on: {
      init: function () {
        updateCustomPagination(this);
      },
      slideChange: function () {
        updateCustomPagination(this);
      }
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })
}

function updateCustomPagination(swiper) {
  const current = swiper.realIndex + 1;
  const total = swiper.slides.length;
  document.getElementById('custom-pagination').textContent = `${current} з ${total}`;
}