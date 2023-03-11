$(function () {
    // 给时间补零的函数
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }

    // 定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function (res) {
            if (res.status !== 200) {
                return alert("获取列表失败！")
            }
            // 将data 里面的额 tags 字符串转换为字符串数组
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].tags = res.data[i].tags.split(",");
            }
            var htmlhtr = template("tp1-news", res);
            $("#contentTemplate").html(htmlhtr);//渲染html
        });
    };
    getNewsList();
})