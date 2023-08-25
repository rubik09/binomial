import groupBy from './groupItems';

function addButtonsToKeyboard (arr, amoutButtonsPerLine) {
    const keyboardButtons = groupBy(arr.map((item) => ({ text: item.button, callback_data: item.callBack })), Number(amoutButtonsPerLine));
    return keyboardButtons;
}

export default addButtonsToKeyboard;