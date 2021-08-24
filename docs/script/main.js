document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtns = document.querySelectorAll('.dropdown__btn');
  const buttons = document.querySelectorAll('button');
  const menu = document.querySelector('#menu');
  const searchField = document.querySelector('#header__search-field');

  buttons.forEach(button => button.addEventListener('mousedown', (e) => {
    e.preventDefault();
  }))

  dropdownBtns.forEach(btn => btn.addEventListener('click', (ev) => {
    ev.target.classList.remove('is-active');
    ev.target.nextElementSibling.classList.toggle('dropdown__content--active');

    new SimpleBar(ev.target.nextElementSibling), {
      autoHide: false,
      forceVisible: true,
    }

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

});