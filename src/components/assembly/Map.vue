<template>
  <div id="l-map" :style="style"></div>
</template>
<script>
  export default {
    data() {
      return {
        style: {
          width: '100%',
          height: this.height
        }
      }
    }
    ,
    props: {	//里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
      height: {
        type: String,
        default:
          "100%"
      }
      ,
      longitude: {}
      ,	//定义经度
      latitude: {}	//定义纬度

    }
    ,
    methods:{
      getMap(addressStart,addressEnd){
        var map = new BMap.Map("l-map");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
        map.enableScrollWheelZoom(true); //设置鼠标放大
        var transit = new BMap.DrivingRoute(map, {
          renderOptions: {
            map: map,
            panel: "r-result",
            autoViewport:true,
            enableDragging : false //起终点可进行拖拽
          },
        });
        transit.search(addressStart,addressEnd);
        // transit1.search("龙泽地铁站","北京西站");
      }
    },
    mounted() {
      this.$on('bridge',(start,end)=>{
        this.getMap(start,end);
      });
      // this.getMap();
    }
  }
</script>
