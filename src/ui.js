export class UI {

    constructor() {
        this.formList = document.getElementById("list")
        this.selectList = document.getElementById("select-nt-state")
        this.selectDiv = document.getElementsByClassName("select-state")[0];
        this.formContainer = document.getElementsByClassName("form-container")[0];
        this.tableHead = document.getElementById("table-head");
        this.tableBody = document.getElementById("table-body");
        this.tableButtonsDiv = document.querySelector(".table-buttons");
        this.resultContainer = document.querySelector(".result-container")


    }
    loadingScreen(loading) {

        document.getElementsByTagName("main")[0].style.display = "none"
        document.getElementsByTagName("nav")[0].style.display = "none"
        loading.style.display = "block"
        loading.style.opacity = "1"



        this.fadeIn(document.getElementsByTagName("body")[0])


        setTimeout(() => {
            this.fadeOut(loading, "1")
            loading.style.opacity = "0"

            document.getElementsByTagName("main")[0].style.display = "block"
            document.getElementsByTagName("nav")[0].style.display = "block"
            this.fadeIn(document.getElementsByTagName("main")[0])
            this.fadeIn(document.getElementsByTagName("nav")[0])

        }, 1386)
        setTimeout(() => {
            loading.style.display = "none"
        }, 1386)

    }
    rangeAnimation(slider) {
        const min = slider.min
        const max = slider.max
        const value = slider.value

        slider.style.background = `linear-gradient(to right, red 0%, red ${(value-min)/(max-min)*100}%, #DEE2E6 ${(value-min)/(max-min)*100}%, #DEE2E6 100%)`

        slider.oninput = function() {
            this.style.background = `linear-gradient(to right, red 0%, red ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`
        };
    }
    fadeIn(target) {

        target.style.animation = " ";
        target.style.animation = "fadeIn 1.2s";
        target.style.opacity = "1";

    }
    fadeOut(target) {
        target.style.animation = " ";
        target.style.animation = "fadeOut 1,2s";
        // target.style.animationDuration = String(sn);
        target.style.opacity = "0";
    }

    formAlert(message, alertType, path, method) {
        let alert = `
        <div class="alert alert-${alertType}" style="text-align:center" role="alert">
            ${message}
        </div>
        `

        path.insertAdjacentHTML(method, alert)

        const alertElement = document.querySelector(".alert")

        this.fadeIn(alertElement);

        setTimeout(() => {

            this.fadeOut(alertElement)
            alertElement.remove();

        }, 2500)

    }

    addNewSelectInput(target) {

        let newNtInputs = " ";

        if (this.selectList.childElementCount > 0) {
            while (this.selectList.childElementCount > 0) {
                this.selectList.lastChild.remove();
            }
        }


        for (let i = 0; i < Number(target.value); i++) {

            newNtInputs = `
                    <div class="select-state">
                    <label class="input-label">${i + 1}.Doğal Durum Sayısı</label>
                    <select class="form-select nt-select">
                    <option id="select-option" selected value="1">1</option>
                    <option id="select-option" value="2">2</option>
                    <option id="select-option" value="3">3</option>
                    <option id="select-option" value="4">4</option>
                </select>
                </div>`

            this.selectList.insertAdjacentHTML('beforeend', newNtInputs)
        }

        //Add Hurwics Input
        const hurwics = `
        <div class=hurwics>
                <label for="customRange3" class="form-label">Hurwics Ölçütü</label>
                <input type="range" id="form-range" min="0" max="1" step="0.01" value="0.3"id="customRange3">

                <input class="hurwics-value" value="0"></input>
        </div>
                         `
        this.selectList.insertAdjacentHTML("beforeend", hurwics);

        const tableButton = `<button 
                                type="button" 
                                class="btn btn-success float-end"
                                id="calc-1"                              
                             >
                                Tabloyu Oluştur
                            </button>`


        if (this.formContainer.lastElementChild === this.formList) {

            this.formList.insertAdjacentHTML('afterend', tableButton);

        }
    }
    createTableHeadRow(headRowCount, ntInputsValue, colSpanValue) {

        this.tableHead.innerHTML = "";
        let headDataRow = "";


        for (let i = 0; i < ntInputsValue; i++) {

            let headTr = `<tr class="head-row head-row-${i+1}"></tr>`

            this.tableHead.insertAdjacentHTML("beforeend", headTr)

            let headRow = document.querySelectorAll(".head-row");


            if (headRow[0].innerHTML === "") {

                let headTh = `<th scope="row" class="main-th" rowspan="${ntInputsValue}">
                                    <div class="methods">Kâr</div>
                              </th>`

                headRow[0].insertAdjacentHTML("beforeend", headTh);
            }

            for (let j = 0; j < headRowCount[i]; j++) {

                const ntSelect = document.querySelectorAll(".nt-select");


                let inputPlaceholder = `${i + 1}.${j % Number(ntSelect[i].value) + 1} Doğal Durum`

                headDataRow = `<td class="head-data-row" colspan="${colSpanValue[i]}">
                                    <input
                                         class="full-input table-input"
                                         id="col-input"
                                         placeholder="${inputPlaceholder}"
                                    >
                               </td>
                         `;


                headRow[i].insertAdjacentHTML("beforeend", headDataRow);

            }

        }


    }

    createTableBodyRow(altValue, bodyRowCount) {

        this.tableBody.innerHTML = "";

        for (let i = 0; i < altValue; i++) {



            let bodyRow = `<tr class="body-row"></tr>`
            this.tableBody.insertAdjacentHTML("beforeend", bodyRow);


            let allBodyRows = document.querySelectorAll(".body-row");


            let bodyTh = `<th>
                                <input
                                     class="full-input table-input row-input"
                                     placeholder="${i + 1}.Alternatif Durum"
                                >
                          </th>
                         `
            allBodyRows[i].insertAdjacentHTML("beforeend", bodyTh);


            for (let j = 0; j < bodyRowCount; j++) {


                let dataRow = `<td>
                                    <input
                                         class="full-input table-input"
                                         id="data-input"
                                    >
                               </td>
                         `


                allBodyRows[i].insertAdjacentHTML("beforeend", dataRow);
            }








        }


    }
    addTableButton() {
        const tableButtons = `
            <button type="button " class="btn btn-success float-end calc-table" id="calc-table">Tabloyu Hesapla</button>
        `

        if (this.tableButtonsDiv.childElementCount === 0) {
            this.tableButtonsDiv.insertAdjacentHTML("beforeend", tableButtons);
        }

    }

    resultContainerDesign() {

        if (this.resultContainer.innerHTML === "") {
            const design = `
                    <div class="r-article">

                             <h2 class="result-article">Cevaplar</h2>
                    </div>
                    
                    <div class="all-card-table">

                    </div>
        
        `
            this.resultContainer.insertAdjacentHTML("beforeend", design);

        }
    }

    createResultTable(index, data, type, calcMethods) {

        this.fadeIn(this.resultContainer);


        const table = `
        <div class="card-table">
        
            <table class="table table-bordered result-table" id="result-table">
                    <thead class="result-table-head">

                        <tr>
                            <th scope="col" style="color:#198754">${calcMethods}</th>
                            <th scope="col">${type}</th>
                        </tr>
                    </thead>
                    <tbody class="table-body">
                      
                    </tbody>
                </table>
        </div>   
        `
        const allCardTable = document.querySelector(".all-card-table");

        allCardTable.insertAdjacentHTML("beforeend", table);

        const tableBody = document.querySelectorAll(".table-body");
        const tableCard = document.querySelectorAll(".card-table")
        const allAlternative = document.querySelectorAll(".row-input");


        tableBody.forEach((tbody) => {

            for (let i = 0; i < allAlternative.length; i++) {
                const bodyElement = `
                                       
            <tr>
                 <th scope="row">${allAlternative[i].value.trim()}</th>
                 <td scope="row">${data[i]}</td>
            </tr>           
            `

                if (tbody.childElementCount != allAlternative.length) {
                    tbody.insertAdjacentHTML("beforeend", bodyElement)
                }
            }
        })

        //Sonucu yazdırma

        const result = document.createElement("p");
        result.id = "result-text";

        this.calcMethodsController({ calcMethods, result, type, data, tableCard, index })


    }

    calcMethodsController(dataState) {

        let { calcMethods, result, type, data, tableCard, index } = dataState

        if (type === "İyimserlik") {

            if (calcMethods === "Kâr") {

                result.textContent = `${type} Cevabı : ${Math.max.apply(Math, data)}`;

            } else if (calcMethods === "Maliyet") {
                result.textContent = `${type} Cevabı : ${Math.min.apply(Math, data)}`;
            }

            tableCard[index].appendChild(result);
        }

        //Kötümserlik
        if (type === "Kötümserlik") {

            if (calcMethods === "Kâr") {

                result.textContent = `${type} Cevabı : ${Math.max.apply(Math, data)}`;

            } else if (calcMethods === "Maliyet") {
                result.textContent = `${type} Cevabı : ${Math.min.apply(Math, data)}`;
            }

            tableCard[index].appendChild(result);
        }

        //Eş olasılık
        if (type === "Eşit Olasılık") {
            if (calcMethods === "Kâr") {

                result.textContent = `${type} Cevabı : ${Math.max.apply(Math, data)}`;

            } else if (calcMethods === "Maliyet") {
                result.textContent = `${type} Cevabı : ${Math.min.apply(Math, data)}`;
            }

            tableCard[index].appendChild(result);


        }

        //Pişmanlık
        if (type === "Pişmanlık") {
            result.textContent = `${type} Cevabı : ${Math.min.apply(Math, data)}`;
            tableCard[index].appendChild(result);
        }

        //Hurwics
        if (type === "Hurwics") {

            if (calcMethods === "Kâr") {

                result.textContent = `${type} Cevabı : ${Math.max.apply(Math, data)}`;

            } else if (calcMethods === "Maliyet") {
                result.textContent = `${type} Cevabı : ${Math.min.apply(Math, data)}`;
            }

            tableCard[index].appendChild(result);
        }

    }





}