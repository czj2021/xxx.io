<template>
  <div style="background-color: #eeeeee">
<!--    <el-page-header @back="goBack"  title="返回首页">-->
<!--    </el-page-header>-->
    <el-container>
      <el-main>
        <el-table :data="productList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :header-cell-style="thStyleFun" :cell-style="cellStyleFun">
<!--          <el-table-column prop="id" label="id" width="180"></el-table-column>-->
          <el-table-column label="" width="180"></el-table-column>
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <img v-bind:src="scope.row.imgsrc" height="80px;"/>
            </template>
          </el-table-column>
          <el-table-column prop="bookname" label="书名" width="180"></el-table-column>

          <!--      <el-table-column prop="author" label="作者" width="180"></el-table-column>-->
          <!--      <el-table-column prop="publish" label="出版社" width="180"></el-table-column>-->
          <el-table-column prop="price" label="单价" width="100"></el-table-column>
          <el-table-column prop="num" label="数量" width="250">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" @change="handleChange(scope.row)" :min="1" :max="productList.num" label="计数器"></el-input-number>
            </template>
          </el-table-column>


          <el-table-column label="小计" width="180">
            <template slot-scope="scope">
              {{scope.row.price*scope.row.num}}
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="AddBook(scope.row)" type="primary" size="small" >加入订单</el-button>
              <el-button @click="deleteBook(scope.row)" type="danger" size="small" >删除</el-button>
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
          :total="productList.length">
        </el-pagination>

      </el-main>
    </el-container>

    <div class="right">总价：{{total}}
      <el-button type="primary" @click="clickCart"  plain>结算</el-button>
      <el-button type="danger" size="medium" icon="el-icon-delete" @click="dialogDeleteAll">清空购物车</el-button>
    </div>


  </div>
</template>

<script>

export default {
  name:'Cart',
  data(){
    return {
      currentPage:1, //初始页
      pagesize:5,    //    每页的数据
      id:'',
      total:0,
      total_num:0,
      productList:[],
      img:'',
      userid:'',
    }
  },
  computed:{

  },
  components: {

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
    goBack(){
      this.$router.push('/Home')
    },
    dialogDeleteAll(){

      // console.log(this.userid)

      let promise3 = axios.delete('http://localhost:8181/cart/deleteAllById/'+this.userid).then((resp) => {


          this.$message({
            message: '清空购物车成功，返回首页',
            type: 'success',
          });

          this.$router.push("/Home")



      })
    },
    clickCart(){


      // this.productList.total=this.total
      axios.post('http://localhost:8181/orderform/saveAllList/',this.productList).then((resp)=>{

        if(resp.data.length!==0) {
          this.$message({
            message: '结算成功，请到订单查看',
            type: 'success'
          });
          let promise4 = axios.delete('http://localhost:8181/cart/deleteAllById/' + this.userid).then((resp) => {
            this.findAll()
          })

        }else{
          this.$message({
            message: '数据为空',
            type: 'warning',
          });
        }


      })



    },
    AddBook(row){
      console.log(row)
      axios.post('http://localhost:8181/orderform/saveAll/',row).then((resp)=>{

        this.$message({
          message: '加入订单成功，请到订单查看',
          type: 'success'
        });

      })
    },
    deleteBook(row){
      axios.delete('http://localhost:8181/cart/deleteById/'+row.id).then((resp)=>{
        this.$alert('《'+row.bookname+'》删除成功！', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          }
        })
        //   this.$message({
        //     message: '删除成功',
        //     type: 'success'
        //   });
      })
    },
    handleChange(row){

      let promise1 = axios.post('http://localhost:8181/booksrc/findByBookname/'+row.bookname).then((resp) => {
        if(row.num<=resp.data.nums){
          let promise2 = axios.post('http://localhost:8181/cart/save/',row).then((resp) => {

          })
        }else{
          this.$message.warning('选择数量应小于等于库存量');
          row.num=resp.data.nums
        }
      })


      // let promise3 = axios.post('http://localhost:8181/orderform/saveAll/',row).then((resp) => {
      //
      //     })

      this.totalPrice();
    },
    totalPrice(){
      let total = 0;
      this.productList.forEach(p=>{
        total += p.price * p.num;
      })
      // console.log(total);
      this.total = total;

    },
    findAll(){
      this.userid = window.sessionStorage.getItem('userId')
      let promise1 = axios.post('http://localhost:8181/cart/findByuserId/'+this.userid).then((resp) => {

        this.productList=resp.data
        // console.log(this.productList)

        // console.log(this.productList)


        this.totalPrice();
        // let total_num=0;
        // total_num = (resp.data.price) * (resp.data.num);
        // console.log(resp.data.price);



        // this.starts=(Date.parse(new Date())/1000)-Number(this.total_num);

        // console.log(this.productList)

      })
    }

  },
  created (){
    this.findAll()
  },

}
</script>

<style scoped>

</style>
