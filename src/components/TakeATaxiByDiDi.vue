<template>
  <div>
    <div class="customerService">
      <div class="menu_main">
        <div class="dialog_top_party">
          <div class="dialog_menu">
            <div class="dialog_menu_top">
              <div class="content">客服系统</div>
            </div>
            <div class="dialog_menu_lists">
              <div class="dialog_menu_list">
                <i></i>
                <div class="shop_main">
                  <div class="img"></div>
                  <div class="content">呜呼啦呼</div>
                </div>
              </div>
              <div class="dialog_menu_list Hover">
                <i></i>
                <div class="shop_main">
                  <div class="imgH"></div>
                  <div class="content">呜呼啦呼</div>
                </div>
              </div>
              <div class="dialog_menu_list">
                <i></i>
                <div class="shop_main">
                  <div class="img"></div>
                  <div class="content">呜呼啦呼</div>
                </div>
              </div>
              <div class="dialog_menu_list">
                <i></i>
                <div class="shop_main">
                  <div class="img"></div>
                  <div class="content">呜呼啦呼</div>
                </div>
              </div>
              <div class="dialog_menu_list">
                <i></i>
                <div class="shop_main">
                  <div class="img"></div>
                  <div class="content">呜呼啦呼</div>
                </div>
              </div>
              <div class="dialog_menu_list">
                <i></i>
                <div class="shop_main">
                  <div class="img"></div>
                  <div class="content">呜呼啦呼</div>
                </div>
              </div>
              <div class="dialog_menu_list">
                <i></i>
                <div class="shop_main">
                  <div class="content">当前等待人数</div>
                  <div class="content">20人</div>
                </div>
              </div>
            </div>
            <div class="sysName">
              <i></i>
              <div class="sysNameMian">
                <div class="logo">
                  <img src="../assets/img/didi/didiIcon.png"/>
                </div>
                <div class="content">滴滴TV客服系统</div>
                <div class="content">V1.0</div>
              </div>
            </div>
          </div>
          <div class="dialog_top_party_main">
            <div class="dialog_top_party_top">
              <div class="name">巴啦啦小魔仙</div>
              <div class="dialog_type">关闭订单</div>
            </div>
            <div class="dialog_content_main">
              <div class="null_order" style="display: none;">
                <div class="null_order_content">
                  暂无信息
                </div>
              </div>
              <div class="dialog_lists">
                <div class="dialog_tittle">8:30:15 开始点餐</div>
                <div class="dialog_customer">
                  <div class="headLogo"></div>
                  <div class="dialog_content">
                    <div class="phonetics">
                      <div class="phoneticsMain">
                        <span class="nomal"></span>
                      </div>
                    </div>
                    <div class="words">
                      愛神的箭
                    </div>
                  </div>
                </div>
                <div class="dialog_xiaomanniu">
                  <div class="dialog_content">
                    <div class="words">阿斯蒂芬</div>
                  </div>
                  <div class="headLogo"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_top_party">
          <div class="partyRight">
            <div class="mapMain">
              <div class="map">
                <div class="null_order" style="display: none;">
                  <div class="null_order_content">
                    <p>暂时木有人打车</p>
                    <p>休息一下吧～</p>
                  </div>
                </div>
                <MapView :longitude="longitude" :latitude="latitude" :startAddress="startVal" :endAddress="endVal"
                         ref="mapFun"></MapView>
              </div>
              <div class="searchMain">
                <div class="inputMain">
                  <div class="name">起点:</div>
                  <div class="value">{{startVal}}</div>
                </div>
                <div class="inputMain">
                  <div class="name">终点:</div>
                  <div class="value">{{endVal}}</div>
                </div>
                <div class="bottom">确定</div>
              </div>
            </div>
            <div class="now_customer">当前用户：巴啦啦小魔仙</div>
            <div class="operationMain">
              <FindMap :id="mapId" :findMapList="findMapId" v-on:getMapVal="getMapStartFun"></FindMap>
              <FindMap :id="mapId1" :findMapList="findMapId1" v-on:getMapVal="getMapEndFun"></FindMap>
              <div class="operationParty">
                <div class="find_main">
                  <div class="key">姓名/昵称</div>
                  <div class="inputMain">
                    <input placeholder=""/>
                    <div class="bottom">确定</div>
                  </div>
                </div>
                <div class="find_main">
                  <div class="key">电话</div>
                  <div class="inputMain">
                    <input placeholder=""/>
                    <div class="bottom">确定</div>
                  </div>
                </div>
                <div class="addressMain">
                  <div class="address">预计金额:&nbsp&nbsp120元/未知</div>
                  <div class="address">预计时间:&nbsp&nbsp1小时22分钟/未知</div>
                </div>
                <div class="sureMain">
                  <div class="sure">确定/开始打车</div>
                  <div class="close">取消订单</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="login_main" v-show="loginBombFlag">
      <i></i>
      <div class="loginMain">
        <div class="logo">
          <img src="../assets/img/didi/didiIcon.png"/>
        </div>
        <div class="content">滴滴TV客服系统V1.0</div>
        <div class="inputMain">
          <div class="input_key">账号:</div>
          <div class="input_value">
            <input v-model="login_account" type="text" placeholder="请输入账号"/>
          </div>
        </div>
        <div class="inputMain">
          <div class="input_key">密码:</div>
          <div class="input_value">
            <input v-model="login_pwd" type="password" placeholder="请输入密码"/>
          </div>
        </div>
        <div class="buttom_main">
          <div class="close" @click="login_close">取消</div>
          <div class="close" @click="login_submit">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MapView from './assembly/Map.vue'
  import FindMap from './assembly/FindMapByKey.vue'
  import http from '../assets/js/base/http.js'
  import {
    checkVal,
    checkPass,
    setCookie,
    getCookie,
  } from '../assets/js/base/reg.js'
  export default {
    data() {
      return {
        longitude: 116.404,
        latitude: 39.915,
        loginBombFlag: true,
        mapId: "suggestId",
        mapId1: "suggestId1",
        findMapId: "searchResultPanel",
        findMapId1: "searchResultPanel1",
        endVal: "",
        startVal: "",
        login_account: "",
        login_pwd: ""
      }
    },
    methods: {
      getMapStartFun(val) {
        this.startVal = val;
        this.getMapFun();
      },
      getMapEndFun(val) {
        this.endVal = val;
        this.getMapFun();
      },
      getMapFun() {
        if (this.startVal && this.endVal) {
          this.$refs.mapFun.$emit("bridge", this.startVal, this.endVal);
        }
      },
      login_close() { //清空登录信息
        this.login_account = "";
        this.login_pwd = "";
      },
      layerToast(val) { //弹框
        this.$layer.toast({
          content: val,
          time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
        })
      },
      checkVal(val) { //判断是否为空
        if (val == "" || val == null || val == undefined) return false;
        return true;
      },
      async login_submit() { //登录操作
        if (!this.checkVal(this.login_account)) {
          this.layerToast("请输入账号");
          return;
        }
        if (!this.checkVal(this.login_pwd)) {
          this.layerToast("请输入账号");
          return;
        }
        let params = {
          login: this.login_account,
          password: this.login_pwd
        };
        this.$layer.loading('登录中...');
        let data = await http.post('/user/login', params);
        this.$layer.close();
        if (data.code == "0000") {
          sessionStorage.setItem("loginUserDiDi", true);
          sessionStorage.setItem("loginUserDiDiId", data.data.useId);
          setCookie("loginImf", JSON.stringify({
            "name": this.login_account,
            "pwd": this.login_pwd
          }));
          this.loginBombFlag = false;
          this.initWebSocket(data.data.useId);
        } else {
          this.layerToast(data.desc);
        }
      },
      initWebSocket(id) { //初始化weosocket
        // const wsUrl = "ws://47.92.93.152:8000/v1/cs/wmelody"; //ws地址
        const wsUrl = "ws://192.168.1.234:8000/v1/cs/wmelody/"+id; //ip
        this.websock = new WebSocket(wsUrl);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        this.dialogList = [];
      },
      websocketonmessage(e) { //数据接收
        const redata = JSON.parse(e.data);
        console.log(redata);
      },
      websocketclose(e) { //关闭

      }

    },
    components: {
      MapView,
      FindMap
    },
    mounted() {
      if (sessionStorage.getItem("loginUserDiDi")) {
        var loginObj = JSON.parse(getCookie("loginImf"));
        this.login_account = loginObj.name;
        this.login_pwd = loginObj.pwd;
        this.login_submit();
      }else {
        this.initWebSocket();
      }
    }
  }
</script>
<style scoped lang='css'>
  @import "../assets/css/TakeATaxiByDiDi.css";
</style>
