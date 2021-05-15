<template>
  <div >

    <div>
      <el-container>
        <el-header style="height: 20%;background-color: white" >
          <div class="left" >
            <a href="/Home">
              <img  :src="logoUrl" width="80px"  >
            </a>
          </div>
          <div class="right">
            <template v-if="userName===null">
              <el-link type="primary" href="/Login" >登录</el-link>
              <el-link type="primary" href="/Register">注册</el-link>
            </template>
            <template v-else>
              <el-row class="demo-avatar demo-basic">
                <el-col :span="12" >
                  <div class="sub-title"></div>
                  <div class="demo-basic--circle">
                    <div class="block">
                      <a href="/UserPage"> <el-avatar :size="50" :src="circleUrl"></el-avatar></a>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!--              <div>-->
              <!--                <el-table :data="tableData" border style="width: 100%">-->
              <!--                  <el-table-column prop="avatar"  width="100">-->
              <!--                    <template slot-scope="scope">-->
              <!--                      <el-avatar :size="50" :src="scope.row.avatar" class="el-avatar">-->
              <!--                      </el-avatar>-->
              <!--                    </template>-->
              <!--                  </el-table-column>-->
              <!--                </el-table>-->
              <!--              </div>-->

              <el-link type="success" disabled>欢迎你{{userName}}</el-link>
              <el-link type="primary" @click="clear">退出</el-link>
              <el-link type="primary" href="/UserPage" >个人中心</el-link>
              <el-link type="primary" href="/OrderForm">订单</el-link>
              <!--              <el-badge class="mark" :hidden="0" :value="1">-->
              <el-link type="primary" href="/Cart" >购物车</el-link>
              <!--              </el-badge>-->
            </template>

          </div>
        </el-header><br><br>

        <el-breadcrumb separator="  |  ">
          <div>
            <el-breadcrumb-item :to="{ path: '/Home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Classify'}">分类</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Ranking'}">排行</el-breadcrumb-item>
<!--            <el-breadcrumb-item :to="{ path: '/Message'}">留言</el-breadcrumb-item>-->
            <br><br>
          </div>
          <div class="ss">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.user" placeholder="请输入搜索内容" prefix-icon="el-icon-search"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-breadcrumb>

      </el-container>

    </div>

    <el-main>
      <router-view></router-view>
    </el-main>

    <el-divider content-position="right"></el-divider>
    <el-header  class="center"><el-link disabled class="center">联系邮箱:944453040@qq.com</el-link></el-header>

    <!--    <el-divider content-position="right"></el-divider>-->

    <!--    <el-divider content-position="right"></el-divider>-->

  </div>

</template>



<script>
import ys from './ys.css'
import imageUrl from '../assets/logo.png'

export default {
  name: "Header",
  ys,imageUrl,

  data() {
    return {
      circleUrl: "./static/images/logo.png",
      logoUrl: "./static/images/logo.png",
      userName:window.sessionStorage.getItem('userName'),
      userId:window.sessionStorage.getItem('userId'),
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
    };
  },

  components: {

  },
  computed:{

  },

  methods: {
    onSubmit() {
      // console.log('submit!');
      if(this.formInline.user===''){
        this.$message({
          message: '输入为空',
          type: 'warning'
        });
      }else {
        this.$router.push('/Search/'+this.formInline.user)
        // this.$router.go(0)
      }

    },
    clear(){
      window.sessionStorage.clear();
      this.$router.push("/Login")
    },

  },

  created:function() {
    let promise=axios.post('http://localhost:8181/user/findAllByUsername/'+this.userName).then((resp)=> {
      // console.log(resp.data)
      window.sessionStorage.setItem("userId",resp.data.id);
      this.circleUrl = resp.data.avatar
      // console.log(this.tableData)
      // this.$store.dispatch("setUser",resp.data.id);
      // console.log(resp.data.id)

    })
  }

}

</script>

<style scoped>

</style>
