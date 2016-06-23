 var prevFlag = "number";
 var lastResult = undefined;
 var errorOccur = undefined;
 var zero = 0.00000000000000000001

 function checkCanProcess() {
     var bProcess = true;
     if (typeof(errorOccur) != "undefined") {
         bProcess = false;
     }

     return bProcess;
 }

 function ClickNumber() {

     if (checkCanProcess() == false) {
         return;
     }

     var historyValue = $("#history").html();
     var savedValue = $("#result").html();

     var curtNumber = $("#" + this.id).html();

     switch (prevFlag) {
         case "operator":
             savedValue = curtNumber;
             break;
         case "number":
             if (savedValue == "0") {
                 savedValue = curtNumber;
             } else {
                 savedValue = savedValue + curtNumber;
             }
             break;
     }

     $("#result").html(savedValue);
     prevFlag = "number";


 }



 function clickMemory() {
     alert("抱歉，此简易计算器没有记忆功能，下次升级后请再试用！")
 }

 function clickFunction() {

     if (checkCanProcess() == false) {
         return;
     }

     var savedValue = $("#result").html();
     var historyValue = $("#history").html();
     var lastOpeator = "";
     var curtFunction = this.id;
     var result = 0;
     var error = undefined;

     try {
         switch (curtFunction) {
             case "percent":
                 result = (Number(savedValue) / 100).toFixed(9);
                 break;
             case "squareroot":
                 if (savedValue < 0) {
                     result = "负数没有平方根！"
                     errorOccur = result;
                 } else {
                     result = Math.sqrt(savedValue).toFixed(9);
                 }
                 break;
             case "square":
                 result = Number(savedValue) * Number(savedValue)
                 if (result == "Infinity") {
                     result = "数据内存溢出！"
                     errorOccur = result;
                 }
                 break;
             case "reciprocal":
                 if (Number(savedValue) < zero) {
                     result = "除数不可以为零！"
                     errorOccur = result;
                 } else {
                     result = (1 / Number(savedValue)).toFixed(9);
                 }
                 break;

         }
     } catch (e) {
         error = e.name;
     }
     if (typeof(error) == "undefined") {
         $("#result").html(result);
     } else {
         $("#result").html(error);
     }


 }

 function clickClear() {

     savedValue = "0";
     historyValue = "";

     prevFlag = "number";
     lastResult = undefined;
     errorOccur = undefined;

     $("#result").html(savedValue);
     $("#history").html(historyValue);

 }

 function clickNegative() {

     if (checkCanProcess() == false) {
         return;
     }

     if (prevFlag == "number") {

         var savedValue = $("#result").html();
         if (savedValue != "0") {
             if (savedValue.substr(0, 1) == "-") {
                 savedValue = savedValue.substr(1);
             } else {
                 savedValue = "-" + savedValue;
             }
         }
         $("#result").html(savedValue);

     }

 }

 function clickBackspace() {

     if (checkCanProcess() == false) {
         return;
     }

     var savedValue = $("#result").html();
     if (prevFlag == "number") {

         savedValue = savedValue.substr(0, savedValue.length - 1);
         if (savedValue == "") {
             savedValue = "0";
         }

         $("#result").html(savedValue);
         prevFlag = "number";

     }

 }

 function calculate(data1, operator, data2) {

     var result = 0;
     switch (operator) {
         case "+":
             result = Number(data1) + Number(data2);
             break;
         case "-":
             result = Number(data1) - Number(data2);
             break;
         case "*":
             result = (Number(data1) * Number(data2)).toFixed(9);
             break;
         case "/":
             result = (Number(data1) / Number(data2)).toFixed(9);
             break;

     }
     return result;

 }



 function clickOperator() {

     if (checkCanProcess() == false) {
         return;
     }

     var savedValue = $("#result").html();
     var historyValue = $("#history").html();
     var lastOpeator = "";
     var curtOperator = $("#" + this.id).html();
     var result = 0;

     var data1 = 0;
     var data2 = 0;
     var operator = "";
     switch (prevFlag) {
         case "number":
             if (historyValue.length == 0) {
                 historyValue = savedValue + curtOperator;
             } else {
                 if (typeof(lastResult) == "undefined") {
                     data1 = historyValue.substr(0, historyValue.length - 1);
                 } else {
                     data1 = lastResult;
                 }
                 operator = historyValue.substr(historyValue.length - 1, 1);
                 data2 = savedValue;
                 result = calculate(data1, operator, data2);

                 lastResult = result;
                 historyValue = historyValue + data2 + curtOperator;

                 $("#result").html(result);
             }

             break;
         case "operator":
             lastOpeator = historyValue.substr(historyValue.length - 1, 1);
             if (lastOpeator != curtOperator) {
                 historyValue = historyValue.substr(0, historyValue.length - 1) + curtOperator;
             }
             break;

     }
     $("#history").html(historyValue);

     prevFlag = "operator";
 }

 function clickPoint() {

     if (checkCanProcess() == false) {
         return;
     }

     var savedValue = $("#result").html();
     if (prevFlag == "number") {

         if (savedValue.indexOf(".") < 0) {
             savedValue = savedValue + ".";
         }

         $("#result").html(savedValue);
         prevFlag = "number";

     }


 }

 function clickEqual() {

     if (checkCanProcess() == false) {
         return;
     }

     var savedValue = $("#result").html();
     var historyValue = $("#history").html();
     var lastOpeator = "";
     var curtOperator = $("#" + this.id).html();
     var result = 0;

     var data1 = 0;
     var data2 = 0;
     var operator = "";
     switch (prevFlag) {
         case "number":
             if (historyValue.length > 0) {

                 if (typeof(lastResult) == "undefined") {
                     data1 = historyValue.substr(0, historyValue.length - 1);
                 } else {
                     data1 = lastResult;
                 }
                 operator = historyValue.substr(historyValue.length - 1, 1);
                 data2 = savedValue;
                 result = calculate(data1, operator, data2);

                 lastResult = result;


                 $("#result").html(result);
                 $("#history").html("");
             }

     }

 }


 jQuery(document).ready(function() {



     $("#1").bind("click", ClickNumber);
     $("#2").bind("click", ClickNumber);
     $("#3").bind("click", ClickNumber);
     $("#4").bind("click", ClickNumber);
     $("#5").bind("click", ClickNumber);
     $("#6").bind("click", ClickNumber);
     $("#7").bind("click", ClickNumber);
     $("#8").bind("click", ClickNumber);
     $("#9").bind("click", ClickNumber);
     $("#0").bind("click", ClickNumber);

     $("#ce").bind("click", clickClear);
     $("#c").bind("click", clickClear);
     $("#back").bind("click", clickBackspace);

     $("#mc").bind("click", clickMemory);
     $("#mr").bind("click", clickMemory);
     $("#mplus").bind("click", clickMemory);
     $("#mminus").bind("click", clickMemory);
     $("#ms").bind("click", clickMemory);
     $("#meory").bind("click", clickMemory);

     $("#percent").bind("click", clickFunction);
     $("#squareroot").bind("click", clickFunction);
     $("#square").bind("click", clickFunction);
     $("#reciprocal").bind("click", clickFunction);


     $("#devide").bind("click", clickOperator);
     $("#multiple").bind("click", clickOperator);
     $("#minus").bind("click", clickOperator);
     $("#plus").bind("click", clickOperator);

     $("#negative").bind("click", clickNegative);
     $("#point").bind("click", clickPoint);
     $("#equal").bind("click", clickEqual);


 });



 function exitPage() {
     if (confirm("您确定要退出计算器程序吗?")) {
         window.opener = null;
         window.open('', '_self');
         window.close();
     }
 }
