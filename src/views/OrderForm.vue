<template>
  <div style="background-color: #eeeeee"><br>
<!--    <el-page-header @back="goBack" title="返回首页">-->
<!--    </el-page-header>-->
<div>
    <el-header style="height: auto">
      <div class="address">
        <span style="font-size: 18px">收货地址</span>

        <div class="address-panel">

          <div v-for="address in addresses" :key="address.id" class="address-panel-block"
               :class="{checked:selectedAddress.id===address.id}" @click="changeAddress(address)"
               style="justify-content: space-between">
            <div class="dis-col">
              <span class="address-panel-block-item">收货人：{{ address.name }}</span>
              <span class="address-panel-block-item">收货地址：{{ address.address }}</span>
              <span class="address-panel-block-item">手机号：{{ address.phone }}</span>
            </div>
            <div style="height: 20px;align-self: flex-end">
              <el-button type="text" class="address-panel-block-item" @click="editAddress(address)">修改</el-button>
              <el-button type="text" class="address-panel-block-item" @click="deleteAddress(address)">删除</el-button>
            </div>
          </div>

          <div class="address-panel-block center-center" @click="addAddressDialogFormVisible=true">
            <span style="font-size: 30px"><i class="el-icon-plus"></i></span>
            添加新地址
          </div>

        </div>

      </div>
    </el-header>
</div>

    <el-container>

      <el-main>
        <el-table :data="productList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :header-cell-style="thStyleFun" :cell-style="cellStyleFun">
          <el-table-column prop="" label="" width="180"></el-table-column>
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <img v-bind:src="scope.row.imgsrc" height="80px;"/>
            </template>
          </el-table-column>
          <el-table-column prop="bookname" label="书名" width="180"></el-table-column>

          <!--      <el-table-column prop="author" label="作者" width="180"></el-table-column>-->
          <!--      <el-table-column prop="publish" label="出版社" width="180"></el-table-column>-->
          <el-table-column prop="price" label="单价" width="180"></el-table-column>
          <!--          <el-table-column prop="num" label="数量" width="250">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :max="10" label="计数器"></el-input-number>-->
          <!--            </template>-->
          <!--          </el-table-column>-->

          <el-table-column prop="num" label="数量" width="180"></el-table-column>

          <el-table-column label="小计" width="180">
            <template slot-scope="scope">
              {{scope.row.price*scope.row.num}}
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="deleterBook(scope.row)" type="danger" size="small" >删除</el-button>
            </template>
          </el-table-column>

          <!--          <el-table-column fixed="right" label="操作" width="150">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button @click="edit(scope.row)" type="warning" size="small" plain>修改</el-button>-->
          <!--              <el-button @click="deleteBook(scope.row)" type="danger" size="small" >删除</el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="productList.length">
        </el-pagination>

      </el-main>

    </el-container>
    <div class="right">应付金额：{{total}}
      <!--      <el-button @click="deleteBook" type="danger" size="small" >删除订单</el-button>-->

<!--      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;" >支付</el-button>-->
      <el-button type="primary" plain @click="success">提交订单</el-button>
      <el-button type="danger" size="medium" @click="deleteBook" icon="el-icon-delete">清空订单</el-button>


      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="false">
        <div>

          <span>请扫一扫下方的二维码支付</span><br><br>
          <div class="center"><img src="static/images/logo.png" width="80%" ></div></div>
      </el-drawer>

    </div>
    <div>
      <!--      <img  :src="circleUrl" width="80px"  >-->

    </div>
    <!--地址编辑对话框-->
    <el-dialog title="编辑收货地址信息" :visible.sync="editAddressDialogFormVisible">

      <el-form :model="editAddressData"  ref="editAddressData">


        <el-form-item label="收货人" prop="name">
          <el-input v-model="editAddressData.name"></el-input>
        </el-form-item>

        <el-form-item label="收货地址" prop="address">
          <el-input v-model="editAddressData.address" clearable></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editAddressData.phone" clearable></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editAddressDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAddress">确 定</el-button>
      </div>
    </el-dialog>
    <!--地址添加对话框-->
    <el-dialog title="添加收货地址信息" :visible.sync="addAddressDialogFormVisible">

      <el-form :model="addAddressData" ref="addAddressData">

        <el-form-item label="收货人" prop="name">
          <el-input v-model="addAddressData.name"></el-input>
        </el-form-item>

        <el-form-item label="收货地址" prop="address">
          <el-input v-model="addAddressData.address" clearable></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addAddressData.phone" clearable></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addAddressDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAddress('addAddressData')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'OrderForm',
  data() {
    return {
      gettime:'',//当前时间
      editAddressDialogFormVisible: false,
      addAddressDialogFormVisible: false,
      addresses: [],
      addAddressData: {},
      selectedAddress: {},
      editAddressData: {},
      currentPage:1, //初始页
      pagesize:5,    //    每页的数据
      drawer: false,
      direction: 'rtl',
      total: 0,
      // total_num:0,
      productList: [],
      img: '',
      userid:'',
      num:0,
    }
  },
  computed: {},
  components: {},
  methods: {
    thStyleFun() {
      return 'text-align:center'
    },
    cellStyleFun() {
      return 'text-align:center'
    },
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
    findAddress(){
      let promise3 = axios.post('http://localhost:8181/address/findByuserId/'+this.userid).then((resp) => {

        this.addresses = resp.data
        this.selectedAddress = this.addresses[0]
      })
    },
    updateAddress(){
      console.log(this.editAddressData)
      axios.post('http://localhost:8181/address/updateAllById/',this.editAddressData).then((resp) => {

        this.$message.success('修改成功');
        this.editAddressDialogFormVisible = false
      })
    },
    addAddress(form) {
      this.$refs[form].validate((valid) => {
          if (valid) {

            this.addAddressData.userid=sessionStorage.getItem('userId')
            console.log(this.addAddressData.userid)
            axios.post('http://localhost:8181/address/saveAll/',this.addAddressData).then((resp) => {

              this.$message.success('添加成功');
              this.addAddressDialogFormVisible = false
              this.findAddress()
            })

          }
      })
    },
    editAddress(address) {
      this.editAddressData = address
      this.editAddressDialogFormVisible = true

    },

    deleteAddress(address) {

      let promise4 = axios.delete('http://localhost:8181/address/deleteAllById/' + address.id).then((resp) => {
        this.$message.success('删除成功');
        this.findAddress()
      })
    },
    changeAddress(address) {
      this.selectedAddress = address
      // console.log(this.selectedAddress)
      // this.findAddress()
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    success(){
      // this.totalNum()
      // console.log(this.productList.num)
      // console.log(this.selectedAddress)



      axios.post('http://localhost:8181/userorder/saveAllList/',this.productList).then((resp)=>{


        if(resp.data.length!==0) {
          this.selectedAddress.ordertime=this.gettime
          console.log(this.selectedAddress.ordertime)
          axios.post('http://localhost:8181/userorder/updateAddressById/',this.selectedAddress).then((resp)=>{})
          this.$router.push('/Success')
          let promise4 = axios.delete('http://localhost:8181/orderform/deleteAllById/' + this.userid).then((resp) => {

          })


        }else{
          this.$message({
            message: '数据为空',
            type: 'warning',
          });
        }

      })

    },
    deleterBook(row){
      console.log(row)
      axios.delete('http://localhost:8181/orderform/deleteById/'+row.id).then((resp)=>{
        this.$message({
          message: '删除成功',
          type: 'success',
        });
        //   this.$message({
        //     message: '删除成功',
        //     type: 'success'
        //   });
      })
    },
    goBack() {
      this.$router.push('/Home')
    },
    deleteBook() {
      let promise3 = axios.delete('http://localhost:8181/orderform/deleteAllById/' + this.userid).then((resp) => {

        this.$message({
          message: '清空订单成功',
          type: 'success',
        });

      })
    },
    handleChange() {
      // console.log(this.productList);
      this.totalPrice();
    },
    totalPrice() {
      let total = 0;
      this.productList.forEach(p => {
        total += p.price * p.num;
      })
      // console.log(total);
      this.total = total;

    },
    totalNum() {
      let total = 0;
      this.productList.forEach(p => {
        total +=--p.num;
      })
      // console.log(total);
      this.productList.num = total;

    }

  },
  created() {
    // let total = 0;
    // this.productList.forEach(p => {
    //   total=p.num;
    // })
    // // console.log(total);
    // this.total = total;
    // console.log(this.productList)
    // this.id=this.$route.params.id
    // console.log(this.id)

    this.userid = window.sessionStorage.getItem('userId')

    let promise2 = axios.post('http://localhost:8181/orderform/findByuserId/'+this.userid).then((resp) => {

      this.productList=resp.data
      // this.userid=window.sessionStorage.getItem('userId')
      this.totalPrice();
      // console.log(this.productList)
    })

    this.findAddress();
    this.currentTime();





  },
  // let total_num=0;
  // total_num = (resp.data.price) * (resp.data.num);
  // console.log(resp.data.price);


  // this.starts=(Date.parse(new Date())/1000)-Number(this.total_num);

  // console.log(this.productList)


  // let promise = axios.post('http://localhost:8181/detail/findById/1').then((resp) => {
  //   this.productList = resp.data
  //   // console.log( resp.data)
  //   console.log( this.productList)
  // })


}
</script>

<style>
.checked {
  background: #ffe2df;
  border: 1px solid #409EFF ;
}
.address {
  background-color: #fff;
  padding: 20px;
}
.address-panel {
  display: flex;
  margin-top: 10px;
}
.address-panel-block {
  border: 1px #DCDFE6 solid;
  margin-right: 10px;
  width: 200px;
  height: 125px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.dis-col {
  display: flex;
  flex-direction: column;
}
.address-panel-block-item {
  margin: 5px;
}
.center-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
