
Page({
  data:{
    movies:{},
    getData:true,
    page:1
    
  },
  //下拉刷新  监听下拉
  onPullDownRefresh:function(){
    console.log(this.data.getData)
    console.log(111)
    var that = this;
    this.setData({
        getData:true,
        page:1
    })
    wx.showToast({
        title:'加载中',
        icon:'loading',
        
    });
    wx.request({
        url:"https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=10",
        success:function(res){
            console.log(res.data.data.movies);
            that.setData({
                movies:res.data.data.movies
            });
            wx.stopPullDownRefresh();
            setTimeout(()=>{
                wx.hideToast();
            },800)
            
        }
    })
  },
  //上拉加载  监听滚动条到底部触发该函数
  onReachBottom:function(){
    var that = this;
    console.log(this.data.getData)
    if(this.data.getData){
        this.data.page +=10;
        console.log(this.data.page)
        wx.request({
            url:'https://m.maoyan.com/movie/list.json?type=hot&offset='+that.data.page+'&limit=10',
            success:function(res){
                console.log(res);
                var moreMovie = res.data.data.movies;
                console.log(moreMovie)
                var alMovies = that.data.movies;
                that.setData({
                  movies:alMovies.concat(moreMovie)
                })
                if(!res.data.data.hasNext){
                    that.setData({
                        getData:false
                    })
                }
            },
            fail:function(){
                wx.showToast({
                    title:'加载失败',
                    icon:'loading',
                    duration:500
                })
            }
        })
    }else{
        wx.showToast({                   
            title:'已经没用更多内容了',
            icon:'loading',
            duration:500
        })
    }
    
  },
  onLoad:function(){
    var that = this

    wx.request({
        url:"https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=10",
        success:function(res){
            console.log(res.data.data.movies);
            that.setData({
                movies:res.data.data.movies
            });
            wx.stopPullDownRefresh();
        }
    })
  },
  getStart:function(x){
    return new Array(x);
  }
 
})
