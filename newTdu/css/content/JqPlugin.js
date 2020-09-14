; (function ($) {
    $.fn.Jqvalidate = function () {
        var success = true;
        var count = 0;
        //这里的this都是Jquery对象！
        $.each(this, function () {
            //这里的this都是DOM 对象！
            //console.log($(this));//这里加上这一句就会多执行一次！
            //注意这里的this先后顺序是HTML里DOM元素从上到下的顺序！
            if ($(this).attr("data-val-required") != undefined) {
                if ($(this).children().length > 0) {
                    //验证单选题和判断题答案在这里
                    if ($(this).prop("title") != "multiple") {
                        if ($(this).find("input:checked").length < 1 && $(this).find("span").length < 1) {
                            $(this).append("<span> &nbsp;" + $(this).attr("data-val-required") + "</span>").addClass("field-validation-error");
                            success = false;
                            ++count;
                        }
                        else if ($(this).find("input:checked").length < 1) {
                            success = false;
                            ++count;
                        }
                        else {
                            $(this).find('span').remove();
                            $(this).removeClass("field-validation-error");
                            success = true;
                        }
                    }
                        //验证多选题答案在这里
                    else {
                        if ($(this).find("input:checked").length < 2 && $(this).find("span").length < 1) {
                            $(this).append("<span> &nbsp;" + $(this).attr("data-val-required") + "</span>").addClass("field-validation-error");
                            success = false;
                            ++count;
                        }
                        else if ($(this).find("input:checked").length < 2) {
                            success = false;
                            ++count;
                        }
                        else {
                            $(this).find('span').remove();
                            $(this).removeClass("field-validation-error");
                            success = true;
                        }
                    }
                }
                else if (($.trim($(this).val()).length <= 0) && $.trim($(this).next().text()).length <= 0) {
                    var validatemess = $("<span> &nbsp;" + $(this).attr("data-val-required") + "</span>").addClass("field-validation-error");
                    $(this).addClass("input input-validation-error");
                    $(this).after(validatemess);
                    success = false;
                    ++count;
                }
                else if ($.trim($(this).val()).length <= 0) {
                    success = false;
                    ++count;
                }
                else if ($.trim($(this).next().text()).length > 0 && $.trim($(this).val()).length > 0) {
                    $(this).removeClass("input input-validation-error");
                    $(this).next().remove();
                    success = true;
                }
                //alert("$('#" + this.id + "')" + success);
            }
            else {
                console.error("$('#" + this.id + "')" + ".attr('data-val-required') is undefined");
                success = false;
                ++count;
            }
        });
        return success == false ? success : (count > 0) ? false : true;
        //var option = $.extend({}, $.fn.Jqvalidate.default,option);
    };

    //$.fn.Jqvalidate.default = {

    //};
})(jQuery);

//input的Inner验证在这里！
; (function ($) {
    $.fn.InnerValidate = function () {
            $this=$(this);
            if ($this.attr("data-val-required") != undefined) {
                if ($.trim($this.val()).length < 0 || $.trim($this.text()).length < 0) {
                    $this.append("<div style='text-align:center'><span> &nbsp;" + $this.attr("data-val-required") + "</span></div>").addClass("field-validation-error");
                    return false;
                }
                else {
                    return true;
                }
             }
            else{
                console.error("$('#" + this.id + "')" + ".attr('data-val-required') is undefined");
                return false;
            }
    };
})(jQuery);


;(function ($) {
    $.fn.hidenOverflowText = function (maxLength) {
        $.each(this, function () {
            if ($(this).text().length > maxLength) {
                $(this).text($(this).text().substring(0, maxLength));
                //$(this).html($(this).text() + "...");
            }
        });
    };
})(jQuery);
//Email验证在这里
; (function ($) {
    $.fn.valEmail = function () {
        var patten = new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
        if ($(this).prev(".field-validation-error") != undefined) {
            $(this).prev().remove();
        }
        if (patten.test($(this).val())) {
            return true;
        }
        $(this).before("<span class='field-validation-error' >非法的邮箱地址，请重新输入</span>");
        return false;
    };
})(jQuery);

//手机号的验证在这里
; (function ($) {
    $.fn.valPhone = function () {
        var patten = new RegExp(/^1[3|4|5|8][0-9]\d{4,8}$/);
        if ($(this).prev(".field-validation-error") != undefined) {
            $(this).prev().remove();
        }
        if (patten.test($(this).val())) {
            return true;
        }
        $(this).before("<span class='field-validation-error' >非法的手机号码，请重新输入</span>");
        return false;
    };
})(jQuery);

