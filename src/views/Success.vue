<template>
<div>
  <el-container>
    <el-main style="color: green;font-size: 30px;margin: 0 auto">
      <div class="center">
      <i class="el-icon-success"></i>提交订单成功！<p>{{gettime}}</p>
      </div>
    </el-main>

    <el-footer><br><br>
      <div class="center" >&#12288;&#12288;&#12288;
      <i class="el-icon-s-home"></i><a href="/Home" style="text-decoration:none">    返回首页</a>
      </div>
    </el-footer>
    <el-header height="100px">
      <el-divider content-position="left"></el-divider>
      <div class="left">
        <div @click="drawer = true">
        <el-button @click="pay" type="primary" style="margin-left: 16px;" >支付</el-button>
        </div>
        <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :direction="direction"
          :with-header="false">
          <div>

            <span>&#12288;&#12288;&#12288;请扫一扫下方的二维码支付</span><br><br>
            <div class="center">
              <img src="static/images/QQ图片20201208163505.png" width="55%" >
              <el-divider></el-divider>
              <img src="static/images/QQ图片20201208163510.jpg" width="55%" >
            </div>
          </div>
        </el-drawer>
      </div>
    </el-header>
  </el-container>
</div>
</template>

<script>
export default {
name: "Success",
  data(){
  return{
    drawer: false,
    direction: 'rtl',
    state:'',
    gettime:'',//当前时间
  }
  },
  methods:{
    getTime:function(){
      const _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    },
    currentTime(){
      setInterval(this.getTime,500)
    },
    pay(){
      this.currentTime();
      console.log(this.gettime)
      // this.order.id=this.$route.params.id
      // this.order.orderstate=1
      // axios.post('http://localhost:8181/userorder/updateOrderStateById/',this.order).then((resp) => {
      //
      // })

    },
  },
  created() {
    this.currentTime();
  }
}
</script>

<style scoped>

</style>
