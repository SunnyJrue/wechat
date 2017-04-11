Page({
    data:{
        arr:[1,2,3,4,5,6,7]
    },
    addNum:function(){
        this.data.arr.push(11)
        // console.log(aa)
        this.setData({
           arr:this.data.arr
        })
        console.log(this.data.arr)
    }
})