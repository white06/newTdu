String.prototype.MonthToNum = function () {
    var $thisstr = this.toString();
    switch ($thisstr) {
        case "一月":
            return "1月";
        case "二月":
            return "2月";
        case "三月":
            return "3月";
        case "四月":
            return "4月";
        case "五月":
            return "5月";
        case "六月":
            return "6月";
        case "七月":
            return "7月";
        case "八月":
            return "8月";
        case "九月":
            return "9月";
        case "十月":
            return "10月";
        case "十一月":
            return "11月";
        case "十二月":
            return "12月";
    }
}