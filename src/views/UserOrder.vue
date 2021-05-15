<template>
  <div>
    <el-table :data="productList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              :default-sort = "{prop: 'productList', order: 'descending'}"
              :header-cell-style="thStyleFun" :cell-style="cellStyleFun">
      <el-table-column prop="id" label="订单编号" width="100" sortable></el-table-column>
      <el-table-column label="图片" width="120">
        <template slot-scope="scope">
          <img v-bind:src="scope.row.imgsrc" height="80px;"/>
        </template>
      </el-table-column>
      <el-table-column prop="bookname" label="书名" width="120"></el-table-column>

      <el-table-column prop="price" label="单价" width="80" sortable></el-table-column>

      <el-table-column prop="num" label="数量" width="80" sortable></el-table-column>

      <el-table-column label="小计" width="80" >
        <template slot-scope="scope">
          {{scope.row.price*scope.row.num}}
        </template>
      </el-table-column>

      <el-table-column prop="address" label="收货地址" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="100"></el-table-column>
      <el-table-column prop="ordertime" label="下单时间" width="100" sortable></el-table-column>


      <el-table-column prop="orderstate"  label="订单状态" width="80">
      </el-table-column>




      <el-table-column fixed="right" label="操作" width="230">
        <template slot-scope="scope">


        <span @click="pay(scope.row)">
          <el-button type="primary" size="small"   @click="drawer = true" plain>支付</el-button>
        </span>

          <el-button type="danger" size="small"  @click="cancel(scope.row)" plain>取消</el-button>
          <el-button type="danger" size="small"  @click="deleterBook(scope.row)">删除</el-button>
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

    <div class="right">
      <el-button type="danger" size="medium" icon="el-icon-delete" @click="dialogDeleteAll">清空</el-button>
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
</template>

<script>
export default {
  name: "UserOrder",
  data(){
    return{
      order:{},
      orderstate:[],
      currentPage:1, //初始页
      pagesize:5,    //    每页的数据
      drawer: false,
      direction: 'rtl',
      total: 0,
      // total_num:0,
      productList: [],
      img: '',
      userid:'',
    }

  },
  methods:{
    thStyleFun() {
      return 'text-align:center'
    },
    cellStyleFun() {
      return 'text-align:center'
    },
    orderstates(){
      let orderstate=[];
      this.productList.forEach(function(item, index){
        if(item.orderstate==='0'){
          orderstate[index]='未支付'
          item.orderstate=orderstate[index]
        }
        if(item.orderstate==='1'){
          orderstate[index]='已支付'
          item.orderstate=orderstate[index]
        }
      })
      this.orderstate=orderstate

    },
    cancel(row){
      this.order.id=row.id
      this.order.orderstate=0
      axios.post('http://localhost:8181/userorder/updateOrderStateById/',this.order).then((resp) => {

        this.findAll()
      })
    },
    pay(row){
      this.order.id=row.id
      this.order.orderstate=1
      axios.post('http://localhost:8181/userorder/updateOrderStateById/',this.order).then((resp) => {

        this.findAll()
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    dialogDeleteAll(){

      // console.log(this.userid)

      let promise3 = axios.delete('http://localhost:8181/userorder/deleteAllById/'+this.userid).then((resp) => {

        this.$message({
          message: '清空成功',
          type: 'success',
        });


      })
    },
    deleterBook(row){

      axios.delete('http://localhost:8181/userorder/deleteById/'+row.id).then((resp)=>{
        this.$message({
          message: '删除成功',
          type: 'success',
        });
        this.findAll()

      })
    },
    findAll(){
      this.userid = window.sessionStorage.getItem('userId')

      let promise2 = axios.post('http://localhost:8181/userorder/findByuserId/'+this.userid).then((resp) => {

        this.productList=resp.data
        this.orderstates();
        this.productList.orderstate=this.orderstate
        // console.log(this.productList.orderstate)
        // console.log(this.productList)

        // this.userid=window.sessionStorage.getItem('userId')

        // console.log(this.productList)
      })
    }

  },
  created() {
    this.findAll()
  }

}
</script>

<style scoped>

</style>
