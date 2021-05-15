<template >
  <div >
    <el-container >

      <el-header height="20%" class="center" style="display: flex;justify-content: center;flex-wrap: wrap;width: 100%">
        <div class="left"> <a href="/Home"><img  :src="imageUrl" width="160px"  ></a></div>
        <el-divider content-position="center" >找回密码</el-divider>
      </el-header>

      <el-main>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >

          <div class="center">

            <el-form-item label="用户名" prop="username" >
              <el-input type="text" maxlength="12" v-model="ruleForm.username" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone" >
              <el-input type="text"  v-model="ruleForm.phone" placeholder="手机号"></el-input>
            </el-form-item>

            <el-form-item label="验证码" prop="code" >
              <el-input type="text"  v-model.number="ruleForm.code" placeholder="验证码">
                <el-button @click="yzm()" plain slot="append">发送验证码</el-button>
              </el-input>
            </el-form-item>

            <el-form-item prop="status">
              <JcRange v-model="ruleForm.status"  :success-fun="scs"></JcRange>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button @click="fh">返回</el-button>
              <!--              <el-button @click="yzusername">11</el-button>-->
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
// import imageUrl from '../assets/logo.png'
import ys from './ys.css'


export default {
  name: 'Retrieve',

  data() {
    const code = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'));
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
      imageUrl:'./static/images/logo.png',
      ys,
      codes:'',
      fphone:'',
      fusername:null,
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        phone:'',
        status: false
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 11, max: 11,message: '手机号长度为11位',trigger: 'blur'}
        ],
        status: [{ validator: checkStatus, trigger: "change" }],
        code:[{validator:code,trigger:'blur'}]

      }
    };
  },

  methods: {
    fh(){
      this.$router.push('/Login')
    },
    yzm(){
      if(this.ruleForm.phone){
        axios.post('http://localhost:8181/user/isRetrieve/'+this.ruleForm.phone).then((resp) => {
          this.yzusername()
          if(this.fusername===true){
            if (resp.data===false) {
              this.$message.error('手机号不存在！');
            } else {
              this.sphone = resp.data
              console.log(this.sphone)
              axios.post('http://localhost:8181/user/sdk/' + this.ruleForm.phone).then((resp) => {

                this.codes = resp.data
                this.$message.success('发送成功')
                this.fphone = this.ruleForm.phone
                console.log(resp.data)
              })
            }
          }else{
            this.$message.error('用户名不存在！');
          }
        })
      }else{
        this.$message.warning('发送失败')
      }

    },
    scs(){
      this.ruleForm.status=true;
    },
    yzusername(){
      this.usernames=this.ruleForm.username
      axios.post('http://localhost:8181/user/isRegistered/'+this.ruleForm.username).then((resp) => {
        this.fusername=resp.data
        console.log(this.fusername)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (this.ruleForm.code === this.codes && this.fphone === this.ruleForm.phone
            &&this.usernames===this.ruleForm.username) {

            this.$message.success({
              message: "验证成功",
              showClose: true
            });
            window.sessionStorage.setItem("userName", this.ruleForm.username);
            window.sessionStorage.setItem("userToken", this.ruleForm.username);
            this.$router.push({path: '/Reset'})
          } else {
            this.$message.error('验证失败');
          }
        }
        else {
          console.log('error submit!!');
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
  background-image: url('/static/images/bgimg.jpg');
  width: 79%;
  height: 500px;
  background-repeat:no-repeat;
  /*background-attachment: fixed;*/
  margin: 0 auto;
}
</style>
