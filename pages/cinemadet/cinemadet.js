
Page({
    data:{
        dataMsg:{},
        cinemaMsg:{},
        dateIndex:0,
        dateSlug:'',
        imageIndex:0,
        imagMsg:{},   //图像信息
        showUrl:'http://m.maoyan.com/show/seats?showId='
    },
    onLoad:function(e){
        console.log(e)
        var that = this;
        wx.request({
            // url:'https://m.maoyan.com/showtime/wrap.json?cinemaid=15566&movieid=343012',
            url:'https://m.maoyan.com/showtime/wrap.json?cinemaid='+e.id,
            header:{
                'content-type': 'application/json'
            },
            success:(res)=>{
                var data = res.data.data;
                console.log(data)
                
                that.setData({
                    dataMsg:data,
                    imagMsg:data,
                    cinemaMsg:data.cinemaDetailModel,
                    dateSlug:data.Dates[0].slug
                })
                if(res){
                    //把数据缓存起来
                    wx.setStorage({
                        key:'movie',
                        data:data
                    })
                }
                
            }
        })

        //取得缓存
        var datas = wx.getStorageSync('movie');
        console.log(datas);
        that.setData({
            dataMsg:datas,
            cinemaMsg:datas.cinemaDetailModel,
            dateSlug:datas.Dates[0].slug
        })
        
    },
    callphone:(re)=>{
        console.log(re.currentTarget.dataset.phone)
        var phoneNum =  re.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber:phoneNum,
            fail:function(){
                wx.showToast({
                    title:'拨打电话失败',
                    icon:'loading',
                    duration:800
                })
            }
        })
    },
    selectMovie:function(e){
        console.log(e.target.dataset.movieid,e.target.dataset.movieindex)
        var movieid = e.target.dataset.movieid;
        var that = this;

        that.setData({
            imageIndex:e.target.dataset.movieindex
        })
        wx.request({
            url:'https://m.maoyan.com/showtime/wrap.json?cinemaid=15566&movieid='+movieid,
            header:{
                'content-type':'application/json'
            },
            success:function(res){
                var data = res.data.data;
                that.setData({
                    dataMsg:data,
                    
                })
            }
        })

    },
    getDate:function(e){
        // console.log(e.target.dataset.slug)
        console.log(e)
        this.setData({
            dateSlug:e.target.dataset.slug,
            dateIndex:e.target.dataset.index
        })

    }
})