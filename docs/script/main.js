document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtns = document.querySelectorAll('.dropdown__btn');
  const buttons = document.querySelectorAll('button');
  const menu = document.querySelector('#menu');
  const searchField = document.querySelector('#header__search-field');
  const select = document.querySelector('.select');

  buttons.forEach(button => button.addEventListener('mousedown', (e) => {
    e.preventDefault();
  }))

  dropdownBtns.forEach(btn => btn.addEventListener('click', (ev) => {
    ev.target.classList.toggle('is-active');
    ev.target.nextElementSibling.classList.toggle('dropdown__content--active');

    document.addEventListener('click', (e) => {
      if (e.target !== btn) {
        btn.classList.remove('is-active');
        ev.target.nextElementSibling.classList.remove('dropdown__content--active');
      }
    })
  }));

  document.querySelector('#open-menu').addEventListener('click', () => {
    menu.classList.add('is-active')
  });

  document.querySelector('#close-menu').addEventListener('click', () => {
    menu.classList.remove('is-active')
  });

  document.querySelector('#header__search-btn').addEventListener('click', (ev) => {
    ev.preventDefault();
    searchField.classList.toggle('shown');
    if (searchField.classList.contains('shown')) {
      searchField.parentElement.style.backgroundColor = '#18171b';
    }
  });

  
  const choices = new Choices(select, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });

  const swiper = new Swiper('.gallery-slider', {
    slidesPerView: 3,
    grid: {
      fill: 'row',
      rows: 2,
    },
    slidesPerGroup: 3,
    spaceBetween: 50,
    pageUpDown: true,
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

});