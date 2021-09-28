document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtns = document.querySelectorAll('.dropdown__btn');
  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => button.addEventListener('mousedown', (ev) => {
    ev.preventDefault();
  }))

  // Smooth scroll
  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function(ev) {
      ev.preventDefault()
      
      const blockID = anchor.getAttribute('href').substr(1)
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    })
  };

  // Header dropdowns
  dropdownBtns.forEach(btn => btn.addEventListener('click', (ev) => {
    ev.target.classList.toggle('is-active');
    ev.target.nextElementSibling.classList.toggle('dropdown__content--active');

    document.addEventListener('click', (ev) => {
      if (ev.target !== btn) {
        btn.classList.remove('is-active');
        ev.target.nextElementSibling.classList.remove('dropdown__content--active');
      }
    })
  }));

  // Header burger
  const menu = document.querySelector('#menu');

  document.querySelector('#open-menu').addEventListener('click', () => {
    menu.classList.add('is-active')
  });

  document.querySelector('#close-menu').addEventListener('click', () => {
    menu.classList.remove('is-active')
  });

  // Header search
  const searchField = document.querySelector('#header__search-field');

  document.querySelector('#header__search-btn').addEventListener('click', (ev) => {
    ev.preventDefault();
    searchField.classList.toggle('shown');
    if (searchField.classList.contains('shown')) {
      searchField.parentElement.style.backgroundColor = '#18171b';
    }
  });

  // Gallery filter
  const select = document.querySelector('.select');
  const choices = new Choices(select, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });

  // Gallery slider
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

  // Catalogue 
  const tabBtns = document.querySelectorAll('.catalogue-tabs__btn');
  const accordions = document.querySelectorAll('.catalogue-accordion__btn');
  const artistTabs = document.querySelectorAll('.artists-list__btn');

  function getSiblings(el) {
    let siblings = []; 
    if(!el.parentNode) {
        return siblings;
    }
    let sibling  = el.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== el) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
  };

  function changeAttributes(item, myClass) {
    const accordionBtn = document.querySelector('.catalogue-accordion__btn');
    const content = item.querySelector('.catalogue-accordion__content-wrap');

    if (item.classList.contains(myClass)) {
      accordionBtn.setAttribute('aria-expanded', true);
      content.setAttribute('aria-hidden', false);
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      accordionBtn.setAttribute('aria-expanded', false);
      content.setAttribute('aria-hidden', true);
      content.style.maxHeight = null;
    }
  };

  // Change country 
  tabBtns.forEach(tabBtn => {
    tabBtn.addEventListener('click', (ev) => {
      const self = ev.currentTarget;
      const path = self.dataset.path;
      const content = document.querySelector(`[data-target="${path}"]`); 
      const tabSiblings = getSiblings(self.parentNode);
      const contentSiblings = getSiblings(content);
      const tabList = content.querySelector('.catalogue-accordion__list').children;

      self.classList.add('catalogue-tabs__btn--actve');
      content.classList.add('catalogue-tabs__content--active');

      tabSiblings.forEach(tabSibling => {
        tabSibling.children[0].classList.remove('catalogue-tabs__btn--actve')
      });
      contentSiblings.forEach(contentSibling => {
        contentSibling.classList.remove('catalogue-tabs__content--active');
      });

      for(let i = 0; i < tabList.length; i++) {
        if(tabList[i].classList.contains('item-opened')) {
          changeAttributes(tabList[i], 'item-opened')
        }
      }
    })
  });

  // Open period in accordion
  accordions.forEach(el => {
    changeAttributes(el.parentElement, 'item-opened');
    el.addEventListener('click', (ev) => {
      const self = ev.currentTarget;
      const parent = self.parentElement;

      parent.classList.toggle('item-opened');
      changeAttributes(parent, 'item-opened');

      const siblings = getSiblings(parent);
      siblings.forEach(sibling => {
        sibling.classList.remove('item-opened');
        changeAttributes(sibling, 'item-opened');
      });
    })
});

// Change tabs with artists info
artistTabs.forEach(artistTab => {
  artistTab.addEventListener('click', (ev) => {
    const self = ev.currentTarget;
    const path = self.dataset.path;
    const targetContent = document.querySelector(`[data-target="${path}"]`); 
    const tabSiblings = getSiblings(self.parentNode);
    const contentSiblings = getSiblings(targetContent);

    self.classList.add('artists-list__btn--active');
    targetContent.classList.add('catalogue__info--active');

    tabSiblings.forEach(tabSibling => {
      tabSibling.querySelector('.artists-list__btn').classList.remove('artists-list__btn--active')
    });
    contentSiblings.forEach(contentSibling => {
      contentSibling.classList.remove('catalogue__info--active');
    });

  })
});

// Show more events
const eventsBtn = document.querySelector('.events__btn');
const events = document.querySelector('.events-list-bottom');

eventsBtn.addEventListener('click', () => {
  events.style.display = 'flex';
  eventsBtn.style.display = 'none';
});

});