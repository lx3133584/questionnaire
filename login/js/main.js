/**
 * Created by Liang Xu on 2017/1/26.
 */
$(function () {
    bindEvent();
});

/*绑定事件*/
function bindEvent() {
    /*tab*/
    $(".main h2:first-child").on("click", function () {
        $(".main h2").removeClass();
        $(this).addClass("active");
        $(".login").show();
        $(".register").hide();
    });
    $(".main h2:last-child").on("click", function () {
        $(".main h2").removeClass();
        $(this).addClass("active");
        $(".login").hide();
        $(".register").show();
    });
    /*登录*/
    $(".login input[type=submit]").on("click", function () {
        $.ajax({
            type: "POST",
            url: "login.php",
            beforeSend: function () {
                if ($(".login p").text() != "") {
                    $(".login p").text("");
                    return false;
                }
            },
            data: {
                "account": $(".login input[name=account]").val(),
                "password": $(".login input[name=password]").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    $(".main h2").hide();
                    $(".register").hide();
                    $(".login").hide();
                    $(".success").show();
                    $(".success p").text("登录成功,3秒后自动跳转");
                    var flag = 2;
                    setInterval(function () {
                        $(".success p").text("登录成功," + flag + "秒后自动跳转");
                        flag--;
                        if (flag === -1) {
                            location.href = "../";
                        }
                    }, 1000);
                }
                else {
                    $(".login p").text(data.message);
                }

            },
            error: function (XHR) {
                alert("发生错误:" + XHR.status)
            }
        });
        return false;
    });
    /*注册*/
    /*用户名*/
    $(".register input:first-child").on("blur", function () {
        var reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        var value = $(this).val();
        if (reg.test(value)) {
            $.ajax({
                type: "GET",
                url: "register.php?account=" + value,
                dataType: "json",
                success: function (data) {
                    if (data.success) {
                        $(".register p:eq(0)").text("");
                    }
                    else {
                        $(".register p:eq(0)").text(data.message);
                    }

                },
                error: function (XHR) {
                    alert("发生错误:" + XHR.status)
                }
            });
            $(".register p:eq(0)").text("");
        }
        else {
            $(".register p:eq(0)").text("用户名包含字母、数字、下划线，以字母开头，5-16字节")
        }
    });
    /*密码*/
    $(".register input:eq(1)").on("blur", function () {
        var reg = /^[a-zA-Z]\w{5,17}$/;
        var value = $(this).val();
        if (reg.test(value)) {
            $(".register p:eq(1)").text("");
        }
        else {
            $(".register p:eq(1)").text("密码包含字母、数字、下划线，以字母开头，6-18字节")
        }
    });
    /*确认密码*/
    $(".register input:eq(2)").on("blur", function () {
        var previous_value = $(".register input:eq(1)").val();
        var value = $(this).val();
        if (value == previous_value) {
            $(".register p:eq(2)").text("");
        }
        else {
            $(".register p:eq(2)").text("两次密码输入不一致，请重新输入")
        }
    });
    /*注册成功*/
    $(".register input[type=submit]").on("click", function () {
        // $(".register input:first-child").trigger("blur");
        // $(".register input:eq(1)").trigger("blur");
        // $(".register input:eq(2)").trigger("blur");
        $.ajax({
            type: "POST",
            url: "register.php",
            beforeSend: function () {
                if ($(".register p").text() != "") {
                    return false;
                }
            },
            data: {
                "account": $(".register input[name=account]").val(),
                "password": $(".register input[name=password]").val(),
                "name": $(".register input[name=name]").val(),
                "sex": $(".register input[name=sex]").val()
            },
            dataType: "json",
            success: function (data) {
                $(".main h2").hide();
                $(".register").hide();
                $(".login").hide();
                $(".success").show();
                if (data.success) {
                    $(".success p").text("注册成功");
                }
                else {
                    $(".success p").text(data.message);
                }

            },
            error: function (XHR) {
                alert("发生错误:" + XHR.status)
            }
        });
        return false;
    });
    /*返回键*/
    $(".success input[type=button]").on("click", function () {
        // $(".success").hide();
        // $(".main h2").show();
        // $(".main h2:first-child").trigger("click");
        location.href = "../";
    })

}



