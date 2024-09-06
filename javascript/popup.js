var bg;
var carbonPerPage = 1.76;
var carbonPerMile = 404;

chrome.tabs.getSelected(null, function (tab) {
    bg = chrome.extension.getBackgroundPage();
    renderPage();
});

function formatCarbonWeight(value) {
    const units = ["g", "kg", "mt", "mmt"];
    let index = 0;

    while (value >= 1000 && index < units.length - 1) {
        value /= 1000;
        index++;
    }

    value = value % 1 === 0 ? value : value.toFixed(1);
    return value + units[index];
}


function renderPage() {
    // Get today's carbon count and display it
    var today = bg.getDayCount(0);
    var todayCarbon = document.getElementById('today-carbon');
    todayCarbon.innerHTML = formatCarbonWeight(today * carbonPerPage);

}
}
