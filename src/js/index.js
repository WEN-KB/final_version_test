window.onload=function(){
    var carousel = document.getElementsByClassName("slider")[0];
    console.log(carousel);
    var config = carousel.getAttribute("data-img");
    var img_arr = config.split("|");                            //图片是一组数组


    //var span_div = document.createElement("div");
    //span_div.id= "span_div";
    //var span_box = document.getElementById("span_div");
    //for(var a=0;a<3;a++){
    //    var span = document.createElement("span");
    //}
    //var span = document.createElement("span");
    //span_box.appendChild(document.createElement("span"));
    //for(var a=0;a<3;a++){
    //    span[a].className="span";
    //}
    //carousel.appendChild(span_div);
    var change_div=document.createElement("div");
    change_div.id="change";
    change_div.className="container-fulit";
    carousel.appendChild(change_div);
    var change = document.getElementById("change");
    change.style.left=0;
    var left_val = parseInt(change.style.left);

    for(var i=0;i<img_arr.length;i++){
        change.appendChild(document.createElement("img"));
    }
    var img = document.getElementsByTagName("img");
    for(var j=0;j<img_arr.length;j++){
        for(var k=0;k<img.length;k++){
            if(j===k){
                img[j].src ="./img/"+img_arr[j];
            }
        }
    }
    for(var m= 0;m<img_arr.length;m++){
        img[m].style.width="980px";
        img[m].style.height="340px";
        img[m].style.float="left";
    }
    function moving(speed,terminal,flag) {
        if (left_val === terminal) {
            left_val = flag;
        } else {
            left_val += speed;
        }
        change.style.left = left_val + "px";
        console.log(left_val);
    }
    var timer = null;
    timer = setInterval(function(){
        moving(-980,-1960,0);
    },1700);

//       if(!config_obj.config.width){
//           totalWidth = 500 * img.length;
//       }else{
//           totalWidth = config_obj.config.width*img.length;
//       }

//       for(var i=0;i<img.length;i++){
//           change_div.appendChild(document.createElement("img"));
//       }
    var img_ = document.getElementsByTagName("img");






};
