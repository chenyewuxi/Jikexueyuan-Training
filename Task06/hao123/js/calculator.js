 var prevFlag = "number";
 var lastResult = undefined;
 var errorOccur = undefined;
 var zero = 0.0000000000000001;
 var arrStore = [];
 var arrAngleUnit = ['DEG', 'RAD', 'GRAD'];

 /*
 确认用户是否可以进行计算，如发生内存溢出则需按C键清除
  */
 function checkCanProcess() {
     var bProcess = true;
     if (typeof(errorOccur) != "undefined") {
         bProcess = false;
     }

     return bProcess;
 }

 /*
 用户按数字键进行事件处理
  */
 function clickNumber(target) {

     if (checkCanProcess() == false) {
         return;
     }

     var historyValue = $("#history").html();
     var savedValue = $("#result").html();

     var curtNumber = $("#" + target.id).html();

     if (target.id == "PI") {
         curtNumber = Math.PI;
     }

     switch (prevFlag) {
         case "operator":
             savedValue = curtNumber;
             break;
         case "number":
             if (target.id == "PI") {
                 savedValue = Math.PI;
             } else {
                 if (savedValue == "0") {
                     savedValue = curtNumber;
                 } else {
                     savedValue = savedValue + curtNumber;
                 }
             }
             break;
         case "memory":
             savedValue = curtNumber;
             break;
         case "function":
             savedValue = curtNumber;
             $("#history").html("");
             break;
     }

     $("#result").html(savedValue);
     prevFlag = "number";


 }

 /*
 设置计算器MC，MR键是否可以清除内存
  */
 function setMemroyEabled(flag) {
     switch (flag) {
         case true:
             $("#mc").removeAttr("disabled");
             $("#mr").removeAttr("disabled");
             break;
         case false:
             $("#mc").attr("disabled", "true");
             $("#mr").attr("disabled", "true");
             break;
     }

 }

 /*
 当用户点击Memory键时的事件
  */
 function clickMemory(target) {
     var result = Number($("#result").html());
     switch (target.id) {
         case "mc":
             arrStore.length = 0;
             break;
         case "mr":
             if (arrStore.length > 0) {
                 $("#result").html(arrStore[arrStore.length - 1]);
             }
             break;
         case "mplus":
             if (arrStore.length > 0) {
                 result = Number(arrStore[arrStore.length - 1]) + result;
                 arrStore[arrStore.length - 1] = result;
             } else {
                 arrStore.push(result);
             }
             setMemroyEabled(true);

             break;
         case "mminus":
             if (arrStore.length > 0) {
                 result = Number(arrStore[arrStore.length - 1]) - result;
                 arrStore[arrStore.length - 1] = result;
             } else {
                 arrStore.push(0 - result);
             }
             setMemroyEabled(true)
             break;
         case "ms":
             arrStore.push(result);
             break;
         case "memory":
             alert("记忆内存为" +
                 ((arrStore.length == 0) ? "空." : arrStore));
             break;
     }

     prevFlag = "memory";

 }

 function getTriAngleFunction(unit, funName, val) {

     var result = 0;
     if (funName == "sin") {
         switch (unit) {
             case "DEG":
                 result = Math.sin(Number(val) / 180 * Math.PI);
                 break;
             case "RAD":
                 result = Math.sin(Number(val));
                 break;
             case "GRAD":
                 result = Math.sin(Number(val) * 0.01 * 90 / 180 * Math.PI);
                 break;

         }

     }

     if (funName == "cos") {
         switch (unit) {
             case "DEG":
                 result = Math.cos(Number(val) / 180 * Math.PI);
                 break;
             case "RAD":
                 result = Math.cos(Number(val));
                 break;
             case "GRAD":
                 result = Math.cos(Number(val) * 0.01 * 90 / 180 * Math.PI);
                 break;

         }

     }

     if (funName == "tan") {
         switch (unit) {
             case "DEG":
                 result = Math.tan(Number(val) / 180 * Math.PI);
                 break;
             case "RAD":
                 result = Math.tan(Number(val));
                 break;
             case "GRAD":
                 result = Math.tan(Number(val) * 0.01 * 90 / 180 * Math.PI);
                 break;

         }

     }

     result = returnActualResult(result, 0);
     result = returnActualResult(result, 1);

     return result;

 }

 function returnActualResult(curtVal, actualReslut) {
     if (Math.abs(Number(curtVal) - Number(actualReslut)) <= zero) {
         return actualReslut;
     } else {
         return curtVal;
     }

 }

 function getLastOpeator(historyValue) {
     var curChar = "";
     var findIdx = 0;
     var result = "";
     for (var i = historyValue.length - 1; i > 0; i--) {
         curChar = historyValue.substr(i, 1);
         if (curChar == "+" || curChar == "-" || curChar == "÷" || curChar == "×") {

             findIdx = i;
             break;
         }
     }

     if (findIdx > 0) {
         result = historyValue.substr(i, 1);
     }

     return result;

 }

 /*
 用户单击加减乘除运算符时触发事件
  */
 function clickFunction(target) {

     if (checkCanProcess() == false) {
         return;
     }

     var savedValue = $("#result").html();
     var historyValue = $("#history").html();
     var lastOpeator = "";
     var curtFunction = target.id;
     var result = 0;



     try {
         switch (curtFunction) {
             case "percent":
                 result = (Number(savedValue) / 100);
                 break;
             case "squareroot":
                 if (savedValue < 0) {
                     result = "负数没有平方根！"
                     errorOccur = result;
                 } else {
                     result = Math.sqrt(savedValue);
                 }
                 break;
             case "square":
                 result = Number(savedValue) * Number(savedValue)
                 if (result == Infinity || result == -Infinity ) {
                     // result = 
                     errorOccur = "数据内存溢出！";
                 }
                 break;
             case "reciprocal":
                 if (Math.abs(Number(savedValue)) < zero) {
                     result = "除数不可以为零！"
                     errorOccur = result;
                 } else {
                     result = (1 / Number(savedValue));
                 }
                 break;
             case "sin":
             case "cos":
             case "tan":
                 var unit = $("#angleunit").html();
                 result = getTriAngleFunction(unit, curtFunction, savedValue);
                 break;


         }
     } catch (e) {
         errorOccur = e.name;
     }

     // var resultData = new Number(result);
     // result = resultData.saveNinePointFraction();

     // resultData = new Number(result);
     // result = resultData.removeLastZero();



     if (typeof(errorOccur) == "undefined") {

         result = Number(result).toPrecision(10);
         resultData = new Number(result);

         result = resultData.removeLastZero();
         $("#result").html(result);

         var symbol = $("#" + target.id).html();


         switch (prevFlag) {
             case "function":
                 var curChar = "";
                 var findIdx = -1;
                 for (var i = historyValue.length - 1; i > 0; i--) {
                     curChar = historyValue.substr(i, 1);
                     if (curChar == "+" || curChar == "-" || curChar == "÷" || curChar == "×") {

                         findIdx = i;
                         break;
                     }
                 }

                 if (findIdx < 0) {
                     historyValue = "";
                 } else {
                     historyValue = historyValue.substr(0, i + 1) + symbol + "(" + historyValue.substr(i + 1) + ")";
                 }

                 break;
             default:
                 historyValue = historyValue + symbol + "(" + savedValue + ")";
                 break;
         }

         $("#history").html(historyValue);


     } else {
         $("#result").html(result);
         alert(errorOccur);
     }

     prevFlag = "function";
 }

 /*
 清除内存溢出及相关错误时功能
  */
 function clickClear(target) {

     savedValue = "0";
     historyValue = "";

     prevFlag = "number";
     lastResult = undefined;
     errorOccur = undefined;

     $("#result").html(savedValue);
     $("#history").html(historyValue);

 }


 /*
 正负号功能设定
  */
 function clickNegative() {

     if (checkCanProcess() == false) {
         return;
     }

     // if (prevFlag == "number") {

     var savedValue = $("#result").html();
     if (savedValue != "0") {
         if (savedValue.substr(0, 1) == "-") {
             savedValue = savedValue.substr(1);
         } else {
             savedValue = "-" + savedValue;
         }
     }
     $("#result").html(savedValue);

     prevFlag = "number";

     // }

 }

 /*
 后退键相关功能
  */
 function clickBackspace(target) {

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


 /*
 保存除法运算精度功能
  */
 function actualDivide(arg1, arg2) {
     var t1 = 0,
         t2 = 0,
         r1, r2;
     try {
         t1 = arg1.toString().split(".")[1].length;
     } catch (e) {

     }
     try {
         t2 = arg2.toString().split(".")[1].length;
     } catch (e) {

     }
     with(Math) {
         r1 = Number(arg1.toString().replace(".", ""))
         r2 = Number(arg2.toString().replace(".", ""))
         return (r1 / r2) * pow(10, t2 - t1);
     }
 }

 /*
 暂时不用，利用Number对象时就可以完成去除后序零
  */
 function removeDigitalLastZero(arg1) {

     var pointLength = 0;
     var arrDigital = [];
     var iIdx = 0;
     var result = 0;
     try {
         pointLength = arg1.toString().split(".")[1].length;
         result = arg1.toString().split(".")[1]
         for (iIdx = pointLength; iIdx > 0; iIdx--) {
             if (result.substr(iIdx) == "0") {
                 result = substr(0, iIdx - 1);
             } else {
                 break;
             }
         }

         if (result.length == 0) {
             result = arg1.toString().split(".")[0];
         } else {
             result = arg1.toString().split(".")[0] + "." + result;
         }

     } catch (e) {
         result = arg1;
     }

     return result;

 }

 /*
 保存9位小数点后运算精度
  */
 function saveNinePoint(arg) {

     var pointLength = 0;
     var result = arg;
     try {
         pointLength = arg.toString().split(".")[1].length
     } catch (e) {
         result = arg;
     }

     if (pointLength > 0 && pointLength > 9) {
         result = Number(result).toFixed(9);
     }

     return result;
 }

 Number.prototype.actualDiv = function(arg) {
     return actualDivide(this, arg);
 }

 Number.prototype.removeLastZero = function(arg) {
     return removeDigitalLastZero(this);
 }

 Number.prototype.saveNinePointFraction = function(arg) {
     return saveNinePoint(this);

 }

 /*
 两个数的加减乘除运算
  */
 function calculate(data1, operator, data2) {


     var result = 0;
     var arrData1 = [];
     var arrData2 = [];
     switch (operator) {
         case "+":
             result = Number(data1) + Number(data2);
             break;
         case "-":
             result = Number(data1) - Number(data2);
             break;
         case "×":

             result = (Number(data1) * Number(data2));
             break;
         case "÷":
             var firstData = new Number(data1);
             var secondData = new Number(data2);
             if (secondData == 0) {
                 result = "除数不可以为零。"
                 errorOccur = result;
             } else {
                 result = firstData.actualDiv(Number(data2));
             }
             break;
     }



     // var resultData = new Number(result);
     // result = resultData.saveNinePointFraction();

     if (errorOccur == undefined) {
         result = Number(result).toPrecision(10);

         resultData = new Number(result);
         result = resultData.removeLastZero();

         if (result == Infinity) {
             errorOccur = "计算结果是无穷大。";
         }

         if (result == -Infinity) {
             errorOccur = "计算结果是负无穷大。";
         }

     } else {
         alert(errorOccur);
     }


     return result;

 }


 /*
 单击四则运算符号时事件处理
  */
 function clickOperator(target) {

     if (checkCanProcess() == false) {
         return;
     }

     var savedValue = $("#result").html();
     var historyValue = $("#history").html();
     var lastOpeator = "";
     var curtOperator = $("#" + target.id).html();
     var result = 0;

     var data1 = 0;
     var data2 = 0;
     var operator = "";
     switch (prevFlag) {
         case "number":
         case "memory":

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
         case "function":
             if (historyValue.length == 0) {
                 historyValue = savedValue + curtOperator;
             } else {
                 if (typeof(lastResult) == "undefined") {
                     data1 = historyValue.substr(0, historyValue.length - 1);
                 } else {
                     data1 = lastResult;
                 }
                 operator = getLastOpeator(historyValue);
                 data2 = savedValue;
                 result = calculate(data1, operator, data2);
                 // result = Number(result).toPrecision(10);
                 
                 lastResult = result;
                 historyValue = historyValue + curtOperator;

                 $("#result").html(result);
             }


             break;
         case "operator":
             lastOpeator = historyValue.substr(historyValue.length - 1, 1);
             if (lastOpeator != curtOperator) {
                 historyValue = historyValue.substr(0, historyValue.length - 1) + curtOperator;
             }
             break;
         case "function":

             historyValue = historyValue + curtOperator;

             break;




     }
     $("#history").html(historyValue);

     prevFlag = "operator";
 }
 /*
 单击小数点时的运算规则
  */
 function clickPoint(target) {

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

 /*
 单击等号时运算规则
  */
 function clickEqual(target) {

     if (checkCanProcess() == false) {
         return;
     }

     var savedValue = $("#result").html();
     var historyValue = $("#history").html();
     var lastOpeator = "";
     var curtOperator = $("#" + target.id).html();
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

 function clickAngleUnit(target) {

     var curtVal = $("#" + target.id).html();
     var changedVal = "";
     var curIdx = 0;
     for (var i = 0; i <= arrAngleUnit.length - 1; i++) {
         if (curtVal == arrAngleUnit[i]) {
             curIdx = i;
             break;
         }
     }

     curIdx++;

     if (curIdx > arrAngleUnit.length - 1) {
         curIdx = 0;
     }

     $("#" + target.id).html(arrAngleUnit[curIdx]);
 }

 /*
 取得IE和其它浏览器时取得的事件对象。
  */
 function getEventTarget(e) {
     e = e || window.event;
     return e.target || e.srcElement;
 }

 /*
 JQuery 下事件绑定
  */
 $(document).ready(function() {

     setMemroyEabled(false);

     $(".container-fluid.centerDiv div.row div").bind("click", function(e) {
         var target = getEventTarget(e);
         switch (target.id) {
             case "1":
             case "2":
             case "3":
             case "4":
             case "5":
             case "6":
             case "7":
             case "8":
             case "9":
             case "0":
             case "PI":
                 clickNumber(target);
                 break;
             case "ce":
             case "c":
                 clickClear(target);
                 break;
             case "back":
                 clickBackspace(target);
                 break;
             case "mc":
             case "mr":
             case "mplus":
             case "mminus":
             case "ms":
             case "memory":
                 clickMemory(target);
                 break;
             case "percent":
             case "squareroot":
             case "square":
             case "reciprocal":
             case "sin":
             case "cos":
             case "tan":

                 clickFunction(target);
                 break;
             case "devide":
             case "multiple":
             case "minus":
             case "plus":
                 clickOperator(target);
                 break;
             case "negative":
                 clickNegative(target);
                 break;
             case "point":
                 clickPoint(target);
                 break;
             case "equal":
                 clickEqual(target);
                 break;
             case "angleunit":
                 clickAngleUnit(target);
                 break;



         }
     });












 });



 function exitPage() {
     if (confirm("您确定要退出计算器程序吗?")) {
         window.opener = null;
         window.open('', '_self');
         window.close();
     }
 }
