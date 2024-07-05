var localStorage = window.localStorage;
var dayPrefix = 'p';
var keepDays = 45;

function formatDate(daysAgo, separator = "") {
    var now = new Date();
    var targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo);
    var dateParts = [
        ('0000' + targetDate.getFullYear()).slice(-4),  
        ('00' + (targetDate.getMonth() + 1)).slice(-2),
        ('00' + targetDate.getDate()).slice(-2)     
    ];
    return dateParts.join(separator);
}

function getDayKey(daysAgo) {
    return dayPrefix + formatDate(daysAgo);
}

function setDayCount(daysAgo, count) {
    localStorage.setItem(getDayKey(daysAgo), count);
}

function getDayCount(daysAgo) {
    var count = localStorage.getItem(getDayKey(daysAgo));
    return count == null ? 0 : parseInt(count);
}

function getAllKeysWithPrefix(prefix) {
    return Object.keys(localStorage).filter(key => key.startsWith(prefix));
}

function getOldDayKeys(retentionDays) {
    var recentKeys = [];
    for (var i = retentionDays - 1; i >= 0; i--) {
        recentKeys.push(getDayKey(i));
    }
    return getAllKeysWithPrefix(dayPrefix).filter(key => !recentKeys.includes(key));
}

function purgeOldKeys(retentionDays) {
    getOldDayKeys(retentionDays).forEach(key => localStorage.removeItem(key));
}

function incrementDailyCount() {
    var dailyCount = getDayCount(0) + 1;
    setDayCount(0, dailyCount);
}

function maintainStorageLimit() {
    if (getAllKeysWithPrefix(dayPrefix).length > keepDays) {
        purgeOldKeys(keepDays);
    }
}

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    incrementDailyCount();
    maintainStorageLimit();
});
