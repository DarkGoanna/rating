const html = document.querySelector('html');
const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const menuList = menu.querySelector('.menu');
const menuItemWithSubmenu = document.querySelectorAll('.has-children');
const desktopBreakpoint = 1000;
const language = document.querySelector('.language');
let isMobile = null;
let currentLanguage = null;
const domain = 'https://new.eliteukrainerating.com';

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
    burger.classList.remove('open');
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
function initSeo() {
    const seo = document.querySelector(".seo");
    if (seo) {
        const less = currentLanguage === 'ru' ? 'Свернуть' : 'Згорнути';
        const more = currentLanguage === 'ru' ? 'Подробнее' : 'Детальніше';
        const e = document.querySelector(".seo__text");
        const minHeight = Number.parseInt(e.style.getPropertyValue('--height'));

        if (e.scrollHeight > minHeight) {
            e.parentElement.insertAdjacentHTML("beforeend", '<button type="button" class="seo__btn btn btn--v3"></button>');
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
                } else if (target.hasAttribute('data-href')) {
                    const href = target.getAttribute('data-href');
                    const value = target.textContent;
                    otput.textContent = value;
                    otput.parentElement.classList.remove('open');
                    window.location.href = href;
                }
            })
        })
    }

}

// render Region Rating
function renderRegionRating() {
    const ratingWrapper = document.querySelector('#region-rating');
    if (ratingWrapper) {
        const region = ratingWrapper.getAttribute('data-region');
        const sort = ratingWrapper.getAttribute('data-sort');
        const id = ratingWrapper.getAttribute('data-category-id');
        const count = 4;
        const language = currentLanguage === 'ru' ? '' : '&lang=ua';

        getRating(id, count, sort, region, language);
    }
}

// get rating
function getRating(id, perPage, sort, region, language) {
    let url = `${domain}/ajax/get_rating/${id}/?per_page=${perPage}&sort=${sort}&region=${region}${language}`;

    fetch(url)
        .then(response => response.text())
        .then(str => JSON.parse(str))
        .then(arr => {
            const wrapper = document.querySelector('.region-table__list');
            wrapper.textContent = '';
            arr.forEach((person, i) => {
                const url = person.url;
                const name = person.name;
                const image = person.image ? person.image : '';
                const webp = person.webp ? person.webp : '';
                const occupation = person.nomination.name !== null ? person.nomination.name : '';
                const position = person.dolgnost !== null ? person.dolgnost : '';

                wrapper.insertAdjacentHTML('beforeend', `<li>
                    <div class="region-table__position t2">${i + 1}</div>
                    <div class="region-table__person">
                        <a href="${url}">
                            <picture class="region-table__photo">
                                <source srcset="${webp}" type="image/webp">
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

    const count = 4;
    let id = activeYears.closest('.archive').getAttribute('id');
    let year = activeButton.getAttribute('data-year');
    let lang = html.getAttribute('lang');
    let language = (lang !== 'ru') ? `lang=${lang}` : '';
    let url = `${domain}/ajax/get_ratings`;

    function callArchiveRender(count, id, year, language, url) {
        if (id === 'archive__page') {
            url = language ? `${url}/${year}/?${language}` : `${url}/${year}/`;
        } else {
            url = language ? `${url}/${year}/?${language}&per_page=${count}` : `${url}/${year}/?per_page=${count}`;
        }
        renderArchive(url);
    }

    callArchiveRender(count, id, year, language, url);

    // load new data on click
    activeYears.addEventListener('click', event => {
        const target = event.target;
        if (target.hasAttribute('data-year')) {
            activeYears.querySelectorAll('.archive__years li').forEach(li => li.classList.remove('active'));
            target.classList.add('active');

            // update this variables
            year = target.getAttribute('data-year');
            lang = html.getAttribute('lang');
            language = (lang === 'ru') ? '' : `lang=${lang}`;
            url = `${domain}/ajax/get_ratings`;

            // on "archive__page" we will load all cards / on other only 2 card
            callArchiveRender(count, id, year, language, url);
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
                const image = archive.image ? archive.image : '';
                const webp = archive.webp ? archive.webp : '';
                const dateStart = archive.date_start ? archive.date_start : '';
                const dateEnd = archive.date_end ? archive.date_end : '';

                wrapper.insertAdjacentHTML('beforeend', `<div class="archive__card">
                <div class="content">
                    <picture class="content__image">
                        <source srcset="${webp}" type="image/webp">
                        <img loading="lazy" src="${image}" alt="${name}">
                    </picture>
                    <div class="content__description">
                        <div class="content__date">
                            <p>${dateStart}</p>
                            <p>${dateEnd}</p>
                        </div>
                        <div class="content__title t2">
                            <a href="${url}">${name}</a>
                        </div>
                    </div>
                </div>`);
            })
        })
}

// like 
function initLike(parent) {
    parent = parent ? parent : 'body';
    const container = document.querySelector(parent);
    container.addEventListener('click', event => {
        event.stopPropagation()
        const target = event.target;

        if (target.classList.contains('like__btn')) {
            const wrapper = target.closest('.like__count');
            const article_id = target.getAttribute('article_id');
            const category_id = target.getAttribute('category_id');

            if (wrapper.getAttribute('data-pressed') === 'false') {
                wrapper.setAttribute('data-pressed', 'true');
                const count = target.nextElementSibling;
                count.textContent = ++count.textContent;
            }
            if (article_id && category_id) {
                let url = `${domain}/ajax/voites/voite/`;
                url = (currentLanguage === 'ru') ? url : `${url}?lang=ua`;

                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        'article_id': article_id,
                        'category_id': category_id
                    },
                    dataType: 'html',
                    success: function (data) {
                        const response = JSON.parse(data)

                        switch (response.type) {
                            case 'auth':
                                initAutorization(response.message);
                                break;
                            case 'notify':
                                initInfoMassage(response.message)
                                break;
                            case 'error':
                                initInfoMassage(response.message, 'error')
                                break;
                        }
                    },
                    error: function (data) {
                        alert('Ошибка ajax');
                    }
                })
            }
        }
    })
}

// autorization
function initAutorization(massege) {
    const wrapper = document.querySelector('.popup');
    const popup = wrapper.querySelector('.popup__inner');
    wrapper.querySelector('.popup__text').textContent = massege;

    wrapper.classList.add('open');
    setTimeout(() => { popup.classList.add('open') }, 400)
    html.classList.add('scrollOff');

    wrapper.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('popup') || target.classList.contains('popup__close')) {
            popup.classList.remove('open');
            setTimeout(() => { wrapper.classList.remove('open') }, 400)
            html.classList.remove('scrollOff');
        }
    })

}

// timer
function initTimer() {
    const timers = document.querySelectorAll('.timer');
    if (timers.length) {
        // render template
        function renderTimer(parent = document) {
            const isRU = currentLanguage === 'ru';

            const text = isRU ? 'Осталось' : 'Залишилося';
            const days = isRU ? 'дней' : 'днів';
            const hours = isRU ? 'часов' : 'годин';
            const minutes = isRU ? 'минут' : 'хвилин';
            const seconds = isRU ? 'секунд' : 'секунд';

            parent.insertAdjacentHTML('beforeend',
                `<div class="timer__inner">
                    <p>${text}</p>
                    <ul>
                        <li>
                            <p class="days"></p>
                            <p>${days}</p>
                        </li>
                        <li>
                            <p class="hours"></p>
                            <p>${hours}</p>
                        </li>
                        <li>
                            <p class="minutes"></p>
                            <p>${minutes}</p>
                        </li>
                        <li>
                            <p class="seconds"></p>
                            <p>${seconds}</p>
                        </li>
                    </ul>
                </div>`
            )
        }

        // start timer
        function startTimer(date, parent = document) {
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;
            const dateOfEnd = new Date(date).getTime();
            let x = setInterval(function () {

                const now = new Date().getTime();
                const distance = dateOfEnd - now;

                parent.querySelector('.days').innerText = Math.floor(distance / (day));
                parent.querySelector('.hours').innerText = Math.floor((distance % (day)) / (hour));
                parent.querySelector('.minutes').innerText = Math.floor((distance % (hour)) / (minute));
                parent.querySelector('.seconds').innerText = Math.floor((distance % (minute)) / second);

                //do something later when date is reached
                if (distance < 0) {
                    clearInterval(x);
                    parent.querySelector('.timer__inner').remove();
                }

            }, 0)
        }

        timers.forEach(timer => {
            const date = timer.getAttribute('data-date');
            renderTimer(timer);
            startTimer(date, timer);
        })
    }
}

// при смене языка переотрисовать блоки с корректным языком
function reRender() {
    // таймеры
    const timers = document.querySelectorAll('.timer__inner');
    if (timers.length) {
        timers.forEach(timer => {
            timer.remove();
            initTimer();
        })
    }
}

// expert rating (btn-link) and people rating (btn-link)
function checkRatingLinks() {
    const btns = document.querySelectorAll('.rating__link');
    if (btns.length) {
        btns.forEach(btn => {
            if (window.location.pathname === btn.getAttribute('href')) {
                btn.setAttribute('data-current', true)
            }
        })
    }
}

// rating page
function initRating() {
    const rating = document.querySelector('#rating');
    if (rating) {
        initLike('#rating');
        rating.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('content__switcher')) {
                const card = target.closest('.rating__card');
                card.classList.toggle('open');
            }
        })

        const id = rating.getAttribute('data-category-id');
        let url = window.location.href;
        const tailPosition = url.indexOf('?');
        const tail = tailPosition ? url.slice(tailPosition) : '/';
        url = `${domain}/ajax/get_products/${id}/${tail}`;

        const isActiveRating = Boolean(rating.getAttribute('active-rating'));
        const isHasSort = tail.includes('sort=');
        const showPosition = (isActiveRating && isHasSort && tail !== '/') ? true : false;

        const config = {
            containerName: '.rating__content',
            categoryID: id,
            showPosition: showPosition,
            createCard(data, wrapper, startFrom) {
                data.forEach((person, i) => {
                    const url = person.url;
                    const name = person.name;
                    const image = person.image ? person.image : '';
                    const webp = person.webp ? person.webp : '';
                    const position = startFrom + ++i;
                    const absentLable = currentLanguage === 'ru' ? 'Без категории' : 'Без категорії';
                    const lable = person.nomination.name ? person.nomination.name : absentLable;
                    const text = person.dolgnost ? person.dolgnost : '';
                    const voites = person.voites ? person.voites : '';
                    const articleID = person.product_id;
                    const pressed = Boolean(person.voited);

                    wrapper.insertAdjacentHTML(
                        'beforeend', `<div class="rating__card">
                        <div class="content">
                        <picture class="content__image">
                            <source srcset="${webp}" type="image/webp">
                            <img loading="lazy" src="${image}" alt="">
                        </picture>
            
                        ${showPosition ? `<span class="content__position t2">${position}</span>` : ''}
                        <div class="content__label small">${lable}</div>
                        <div class="content__title t2">
                            <a href="${url}">${name}</a>
                            <button class="content__open content__switcher" type="button"></button>
                        </div>
            
                        <div class="content__description">
                            <button class="content__close content__switcher" type="button"></button>
                            <div class="content__title t2"><a href="${url}">${name}</a></div>
                            <div class="content__text">${text}</div>
                        </div>
            
                        <div class="content__like like">
                            <div class="like__text small">Рейтинг</div>
                            <div class="like__count" data-pressed="${pressed}">
                            <button class="like__btn rate" type="button" article_id="${articleID}" category_id="${config.categoryID}">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 9.88687C16.5 9.48622 16.3407 9.11287 16.066 8.83753C16.3773 8.49687 16.536 8.04018 16.4927 7.56487C16.4147 6.71753 15.6513 6.05353 14.754 6.05353H10.636C10.84 5.43418 11.1667 4.29887 11.1667 3.38687C11.1667 1.94087 9.938 0.720215 9.16666 0.720215C8.47466 0.720215 7.97931 1.11021 7.95866 1.12621C7.87931 1.18956 7.83331 1.28556 7.83331 1.38687V3.64753L5.91266 7.80687L5.83331 7.84753V7.72018C5.83331 7.53618 5.68397 7.38684 5.49997 7.38684H2.16666C1.24734 7.38687 0.5 8.13422 0.5 9.05353V14.3869C0.5 15.3062 1.24734 16.0535 2.16666 16.0535H4.16666C4.88731 16.0535 5.50331 15.5935 5.73531 14.9515C6.29 15.2369 7.03666 15.3869 7.5 15.3869H13.6193C14.3453 15.3869 14.9807 14.8975 15.13 14.2229C15.2067 13.8749 15.162 13.5249 15.01 13.2209C15.502 12.9735 15.8333 12.4649 15.8333 11.8869C15.8333 11.6509 15.7793 11.4249 15.6773 11.2209C16.1693 10.9729 16.5 10.4649 16.5 9.88687ZM15.094 10.7095C14.9653 10.7249 14.8567 10.8122 14.8153 10.9355C14.7747 11.0589 14.8087 11.1942 14.9033 11.2835C15.0727 11.4429 15.1667 11.6575 15.1667 11.8869C15.1667 12.3075 14.8487 12.6609 14.428 12.7095C14.2994 12.7249 14.1907 12.8122 14.1494 12.9355C14.1087 13.0589 14.1427 13.1942 14.2374 13.2835C14.4567 13.4902 14.5447 13.7802 14.4787 14.0789C14.3967 14.4509 14.0354 14.7202 13.6194 14.7202H7.5C6.95866 14.7202 6.05066 14.4662 5.736 14.1509C5.64066 14.0562 5.49666 14.0282 5.37266 14.0789C5.248 14.1302 5.16666 14.2522 5.16666 14.3869C5.16666 14.9382 4.718 15.3869 4.16666 15.3869H2.16666C1.61531 15.3869 1.16666 14.9382 1.16666 14.3869V9.05353C1.16666 8.50218 1.61531 8.05353 2.16666 8.05353H5.16666V8.38687C5.16666 8.50222 5.22666 8.60953 5.32531 8.67087C5.42266 8.72953 5.54531 8.73553 5.64931 8.68487L6.31597 8.35153C6.38331 8.31818 6.43731 8.26218 6.46931 8.19353L8.46931 3.86018C8.48931 3.81618 8.49997 3.76818 8.49997 3.72018V1.56753C8.63866 1.49087 8.87934 1.38687 9.16666 1.38687C9.532 1.38687 10.5 2.29487 10.5 3.38687C10.5 4.56021 9.86134 6.25153 9.85534 6.26822C9.81669 6.37021 9.83 6.48556 9.892 6.57621C9.95466 6.66621 10.0573 6.72022 10.1667 6.72022H14.754C15.31 6.72022 15.782 7.11822 15.8287 7.62622C15.864 8.00622 15.6813 8.36756 15.354 8.56956C15.252 8.63222 15.1913 8.74556 15.196 8.86621C15.2007 8.98687 15.27 9.09487 15.3767 9.15022C15.6587 9.29356 15.8333 9.57622 15.8333 9.88687C15.8333 10.3075 15.5153 10.6609 15.094 10.7095Z" fill="#828282"/>
                                </svg>                            
                            </button>
                            <span>${voites}</span>
                            </div>
                        </div>
            
                        </div>
            
                    </div>`
                    );
                })
            }
        }

        ajaxCardLoad(url, config)

    }
}

// alphabet
function initAlphabet() {
    const participants = document.querySelector('#participants');
    if (participants) {
        const leters = {
            letersRU: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'],
            letersUA: ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ю', 'Я'],
        }
        const config = {
            containerName: '.experts__content',
            createCard(data, wrapper, count = data.length) {
                // определяем количество карточек
                const maxLength = 20;
                count = data.length < count ? data.length : count;
                count = count <= maxLength ? count : maxLength;

                // добавляем новые карточки
                for (let i = 0; i < count; i++) {
                    let person = data[i];
                    const url = person.url;
                    const name = person.name;
                    const image = person.image ? person.image : '';
                    const webp = person.webp ? person.webp : '';
                    const lable = person.nomination.name ? person.nomination.name : '';
                    const position = person.dolgnost ? person.dolgnost : '';

                    wrapper.insertAdjacentHTML(
                        'beforeend', `<div class="experts__card">
                            <div class="content">
                                <picture class="content__image">
                                    <source srcset="${webp}" type="image/webp">
                                    <img loading="lazy" src="${image}" alt="">
                                </picture>
                                <div class="content__description">
                                    <span class="content__label small">${lable}</span>
                                    <div class="content__title t2">
                                        <a href="${url}">${name}</a>
                                    </div>
                                    <div class="content__text small">${position}</div>
                                </div>
                            </div>
                        </div>`
                    )
                }
            }
        }
        const type = participants.getAttribute('data-type');
        const currentArray = currentLanguage === 'ru' ? leters.letersRU : leters.letersUA;

        const alphabet = document.createElement('ul');
        alphabet.className = 'alphabet';

        // добавляем алфавит на страницу
        currentArray.forEach(leter => {
            const li = document.createElement('li');
            li.textContent = leter;
            li.setAttribute('data-leter', leter);
            alphabet.append(li)
        })
        const alphabetWrapper = participants.querySelector('.experts__alphabet');
        if (alphabetWrapper) alphabetWrapper.prepend(alphabet);

        // при загрузке страницы - сервер выводит людей по всем буквам, активирум только ленивую дозагрузку
        const language = (currentLanguage === 'ru') ? '' : `?lang=${currentLanguage}`;
        const url = `${domain}/ajax/get_alpha/${type}/${language}`;
        //кладем в переменную stopAjaxLoad - замыкание на остановку 
        let stopAjaxLoad = ajaxCardLoad(url, config);

        // при клике на букву -  стераем все карточки что были, генерируем новые в определенном количестве
        alphabet.addEventListener('click', event => {
            const target = event.target;
            stopAjaxLoad();

            if (target.hasAttribute('data-leter')) {
                // добавление класса активной букве
                const current = alphabet.querySelector('li.current');
                if (current) {
                    current.classList.remove('current');
                }
                target.classList.add('current');

                const currentLetter = target.getAttribute('data-leter');
                const language = (currentLanguage === 'ru') ? '' : `&lang=${currentLanguage}`;
                const startLoadFrom = 0;
                const cardCount = 20;
                const url = `${domain}/ajax/get_alpha/${type}/${currentLetter}/?per_page=${cardCount}&from=${startLoadFrom}${language}`;

                fetch(url)
                    .then(response => response.text())
                    .then(str => JSON.parse(str))
                    .then(arr => {
                        const wrapper = document.querySelector(config.containerName);
                        // делаем очистку от старых карточек
                        wrapper.textContent = '';

                        // загружаем новые
                        config.createCard(arr, wrapper, 20)
                    })

                // делаем новую ленивую загрузку, и кладем в переменную stopAjaxLoad - замыкание на остановку 
                stopAjaxLoad = ajaxCardLoad(url, config);
            }
        })
    }
}

// info massage
function initInfoMassage(massage, type = 'info') {
    const wrapper = document.querySelector('.info-alert__wrapper');
    const card = document.createElement('div');
    card.className = `info-alert ${type} open`;
    card.insertAdjacentHTML('beforeend', '<button class="info-alert__close" type="button"></button>');
    card.insertAdjacentHTML('beforeend', `<p class="info-alert__text small">${massage}</p>`);

    wrapper.append(card);
    setTimeout(() => { card.classList.remove('open') }, 2000)
    setTimeout(() => card.remove(), 2200);

    card.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('info-alert__close')) {
            const card = target.closest('.info-alert')
            card.classList.remove('open');
            setTimeout(() => card.remove(), 200);
        }
    })
}

// scroll to top button
function initScrollToTop() {
    const btn = document.querySelector('#scrollToTop');
    const positionY = 100

    function showButton() {
        if (document.body.scrollTop > positionY || document.documentElement.scrollTop > positionY) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }

    function scrollFunction() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('scroll', showButton);
    btn.addEventListener('click', scrollFunction);
}

// advantages
const advantages = document.querySelector('.advantages__slider');
if (advantages) {
    const slides = advantages.querySelectorAll('.swiper-slide');
    const texts = [];
    const icons = [];
    slides.forEach(slide => texts.push(slide.querySelector('.advantages__slide-title').textContent));
    slides.forEach(slide => {
        const img = slide.querySelector('.advantages__slide-icon');
        const url = img.getAttribute('src');
        const endOfHead = url.lastIndexOf('.svg');
        const whiteIconUrl = url.slice(0, endOfHead) + '--white.svg';
        icons.push(whiteIconUrl);
    });
    new Swiper(advantages, {
        slidesPerView: 1,
        autoHeight: true,
        pagination: {
            el: '.advantages__pagination',
            clickable: true,
            renderBullet: function (i, className) {
                return `<div class="${className}">
                    <img src="${icons[i]}" loading="lazy"/>
                    <p>${texts[i]}</p>
                </div>`;
            },
        },
        navigation: {
            prevEl: ".advantages__prev",
            nextEl: ".advantages__next",
        },
    });

}

// callback form
const callback = document.querySelector('.callback__form');
if (callback) {
    const btn = callback.querySelector('.callback__btn');
    btn.addEventListener('click', event => {
        event.preventDefault();

        // form data
        const name = callback.querySelector('input[name="name"]');
        const phone = callback.querySelector('input[name="phone"]');
        const data = {
            name: name.value,
            tel: phone.value
        }

        // for send to server
        const url = `${domain}/ajax/send_form/`;
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function (msg) {
                name.value = '';
                phone.value = '';
                initInfoMassage('Заявка отправлена');
            },
            error: function (msg) {
                initInfoMassage(error.massage, 'error');
            }
        });
    })
}

// при загрузке
window.addEventListener('load', () => {
    isMobile = window.matchMedia(`(max-width: ${desktopBreakpoint}px)`).matches;
    currentLanguage = html.getAttribute('lang');
    fixHeaderHeight();
    addButtonComeback();
    openSubmenu('.arrow');
    openSubmenu('.search__btn');
    if (isMobile) setSubmenuPosition();
    if (isApple()) html.classList.add('ios');
    initLike();
    lastRating();
    news();
    initSelect();
    renderRegionRating();
    initTimer();
    checkRatingLinks();
    initRating();
    initAlphabet();
    initScrollToTop();
    initSeo();
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