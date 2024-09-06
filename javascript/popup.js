var bg;
var carbonPerPage = 1.76;
var carbonPerMile = 404;

chrome.tabs.getSelected(null, function (tab) {
    bg = chrome.extension.getBackgroundPage();
    renderPage();
});

function formatCarbonWeight(value) {
    var suffix = "g";
    if (value >= 1000000000) {
        value = value / 1000000000;
        suffix = "mmt";
    } else if (value >= 1000000) {
        value = value / 1000000;
        suffix = "mt";
    } else if (value >= 1000) {
        value = value / 1000;
        suffix = "kg";
    }
    value = value % 1 == 0 ? value : value.toFixed(1);
    return value + suffix;
}

function renderPage() {
    // Get today's carbon count and display it
    var today = bg.getDayCount(0);
    var todayCarbon = document.getElementById('today-carbon');
    todayCarbon.innerHTML = formatCarbonWeight(today * carbonPerPage);

}
}
