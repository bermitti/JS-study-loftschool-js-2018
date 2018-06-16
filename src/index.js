/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
    return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b=100) {
    return a + b;
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
// variant 1
// function returnArgumentsArray() {
//     let array = [];

//     for (let i = 0; i < arguments.length; i++) {
//         array.push(arguments[i])
//     }

//     return array;
// }

// variant 2
// function returnArgumentsArray(...rest) {
//     let array = rest;

//     return array;
// }

// variant 3
function returnArgumentsArray(...rest) {
    return rest;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
    return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number=0) {
    return function F() {
        return number += 1;
    }
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn, ...rest) {
    return fn.bind(fn, ...rest);
}

// // variant 2
// function bindFunction(fn, ...rest) {
//     return fn.bind(fn, ...rest);
// }

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
