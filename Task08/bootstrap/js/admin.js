function getNewDetails(category) {

    $.ajax({
        url: "server/admin.php",
        type: 'POST',
        dataType: 'json',
        data: {
            "actiontype": "SELECT",
            "category": category
        },
        success: function(data) {
            if (data != "undefined" && data["desc"] == "OK") {
                showReocrds(data);
            }

        },
        done: function(data) {
            alert("Fetch record failed! Reason:" + data);
        },
        error: function(error) {
            alert("Fetch record failed! Reason:" + error["responseText"]);
        }
    });

}

function showReocrds(data) {
    var content = "";
    var result = data["result"];
    var header = ""
    var isfirsttime = true;
    var idx = 1;

    var columnwidth = "";
    var columncount = data["columncount"] + 2;
    var columnwidth = "style = 'width: " + (100 / columncount).toFixed(7) + "%'";

    $.each(result, function(index, info) {
        if (isfirsttime == true) {


            header += "<div class='row header'>";
            header += "<div class='' " + columnwidth + ">" + "<input type='checkbox' id='chbselectall'" + "/>" + "&nbsp;Select ALL</div>";
            for (var curtKey in info) {
                header += "<div class='' " + columnwidth + ">" + curtKey + "</div>"
            }

            header += "<div class='' " + columnwidth + ">" + "Action</div>"
            header += "</div>";
            isfirsttime = false;
        }

        content += "<div class='row'>";
        content += "<div class='' " + columnwidth + ">" + "<input type='checkbox' id='chbselect" + idx + "'" + "/>" + "</div>";
        for (var curtKey in info) {
            content += "<div class='" + curtKey + "' " + columnwidth + ">" + info[curtKey] + "</div>"
        }
        content += "<div class='' " + columnwidth + ">";
        content += "<input type='submit' class='btn btn-primary btn-xs' id='btnUpdate" + idx + "'" + " value='变更'/>&nbsp;&nbsp;"
        content += "<input type='submit' class='btn btn-warning btn-xs' id='btnDelete" + idx + "'" + " value='删除'/>";
        content += "</div>";

        content += "</div>";

    });


    $("#newdetails").html(header + content);
    $("#hdfactiontype").attr("value", "INSERT");
}

function init() {

    $("#hdfactiontype").attr("value", "INSERT");
    $("#hdfcategory").attr("value", "ALL");
}

function setSaveLinstener() {
    $("#save").on('click', function(event) {
        event.preventDefault();

        var actiontype = $("#hdfactiontype").val().toUpperCase();
        var newsid;
        switch (actiontype) {
            case "INSERT":
                break;
            case "UPDATE":
                newsid = $("#hdfnewsid").val()
                break;
        }

        if (false == checkValidBeforeSubmit()) {
            return
        }

        $.ajax({
            url: "server/admin.php",
            type: 'POST',
            dataType: 'json',
            data: {
                "actiontype": actiontype,
                "newsid": newsid,
                "category": $("#category").val(),
                "newstitle": $("#newstitle").val(),
                "newsimage": $("#newsimage").val(),
                "newscontent": $("#newscontent").val(),
                "newsaddtime": $("#newsaddtime").val()
            },
            success: function(data) {
                if (data != "undefined" && data["desc"] == "OK") {
                    getNewDetails($("#hdfcategory").val());
                    alert("保存记录成功！");
                    $("#reset").click();
                } else {
                    alert("保存记录失败! 原因:" + data["error"]);
                }
            },
            done: function(data) {
                console.log(data);
                alert("保存记录失败! 原因:" + data["error"]);
            },
            error: function(data) {
                alert("保存记录失败! 原因::" + data["error"]);
            }
        });


    });
}


function checkMissRequireContent(form) {

    var misskey = "";
    var curtkey = "";
    $("#" + form + " div div input[required=true]").each(function(index, el) {
        if ($(this).val().trim() == "") {
            curtkey = $(this).attr('title');
            switch (curtkey) {
                case "":
                case undefined:
                    misskey += "," + $(this).parent().prev().children('label').text();
                    break;
                default:
                    misskey += "," + curtkey
                    break;
            }

        };

    });

    $("#" + form + " div div select[required=true]").each(function(index, el) {
        if ($(this).val().trim() == "") {
            curtkey = $(this).attr('title');
            switch (curtkey) {
                case "":
                case undefined:
                    misskey += "," + $(this).parent().prev().children('label').text();
                    break;
                default:
                    misskey += "," + curtkey
                    break;
            }

        };

    });

    $("#" + form + " div div textarea[required=true]").each(function(index, el) {
        if ($(this).val().trim() == "") {
            curtkey = $(this).attr('title');
            switch (curtkey) {
                case "":
                case undefined:
                    misskey += "," + $(this).parent().prev().children('label').text().trim(":");
                    break;
                default:
                    misskey += "," + curtkey
                    break;
            }

        };

    });

    if (misskey.length > 0) {
        misskey = misskey.substring(1);
    }

    return misskey;
}

function checkValidBeforeSubmit() {
    var valid = true;
    var key = "";



    key = checkMissRequireContent("formsubmit");

    if (key.length > 0) {
        alert("请先输入以下内容：<" + key + ">,再提交！");
        valid = false;
    }
    return valid;
}

function setUpdatAndDeleteLinstener() {
    $("#newdetails").on('click', 'div.row div input[type=submit]', function(event) {
        event.preventDefault();
        var type = $(this).attr('id').substring(0, 9).toUpperCase();
        switch (type) {
            case "BTNUPDATE":
                $("#reset").click();
                copyFromDetailToForm(this);
                break;
            case "BTNDELETE":
                deleteRow(this);
                break;
            case "CHKSELECT":
                break;
        }
    });
}


function deleteRow(el) {
    var newsid = $(el).parent().siblings('div.newsid').text();
    if (confirm('确认删除记录' + newsid + "吗?")) {
        $.ajax({
            url: "server/admin.php",
            type: 'POST',
            dataType: 'json',
            data: {
                "actiontype": "DELETE",
                "newsid": newsid
            },
            success: function(data) {
                if (data != "undefined" && data["desc"] == "OK") {
                    getNewDetails($("#hdfcategory").val());
                    alert("删除记录成功！");
                } else {
                    alert("删除记录失败! 原因:" + data["error"]);
                }
            },
            done: function(data) {
                console.log(data);
                alert("删除记录失败! 原因:" + data["error"]);
            },
            error: function(data) {
                alert("删除记录失败! 原因::" + data["error"]);
            }
        });

    } else {
        return false;
    }


}


function copyFromDetailToForm(el) {
    var parent = $(el).parent();
    $("#hdfactiontype").attr('value', 'UPDATE');
    $("#hdfnewsid").attr('value', $(parent).siblings('div.newsid').text());
    $("#category").val($(parent).siblings('div.category').text());
    $("#newstitle").attr('value', $(parent).siblings('div.newstitle').text());
    $("#newsimage").attr('value', $(parent).siblings('div.newsimage').text());
    $("#newscontent").text($(parent).siblings('div.newscontent').text());
    $("#newsaddtime").attr('value', $(parent).siblings('div.newsaddtime').text().substring(0, 10));

  

    $(window).scrollTop(0);

}

function setResetLinstener() {

    $("#reset").on('click', function(event) {
        // event.preventDefault();
        $("#hdfactiontype").attr('value', 'INSERT');
        $("#hdfnewsid").attr('value', "");
        $("#category").attr('value', "");
        $("#newstitle").attr('value', "");
        $("#newsimage").attr('value', "");
        $("#newscontent").html("");
        $("#newsaddtime").attr('value', "");
    });

}

function setDetailLinstener() {
    $("#newdetails div.row").on('hover', 'div', function(event) {
        alert("It's me!");
        $(this).parent().parent().addClass('active');
    });
  
}

$(document).ready(function() {

    init();
    var category = $("#hdfcategory").val()
    getNewDetails(category);

    setSaveLinstener();

    setUpdatAndDeleteLinstener();

    setResetLinstener();

    setDetailLinstener();


});
