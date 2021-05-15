<template >
  <div >
    <el-container >

      <el-header height="20%" class="center" style="display: flex;justify-content: center;flex-wrap: wrap;width: 100%">
        <div class="left"> <a href="/Home"><img  :src="imageUrl" width="160px"  ></a></div>
        <el-divider content-position="center" >重置密码</el-divider>
      </el-header>

      <el-main>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >

          <div class="center">



            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="新密码"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
            </el-form-item>


            <el-form-item prop="status">
              <JcRange v-model="ruleForm.status"  :success-fun="scs"></JcRange>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">重置密码</el-button>
<!--              <el-button @click="resetForm('ruleForm')">重置</el-button>-->
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
  name: 'Reset',

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
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
        password: '',
        checkPass: '',
        status: false
      },
      rules: {
        password: [
          {validator: validatePass, trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        status: [{ validator: checkStatus, trigger: "change" }],

      }
    };
  },

  methods: {
    scs(){
      this.ruleForm.status=true;
    },
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.ruleForm.username=sessionStorage.getItem('userName')
          axios.post('http://localhost:8181/user/updatePasswordByUserName',this.ruleForm).then((resp) => {
            if(resp.data !== null){
              this.$message.success({
                message: "重置密码成功",
                showClose: true
              });
              window.sessionStorage.clear();
              this.$router.push("/Login")
            }else {
              this.$message.error('提交失败');
            }

          })


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
