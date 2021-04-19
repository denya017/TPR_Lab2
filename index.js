let tableOfAlternatives;
let numCriterion;
let G;
let maxFIndex = 0;
let classifyIndex = -1;
let counter = 1;
let numberClass = 0;


fillingOptions(2, 14, "inputNumberOfCriterion");
fillingScales();
document.getElementById('inputNumberOfCriterion').addEventListener("click", fillingScales);



function cls() {
    document.getElementById("table").innerHTML = "";
    counter = 1;
}

function fillingOptions(begin, end, elementId) {
    for (let i = begin; i <= end; i++) {
        let optionTag = document.createElement('option');
        optionTag.setAttribute('value', i.toString());
        optionTag.innerHTML = i.toString();
        document.getElementById(elementId).append(optionTag);
    }
    document.getElementById(elementId).selectedIndex = 0;
}

function getNumber(elementId) {
    let selectedOptionIndex = document.getElementById(elementId).selectedIndex;
    let numberOfCriterion = parseInt(document.getElementById(elementId).options[selectedOptionIndex].value);
    return numberOfCriterion;
}

function fillingScales() {

    document.getElementById('sizesOfK').innerHTML = "";
    let numberOfCriterion = getNumber('inputNumberOfCriterion');

    for (let i = 1; i < numberOfCriterion+1; i++) {
        let divTag = document.createElement('div');
        divTag.className = "col-auto";
        let labelTag = document.createElement('label');
        labelTag.setAttribute('for', 'sizeOfK'+i);
        labelTag.innerHTML = "K"+i;
        divTag.append(labelTag);
        let inputTag = document.createElement('input');
        inputTag.className = "form-control mb-2";
        inputTag.setAttribute('type', 'number');
        inputTag.setAttribute('id', 'sizeOfK'+i);
        inputTag.setAttribute('min', '1');
        inputTag.setAttribute('value', '1');
        inputTag.required=true;
        divTag.append(inputTag);
        document.getElementById('sizesOfK').append(divTag);
    }
    cls();
}

function getScales(numCriterion) {
    let scales = [];
    for (let i = 0; i < numCriterion; i++) {
        let a = parseInt(document.getElementById("sizeOfK"+(i+1)).value);
        scales.push(a);
    }
    return scales;
}

function creatingTableOfAlternatives() {
    numCriterion = getNumber('inputNumberOfCriterion');
    let scales = getScales(numCriterion);

    let numAlternatives = 1;
    for (let i = 0; i < scales.length; i++) {
        numAlternatives *= scales[i];
    }

    let tableOfAlternatives = new Array(numAlternatives);
    for (let i = 0; i < tableOfAlternatives.length; i++) {
        tableOfAlternatives[i] = new Array(numCriterion);
    }

    let cycleRight = [];
    for (let i = 0; i < numCriterion-1; i++) {
        let a = 1;
        for (let j = i + 1; j < numCriterion; j++) {
            a *= scales[j];
        }
        cycleRight.push(a);
    }

    let cycleLeft = [];
    for (let i = 1; i < numCriterion - 1; i++) {
        let a = 1;
        for (let j = 0; j < i; j++) {
            a *= scales[j];
        }
        cycleLeft.push(a);
    }

    ///////// First column /////////////
    let counter = 0;
    for (let j = 0; j < scales[0]; j++) {
        for (let k = 0; k < cycleRight[0]; k++) {
            tableOfAlternatives[counter][0] = j + 1;
            counter++;
        }
    }
    ///////// Middle column /////////////
    if (numCriterion > 2) {
        for (let i = 1; i < numCriterion - 1; i++) {
            let a = 0;
            for (let m = 0; m < cycleLeft[i-1]; m++) {
                for (let j = 0; j < scales[i]; j++) {
                    for (let k = 0; k < cycleRight[i]; k++) {
                        tableOfAlternatives[a][i] = j + 1;
                        a++;
                    }
                }
            }
        }
    }
    ///////// Last column /////////////
    counter = 0;
    for (let i = 0; i < (numAlternatives / scales[numCriterion - 1]); i++) {
        for (let j = 0; j < scales[numCriterion - 1]; j++) {
            tableOfAlternatives[counter][numCriterion - 1] = j + 1;
            counter++;
        }
    }

    return tableOfAlternatives;
}

function printTable(tableOfAlternatives, numCriterion, G, d1, d2, p1, p2, g1, g2, F1, F2, F){

    let tableAlt = document.createElement("table");
    tableAlt.className = "table table-hover";
    document.getElementById("table").append(tableAlt);

    let thead = document.createElement("thead");
    tableAlt.append(thead);
    let tR = document.createElement("tr");
    thead.append(tR);

    let th;
    for (let i = 0; i < numCriterion; i++) {
        th = document.createElement("th");
        th.scope = "col";
        th.innerHTML = "K" + (i+1);
        tR.append(th);
    }
    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "G";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "d1";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "d2";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "p1";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "p2";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "g1";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "g2";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "F1";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "F2";
    tR.append(th);

    th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "F";
    tR.append(th);

    let tbody = document.createElement("tbody");
    tableAlt.append(tbody);

    for (let i = 0; i < tableOfAlternatives.length; i++) {
        let tr = document.createElement("tr");
        tbody.append(tr);
        let td;
        for (let j = 0; j < tableOfAlternatives[i].length; j++) {
            td = document.createElement("td");
            td.innerHTML = tableOfAlternatives[i][j];
            tr.append(td);
        }
        td = document.createElement("td");
        td.innerHTML = G[i];
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = Math.round(d1[i]*100)/100;
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = Math.round(d2[i]*100)/100;
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = Math.round(p1[i]*100)/100;
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = Math.round(p2[i]*100)/100;
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = g1[i];
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = g2[i];
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = Math.round(F1[i]*100)/100;
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = Math.round(F2[i]*100)/100;
        tr.append(td);

        td = document.createElement("td");
        td.innerHTML = Math.round(F[i]*100)/100;
        tr.append(td);
    }


}

function calculate() {
    cls();

    tableOfAlternatives = creatingTableOfAlternatives();
    if (tableOfAlternatives.length < 2){
        alert("Минимально возможное количество альтернатив - 2!");
        return 0;
    }

    G = new Array(tableOfAlternatives.length);
    G[0] = 1; G[G.length - 1] = 2;
    for (let i = 1; i < G.length - 1; i++) {
        G[i] = 12;
    }

    ///////////////////////

    changingTable();

}

function changeG() {
    let selectedIndex;
    if (classifyIndex >= 0){
        selectedIndex = classifyIndex;
        G[selectedIndex] = numberClass;

        for (let i = 0; i < tableOfAlternatives.length; i++) {
            let buf = 0;
            for (let j = 0; j < tableOfAlternatives[i].length; j++){
                if (parseInt(tableOfAlternatives[selectedIndex][j]) == tableOfAlternatives[i][j]){
                    buf++;
                }
            }
            if (buf == tableOfAlternatives[i].length){
                continue;
            }
            let pos = 0, neg = 0;
            for  (let j = 0; j < tableOfAlternatives[i].length; j++) {
                if (tableOfAlternatives[i][j] <= tableOfAlternatives[selectedIndex][j]) {
                    pos++;
                }
                if (tableOfAlternatives[i][j] >= tableOfAlternatives[selectedIndex][j]) {
                    neg++;
                }
            }
            if (pos == tableOfAlternatives[i].length && G[selectedIndex] == 1) {
                G[i]=1;
            }
            else if (neg == tableOfAlternatives[i].length && G[selectedIndex] == 2) {
                G[i]=2;
            }
        }
    }

    {
        selectedIndex = maxFIndex;
        G[selectedIndex] = getNumber('inputClass' + (counter - 1));

        for (let i = 0; i < tableOfAlternatives.length; i++) {
            let buf = 0;
            for (let j = 0; j < tableOfAlternatives[i].length; j++){
                if (parseInt(tableOfAlternatives[selectedIndex][j]) == tableOfAlternatives[i][j]){
                    buf++;
                }
            }
            if (buf == tableOfAlternatives[i].length){
                continue;
            }
            let pos = 0, neg = 0;
            for  (let j = 0; j < tableOfAlternatives[i].length; j++) {
                if (tableOfAlternatives[i][j] <= tableOfAlternatives[selectedIndex][j]) {
                    pos++;
                }
                if (tableOfAlternatives[i][j] >= tableOfAlternatives[selectedIndex][j]) {
                    neg++;
                }
            }
            if (pos == tableOfAlternatives[i].length && G[selectedIndex] == 1) {
                G[i]=1;
            }
            else if (neg == tableOfAlternatives[i].length && G[selectedIndex] == 2) {
                G[i]=2;
            }
        }
    }



    changingTable();
}

function changingTable() {

    let centre1 = new Array(numCriterion);
    centre1.fill(0);
    let centre2 = new Array(numCriterion);
    centre2.fill(0);
    let count1 = 0;
    let count2 = 0;
    for (let j = 0; j < tableOfAlternatives.length; j++) {

        if (G[j] == 1) {
            for (let i = 0; i < numCriterion; i++) {
                centre1[i] += tableOfAlternatives[j][i];
            }
            count1++;
        }
        if (G[j] == 2) {
            for (let i = 0; i < numCriterion; i++) {
                centre2[i] += tableOfAlternatives[j][i];
            }
            count2++;
        }
    }
    for (let i = 0; i < numCriterion; i++) {
        centre1[i] /= count1;
        centre2[i] /= count2;
    }


    let d1 = new Array(tableOfAlternatives.length);
    let d2 = new Array(tableOfAlternatives.length);
    let maxD = 0;
    for (let i = 0; i < tableOfAlternatives.length; i++) {
        d1[i] = 0;
        d2[i] = 0;
        for (let j = 0; j < numCriterion; j++) {
            d1[i] += Math.abs((tableOfAlternatives[i][j] - centre1[j]));
            d2[i] += Math.abs((tableOfAlternatives[i][j] - centre2[j]));
        }
        if (d1[i] > maxD) {
            maxD = d1[i];
        }
        if (d2[i] > maxD) {
            maxD = d2[i];
        }
    }


    let p1 = new Array(tableOfAlternatives.length);
    let p2 = new Array(tableOfAlternatives.length);
    classifyIndex = -1;
    for (let i = 0; i < tableOfAlternatives.length; i++) {
        if (G[i] == 1) {
            p1[i] = 1;
            p2[i] = 0;
        }
        else if (G[i] == 2) {
            p1[i] = 0;
            p2[i] = 1;
        }
        else {
            p1[i] = (maxD - d1[i]) / (2 * (maxD) - d1[i] - d2[i]);
            p2[i] = 1 - p1[i];

            if(p1[i] == 1 ) {
                classifyIndex = i;
                numberClass = 1;
            }
            if( p2[i] == 1) {
                classifyIndex = i;
                numberClass = 2;
            }
        }
    }


    let g1 = new Array(tableOfAlternatives.length);
    let g2 = new Array(tableOfAlternatives.length);
    for (let i = 0; i < tableOfAlternatives.length; i++) {
        if (G[i] == 1 || G[i] == 2) {
            g1[i] = 0;
            g2[i] = 0;
        }
        else {
            posneg(tableOfAlternatives, tableOfAlternatives[i], G, g1, g2, i);
        }
    }


    let F1 = new Array(tableOfAlternatives.length);
    let F2 = new Array(tableOfAlternatives.length);
    let F = new Array(tableOfAlternatives.length);
    let maxF = 0;
    let sumF = 0;
    for (let i = 0; i < tableOfAlternatives.length; i++) {
        F1[i] = p1[i] * g1[i];
        F2[i] = p2[i] * g2[i];
        F[i] = F1[i] + F2[i];
        sumF += F[i];
        if(F[i] > maxF){
            maxF = F[i];
            maxFIndex = i;
        }
    }

    printTable(tableOfAlternatives, numCriterion, G, d1, d2, p1, p2, g1, g2, F1, F2, F);

    // if(classifyIndex >= 0){
    //     changeG();
    //     return 0;
    // }

    let message = document.createElement("div");
    document.getElementById("table").append(message);

    if (sumF == 0) {
        message.className = "my-3 py-3 ";
        message.innerHTML = "Классификация завершена!"

        return 0;
    }

    message.className = "my-3 py-3";
    let question = "(";
    for(let i = 0; i < numCriterion; i++){
        question += " k" + (i + 1) + tableOfAlternatives[maxFIndex][i];
    }
    question += " )";


    message.innerHTML = `
        <label for="inputClass${counter}" class="form-label">К какому классу отнесём альтернативу ${question} ?</label>
        <select class="form-select w-25" id="inputClass${counter}">
            <option value="1" selected>1</option>
            <option value="2">2</option>
        </select>
        <button id="${counter}" type="button" class="btn btn-primary my-3" onclick="changeG()">Построить таблицу ${counter+1}</button>
        <hr>
        `;

    counter++;
}

function posneg(tableOfAlternatives, selectedAlternative,  G, g1,  g2, num) {
    g1[num] = 0; g2[num] = 0;

    for (let i = 0; i < tableOfAlternatives.length; i++) {
        let buf = 0;
        for (let j = 0; j < tableOfAlternatives[i].length; j++){
            if (parseInt(selectedAlternative[j]) == tableOfAlternatives[i][j]){
                buf++;
            }
        }
        if (buf == tableOfAlternatives[i].length){
            continue;
        }
        if(G[i] != 12){
            continue;
        }
        let pos = 0, neg = 0;
        for  (let j = 0; j < tableOfAlternatives[i].length; j++) {
            if (tableOfAlternatives[i][j] <= selectedAlternative[j]) {
                pos++;
            }
            if (tableOfAlternatives[i][j] >= selectedAlternative[j]) {
                neg++;
            }
        }
        if (pos == tableOfAlternatives[i].length) {
            ++g1[num];
        }
        else if (neg == tableOfAlternatives[i].length) {
            ++g2[num];
        }

    }
}