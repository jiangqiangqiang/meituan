<template>
  <div>
    <div class="dialog_lists" v-for="l in dialogList">
      <div class="dialog_tittle" v-show="l.audioTittle">{{l.audioTittle}}</div>
      <div class="dialog_customer">
        <div class="headLogo" v-show="l.audioUrl && l"></div>
        <div class="dialog_content">
          <div class="phonetics" v-show="l.audioUrl">
            <div class="phoneticsMain" @click="changeAudio(l,$event)">
              <i class="nomal"></i>
            </div>
          </div>
          <div class="words" v-show="l.audioContent">
            {{l.audioContent}}
          </div>
        </div>
      </div>
      <div class="dialog_xiaomanniu" v-show="l.autoContent">
        <div class="dialog_content">
          <div class="words">{{l.autoContent}}</div>
        </div>
        <div class="headLogo"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    }
    ,
    props: {
      dialogList:[]
    }
    ,
    methods:{
      changeAudio(obj, event) { //语音播放
        $(".phoneticsMain i").removeClass("focus").addClass("nomal");
        let thisEvent = event.target;
        $("audio").remove();
        var srcs = obj.audioUrl, that = $("body"),
          audioWav = '<audio controls="controls" id="audioObj" autobuffer="autobuffer" autoplay="autoplay" hidden>' +
            '<source src="data:audio/wav;base64,' + srcs + '" type="audio/ogg">' +
            '<source src="data:audio/acc;base64,' + srcs + '" type="audio/ogg">' +
            '</audio>';
        /*  var audioMp3 = '<audio controls="controls" id="audioObj" autobuffer="autobuffer" autoplay="autoplay" hidden>' +
            '<source src="data:audio/acc;base64,' + srcs + '" type="audio/ogg">' +
            '</audio>'*/
        // this.myBrowser(that, audioMp3, audioWav, thisEvent);
        that.append(audioWav);
        $(thisEvent).find("i").removeClass("nomal").addClass("focus");
        document.getElementById("audioObj").addEventListener("ended", function () {
          $(thisEvent).find("i").removeClass("focus").addClass("nomal");
        });
      },
      myBrowser(that, audioMp3, audioWav, thisEvent) { //浏览器判断语音播放
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
          //return "Opera"
          that.append(audioWav);
        } //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
          //					return "FF";
          that.append(audioWav);
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
          that.append(audioWav);
          //					return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
          //					return "Safari";
          that.append(audioMp3);
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
          that.append(audioMp3);
          //					return "IE";
        }//判断是否IE浏览器
        $(thisEvent).find("i").removeClass("nomal").addClass("focus");
        var thisObj = document.getElementById("audioObj");
        thisObj.addEventListener("ended", function () {
          $(thisEvent).find("i").removeClass("focus").addClass("nomal");
        });
      },
    },
    mounted() {}
  }
</script>

<style scoped lang='css'>
  @import "../../assets/css/TakeATaxiByDiDi.css";
</style>
