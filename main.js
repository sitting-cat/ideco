window.onload = function () {
    document.getElementById('withSeverance').addEventListener('change', severanceCheckBox);
};

function calc() {
    var oneTimeHoldings
    var oneTimeIncomes
    var oneTimeWithhold

    let total = document.getElementById("total");
    let totalValue = parseFloat(total.value * 10000);
    totalValue = Math.floor(totalValue);

    if (!totalValue) {
        show("result", true);
        return;
    }

    let idecoSpan = document.getElementById("idecoSpan");
    let idecoSpanValue = parseFloat(idecoSpan.value);
    idecoSpanValue = Math.floor(idecoSpanValue);
    show("oneTimeResult", !idecoSpanValue);

    let isWithSeverance = document.getElementById("withSeverance").checked;
    if (isWithSeverance) {
        let workSpan = Math.floor(parseFloat(document.getElementById("workSpan").value));
        let severance = Math.floor(parseFloat(document.getElementById("severance").value) * 10000);

        appliedSpan = max(idecoSpanValue, workSpan);
        if (appliedSpan <= 20) {
            oneTimeHoldings = 400000 * idecoSpanValue;
        } else {
            oneTimeHoldings = (idecoSpanValue - 20) * 700000 + 8000000
        }

        oneTimeIncomes = totalValue + severance;
        show("oneTimeResult", (workSpan && severance));
    } else {
        if (idecoSpanValue < 20) {
            oneTimeHoldings = 400000 * idecoSpanValue;
        } else {
            oneTimeHoldings = (idecoSpanValue - 20) * 700000 + 8000000
        }

        oneTimeIncomes = Math.floor((totalValue - oneTimeHoldings) / 2)
    }
    oneTimeWithhold = calcOneTimeWithhold(oneTimeIncomes);
    moneyDisplay(oneTimeHoldings, "oneTimeHoldings");
    moneyDisplay(oneTimeIncomes, "oneTimeIncomes");
    moneyDisplay(oneTimeWithhold, "oneTimeWithhold")
    show("oneTimeZero", !(totalValue - oneTimeHoldings <= 0));

    show("result");
}

function calcOneTimeWithhold(income) {
    if (income < 1950000) {
        result = (income * 0.05) * 1.021;
    }
    else if (income < 3300000) {
        result = ((income * 0.1) - 97500) * 1.021;
    }
    else if (income < 6950000) {
        result = ((income * 0.2) - 427500) * 1.021;
    }
    else if (income < 9000000) {
        result = ((income * 0.23) - 636000) * 1.021;
    }
    else if (income < 18000000) {
        result = ((income * 0.33) - 1536000) * 1.021;
    }
    else if (income < 40000000) {
        result = ((income * 0.4) - 2796000) * 1.021;
    }
    else {
        result = ((income * 0.45) - 4796000) * 1.021;
    }
    return Math.floor(result / 1000) * 1000;
}

function severanceCheckBox() {
    show("severance", !document.getElementById("withSeverance").checked);
}

function moneyDisplay(value, target) {
    let formattedValue = "約"
    formattedValue += (value / 10000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    formattedValue += '万円';
    document.getElementById(target).innerText = formattedValue;
}

function show(target, anti = false) {
    var showTarget
    var hideTarget

    if (anti) {
        showTarget = "anti-" + target;
        hideTarget = target;
    } else {
        showTarget = target;
        hideTarget = "anti-" + target;
    }

    var elementToShow = document.getElementById(showTarget);
    var elementToHide = document.getElementById(hideTarget);

    console.log(`show: ${showTarget} / hide: ${hideTarget}`);

    if (elementToShow && elementToHide) {
        elementToShow.style.display = "block";
        elementToHide.style.display = "none";
    }
}
