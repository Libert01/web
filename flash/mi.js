/**
 * Created by Administrator on 2016/1/18.
 */
function  getStyle(obj,name){    //css属性值获取
    if(obj.currentStyle){
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj,null)[name];
    }
}

function getByClass(oParent,sClass){   //通过class获取标签，返回数组
    var aEle = oParent.getElementsByTagName("*");
    var acla = [];

    for(var i=0; i<aEle.length; i++){
        if(aEle[i].className == sClass){
            acla.push(aEle[i]);
        }
    }
    return acla;
}

function  startMove(obj,attr,end){
    clearInterval(obj.timer);

    obj.timer = setInterval(function(){
       var objval = 0;
        if(attr == "opacity"){
            objval = Math.round(parseFloat(getStyle(obj,attr))*100);
        } else {
            objval = parseInt(getStyle(obj,attr));
        }

        var speed = (end - objval)/12;
        speed = speed> 0 ? Math.ceil(speed):  Math.floor(speed);

        if(objval == end){
            clearInterval(obj.timer);
        } else {
            if(attr == "opacity"){
                obj.style["opacity"] = (objval + speed)/100;
                obj.style["filter"] = "alpha(opacity:" + (objval + speed) + ")";
            } else {
                obj.style[attr] = objval + speed + "px";
            }
        }
    }, 30)
}

window.onload = function(){
    var oBox = document.getElementById("picbox");
    var oPic = getByClass(oBox,"pic")[0];
    var pul = oPic.getElementsByTagName("ul")[0];
    var pli = oPic.getElementsByTagName("li");

    var prev = getByClass(oBox,"prev")[0];
    var next = getByClass(oBox,"next")[0];

   /* pul.innerHTML += pul.innerHTML;
    oPic.style["width"] = pli.length * pli[0].offsetWidth + "px";
    */
    oPic.style["width"] = pli.length * pli[0].offsetWidth + "px";

    var oli = getByClass(oBox,"circle")[0].getElementsByTagName("li");

    var now = 0;

    function moveL(){
        for(var i=0; i<oli.length ; i++){
            oli[i].className = "";
        }
        oli[now].className = "active";

        startMove(oPic , "left" , -now * pli[0].offsetWidth);
    }
    //liebiao
    for(var i=0; i<oli.length ; i++){
        oli[i].index =  i;
        oli[i].onclick = function(){
            now = this.index;
            moveL();
        }
    }


    //prev next
    prev.onclick = function(){
        now--;
        if(now == -1){
            now = oli.length - 1;
        }
        moveL();
    };

    next.onclick = function(){
        now++;
        if(now == oli.length){
            now = 0;
        }
        moveL();
    }

};

