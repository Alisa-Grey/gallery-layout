document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtns = document.querySelectorAll('.dropdown__btn');
  const dropdowns = document.querySelectorAll('.dropdown__content');
  const buttons = document.querySelectorAll('button');
  const menu = document.querySelector('#menu');

  buttons.forEach(button => button.addEventListener('mousedown', button => button.preventDefault()));

  for (let i = 0; i < dropdownBtns.length; i++) {
    dropdownBtns[i].addEventListener('click', () => {
      dropdowns[i].classList.toggle('dropdown__content--active');
      dropdownBtns[i].classList.toggle('is-active')
    });

    new SimpleBar(dropdowns[i]), {
      autoHide: false,
      scrollbarMaxSize: 28,
      forceVisible: true,
    };
  }

  document.querySelector('#open-menu').addEventListener('click', () => {
    menu.classList.add('is-active')
  });

  document.querySelector('#close-menu').addEventListener('click', () => {
    menu.classList.remove('is-active')
  });

});