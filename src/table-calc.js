import { UI } from "./ui";

export class TableCalc {

    constructor() {

        this.ui = new UI();

    }

    preCalc(columnCount, rowCount, tableData) {

        let newArr = [];

        let calcArr = [];

        let arrPosition = 0;


        for (let i = 0; i < Object.keys(tableData).length; i++) {

            newArr.push(Number(tableData[i].value));
        }

        for (let i = 0; i < rowCount; i++) {
            let tempArr = [];
            for (let j = 0; j < columnCount; j++) {

                tempArr.push(newArr[arrPosition])


                arrPosition++;

            }
            calcArr.push(tempArr);
        }



        return calcArr;
    }

    goodCalc(calcArr, calcMethods) {

        //maxmax minmin

        let goodArr = [];

        if (calcMethods === "Kâr") {
            for (let i = 0; i < calcArr.length; i++) {

                goodArr[i] = Math.max.apply(Math, calcArr[i]);

            }
        } else if (calcMethods === "Maliyet") {
            for (let i = 0; i < calcArr.length; i++) {

                goodArr[i] = Math.min.apply(Math, calcArr[i]);

            }

        }



        return goodArr;
    }
    badCalc(calcArr, calcMethods) {

        // maxmin minmax

        console.log(calcMethods)
        let badArr = [];

        if (calcMethods === "Kâr") {

            for (let i = 0; i < calcArr.length; i++) {

                badArr[i] = Math.min.apply(Math, calcArr[i]);

            }
        } else if (calcMethods === "Maliyet") {

            for (let i = 0; i < calcArr.length; i++) {

                badArr[i] = Math.max.apply(Math, calcArr[i]);

            }
        }


        return badArr;
    }
    laplaceCalc(calcArr) {

        //max min

        let avgArr = [];



        for (let i = 0; i < calcArr.length; i++) {

            avgArr[i] = (calcArr[i].reduce((a, b) => a + b) / calcArr[i].length).toFixed(2)

        }

        return avgArr;
    }

    regretCalc(calcArr, colCount, rowCount, calcMethods) {

        const arrayCol = [];
        const colNumber = [];
        const lastArr = [];
        const regretArr = [];

        if (calcMethods === "Kâr") {
            for (let i = 0; i < colCount; i++) {

                arrayCol.push(calcArr.map((col) => col[i]));
                colNumber.push(Math.max.apply(Math, arrayCol[i]));
            }



        } else if (calcMethods === "Maliyet") {
            for (let i = 0; i < colCount; i++) {

                arrayCol.push(calcArr.map((col) => col[i]));
                colNumber.push(Math.min.apply(Math, arrayCol[i]));
            }

        }

        for (let i = 0; i < rowCount; i++) {
            var tempArr = []
            for (let j = 0; j < colCount; j++) {
                tempArr.push(Math.abs(colNumber[j] - calcArr[i][j]));
            }
            lastArr.push(tempArr);
        }

        for (let i = 0; i < rowCount; i++) {
            regretArr.push(Math.max.apply(Math, lastArr[i]))
            console.log(lastArr[i])
        }


        console.log(regretArr)

        return regretArr;
    }
    hurwicsCalc(rowNumber, goodArr, badArr, hurwicsNumber, calcMethods) {

        let hurwicsArr = [];



        if (calcMethods === "Kâr") {
            for (let i = 0; i < rowNumber; i++) {
                let hurwicsValue = hurwicsNumber * goodArr[i] + (1 - hurwicsNumber) * badArr[i];
                hurwicsArr.push(hurwicsValue.toFixed(2));
            }
        } else if (calcMethods === "Maliyet") {

            for (let i = 0; i < rowNumber; i++) {
                let hurwicsValue = hurwicsNumber * badArr[i] + (1 - hurwicsNumber) * goodArr[i];
                hurwicsArr.push(hurwicsValue.toFixed(2));
            }
        }



        return hurwicsArr;
    }

}