/**
 * Calculator Bets
 */

const btnCaptureData = document.querySelector('#capture-data');
const inputData = document.querySelector('#input-data');
const containerDataInfo = document.querySelector('.container-capture-data');
const tableBetsSelector = document.querySelector('#bets-table-body');
let rowBetsSelector = '';

btnCaptureData.addEventListener('click', validationInput);

function isNumeric (inputData) {
    return /^\d+$/.test(inputData)
};

function errorData(message) {
    let existingError = document.querySelector('#message-error');

    if (existingError) {
        existingError.innerHTML = message;
    } else {
        let messageErrorElement = document.createElement('p');

        messageErrorElement.id = 'message-error';
        messageErrorElement.innerHTML = message;
        containerDataInfo.appendChild(messageErrorElement);
    }

    inputData.focus();
    inputData.classList.add('_error');
};

function successData() {
    let existingError = document.querySelector('#message-error');

    if (existingError) {
        containerDataInfo.removeChild(existingError);
    }

    inputData.classList.remove('_error');
};

/**
 * Perform input validations
 */
function validationInput () {
    let inputValue = inputData.value;

    if (inputValue === '') {
        inputData.value = '';
        errorData('El campo es requerido');
    } else {
        inputData.value = '';

        if (isNumeric(inputValue) && inputValue >= 1) {
            inputValue = parseInt(inputValue);

            successData();
            calculateTable(inputValue);
        } else {
            errorData('El número no es válido');
        }
    }
};

/**
 * Calculate the betting table.
 *
 * @param {*} inputValue
 */
function calculateTable (inputValue) {
    let bets = [];
    let number = 1;
    let capital = inputValue;
    let returned = inputValue * 3
    let revenue = returned - capital;
    let rowBets = '';
    let columnsBets = '';
    let cop = Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    });

    tableBetsSelector.innerHTML = '';

    for (number; number <= 16; number++) {
        bets.push({number, inputValue, capital, returned, revenue});

        if (number > 1) {
            inputValue = bets[number - 1].inputValue + bets[number - 2].inputValue;
            capital += inputValue;
            returned = inputValue * 3;
            revenue = returned - capital;
        }
    };

    bets.shift();

    for (let j = 0; j < bets.length; j++) {
        rowBets = document.createElement('tr');
        columnsBets = `
             <td class="green">${j + 1}</td>
             <td>${cop.format(bets[j].inputValue)}</td>
             <td>${cop.format(bets[j].capital)}</td>
             <td>${cop.format(bets[j].returned)}</td>
             <td>${cop.format(bets[j].revenue)}</td>
         `;

        rowBets.className = 'row-bets';
        rowBets.innerHTML = columnsBets;
        tableBetsSelector.appendChild(rowBets);
    }
};
