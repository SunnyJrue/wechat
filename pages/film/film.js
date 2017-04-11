
//计算两点的坐标
function getDistance(start,end){
    var pk = 180 / 3.14159;
    var a1 = start.lat / pk ;
    var a2 = start.lng / pk ;
    var b1 = end.lat / pk ;
    var b2 = end.lng / pk;
    var t1 = Math.cos(a1) * Math.cos(a2) * Math.cos(b1) * Math.cos(b2);
    var t2 = Math.cos(a1) * Math.sin(a2) * Math.cos(b1) * Math.sin(b2);
    var t3 = Math.sin(a1) * Math.sin(b1);
    var tt = Math.acos(t1 + t2 + t3);
    return 636600 * tt;
}
var a = {lat:22.502539,lng:113.92344};
var b = {lat:22.543099,lng:114.057868};
console.log(getDistance(a,b))

Page({
    data:{
        cinemas:{},

    },

    onLoad:function(){
        var that = this;
        wx.request({
            url:"https://m.maoyan.com/cinemas.json",
            success:function(res){
                console.log(res.data)
                that.setData({
                    cinemas:res.data.data
                })
            }
        });
        wx.getLocation({
            type:'wgs84',
            success:function(res){
                console.log(res.latitude,res.longitude);
            }
        })
    },

        　
 
     
    
})