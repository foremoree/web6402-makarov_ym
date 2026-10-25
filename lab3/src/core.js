/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */

function isInteger(n) {
    return (n^0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */

function even() {
    return Array.from({length:10}, (_,i) => (i+1) << 1);
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */

function sumTo(n) {
    let sum = 0;
    for (let i=n; i>0; sum+=i--);
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */

function recSumTo(n) {
    return n>0 && n+recSumTo(n-1) || 0;
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */

function factorial(n) {
    if (n<=1) 
        return 1;
    return n * factorial(n-1);
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */

function isBinary(n) {
    return n>0 && (n & (n-1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */

function fibonacci(n) {
    const sqrt5 = Math.sqrt(5);
    const phi = (1+sqrt5)/2;
    return Math.round(Math.pow(phi,n)/sqrt5);
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */

function getOperationFn(initialValue, operatorFn=() => initialValue) {
    return (newValue)=>(initialValue = operatorFn(initialValue,newValue));
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start=0, step=1) {
    let current = start;
    return function() {
        const val = current;
        current +=step;
        return val;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) {
        return true;
    }

    if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true;
    }

    if (typeof firstObject !== 'object' || firstObject === null || typeof secondObject !== 'object' || secondObject === null
    ) {
        return false;
    }

    const keysA = Object.keys(firstObject);
    const keysB = Object.keys(secondObject);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(secondObject, key)) {
            return false;
        }
        if (!deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    return true;
}


module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
