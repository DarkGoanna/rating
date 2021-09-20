const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const menuList = menu.querySelector('.menu');
const menuItemWithSubmenu = document.querySelectorAll('.has-children');
const desktopBreakpoint = 1000;
let isMobile = null;

// добавляем кнопки раскрытия подменю
menuItemWithSubmenu.forEach(item => {
  item.classList.add('has-arrow');
  if (item.lastElementChild.className !== 'arrow') {
    item.insertAdjacentHTML('beforeend', '<button class="menu__btn arrow delete-btn-style" type="bytton"></button>');
  }
});

// кнопка назад
function addButtonComeback() {
  const comebackButton = '<button type="button" class="menu__comeback delete-btn-style">Назад</button>';
  document.querySelectorAll('.menu__submenu').forEach(submenu => {
    submenu.insertAdjacentHTML('afterbegin', comebackButton);
  });
  menu.querySelectorAll('.menu__comeback').forEach(btn => {
    btn.addEventListener('click', () => {
      menuList.classList.remove('show-submenu');
      btn.closest('.has-children').classList.remove('open');
    })
  })
}

// ставим submenu вверху
function setSubmenuPosition() {
  document.querySelectorAll('.menu__submenu').forEach(submenu => {
    const menuListTop = menuList.offsetTop;
    const submenuTop = submenu.parentElement.offsetTop;
    const difference = submenuTop - menuListTop;
    submenu.style.top = `-${difference}px`;
  });
}

// возвращаем submenu в обычное положение
function resetSubmenuPosition() {
  document.querySelectorAll('.menu__submenu').forEach(submenu => {
    submenu.style.top = '';
  });
}

// открытие подменю
function openSubmenu(btn) {
  document.querySelectorAll(btn).forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');

      // для меню на мобильном
      if (isMobile) {
        const menuList = btn.closest('.menu');
        if (menuList) {
          menuList.classList.toggle('show-submenu');
        }
      }
    })

  })
}

// закрыть меню
function closeMenu() {
  menu.classList.remove('open');
}

// закрыть все подменю
function closeSubMenu() {
  const allActiveItems = menu.querySelectorAll('.open');
  for (let i = 0; i < allActiveItems.length; i++) {
    allActiveItems[i].classList.remove('open');
  }
}

// burger
burger.addEventListener('click', () => {
  document.querySelector('html').classList.toggle('scrollOff');
  burger.classList.toggle('open');
  menu.classList.toggle('open');

  // при открытии/закрытии закрыть все подменю
  closeSubMenu();
});

// фиксим проваливание блока идущего после fixed header
function fixHeaderHeight() {
  header.nextElementSibling.style.paddingTop = `${header.clientHeight}px`;
}

// при загрузке
window.addEventListener('load', () => {
  isMobile = window.matchMedia(`(max-width: ${desktopBreakpoint}px)`).matches;
  fixHeaderHeight();
  addButtonComeback();
  openSubmenu('.arrow');
  openSubmenu('.search__btn');
  if (isMobile) setSubmenuPosition();
});

// при ресайзе
window.addEventListener('resize', () => {
  isMobile = window.matchMedia(`(max-width: ${desktopBreakpoint}px)`).matches;
  if (!isMobile) {
    closeMenu();
    resetSubmenuPosition();
  } else {
    setSubmenuPosition();
  }
  fixHeaderHeight();
});

// is Apple
function isApple() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

window.addEventListener('load', () => {
  if (isApple()) document.querySelector('html').classList.add('ios');
});


// btn "read more" in section seo
if (document.querySelector(".seo")) {
  const less = 'Свернуть';
  const more = 'Подробнее';
  const e = document.querySelector(".seo__text");
  const minHeight = Number.parseInt(e.style.getPropertyValue('--height'));

  if (e.scrollHeight > minHeight) {
    e.parentElement.insertAdjacentHTML("beforeend", '<button type="button" class="seo__btn btn"></button>');
    const t = document.querySelector(".seo__btn");
    const defaultHeight = document.querySelector(".seo__text").scrollHeight;

    e.classList.add("less");
    t.textContent = more;

    t.addEventListener("click", () => {
      e.classList.toggle("less");
      if (e.classList.contains('less')) {
        t.textContent = more;
        e.style.maxHeight = `${minHeight}px`;
      } else {
        t.textContent = less;
        e.style.maxHeight = `${defaultHeight}px`;
      }
    });
  }
}