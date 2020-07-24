$(function () {
    //1.监听游戏规则打开
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });
    //2.监听关闭按钮
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });
    //3.监听开始游戏按钮
    $(".start").click(function () {
        $(this).stop().fadeOut(100);//按钮消失
        //调用进度条函数
        progressHandle();//进度条时间变化
        //调用灰太狼动画函数
        wolfAnimate();
    });
    //4.监听重新开始按钮
    $(".reStart").click(function () {
        $(".mask").stop().fadeOut(100);
        //调用进度条函数
        progressHandle();
        //调用灰太狼动画函数
        wolfAnimate();
        //将分数重置为0
        $(".score").text(0);
    });
    //设置一个处理进度条的方法
    function progressHandle() {
        //每次调用进度条方法就让它显示为满
        $(".progress").css({width:180});
        //开启一个定时器处理
        var timer = setInterval(function () {
            var progressWith = $(".progress").width();
            progressWith -= 1;
            //重新给进度条设置宽度
            $(".progress").css({width:progressWith});
            //监听进度条是否走完
            if(progressWith <= 0){
                //关闭定时器
                clearInterval(timer);
                //显示重新开始界面
                $(".mask").stop().fadeIn(100);
                //停止灰太狼的动画
                stopWolfAnimate();
            }
        },100);
    }
    var wolfTimer;
    //设置一个灰太狼动画的方法
   function wolfAnimate() {
       //1.设置两个数组，分别保存所有灰太狼和小灰灰的图片
       var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
       var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
       // 2.定义一个数组保存所有可能出现的位置
       var arrPos = [
           {left:"100px",top:"115px"},
           {left:"20px",top:"160px"},
           {left:"190px",top:"142px"},
           {left:"105px",top:"193px"},
           {left:"19px",top:"221px"},
           {left:"202px",top:"212px"},
           {left:"120px",top:"275px"},
           {left:"30px",top:"295px"},
           {left:"209px",top:"297px"}
       ];
       //3.创建一个图片
       var $wolfImage = $("<img src = '' class='wolfImage'>");
       //随机获取图片的位置
       var posIndex = Math.round(Math.random()*8);
       //4.设置图片显示位置
       $wolfImage.css({
           position:"absolute",
           top:arrPos[posIndex].top,
           left:arrPos[posIndex].left
       });
       //5设置图片的内容
       var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
       window.wolfIndex = 0;
       window.wolfIndexEnd = 5;
       wolfTimer = setInterval(function () {
           if(wolfIndex > wolfIndexEnd){
               $wolfImage.remove();
               clearInterval(wolfTimer);
               wolfAnimate();
           }
           $wolfImage.attr("src",wolfType[wolfIndex]);
           wolfIndex ++;
       },300);

       //6.将图片添加到界面上
       $(".container").append($wolfImage);
       //7.调用处理游戏规则的方法
       gameRules($wolfImage);
   }
   //设置一个处理游戏规则的方法
    function gameRules($wolfImage) {
        //给图片添加只执行一次的点击事件
        $wolfImage.one("click",function () {
            //修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            //拿到当前图片的地址
            var $src = $(this).attr("src");
            //判断是小灰灰还是灰太狼
            /*小灰灰的图片地址中有x,灰太狼的图片地址中有h*/
            var flag = $src.indexOf("h") >= 0;
            //根据点击图片的类型增减分数
            if(flag){
                $(".score").text(parseInt($(".score").text()) + 10);
            }else {
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        })
    }
   //设置一个关闭灰太狼动画的方法
   function stopWolfAnimate() {
       $(".wolfImage").remove();
       clearInterval(wolfTimer);
   }
});