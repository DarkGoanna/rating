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
        slidesPerView: 2,
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
                spaceBetween: 30,
            },
            1000: {
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

        e.classList.add("less");
        t.textContent = more;

        t.addEventListener("click", () => {
            const defaultHeight = document.querySelector(".seo__text").scrollHeight;
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

// experts
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
    const selectWrapper = document.querySelector('#region-rating');
    let label = null;

    if (selects.length) {
        if (selectWrapper) {
            label = selectWrapper.querySelector('.content__label');
        }
        selects.forEach(select => {
            const otput = select.querySelector('.custom-select__value');
            if (!isApple()) {
                // for other devices - custom select
                select.addEventListener('click', event => {
                    const target = event.target;
                    if (target.hasAttribute('data-option')) {
                        const option = target.getAttribute('data-option');
                        const value = target.textContent;
                        otput.textContent = value;
                        label.textContent = value;
                        otput.parentElement.classList.remove('open');

                        switch (select.id) {
                            case 'sort':
                                selectWrapper.setAttribute('data-sort', option);
                                break;
                            case 'region':
                                selectWrapper.setAttribute('data-region', option);
                                break;
                        }

                        renderRegionRating();
                    }
                })
            } else {
                // for ios - default select
                select.querySelectorAll('.default-select').forEach(ds => {
                    ds.addEventListener('change', event => {
                        const active = event.target.querySelector('option:checked')
                        const option = active.getAttribute('data-option');
                        label.textContent = active.textContent;

                        switch (select.id) {
                            case 'sort':
                                selectWrapper.setAttribute('data-sort', option);
                                break;
                            case 'region':
                                selectWrapper.setAttribute('data-region', option);
                                break;
                        }

                        renderRegionRating();
                    })
                })
            }
        })
    }

}

function renderRegionRating() {
    const ratingWrapper = document.querySelector('#region-rating');
    if (ratingWrapper) {
        const region = ratingWrapper.getAttribute('data-region');
        const sort = ratingWrapper.getAttribute('data-sort');
        const id = ratingWrapper.getAttribute('data-category-id');
        const count = 4;

        getRating(id, count, sort, region);
    }
}

// get rating
function getRating(id, perPage, sort, region) {
    let domain = 'https://new.eliteukrainerating.com/';
    let url = `${domain}ajax/get_rating/${id}/?per_page=${perPage}&sort=${sort}&region=${region}`;

    fetch(url)
        .then(response => response.text())
        .then(str => JSON.parse(str))
        .then(arr => {
            const wrapper = document.querySelector('.region-table__list');
            wrapper.textContent = '';
            arr.forEach((person, i) => {
                const url = person.url;
                const name = person.name;
                const image = person.image;
                const occupation = person.nomination.name !== null ? person.nomination.name : '';
                const position = person.dolgnost !== null ? person.dolgnost : '';

                wrapper.insertAdjacentHTML('beforeend', `<li>
                    <div class="region-table__position t2">${i + 1}</div>
                    <div class="region-table__person">
                        <a href="${url}">
                            <picture class="region-table__photo">
                                <img loading="lazy" src="${image}" alt="${name}">
                            </picture>
                        </a>
                        <div class="region-table__description">
                            <p class="region-table__name t3">
                                <a href="${url}">${name}</a>
                            </p>
                            <p class="region-table__text small">${position}</p>
                        </div>
                    </div>
                    <div class="region-table__label">${occupation}</div>
                </li>`);
            })
        })
}

// partners
const partners = document.querySelector('.partners__slider');
if (partners) {
    new Swiper(partners, {
        slidesPerView: 6,
        spaceBetween: 40,
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            400: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1000: {
                slidesPerView: 5,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 6,
                spaceBetween: 40,
            },
        },
        navigation: {
            prevEl: ".partners__prev",
            nextEl: ".partners__next",
        },
    });
}

// archive
const activeYears = document.querySelector('.archive__years');

if (activeYears) {
    // slider for year buttons
    new Swiper(activeYears, {
        slidesPerView: 3,
        spaceBetween: 5,
        navigation: {
            prevEl: ".archive__prev",
            nextEl: ".archive__next",
        },
    });

    // init first load data
    const activeButton = activeYears.querySelector('.swiper-slide-active');
    activeButton.classList.add('active');

    const count = 2;
    const domain = 'https://new.eliteukrainerating.com';
    let id = activeYears.closest('.archive').getAttribute('id');
    let year = activeButton.getAttribute('data-year');
    let lang = html.getAttribute('lang');
    let language = (lang !== 'ru') ? `lang=${lang}` : '';
    let url = `${domain}/ajax/get_ratings`;

    async function callArchiveRender() {
        if (id === 'archive__page') {
            url = language ? `${url}/${year}/?${language}` : `${url}/${year}/`;
            await renderArchive(url);
            await initPagination('#archive__page .archive__content', '.archive__card', 12);
        } else {
            url = language ? `${url}/${year}/?${language}&per_page=${count}` : `${url}/${year}/?per_page=${count}`;
            renderArchive(url);
        }
    }

    callArchiveRender();

    // load new data on click
    activeYears.addEventListener('click', event => {
        const target = event.target;
        if (target.hasAttribute('data-year')) {
            activeYears.querySelectorAll('.archive__years li').forEach(li => li.classList.remove('active'));
            target.classList.add('active');

            // update this variables
            id = target.closest('.archive').getAttribute('id');
            year = target.getAttribute('data-year');
            lang = html.getAttribute('lang');
            language = (lang === 'ru') ? '' : `lang=${lang}`;
            url = `${domain}/ajax/get_ratings`;

            // on "archive__page" we will load all cards / on other only 2 card
            callArchiveRender();
        }
    });
}

// render archive card
function renderArchive(url) {
    return fetch(url)
        .then(response => response.text())
        .then(str => JSON.parse(str))
        .then(arr => {
            const wrapper = document.querySelector('.archive__content');
            wrapper.textContent = '';
            arr.forEach((archive) => {
                const url = archive.url;
                const name = archive.name;
                const image = archive.image;
                const label = archive.label;
                const date = archive.date;

                wrapper.insertAdjacentHTML('beforeend', `<div class="archive__card">
                <div class="content">
                    ${label ? `<span class="content__label small">${label}</span>` : ''}
                    <picture class="content__image">
                        <img loading="lazy" src="${image}" alt="${name}">
                    </picture>
                    <div class="content__description">
                        <div class="content__date">
                            <span>${date}</span>
                        </div>
                        <div class="content__title t2">
                            <a href="${url}">${name}</a>
                        </div>
                    </div>
                </div>`);
            })
        })
}

// при загрузке
window.addEventListener('load', () => {
    isMobile = window.matchMedia(`(max - width: ${desktopBreakpoint}px)`).matches;
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
    renderRegionRating();

});

// при ресайзе
window.addEventListener('resize', () => {
    isMobile = window.matchMedia(`(max - width: ${desktopBreakpoint}px)`).matches;
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