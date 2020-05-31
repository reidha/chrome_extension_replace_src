// Constants
const onOffButton = document.getElementById('on-off-button');
const submitButton = document.getElementById('submit-button');


// Functions
function setToSyncStorage(keyValues) {
    chrome.storage.sync.set(keyValues, function () {
        console.log('popup.js | setToSyncStorage');
        console.log(keyValues);
    });
};

function updateOnOffButton(newState) {
    if (newState === 'ON') {
        onOffButton.innerHTML = 'ON';
        onOffButton.setAttribute('value', 'ON');
        onOffButton.classList.add('mui-btn--primary');
    } else {
        onOffButton.innerHTML = 'OFF';
        onOffButton.setAttribute('value', 'OFF');
        onOffButton.classList.remove('mui-btn--primary');
    }
};


// Listeners
onOffButton.onclick = function (element) {
    let state = element.target.value;
    if (state === 'ON') {
        setToSyncStorage({ 'ceState': 'OFF' });
        updateOnOffButton('OFF');
    } else {
        setToSyncStorage({ 'ceState': 'ON' });
        updateOnOffButton('ON');
    }
};

submitButton.onclick = function (element) {
    setToSyncStorage({
        'originalUrl': document.formTop.formOriginalUrl.value,
        'newUrl': document.formTop.formNewUrl.value,
        'beforeCb': (document.formTop.formNewUrl.value).indexOf('?') === -1 ? '?' : '&'
    });
}


// Initial setup
chrome.storage.sync.get(['ceState', 'originalUrl', 'newUrl'], function (data) {
    console.log('popup.js | chrome.storage.sync.get');
    console.log(data);
    if (data.ceState === 'ON') {
        updateOnOffButton('ON');
    } else {
        updateOnOffButton('OFF');
    }

    if ('originalUrl' in data) {
        document.getElementById('form-original-url').setAttribute('value', data.originalUrl);
    }

    if ('newUrl' in data) {
        document.getElementById('form-new-url').setAttribute('value', data.newUrl);
    }
});


