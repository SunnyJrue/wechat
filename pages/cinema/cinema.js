Page({
    data:{
        areaCinema:{}
    },
    onLoad:function(e){
        console.log(e);
        var that = this;
        var area = e.area;
        wx.request({
            url:"https://m.maoyan.com/cinemas.json",
            success:(res)=>{
                var cinemas = res.data.data;
                console.log(cinemas)
                that.setData({
                    areaCinema:cinemas[area],
                    // areaCinema:cinemas['罗湖区']
                })
                
            }
        })
    }
})