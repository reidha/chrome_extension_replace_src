let storageData = {};

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ 'ceState': 'OFF' }, function () { });
});

chrome.storage.onChanged.addListener(function (data, area) {
    console.log('background.js | storage.onChanged');
    console.log(data);

    if (area === 'sync') {
        if ('ceState' in data) {
            storageData.ceState = data.ceState.newValue;
        }
        if ('originalUrl' in data) {
            storageData.originalUrl = data.originalUrl.newValue;
        }
        if ('newUrl' in data) {
            storageData.newUrl = data.newUrl.newValue;
        }
        if ('beforeCb' in data) {
            storageData.beforeCb = data.beforeCb.newValue;
        }

        //storageData.originalUrl = "https://storage.googleapis.com/test_reidha/ce_test/no1.js";
        //storageData.newUrl = "https://storage.googleapis.com/test_reidha/ce_test/no3.js";
        storageData.beforeCb = '?';
    }

    console.log('background.js | storage.onChanged | end');
    console.log(storageData);
});

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        console.log('background.js | webRequest.onBeforeRequest');
        console.log(storageData);
        console.log(details.url);
        if (storageData.ceState === 'ON'
            && 'originalUrl' in storageData
            && 'newUrl' in storageData
            && details.url === storageData.originalUrl) {
            console.log('Matched!!!!!');
            return { redirectUrl: storageData.newUrl + storageData.beforeCb + Math.floor(Math.random() * 1000000) };
        }
    },
    { urls: ["*://*/*"] },
    ["blocking"]
);
