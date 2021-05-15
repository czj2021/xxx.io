<template>
  <div style="background-color: #eeeeee">
    <el-main>
      <!--      <el-page-header @back="goBack" content="收货地址">-->
      <!--      </el-page-header>-->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :default-sort = "{prop: 'tableData', order: 'descending'}" style="width: 100%"
        :header-cell-style="thStyleFun" :cell-style="cellStyleFun">
        <el-table-column prop="id" label="收货地址编号" width="180" sortable></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="收货地址" >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号" >
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)" plain></el-button>
            <el-button type="danger" icon="el-icon-delete" circle  @click="deleteBook(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>

      <div class="right"> <el-button type="primary" round plain @click="addform">添加收货地址</el-button></div>
      <!-- 修改的对话框 -->
      <el-dialog
        title="修改收货地址"
        :visible.sync="editDialogVisible"
        width="50%" @close="editDialogClosed">
        <el-form :model="editForm"  ref="editForm"  label-width="150px" :rules="rules">
          <el-form-item label="收货地址编号" prop="id">
            <el-input v-model="editForm.id"disabled ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="address">
            <el-input v-model="editForm.address"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>

          <el-form-item>
            <div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialog('editForm')" plain>修 改</el-button>
        </span></div>
          </el-form-item>


        </el-form>


      </el-dialog>

      <!-- 添加的对话框 -->
      <el-dialog
        title="添加收货地址"
        :visible.sync="addDialogVisible"
        width="50%" @close="addDialogClosed" >
        <el-form :model="addForm"  ref="addForm" label-width="150px" :rules="rules">
          <!--        <el-form-item label="id" prop="id">-->
          <!--          <el-input v-model="addForm.id"  disabled></el-input>-->
          <!--        </el-form-item>-->
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="address">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialog('addForm')">添 加</el-button>
      </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "Address",
  data(){
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'));
      } else {
        callback();
      }
    };
    const validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入地址'));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        callback();
      }
    };
    return{
      currentPage:1, //初始页
      pagesize:5,    //    每页的数据
      id:'',
      userid:'',
      tableData:[],
      editForm: {},
      addForm:{
        name:'',
        address:'',
        phone:'',
        userid:'',
      },
      editDialogVisible: false,
      addDialogVisible:false,
      rules:{
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'},
          {validator: validateName, trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入收货地址',trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'},
          {validator: validateAddress, trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 11, max: 11,message: '手机号长度为11位',trigger: 'blur'},
          {validator: validatePhone, trigger: 'blur'}
        ],
      },

    }
  },
  methods:{
    thStyleFun() {
      return 'text-align:center'
    },
    cellStyleFun() {
      return 'text-align:center'
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    addform(){
      this.addDialogVisible = true

    },
    addDialog(addForm){
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.addDialogVisible = false
          this.addForm.userid=window.sessionStorage.getItem('userId')
          axios.post('http://localhost:8181/address/saveAll',this.addForm).then((resp)=>{

            // console.log(this.addForm)
            if(resp!==null){
              this.$message.success({
                message:"添加成功",
                showClose:true
              });
              // this.$router.go(0)
            }
          })
        }else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editDialog(editForm){
      this.$refs[editForm].validate((valid) => {
          if (valid) {
      this.editDialogVisible = false
      // console.log(this.userid)
      this.editForm.userid=window.sessionStorage.getItem('userId')


      axios.post('http://localhost:8181/address/updateAllById',this.editForm).then((resp)=>{


        if(resp!==null){
          this.$message.success({
            message:"修改成功",
            showClose:true
          });
          // this.$router.go(0)
        }

      })
          }else {
            console.log('error submit!!');
            return false;
          }
      });

    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    edit(row){
      this.editDialogVisible = true

      axios.post('http://localhost:8181/address/findById/'+row.id).then((resp)=>{
        this.editForm = resp.data
        // console.log(this.editForm )
      })


      // axios.put('http://localhost:8181/address/updateAllById',this.tableData).then((resp)=>{
      //   // console.log(this.ruleForm)
      //   if(resp!==null){
      //     this.$message.success({
      //       message:"修改成功",
      //       showClose:true
      //     });
      //   }
      // })
    },
    deleteBook(row){
      axios.delete('http://localhost:8181/address/deleteAllById/'+row.id).then((resp)=>{

        this.$message({
          message: '删除成功',
          type: 'success'
        });
        // this.$router.go(0)
      })
    },
    goBack(){
      this.$router.push('/UserPage')
    },
  },
  created(){

    this.userid=window.sessionStorage.getItem('userId')
    let promise2 = axios.post('http://localhost:8181/address/findByuserId/'+this.userid).then((resp) => {
      this.tableData=resp.data

      // console.log(resp.data)

    })
  }
}
</script>

<style scoped>


</style>
