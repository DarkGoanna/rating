function ajaxCardLoad(url, containerName, categoryID) {

  const wrapper = document.querySelector(containerName);

  // по сколько выводить
  const pagination = 20;
  let ended = false;

  /* Переменная-флаг для отслеживания того, происходит ли в данный момент ajax-запрос. В самом начале даем ей значение false, т.е. запрос не в процессе выполнения */
  let inProgress = false;
  /* С какой статьи надо делать выборку из базы при ajax-запросе */
  let startFrom = pagination;

  /* Используйте вариант $('#more').click(function() для того, чтобы дать пользователю возможность управлять процессом, кликая по кнопке "Дальше" под блоком статей (см. файл index.php) */
  $(window).scroll(function () {
    if (ended != true) {
      //$('#more').click(function(){
      /* Если высота окна + высота прокрутки больше или равны высоте всего документа и ajax-запрос в настоящий момент не выполняется, то запускаем ajax-запрос */
      if ($(window).scrollTop() + $(window).height() >= $(document).height() - 1000 && !inProgress) {
        $.ajax({
          /* адрес файла-обработчика запроса */
          url: url,
          /* метод отправки данных */
          method: 'GET',
          /* данные, которые мы передаем в файл-обработчик */
          data: {
            "from": startFrom,
            "per_page": pagination
          },
          beforeSend: function () {
            /* меняем значение флага на true, т.е. запрос сейчас в процессе выполнения */
            inProgress = true;
          }
          /* что нужно сделать до отправки запрса */

          /* что нужно сделать по факту выполнения запроса */
        }).done(function (data) {
          const arr = JSON.parse(data);
          arr.forEach(person => {
            const url = person.url;
            const name = person.name;
            const image = person.image ? person.image : '';
            const webp = person.webp ? person.webp : '';
            const position = person.position ? person.position : '';
            const lable = person.nomination.name ? person.nomination.name : '';
            const text = person.dolgnost ? person.dolgnost : '';
            const voites = person.voites ? person.voites : '';
            const articleID = person.product_id;

            wrapper.insertAdjacentHTML('beforeend', `<div class="rating__card">

                        <div class="content">
                          <picture class="content__image">
                            <source srcset="${webp}" type="image/webp">
                            <img loading="lazy" src="${image}" alt="">
                          </picture>
      
                          <span class="content__position t2">${position}</span>
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
                            <div class="like__count" data-pressed="false">
                              <button class="like__btn rate" type="button"  article_id="${articleID}" category_id="${categoryID}">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16.5 9.88687C16.5 9.48622 16.3407 9.11287 16.066 8.83753C16.3773 8.49687 16.536 8.04018 16.4927 7.56487C16.4147 6.71753 15.6513 6.05353 14.754 6.05353H10.636C10.84 5.43418 11.1667 4.29887 11.1667 3.38687C11.1667 1.94087 9.938 0.720215 9.16666 0.720215C8.47466 0.720215 7.97931 1.11021 7.95866 1.12621C7.87931 1.18956 7.83331 1.28556 7.83331 1.38687V3.64753L5.91266 7.80687L5.83331 7.84753V7.72018C5.83331 7.53618 5.68397 7.38684 5.49997 7.38684H2.16666C1.24734 7.38687 0.5 8.13422 0.5 9.05353V14.3869C0.5 15.3062 1.24734 16.0535 2.16666 16.0535H4.16666C4.88731 16.0535 5.50331 15.5935 5.73531 14.9515C6.29 15.2369 7.03666 15.3869 7.5 15.3869H13.6193C14.3453 15.3869 14.9807 14.8975 15.13 14.2229C15.2067 13.8749 15.162 13.5249 15.01 13.2209C15.502 12.9735 15.8333 12.4649 15.8333 11.8869C15.8333 11.6509 15.7793 11.4249 15.6773 11.2209C16.1693 10.9729 16.5 10.4649 16.5 9.88687ZM15.094 10.7095C14.9653 10.7249 14.8567 10.8122 14.8153 10.9355C14.7747 11.0589 14.8087 11.1942 14.9033 11.2835C15.0727 11.4429 15.1667 11.6575 15.1667 11.8869C15.1667 12.3075 14.8487 12.6609 14.428 12.7095C14.2994 12.7249 14.1907 12.8122 14.1494 12.9355C14.1087 13.0589 14.1427 13.1942 14.2374 13.2835C14.4567 13.4902 14.5447 13.7802 14.4787 14.0789C14.3967 14.4509 14.0354 14.7202 13.6194 14.7202H7.5C6.95866 14.7202 6.05066 14.4662 5.736 14.1509C5.64066 14.0562 5.49666 14.0282 5.37266 14.0789C5.248 14.1302 5.16666 14.2522 5.16666 14.3869C5.16666 14.9382 4.718 15.3869 4.16666 15.3869H2.16666C1.61531 15.3869 1.16666 14.9382 1.16666 14.3869V9.05353C1.16666 8.50218 1.61531 8.05353 2.16666 8.05353H5.16666V8.38687C5.16666 8.50222 5.22666 8.60953 5.32531 8.67087C5.42266 8.72953 5.54531 8.73553 5.64931 8.68487L6.31597 8.35153C6.38331 8.31818 6.43731 8.26218 6.46931 8.19353L8.46931 3.86018C8.48931 3.81618 8.49997 3.76818 8.49997 3.72018V1.56753C8.63866 1.49087 8.87934 1.38687 9.16666 1.38687C9.532 1.38687 10.5 2.29487 10.5 3.38687C10.5 4.56021 9.86134 6.25153 9.85534 6.26822C9.81669 6.37021 9.83 6.48556 9.892 6.57621C9.95466 6.66621 10.0573 6.72022 10.1667 6.72022H14.754C15.31 6.72022 15.782 7.11822 15.8287 7.62622C15.864 8.00622 15.6813 8.36756 15.354 8.56956C15.252 8.63222 15.1913 8.74556 15.196 8.86621C15.2007 8.98687 15.27 9.09487 15.3767 9.15022C15.6587 9.29356 15.8333 9.57622 15.8333 9.88687C15.8333 10.3075 15.5153 10.6609 15.094 10.7095Z" fill="#828282"/>
                                </svg>                            
                              </button>
                              <span>${voites}</span>
                            </div>
                          </div>
      
                        </div>
      
                      </div>`);
          })


          if (data != 'end') {
            // $(containerName).append(data).fadeIn(2000);

            /* По факту окончания запроса снова меняем значение флага на false */
            inProgress = false;
            // Увеличиваем на 10 порядковый номер статьи, с которой надо начинать выборку из базы
            startFrom = startFrom + pagination;
          } else ended = true;
        });
      }
    }
  });
}
