
var CheckCharList = [];


/**
 * @charname {[string]} , constructor to save the chars.
 * location {[array]}, to save the index which show the sequence.
 */

function CheckChar(charname, index) {
    this.charname = charname;
    this.location = [];
    this.location.length=0;
    this.location.push(index);

}


/**
 * [save the char and display index in specificed array.]
 * @type {Object}
 */

CheckChar.prototype = {
    constructor: CheckChar,
    GetName: function() {
        return this.charname;
    },
    GetDisplayTime: function() {
        return this.location.length;
    },
    SaveIndex: function(index) {
        this.location.push(index);
    },
    ListIndex: function() {
        var indexString = "";
        for (var i in this.location) {
            indexString = indexString + "," + this.location[i];
        }
        indexString = indexString.substr(1);
        return indexString;
    }
}

/**
 * Confirm with to exit the webpage or not.
 */
function ExitPage() {
    if (confirm("您确定要退出网页吗?")) {
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
}


/**
 * Clear all the involved variant before we process.
 */
function ClearVarientBeforeCheck(){

    CheckCharList.length=0;
    return;
}




/**
 * Function: iterator to save the char and displayed location index 
 */
function GetCharShowedMaxTime() {

    ClearVarientBeforeCheck();

    var userInput = "";
    var limit = "";

    var arrChars = [];

    var flagFail = false;
    var message = "";

    do {
        userInput = prompt("请输入字母序列，单个字母以特殊字符间隔！");
        limit = prompt("请输入特殊字符间隔！")


        arrChars = userInput.split(limit);

        if (arrChars.length == 1) {
            message = "没有发现间隔字符'" + limit + "',请确认间隔字符是否输入法正确!";
            alert(message);
            flagFail = true;
            continue;
        }

        for (var indexRow in arrChars) {
            if (arrChars[indexRow].length > 1) {
                message = "出现" + arrChars[indexRow].length + "个字母" + arrChars[indexRow] + "没有用" + limit + "有效分隔！请重新输入！"
                alert(message);
                flagFail = true;
                continue;
            }
        }



        flagFail = false;

    } while (flagFail)

    var charsList = [];


    /**
     * iterator the array to save all the chars and display index.
     */
    for (var indexRow in arrChars) {
        var findFlag = false;

        var curtChar = arrChars[indexRow];
        for (var checkRow in CheckCharList) {
            if (CheckCharList[checkRow].GetName() == curtChar) {
                CheckCharList[checkRow].SaveIndex(indexRow);
                findFlag = true;
            }
        }

        if (findFlag == false) {
            var curtCheckChar = new CheckChar(curtChar, indexRow);
            CheckCharList.push(curtCheckChar);
            continue;
        }

    }

    var charDisplayList = [];
    var displayMaxTimes = -1;
    //iterator to find the Max Show Times.
    var curtObject;
    for (var indexRow in CheckCharList) {
        curtObject = CheckCharList[indexRow];
        if (curtObject.GetDisplayTime() >= displayMaxTimes) {
            displayMaxTimes = curtObject.GetDisplayTime();
        }
    }

    //Iterator to collect all chars into collection.
    for (var indexRow in CheckCharList) {
        curtObject = CheckCharList[indexRow];
        if (curtObject.GetDisplayTime() == displayMaxTimes) {
            charDisplayList.push(curtObject);
        }
    }

    //Display all the info to user which inclide chars , total showtimes and the every location .
    message = "您输入的字符串是" + userInput + "。\n";
    message = message + "间隔字符是'" + limit + "'。 \n\n";
    for (var indexRow in charDisplayList) {
        curtObject = charDisplayList[indexRow];
        message = message + "出现最多次数的字母是" + curtObject.GetName() + "。\n";
        message = message + "总计" + curtObject.GetDisplayTime() + "次，位置分别" + curtObject.ListIndex() + "。\n"
    }


    alert(message);
}
