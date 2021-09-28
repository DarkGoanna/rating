function initPagination(contanerName, itemName, itemsOnPage) {
    // проверяем есть ли элементы
    function checkItems() {
        return document.querySelectorAll(`${contanerName} ${itemName}`);
    };

    // скрыть/показать элементы
    function hideItems(flag, arr, itemsOnPage, pageNumber = 1, ) {
        const start = pageNumber * itemsOnPage - itemsOnPage;
        const finish = start + itemsOnPage;

        // если флаг = true, то элементы будут скрыты
        // если флаг = false, то элементы будут показаны
        for (let i = start; i < finish; i++) {
            if (arr[i]) {
                arr[i].hidden = flag;
            } else {
                break;
            }
        }
    };

    // создаем пагинацию
    function createPagination(items, container, itemsOnPage = -1) {
        // если количество элементов на странице больше 1
        if (itemsOnPage > 1) {
            const pages = items.length / itemsOnPage;
            // пагинация добавится если страниц больше чем 1
            if (pages > 1) {
                const paginationWrapper = document.querySelector(container);
                const pagination = document.createElement('div');
                pagination.classList.add('pagination');
                paginationWrapper.appendChild(pagination);

                // добавляем кнопки
                for (let i = 1; i <= Math.ceil(pages); i++) {
                    pagination.insertAdjacentHTML('beforeend', `<div class="page-numbers">${i}</div>`);
                }

                //первой кнопке даем класс active
                paginationWrapper.querySelector('.page-numbers').classList.add('current');

                // функция для переключения пагинации
                function togglePagination() {
                    const btns = pagination.querySelectorAll('.page-numbers');
                    let activeNow;
                    let activeBefore;

                    btns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            // при клике находим активную кнопку и скрываем элементы относящиеся к ней
                            activeBefore = +pagination.querySelector('.page-numbers.current').textContent;
                            hideItems(true, items, itemsOnPage, activeBefore);

                            // присваиваем класс active текущей кнопке
                            btns.forEach(other => other.classList.remove('current'));
                            btn.classList.add('current');

                            // показываем элементы относящиеся к текущей кнопке
                            activeNow = +btn.textContent;
                            hideItems(false, items, itemsOnPage, activeNow);
                        })

                    })
                };
                togglePagination();
            }
        }
    };

    // запуск
    // массив элементов
    const items = checkItems();

    // если в вызове функции укажут больше элементов чем их есть, 
    // то присвоить максимальное количество существующих элементов
    itemsOnPage = itemsOnPage > items.length ? items.length : itemsOnPage;

    // скрываем элементы кроме первых видимых
    for (let i = 0; i < items.length; i++) {
        items[i].hidden = i < itemsOnPage ? false : true;
    }

    // создаем пагинацию
    createPagination(items, contanerName, itemsOnPage);
}