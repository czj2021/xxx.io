<template>
  <div>
    <el-container>
      <el-header height="20%" class="center" style="display: flex;justify-content: center;flex-wrap: wrap;width: 100%">
        <div ><a href="Home"><img  :src="imageUrl" width="160px" ></a> </div>
        <el-divider content-position="center" >登录</el-divider>
      </el-header>

      <el-main >
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <div class="center">


            <el-form-item label="用户名" prop="username">
              <el-input type="text" maxlength="12" v-model="ruleForm.username" placeholder="用户名" ></el-input>

            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>

            <el-form-item prop="status">
              <JcRange v-model="ruleForm.status" :success-fun="scs"></JcRange>
            </el-form-item>


            <el-form-item><a href="Retrieve" class="right">找回密码？</a><br>
              <div class="right"><a href="Register">没有账号？立即注册>></a></div><br>
              <el-button type="primary" @click="yklogin" plain>游客进入</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-main>
    </el-container>
    <el-divider content-position="right"></el-divider>
    <el-header  class="center"><el-link disabled class="center">联系邮箱:944453040@qq.com</el-link></el-header>

  </div>
</template>
<script>
import JcRange from '../components/JcRange'
import ys from './ys.css'
// import imageUrl from '../assets/logo.png'
export default {
  name: 'Login',

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const checkStatus = (rule, value, callback) => {
      // console.log(value);
      if (!value) {
        return callback(new Error("请拖动滑块完成验证"));
      } else {
        callback();
      }
    };
    return {
      user:{},
      ys,
      imageUrl:'./static/images/logo.png',
      ruleForm: {
        username: '',
        password: '',
        status: false
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        status: [{ validator: checkStatus, trigger: "change" }]
      }
    };
  },

  methods: {
    scs(){
      this.ruleForm.status=true;
    },
    yklogin(){
      this.$router.push('/Home')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交逻辑
          axios.post('http://localhost:8181/user/findPassword/',this.ruleForm).then((resp)=>{
            // console.log(resp.data)
            if(resp.data===true&&resp.data!==null){
              this.$message.success({
                message:"登录成功",
                showClose:true
              });
              window.sessionStorage.setItem("userName",this.ruleForm.username);
              window.sessionStorage.setItem("userToken",this.ruleForm.username);
              // this.$store.dispatch("setUser",this.ruleForm.username);
              // this.$store.dispatch("setToken",this.ruleForm.token);

              // console.log(this.$store.state.isLogin)
              this.$router.push({path:'/Home'})
            }else {
              this.$message.error('用户名或密码错误');
            }
          })
        } else {
          // console.log('error submit!!');
          this.$message.error('登录失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

  components: {
    JcRange
  }
}
</script>

<style scoped>
.bgimg{
  /*background-image: url('/static/images/bgimg.jpg');*/
  /*width: 79%;*/
  /*height: 500px;*/
  /*background-repeat:no-repeat;*/
  /*!*background-attachment: fixed;*!*/
  /*margin: 0 auto;*/
}

</style>
