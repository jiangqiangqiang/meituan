<template>
  <div class="operationParty">
    <div class="find_main">
      <div class="key">起点</div>
      <div class="inputMain">
        <input placeholder="中关村软件园" v-model="address" :id="id" @keyup="inputKeyup" @blur="inputBlur" @focus="inputFocus"/>
        <div class="bottom" @click="sure">确定</div>
      </div>
    </div>
    <div class="addressMain1 find" :id="findMapList">
      <div class="address" v-for="l in addressList" @click="getDetail(l)">{{l.province}}{{l.city}}{{l.district}}{{l.business}}{{l.street}}{{l.streetNumber}}  </div>
    </div>
    <div class="addressMain">
      <div class="address">123</div>
      <div class="address">123</div>
      <div class="address">123</div>
      <div class="address">123</div>
      <div class="address">123</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        "addressList":[],
        "address":""
      }
    }
    ,
    props: {	//里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
      id: "",
      findMapList: "",
      getMapStartVal:""
    }
    ,
    methods:{
      inputKeyup(){
        var id = this.findMapList;
        if (this.addressList.length == 0){
          $("#"+id).height("0px");
          setTimeout(()=>{
            $("#"+id).hide();
          },500)
        }else{
          $("#"+id).show().height($("#"+id).next().height());
        }
      },
      inputBlur(){
        $("#"+this.findMapList).height("0px");
        setTimeout(()=>{
          $("#"+this.findMapList).hide();
        },500)
      },
      inputFocus(){
        if (this.addressList.length != 0){
          $("#"+this.findMapList).show().height($("#"+this.findMapList).next().height());
        }
      },
      getDetail(l){
        this.address = l.province+""+l.city+""+l.district+""+l.business+""+l.street+""+l.streetNumber;
      },
      sure(){
        this.$emit("getMapVal",this.address)
      }
    },
    mounted() {
      let self = this;
      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
          "input": self.id,
          onSearchComplete: function (r) {
            self.addressList = r.Br;
            if (document.getElementsByClassName("tangram-suggestion-main") != undefined) {
              $(".tangram-suggestion-main").hide();
            }
          }
        });

    }
  }
</script>

<style scoped lang='css'>
  @import "../../assets/css/TakeATaxiByDiDi.css";
</style>
