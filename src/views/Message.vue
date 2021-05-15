<template>
  <div>

    <el-header>
      <el-container>
        <!--        <template>-->
        <!--          <el-row class="demo-avatar demo-basic">-->
        <!--            <el-col :span="12" >-->
        <!--              <div class="sub-title"></div>-->
        <!--              <div class="demo-basic&#45;&#45;circle">-->
        <!--                <div class="block">-->
        <!--                  <a href="/UserPage"> <el-avatar :size="50" :src="circleUrl"></el-avatar></a>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </el-col>-->
        <!--          </el-row>-->
        <!--        </template>-->
      </el-container>
    </el-header>
    <el-main style="width: 50%;margin: 0 auto">
      <el-form ref="form" :model="form" label-width="80px" >

        <el-form-item label="留言：">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-rate v-model="form.value" :colors="colors" show-text>
          </el-rate>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      circleUrl: "./static/images/logo.png",
      userName:window.sessionStorage.getItem('userName'),
      form: {
        desc:'',
        value: null,
      },
      ruleform:{},
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  },
  created:function() {

  }
}
</script>

<style scoped>

</style>
