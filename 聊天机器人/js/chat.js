$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();
    // 给发送按钮绑定点击事件
    $("#btnSend").on("click", function () {
        var text = $("#ipt").val().trim(); //、.trim() 去除字符串左右空格
        if (text.length <= 0) {
            return $("#ipt").val();
        }
        // 如果用户输入了聊天内容，追加到页面聊天窗口中
        $("#talk_list").append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>');
        $("#ipt").val('');
        // 窗口滚动
        resetui();
        // 获取机器人的回答
        getMsg(text);
    });
    // 获取机器人的回答内容
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot', //'http://ajax.frontend.itheima.net:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text;
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span> ' + msg + '</span></li>');
                    resetui();
                    // 将文字转换为音频
                    getVoice(msg);
                };
            }
        });
    };
    // 将汉字转换为音频
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: { text: text },
            success: function (res) {
                // console.log(res);
                if (res.status === 200) {
                    // 语言播放
                    $("#voice").attr("src", res.voiceUrl);
                };
            }
        });
    };
    // 让文本输入框响应回车事件后，提交消息
    $('#ipt').on('keyup', function (e) {
        // e.keyCode 可以获取到当前按键的编码
        if (e.keyCode === 13) {
            // 调用按钮元素的 click 函数，可以通过编程的形式触发按钮的点击事件
            $('#btnSend').click()
        }
    })
})