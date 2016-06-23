function addAuthorizationLinstener() {


    $('#submit').on('click', function(event) {


        var userid = $('#userid').val();
        var password = $('#password').val();

        console.log("userid=" + userid);
        console.log("password=" + password);
        if (userid == undefined || password == undefined) {
            alert("登陆前请先输入用户名和密码！");
            event.preventDefault();
        }

        $.ajax({
            url: '/Authorization',
            type: 'POST',
            dataType: 'json',
            data: {
                'userid': userid,
                'password': password
            },
            success: function(data) {
                if (data != "undefined" && data["desc"] == "OK") {
                    alert("登陆成功！");
                    // window.location.href = "/Admin";
                } else {
                    alert("后台登陆时错误，原因:"+ data["error"]);
                    event.preventDefault();
                }
            },

            done: function(data) {
                alert("后台登陆时错误，原因:" + data);
                event.preventDefault();
            },
            error: function(error) {
                console.log(error);
                alert("后台登陆时错误!" + error);
                event.preventDefault();
            }


        });
    });

};

function init() {
    $("#userid").focus();
}

$(document).ready(function() {
    init();
    addAuthorizationLinstener();
});
