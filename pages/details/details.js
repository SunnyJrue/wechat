Page({
    data:{
        movieMsg:{},
        comentMsg:{},
        snum:0,
        left:'<',
        dra:'',
        icon:'∨',
        msgHeight:'116rpx',
        index:0,
        mediaPhotos:[],
        showMsg:false,
        arrYellow:[],
        arrGray:[],
        movieId:''
    },
    changeHeight:function(){
        var iconArr = ['∧','∨'];
        var height = ['auto','116rpx'];

        if(this.data.index>1){
            this.setData({
                index:0
            })
        }

        iconArr = iconArr[this.data.index];
        height = height[this.data.index];
        this.data.index++;
        this.setData({
            icon:iconArr,
            msgHeight:height
        })
    },
    backIndex:function(){
        wx.navigateBack({
          delta: 1
        })
        console.log(111)
    },

    onLoad:function(params){
        var that = this;
        wx.showToast({
            title:'加载中',
            icon:'loading',
            duration:5000
        })
        wx.request({
            url:"https://m.maoyan.com/movie/"+params.id+".json",
            // url:"https://m.maoyan.com/movie/249898.json",
            success:function(res){
                console.log(res.data.data)
                setTimeout(()=>{
                    wx.hideToast();
                },500)
                var movieDetail = res.data.data.MovieDetailModel;
                var commentDetail = res.data.data.CommentResponseModel;
                var strDra = movieDetail.dra.replace(/<p>|<\/p>/ig,'');
                var photoArr = [];
                for(var i = 0 ; i < movieDetail.photos.length ; i++){
                    photoArr.push(movieDetail.photos[i].replace(/w.h\//ig,"")+".webp");
                }
                that.setData({
                    movieMsg:movieDetail,
                    comentMsg:commentDetail,
                    snum:Math.floor(movieDetail.snum/10000),
                    dra:strDra,
                    mediaPhotos:photoArr,
                    showMsg:true,
                    movieId:movieDetail.id
                })


            }
        })
    },
    showBigImage:function(e){
        console.log(e.target.dataset.index);
        wx.navigateTo({
            url:'/pages/image/image?index='+e.target.dataset.index+'&movieId='+this.data.movieId,
        })
    }
})