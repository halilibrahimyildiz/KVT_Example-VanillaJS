//İmport files,Class or Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.html";
import "./style.css";
import { TableCalc } from "./table-calc";
import { UI } from "./ui";

//Select a DOM elements
const loading = document.querySelector(".loader");

const ntInput = document.getElementById("natural-number");
const altInput = document.getElementById("alt-number");
const list = document.getElementsByClassName("form-container")[0];
const inputs = document.querySelector(".inputs")

const tableContainer = document.querySelector(".table-container");

//Global references
let rowCount = 1;
let dataController = true;


//Create a Objects
const ui = new UI();
const tableCalc = new TableCalc();

//Run a All Event
allEvent();

function allEvent() {

    window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
    })

    window.addEventListener("DOMContentLoaded", onloadUI);

    list.addEventListener("click", checkButton)

    tableContainer.addEventListener("click", tableContainerController)

}


function onloadUI() {

    ui.loadingScreen(loading);

    ntInput.value = "";
    altInput.value = "";

    tableContainer.style.opacity = "0";
}


function checkButton(e) {
    const ntValue = Number(ntInput.value);
    const altValue = Number(altInput.value);


    if (e.target.id === 'nt-number') {
        addNewInput(ntValue, altValue, ntInput)
        e.preventDefault();
    } else if (e.target.id === 'calc-1') {
        const ntInputs = document.querySelectorAll(".nt-select")

        ui.fadeIn(tableContainer)
        createTable(ntInputs, ntValue, altValue);
    }
    e.preventDefault();

}

function addNewInput(ntValue, altValue, ntInput) {
    if (ntValue != '' && altValue != '') {
        if (!isNaN(altValue) && !isNaN(ntValue)) {

            ui.addNewSelectInput(ntInput);
            hurwicsEvent();


        } else {

            ui.formAlert("Lütfen sayı giriniz.", "danger", inputs, "beforeend")

            ntInput.value = "";
            altInput.value = "";

        }

    } else {
        ui.formAlert("Lütfen Tüm Alanları Doldurunuz.", "danger", inputs, "beforeend")

        ntInput.value = "";
        altInput.value = ""
    }

}

function hurwicsEvent() {
    const hurwicsRange = document.querySelector("#form-range");
    const hurwicsResult = document.querySelector(".hurwics-value");
    hurwicsResult.value = hurwicsRange.value;


    /*Range input Value To Result input */
    hurwicsRange.addEventListener("change", () => {
        if (hurwicsResult.value > 1) {
            hurwicsResult.value = 1;
            hurwicsRange.value = 1;
        } else {
            hurwicsResult.value = hurwicsRange.value;
        }

    })
    hurwicsRange.addEventListener("input", (e) => {

        if (hurwicsResult.value > 1) {
            hurwicsResult.value = 1;
            hurwicsRange.value = 1;
        } else {
            hurwicsResult.value = hurwicsRange.value;
        }
    })
    hurwicsRange.addEventListener("mouseup", (e) => {
        if (hurwicsResult.value > 1) {
            hurwicsResult.value = 1;
            hurwicsRange.value = 1;
        } else {
            hurwicsResult.value = hurwicsRange.value;
        }
    })

    /*Result input Value To Range input */
    hurwicsResult.addEventListener("change", () => {
        if (hurwicsResult.value > 1) {
            hurwicsResult.value = 1;
            hurwicsRange.value = 1;
        } else {
            hurwicsRange.value = hurwicsResult.value
        }

    })
    hurwicsResult.addEventListener("input", (e) => {
        if (hurwicsResult.value > 1) {
            hurwicsResult.value = 1;
            hurwicsRange.value = 1;
        } else {
            hurwicsRange.value = hurwicsResult.value
        }
    })


    ui.rangeAnimation(hurwicsRange);
}

function createTable(ntValues, ntInputValue, altInputValue) {

    let headRowCount = [];
    let inputValue = [];
    rowCount = 1;


    ntValues.forEach((values) => {

        inputValue.push(Number(values.value));

        rowCount *= values.value;

        headRowCount.push(rowCount);

    });

    //Create A table

    const colSpanValue = findColspanValue(rowCount, inputValue);

    ui.createTableHeadRow(headRowCount, ntInputValue, colSpanValue)

    ui.createTableBodyRow(altInputValue, rowCount)

    ui.addTableButton();


}

function findColspanValue(rowCount, inputValue) {

    let colValue = [];

    for (let i = 0; i < ntInput.value; i++) {
        if (!isNaN(inputValue[i])) {

            rowCount = rowCount / inputValue[i];
            colValue.push(rowCount)

        } else {
            colValue.push(1);
        }

    }

    return colValue;

}

function tableContainerController(e) {

    const tableData = document.querySelectorAll("#data-input");

    if (e.target.className === "methods") {
        if (e.target.textContent === "Kâr") {
            e.target.textContent = "Maliyet"

        } else if (e.target.textContent === "Maliyet") {
            e.target.textContent = "Kâr"

        }

    }
    if (e.target.id === "calc-table") {


        const tableButtonDiv = document.querySelector(".table-buttons");

        const resultContainer = document.querySelector(".result-container");
        const calcMethods = document.querySelector(".methods").textContent

        const altInputValue = Number(altInput.value)

        tableDataController(tableData)

        if (dataController === true) {
            const calcArr = tableCalc.preCalc(rowCount, altInputValue, tableData);

            //Ana Containeri Temizleme
            resultContainer.innerHTML = "";
            ui.resultContainerDesign();
            ui.fadeIn(resultContainer);

            //İyimserlik
            const maxArr = tableCalc.goodCalc(calcArr, calcMethods);
            ui.createResultTable(0, maxArr, "İyimserlik", calcMethods);

            //Kötümserlik
            const minArr = tableCalc.badCalc(calcArr, calcMethods);
            ui.createResultTable(1, minArr, "Kötümserlik", calcMethods);

            //Eş Olasılık
            const lapArr = tableCalc.laplaceCalc(calcArr, calcMethods)
            ui.createResultTable(2, lapArr, "Eşit Olasılık", calcMethods);

            //Pişmanlık
            const regretArr = tableCalc.regretCalc(calcArr, rowCount, altInputValue, calcMethods);
            ui.createResultTable(3, regretArr, "Pişmanlık", calcMethods)

            //Hurwics
            const hurwicsValue = document.querySelector(".hurwics-value").value;
            const hurwicsArr = tableCalc.hurwicsCalc(altInputValue, maxArr, minArr, Number(hurwicsValue), calcMethods);
            ui.createResultTable(4, hurwicsArr, "Hurwics", calcMethods);

        } else if (dataController === false) {

            //Alert
            resultContainer.style.opacity = "0";
            ui.formAlert("Lütfen tabloya sadece sayı giriniz . Ondalıklı Sayıları . ile yazınız.", "danger", tableButtonDiv, "beforebegin")
        }
    }
}

function tableDataController(tableData) {
    dataController = true
    tableData.forEach(data => {

        const numberData = Number(data.value)
        if (isNaN(numberData)) {

            //Number olursa controller false değeri alır.
            dataController = false

        }

    })
}