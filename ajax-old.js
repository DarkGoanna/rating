function ajaxCardLoad(url, config) {

  const wrapper = document.querySelector(config.containerName);

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
          if (config.containerName === '.rating__content') {
            config.createCard(data, wrapper, startFrom);
          } else if (config.containerName === '.experts__content') {
            config.createCard(data, wrapper);
          }


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