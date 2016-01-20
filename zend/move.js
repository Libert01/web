/**
 * Created by Administrator on 2016/1/19.
 */
function getStyle(obj,name){    //获取内部、外部样式 属性值
    if(obj.currentStyle){
        return  obj.currentStyle[name];
    } else {
        return  getComputedStyle(obj,null)[name];
    }
}

function startMove(obj, json, fn){
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var bStop = true;
        for( var attr in json){
            var objval = 0;
            if(attr == "opacity"){    //获取运动前的属性值
                objval = Math.round(parseFloat(getStyle(obj, attr))*100);
            } else {
                objval = parseInt(getStyle(obj,attr));
            }

            var speed = (json[attr] - objval)/6;   //带缓冲速度
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);   //>0  向上取整   <0 向下取整

            if(objval != json[attr]){
                bStop = false;
            }

            if(attr == "opacity"){
                obj.style[attr] =  (objval + speed)/100;
                obj.style["filter"] = "alpha(opacity:" + (objval + speed) +")";
            } else {
                obj.style[attr] = objval + speed + "px";
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fn) fn();
        }
    },30);
}
