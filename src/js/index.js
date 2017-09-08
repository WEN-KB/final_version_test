window.onload=function(){

    var carousel = document.getElementsByClassName("slider")[0];           //轮播框
    var carousel_width = parseInt(getComputedStyle(carousel).width);        //轮播容器宽


    var config = carousel.getAttribute("data-img");             //获取属性
    var img_arr = config.split("|");                             //图片是一组数组
    var ratio = 750/240;                                                    //图片比例
    var carousel_height = carousel_width/ratio;                             //轮播容器高度

                                                                            //轮播宽高附值
    carousel.style.width=carousel_width;
    carousel.style.height=carousel_height;


    var change_div=document.createElement("div");                           //生成图片容器
    change_div.style.width = carousel_width *img_arr.length + "px";
    change_div.style.height = carousel_height + "px";
    change_div.style.position = "relative";
    change_div.style.left = 0;
    change_div.style.transition = "all .5s ease-in-out";

    carousel.appendChild(change_div);                                        //图片容器放入div中
    var left_val = parseInt(change_div.style.left);                          //图片容器的left值


    for(var i=0;i<img_arr.length;i++){
        change_div.appendChild(document.createElement("img"));              //图片加入容器
    }
    var img = document.getElementsByTagName("img");                         //获取图片的节点

    //循环给img标签设置宽高
    for(var y= 0; y < img.length; y++) {
        img[y].style.width = carousel_width + "px";                         //遍历图片并设置样式
        img[y].style.height = carousel_height + "px";
        //双重for循环给每一个Img标签的src值
        for(var k = 0; k < img.length; k++) {
            if(y === k) {
                img[k].src ="./img/"+img_arr[k];                            //赋予img src属性
            }
        }
    }


    var span_div = document.createElement("div");               // 创建一个小圆点div
    span_div.id="span_div";
    carousel.appendChild(span_div);                             //加入到轮播容器里面
    for(var a=0;a<3;a++){                                       //创建小圆点span
       var span = document.createElement("span");
        span_div.appendChild(span);
    }
    var span_check = document.getElementsByTagName("span");
    span_check[0].id = "on";

    span_div.style.left=(carousel_width-200)/2+"px";
    span_div.style.top=carousel_height+"px";

    function moving(speed, terminal, flag) {
        if(left_val === terminal) {
            left_val = flag;
        } else {
            left_val += speed;
        }
        change_div.style.left = left_val + "px";
        for(var m=0;m<span_check.length;m++){
                span_check[m].setAttribute("id","")
        }
        span_check[left_val/-carousel_width].setAttribute("id","on");
    }
    for(var t=0;t<span_check.length;t++){
        (function(n){
            span_check[n].onclick=function(){
                button_control(this,n);
            }

        })(t)
    }

    function button_control(that,num) {
        //在修改class前，清空所有class；
        for(var i=0;i<span_check.length;i++){
            span_check[i].setAttribute("id","");
        }
        //点击span修改class为“on”；
        that.setAttribute("id","on");
        //控制图片移动到当前位置
//            console.log(num);
        change_div.style.left=num*(-carousel_width)+"px";
    }

    carousel.timer=setInterval(function(){
        moving(-carousel_width, -carousel_width*(img.length-1), 0)
    },1500);
    carousel.onmouseover = function() {
        clearInterval(carousel.timer);
    };
    carousel.onmouseout = function() {
        clearInterval(carousel.timer);
        carousel.timer=setInterval(function(){
            moving(-carousel_width, -carousel_width*(img.length-1), 0)
        },1500)
    };



    window.onresize = function() {                                        //窗口变化时，改变图片的大小
        var window_width=parseInt(window.innerWidth);
        carousel_height = window_width / ratio;
        carousel_width= window_width + "px";
        carousel.style.height = carousel_height + "px";
        carousel.style.width= carousel_width+"px";
        change_div.style.width = window_width * img.length + "px";
        change_div.style.height = carousel_height + "px";
        change_div.style.left = 0;
        left_val = 0;
        for(var q = 0; q < span_check.length; q++) {
            span_check[q].setAttribute("id", "")
        }
        span_check[0].id="on";
        span_div.style.left=(window_width-200)/2+"px";
        span_div.style.top=carousel_height+"px";

        for(var j = 0; j < img.length; j++) {
            img[j].style.width = window_width + "px";
            img[j].style.height = carousel_height + "px";
        }
        function moving(speed, terminal, flag) {
            if(left_val === terminal) {
                left_val = flag;
            } else {
                left_val += speed;
            }
            change_div.style.left = left_val + "px";
            for(var m=0;m<span_check.length;m++){
                span_check[m].setAttribute("id","")
            }

            span_check[Math.abs(left_val/window_width)].setAttribute("id","on");

        }

        for(var t=0;t<span_check.length;t++){
            (function(n){
                span_check[n].onclick=function(){
                    button_control(this,n);
                }

            })(t)
        }

        function button_control(that,num) {
            //在修改class前，清空所有class；
            for(var i=0;i<span_check.length;i++){
                span_check[i].setAttribute("id","");
            }
            //点击span修改class为“on”；
            that.setAttribute("id","on");
            //控制图片移动到当前位置
//            console.log(num);
            change_div.style.left=num*(-window_width)+"px";
        }




        clearInterval(carousel.timer);
        carousel.timer = setInterval(function() {
            moving(-window_width, -window_width*(img.length-1), 0)
        }, 1500);
        carousel.onmouseover = function() {
            clearInterval(carousel.timer);
        };
        carousel.onmouseout = function() {
            clearInterval(carousel.timer);
            carousel.timer=setInterval(function(){
                moving(-window_width, -window_width*(img.length-1), 0)
            },1500)
        };

        //function moving(speed, terminal, flag) {
        //    if (left_val === terminal) {
        //        left_val = flag;
        //    } else {
        //        left_val += speed;
        //    }
        //    change_div.style.left = left_val + "px";
        //}
        //var timer1=null;
        //
        //timer1=setInterval(function(){
        //    moving(-window_width,-(window_width*(2)),0 )
        //},1500)

    };


    //var span_div = document.createElement("div");               // 创建一个小圆点div
    //carousel.appendChild(span_div);
    //span_div.id= "span_div";
    //var span_box = document.getElementById("span_div");
    //console.log(span_box);
    //for(var a=0;a<3;a++){
    //   var span = document.createElement("span");
    //    span_box.appendChild(span);
    //    console.log(span);
    //}
    //
    //console.log(span);
    //var span = document.createElement("span");
    //span_box.appendChild(document.createElement("span"));
    //for(var a=0;a<3;a++){
    //    span[a].className="span";
    //}
    //carousel.appendChild(span_div);










    //for(var j=0;j<img_arr.length;j++){
    //    for(var k=0;k<img.length;k++){
    //        if(j===k){
    //            img[j].src ="./img/"+img_arr[j];
    //
    //        }
    //    }
    //}
//    for(var m= 0;m<img_arr.length;m++){
//
//
//        img[m].style.width=1920+"px";
//        img[m].style.height=600+"px";
//        img[m].style.float="left";
//        change.style.width=6000+"px";
//    }
//    carousel.style.height=600+"px";
//    //function moving(speed,terminal,flag) {
//    //    if (left_val === terminal) {
//    //        left_val = flag;
//    //    } else {
//    //        left_val += speed;
//    //    }
//    //    change.style.left = left_val + "px";
//    //    //console.log(left_val);
//    //}
//
//    //function moving(speed,terminal,flag) {
//    //    if (left_val === terminal) {
//    //        left_val = flag;
//    //    } else {
//    //        left_val += speed;
//    //    }
//    //    change.style.left = left_val + "px";
//    //    //console.log(left_val);
//    //}
//    //var timer = null;
//    //timer=setInterval(function(){
//    //    moving(-1920,-3840,0);
//    //},1700);
//
//
//    window.onresize=function(){
//        var timer1=null;
//        clearInterval(timer);
//        clearInterval(timer1);
//        change.style.left=0+"px";
//        var new_left_val=parseInt(change.style.left);
//        var window_width=parseInt(window.innerWidth);
//        console.log(new_left_val,change.style.left);
//
//        for(var m= 0;m<img_arr.length;m++){
//            console.log(ratio);
//            img[m].style.width=window_width+"px";
//            img[m].style.height=window_width*ratio+"px";
//            img[m].style.float="left";
//            img[m].style.fontSize=0+"px";
//            var img_width = parseInt(img[m].style.width);
//        }
//
//        change.style.height=window_width*ratio + "px";
//        change.style.width=img[0]*3+"px";
//        carousel.style.height=window_width*ratio + "px";
//
//        console.log(img[0].style.width);
//
//
//
//
//
//
//        function changing(speed,terminal,flag) {
//            if (new_left_val === terminal) {
//                new_left_val = flag;
//            } else {
//                new_left_val += speed;
//            }
//            change.style.left = new_left_val + "px";
//        }
//
//
//        timer1=setInterval(function(){
//           changing((-img_width),(2*(-img_width)),0);
//        },3000)
//    };
//
//
////       if(!config_obj.config.width){
////           totalWidth = 500 * img.length;
////       }else{
////           totalWidth = config_obj.config.width*img.length;
////       }
//
////       for(var i=0;i<img.length;i++){
////           change_div.appendChild(document.createElement("img"));
////       }







};
