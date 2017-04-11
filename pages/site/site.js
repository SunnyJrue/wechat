import {obj} from "1.js";

function getType(ele){
    var arr =[];
    for (var i = 0 ; i < ele.seatRows.length ; i++){
        arr[i] = new Array()
        for(var j =0 ; j < ele.seatRows[i].seats.length ; j++){
            arr[i][j] = ele.seatRows[i].seats[j].type;
        }
       
    }
    return arr;
}
Page({
    data:{
        siteMsg:{},
        showInfo:{},
        sections:{},
        selSite:0,
        status:0,
        siteArr:[],
        ticket:[],
        price:0,
        ticketNum:0,
        total:0

    },
    onLoad:function(e){
        console.log(e);
        var that = this;
        console.log(obj);
        if(e){
            var showId = e.showId;
            var showDate = e.showDate;
        }
         
        wx.request({
            url:'https://m.maoyan.com/show/seats?showId='+showId+'&showDate='+showDate,
            // url:'pages/site/1.text',
            method:'GET',
            success:function(res){
                console.log(res)
                var data = res.data;
                // var data = obj;

                that.setData({
                    siteMsg:data,
                    showInfo:data.showInfo,
                    sections:data.sections,
                    price:data.showInfo.price
                });

                wx.showModal({
                  title: '提示',
                  content: data.showInfo.desc,
                  showCancel:false
                  
                })

                

                if(res.data == ""){
                    wx.showToast({
                        title:'获取信息失败',
                        icon:'loading',
                        duration:2000
                    })
                }else{
                   
                    
                    wx.setStorage({
                        key:'site',
                        data:res.data
                    })
                }
            },
            fail:function(){
                wx.showToast({
                    title:'网络连接失败',
                    icon:'loading',
                    duration:2000
                })
            }
        });
        
        var data = wx.getStorageSync('site');
        // console.log(data);
        var arr = getType(data.sections[0]);
        // console.log(arr)
        
        that.setData({
            siteArr:arr,
            siteMsg:data,
            showInfo:data.showInfo,
            sections:data.sections,
            price:data.showInfo.price
        });
        
        wx.setNavigationBarTitle({
            title:data.showInfo.cinemaName
        })

        
    },
    selectSite:function(e){
        // console.log(e)
        
            var column = e.currentTarget.dataset.column;
            var row = e.currentTarget.dataset.row;
            var lengths = e.currentTarget.dataset.lengths;
            var str = (row+1)+'排'+(lengths-column)+'座';
            if(this.data.siteArr[row][column] =='N'){
                if(this.data.ticket.length <= 3){
                    this.data.ticketNum +=1;
                    this.data.siteArr[row][column] = 'SL';
                    
                    this.data.ticket[this.data.ticket.length] = str;
                    var totalPrice = this.data.ticketNum*this.data.price
                    // console.log(this.data.ticket)
                    // console.log(this.data.price,this.data.ticketNum)
                    this.setData({
                        ticket:this.data.ticket,
                        total:totalPrice
                    })
                }else{
                    wx.showToast({
                        title:'最多只能选四张票',
                        icon:'loading',
                        duration:1000
                    })
                }
            }else if(this.data.siteArr[row][column] == 'SL'){
                this.data.siteArr[row][column] = 'N';
                this.data.ticketNum -=1
                var totalPrice = this.data.ticketNum*this.data.price
                for(var i = 0 ; i < this.data.ticket.length; i++){
                    if(this.data.ticket[i] == str){
                      
                        this.data.ticket.splice(i,1)
                    }
                }
                this.setData({
                    ticket: this.data.ticket,
                    total:totalPrice
                })
                
            }
            this.setData({
                siteArr: this.data.siteArr
            })
            // console.log(this.data.siteArr[row][column])

    }
})