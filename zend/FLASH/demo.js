function getStyle(obj,name){    //获取内部、外部样式 属性值
    if(obj.currentStyle){
        return  obj.currentStyle[name];
    } else {
        return  getComputedStyle(obj,null)[name];
    }
}
function getByClass(oparent,oclass){   //通过class选取标签
    var aEle = oparent.getElementsByTagName( "*" );
    var aRe = [];

    for(var i=0; i<aEle.length; i++){
        if(aEle[i].className == oclass){
            aRe.push(aEle[i]);
        }
    }
    return aRe;
}

function startMove(obj,attr,end){  //运动框架搭建
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var objval = 0;
        if(attr == "opacity"){    //获取运动前的属性值
            objval = Math.round(parseFloat(getStyle(obj,attr))*100);
        } else {
            objval = parseInt(getStyle(obj,attr));
        }

        var speed = (end - objval)/6;   //带缓冲速度
        speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);   //>0  向上取整   <0 向下取整

        if(objval == end){
            clearInterval(obj.timer);
        } else {
            if(attr == "opacity"){
                obj.style[attr] =  (objval + speed)/100;
                obj.style["filter"] = "alpha(opacity:" + (objval + speed) +")";
            } else {
                obj.style[attr] = objval + speed + "px";
            }
        }
    },30);
}

function  cheight(){
        bli[now].style["zIndex"] = nzindex++;
        bli[now].style["height"] = 0;
        startMove(bli[now],"height",320);

        for(var i=0; i<sli.length; i++){
            startMove(sli[i],"opacity",50);
        }
        startMove(this,"opacity",100)
}

window.onload = function(){

    var odiv = document.getElementById("playBox");

    //前后按钮
    var prevbtn = getByClass(odiv,"prev")[0];
    var nextbtn = getByClass(odiv,"next")[0];
    var mprev = getByClass(odiv,"mark_left")[0];
    var mnext = getByClass(odiv,"mark_right")[0];

    mprev.onmouseover = prevbtn.onmouseover = function(){
        startMove(prevbtn,"opacity",100)
    };
    mprev.onmouseout = prevbtn.onmouseout = function(){
        startMove(prevbtn,"opacity",0)
    };
    mnext.onmouseover = nextbtn.onmouseover = function(){
        startMove(nextbtn,"opacity",100)
    };
    mnext.onmouseout = nextbtn.onmouseout = function(){
        startMove(nextbtn,"opacity",0)
    };

    //三个小图部分
    var smallDiv = getByClass(odiv,"smallPic")[0];   //xiaotu
    var sli = smallDiv.getElementsByTagName("li");

    var bigDiv = getByClass(odiv,"bigPic")[0];     //datu
    var bli = bigDiv.getElementsByTagName("li");

    var nzindex = 2;
    var now = 0;
    for(var i=0 ; i<sli.length; i++){
        sli[i].index = i;
        sli[i].onclick = function(){
            if(this.index == now) {
                return ;
            }

            now = this.index;
            cheight();

        sli[now].onmouseover = function(){
            startMove(this,"opacity",100);
        };
        sli[now].onmouseout = function(){
            if(this.index != now){
                startMove(this,"opacity",50);
            }
        };
    };

    //prev next

    }
};