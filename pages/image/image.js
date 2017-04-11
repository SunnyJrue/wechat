Page({
     data:{
        imageIndex:0,
        movieData:{},
        photoArr:[],
        showImage:false
     },
     onLoad:function(e){
        console.log(e)
        this.setData({
            imageIndex:e.index,
        })
        var that = this;
        wx.showToast({
            title:'加载中',
            icon:'loading',
            duration:5000
        })
        wx.request({
            url:"https://m.maoyan.com/movie/"+e.movieId+".json",
            // url:"https://m.maoyan.com/movie/249898.json",
            success:function(res){
                var movieMsg = res.data.data.MovieDetailModel;
                console.log(movieMsg);
                setTimeout(()=>{
                    wx.hideToast();
                     that.setData({
                        showImage:true
                    })
                },500)
                var photos = [];
                for(var i = 0; i < movieMsg.photos.length; i++){
                    photos.push(movieMsg.photos[i].replace(/w.h\/|@100w_100h_1e_1c/ig,'')+".webp");
                }
                console.log(photos)
                that.setData({
                    movieData:movieMsg,
                    photoArr:photos
                });

            }
        })
     }
})