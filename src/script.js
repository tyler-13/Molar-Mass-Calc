import {data} from './PeriodicTableJSON.js';


const adder = document.querySelector('.adder');
const totalDisplay = document.querySelector('.total-mass');
let currentElements = [];


function updateAdder() {
    console.log(currentElements);
    adder.innerHTML = '';
    if (currentElements.length == 0) {
        return;
    }
    for (let i = 0; i < currentElements.length; i++){
        const div = Object.assign(document.createElement('div'), {classList: 'element-add'});

        div.appendChild(Object.assign(document.createElement('div'), {classList: 'symbol-add', textContent: currentElements[i].symbol}));
        div.appendChild(Object.assign(document.createElement('div'), {classList: 'amount-add', textContent: currentElements[i].count}));
        adder.appendChild(div);
        if (i !== currentElements.length - 1) {
            adder.appendChild(Object.assign(document.createElement('div'), {classList: 'plus', textContent: '+'}));
        }
    }

    let total = 0
    for (let i = 0; i < currentElements.length; i++) {
        total += (currentElements[i].molarMass * currentElements[i].count);
    }
    totalDisplay.textContent = (Math.round(total * 100))/100 + " g/mol"

}

function createElementBox(element) {
    const div = Object.assign(document.createElement('div'), {classList: "element-container", id: element.name});
    div.appendChild(Object.assign(document.createElement('p'), {classList: "Atomic-number", textContent: element.number, id: 'atomic-number'}));
    div.appendChild(Object.assign(document.createElement('p'), {classList: "Symbol", textContent: element.symbol, id: 'symbol'}));
    div.appendChild(Object.assign(document.createElement('p'), {classList: "Name", textContent: element.name, id: 'name'}));
    div.appendChild(Object.assign(document.createElement('p'), {classList: "Molar-mass", textContent: (Math.round(element.atomic_mass * 100))/100, id: 'mass'}));

    div.addEventListener('click', () => {
        for (let i = 0; i < currentElements.length; i++) {
            if (currentElements[i].symbol == element.symbol) {
                currentElements[i].count++;
                updateAdder();
                return;
            }
            
        }
        currentElements.push({symbol: element.symbol, molarMass: (Math.round(element.atomic_mass * 100))/100 , count: 1})

        updateAdder();
    })
    return div;
}

const table = document.querySelector('.element-picker');
for (let i = 0; i < data.elements.length -1; i++) {


    table.appendChild(createElementBox(data.elements[i]));
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    adder.innerHTML = '';
    totalDisplay.innerHTML = '0 g/mol'
    currentElements = [];
})