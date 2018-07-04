/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
    let elem;
    
    elem = document.createElement('div');
    elem.innerHTML = text;

    return elem;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
    let elem;

    elem = document.createElement('a');
    elem.setAttribute('href', hrefValue);

    return elem;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
    where.insertBefore(what, where.firstElementChild);
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let arr;
    let result = [];

    arr = where.children;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].nextElementSibling && arr[i].nextElementSibling.tagName == 'P') {
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    var result = [];

    for (var i = 0; i < where.children.length; i++) {
        result.push(where.children[i].innerText);
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    [...where.childNodes].forEach(elem => {
        if (elem.nodeType == '3') {
            where.removeChild(elem);
        }
    });

    // for (var child of where.childNodes) {
    //     if (child.nodeType === 3) {
    //         where.removeChild(child);
    //     }
    // }
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
// function deleteTextNodesRecursive(where) {
//     [...where.childNodes].forEach(function (elem) {
//         if (elem.nodeType == 3 ) {
//             where.removeChild(elem);
//         } else if (elem.nodeType == 1 && elem.length != 0) {
//             deleteTextNodesRecursive(elem);
//         }
//     })
// }

function deleteTextNodesRecursive(where) {
    [...where.childNodes].forEach(function (elem) {
        if (elem.nodeType == 3 ) {
            where.removeChild(elem);
        } else if (elem.childNodes) {
            deleteTextNodesRecursive(elem);
        }
    })
}
/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
function collectDOMStat(root) {
    let result = {
        tags: {},
        classes: {},
        texts: 0
    };

    if (root.childNodes) {
        [...root.childNodes].forEach(node => check(node));
    }

    function check(elem) {
        if (elem.nodeType == 3) {
            result.texts++; 
        } else if (elem.nodeType == 1) {
            let name = elem.tagName;
            let elementClasses = elem.classList;

            if (result.tags[name]) {
                result.tags[name]++;
            } else {
                result.tags[name] = 1;
            }

            [...elementClasses].forEach(item => {
                if (result.classes[item]) {
                    result.classes[item]++;
                } else {
                    result.classes[item] = 1;
                }
            })
        }
        // проверка дочерних узлов
        if (elem.childNodes) {
            [...elem.childNodes].forEach(node => check(node));
        }
    }

    return result;
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объект с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {
    // создаём экземпляр MutationObserver
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                fn( { type: 'insert', nodes: [...mutation.addedNodes] } );
            }
            if (mutation.removedNodes.length) {
                fn( { type: 'remove', nodes: [...mutation.removedNodes] } );
            }
        });    
    });

    // конфигурация observer:
    const config = { attributes: true, childList: true, characterData: true, subtree: true  };
 
    // передаём в качестве аргументов целевой элемент и его конфигурацию
    observer.observe(where, config);
}

export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
