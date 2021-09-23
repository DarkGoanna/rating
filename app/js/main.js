const html = document.querySelector('html');
const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const menuList = menu.querySelector('.menu');
const menuItemWithSubmenu = document.querySelectorAll('.has-children');
const desktopBreakpoint = 1000;
const language = document.querySelector('.language')
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
    html.classList.toggle('scrollOff');
    burger.classList.toggle('open');
    menu.classList.toggle('open');

    // при открытии/закрытии закрыть все подменю
    closeSubMenu();
});

// фиксим проваливание блока идущего после fixed header
function fixHeaderHeight() {
    const padding = window.matchMedia(`(max-width: 580px)`).matches ? 40 : 80;
    header.nextElementSibling.style.marginTop = `${header.clientHeight + padding}px`;
}

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
        ||
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

// language
function languageSwitcher() {
    language.addEventListener('click', event => {
        const target = event.target;
        if (target.hasAttribute('data-language')) {
            const output = language.querySelector('.language__active');
            const languageValue = target.getAttribute('data-language');

            output.parentElement.classList.remove('open')
            output.textContent = languageValue;
            html.setAttribute('lang', languageValue);
        }
    })
}

// active-ratings
const activeRatings = document.querySelector('.active-ratings__slider');
if (activeRatings) {
    new Swiper(activeRatings, {
        slidesPerView: 4,
        spaceBetween: 80,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1000: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1100: {
                spaceBetween: 50,
            },
            1200: {
                spaceBetween: 80,
            },
        },
        navigation: {
            prevEl: ".active-ratings__prev",
            nextEl: ".active-ratings__next",
        },
    });
}

// Enable slider on mobile devices and destroy on desctop
function SliderOnMobile(sliderName, prev, next) {
    let lr_swiper;
    let lr_init = false;

    return function swiperMode() {
        const mobile = window.matchMedia('(min-width: 0px) and (max-width: 580px)');
        const slider = document.querySelector(sliderName);

        if (slider) {
            if (mobile.matches) {
                if (!lr_init) {
                    lr_init = true;
                    lr_swiper = new Swiper(slider, {
                        slidesPerView: 1,
                        spaceBetween: 15,
                        autoHeight: true,
                        navigation: {
                            prevEl: prev,
                            nextEl: next,
                        },
                    });
                }
            } else {
                if (lr_swiper !== undefined) {
                    lr_swiper.destroy();
                }
                lr_init = false;
            }
        }
    }
}

// last-rating
const lastRating = SliderOnMobile('.last-rating__slider', '.last-rating__prev', '.last-rating__next');

// news
const news = SliderOnMobile('.news__slider', '.news__prev', '.news__next');

// btn "read more" in section seo
const seo = document.querySelector(".seo");
if (seo) {
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

// active-ratings
const experts = document.querySelector('.experts__slider');
if (experts) {
    new Swiper(experts, {
        slidesPerView: 4,
        spaceBetween: 60,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1000: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1200: {
                spaceBetween: 60,
            },
        },
        navigation: {
            prevEl: ".experts__prev",
            nextEl: ".experts__next",
        },
    });
}

// custom select
function initSelect() {
    const selects = document.querySelectorAll('.select-wrapper');
    selects.forEach(select => {
        const otput = select.querySelector('.custom-select__value');
        select.addEventListener('click', event => {
            const target = event.target;
            if (target.hasAttribute('data-value')) {
                const id = target.getAttribute('data-value');
                const value = target.textContent;
                otput.textContent = value;
                otput.parentElement.classList.remove('open');
            }
        })
    })
}

// при загрузке
window.addEventListener('load', () => {
    isMobile = window.matchMedia(`(max-width: ${desktopBreakpoint}px)`).matches;
    fixHeaderHeight();
    addButtonComeback();
    openSubmenu('.arrow');
    openSubmenu('.search__btn');
    if (isMobile) setSubmenuPosition();
    if (isApple()) html.classList.add('ios');
    languageSwitcher();
    lastRating();
    news();
    initSelect();
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
    lastRating();
    news();
});