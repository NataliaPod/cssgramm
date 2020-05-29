"use strict";

// let borderRange = document.querySelector('#spacing');
// let imgWrap = document.querySelector('.ba-filtered-img-wrap');

// function changeBorder(){
//     imgWrap.style.borderWidth = borderRange.value + 'px';
// };

// borderRange.addEventListener('change',changeBorder);
// borderRange.addEventListener('input',changeBorder);

// let colorPicker = document.querySelector('#base');
// let elements = document.querySelectorAll('.hl');

// function changeColor(){
//     setCSSVar('base', colorPicker.value);
// };

// colorPicker.addEventListener('change',changeColor);
// colorPicker.addEventListener('input',changeColor);

// let blurRange = document.querySelector('#blur');

// function changeBlur(){  
//     setCSSVar('blur', blurRange.value + 'px');
//     setLabelVar('blur', blurRange.value + 'px');
// }

// blurRange.addEventListener('change', changeBlur);
// blurRange.addEventListener('input', changeBlur);

// let contrastRange = document.querySelector('#contrast');

// function changeContrast(){  
//     setCSSVar('contrast', contrastRange.value + '%');
//     setLabelVar('contrast', contrastRange.value + '%');
// }

// contrastRange.addEventListener('change', changeContrast);
// contrastRange.addEventListener('input', changeContrast);

//====================================================
function setCSSVar(varName, varVal){
    if(!varName || !varVal) return;
    document.documentElement.style.setProperty(`--${varName}`, varVal);
}

function setLabelVar(labelName, labelVal){
    // Get element fromm HTML with data attribute
    let label = document.querySelector(`[data-${labelName}]`);
    if(label == undefined) return; //If there no element with data-... exit from function
    // Change label element text
    label.textContent = labelVal;
}

function changeHandle(){
    //console.log(this); //this == range kotoriy my trogaem
    let rangeVarVal = this.value + (this.dataset.units || ''); //Get b=value from range
    let cssVarName = this.name; //Get CSS var name

    setCSSVar(cssVarName, rangeVarVal);
    setLabelVar(cssVarName, rangeVarVal);
}

const ranges = document.querySelectorAll('.range, #base');

ranges.forEach(element => {
    element.addEventListener('input', changeHandle);
    element.addEventListener('change', changeHandle);
});

const clearBtn = document.querySelector('[data-clear]');

function clearAll(){
    // Get all ranges
    ranges.forEach(element => {
        const defaultVal = element.getAttribute('value'); //Get default values from HTML attribute
        element.value = defaultVal; //Clear range value to default
        element.dispatchEvent(new Event('change')); //Trigger change event to change CSS var
    }); 
}

clearBtn.addEventListener('click', clearAll);
document.addEventListener('keydown', (event) => {
    event.preventDefault(); //Delete defautl browser commands
    if(event.code == "Escape"){ //If esc key is pressed
        clearAll();
    };
});