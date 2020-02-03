<template>
     <div id="app">
         <el-row>
             <el-col :span="12" >
                <!-- 按钮 -->
                <div>
                <el-button type="primary" size="small" @click="handlerToAdd">添加</el-button>
                <el-button type="danger" size="small">批量删除</el-button>
                </div> 
                <!-- /按钮 -->
            </el-col>
            <el-col :span="12" style="text-align:right">
            <!-- 搜索栏 -->
            <el-form :inline="true">
                <el-form-item label="姓名" >
                    <el-input size="small" v-model="params.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="headlerSearch">查询</el-button>
                </el-form-item>
            </el-form>
            <!--  /搜索栏-->
         </el-col>
         </el-row>
         <!-- 表格 -->
         <div>
             <el-table :data="productList.list">
                 <el-table-column type="selection" width="50"></el-table-column>
                 <el-table-column prop="id" width="180" label="产品ID"></el-table-column>
                 <el-table-column prop="name" width="180" label="产品名称"></el-table-column>
                 <el-table-column prop="price" width="180" label="产品单价"></el-table-column>
                 <el-table-column prop="status" width="180" label="状态"></el-table-column>
                 <el-table-column prop="categoryId" width="180" label="所属分类"></el-table-column>
                 <el-table-column label="图片">
                     <template v-slot="slot">
                         <img width="100%" :src="slot.row.photo" alt="图片找不到">
                     </template>
                 </el-table-column>
                 <el-table-column label="操作" width="180" align="center">
                     <template>
                         <a href="">删除</a>&nbsp;
                         <a href="">修改</a>&nbsp;
                         <a href="" @click.prevent="toDetailsHandler">详情</a>&nbsp;
                     </template>
                 </el-table-column>
             </el-table>
         </div>
         <!-- /表格 -->
         <!-- 分页 -->
         <el-pagination
             layout="prev, pager, next"
             :total="productList.total"
             :page-size="params.pageSize"
             :current-page="params.page"
             @current-change="handlerPageChange">
         </el-pagination>
         <!-- /分页 -->
         <!-- 模态框 -->
        <el-dialog :title="title" :visible="visible" @close="closeModal">
            {{product}}
            <el-form :model="product"
                    label-width="80px"
                    label-position="left"
                    >
                <el-form-item label="产品名称" prop="name">
                    <el-input v-model="product.name" ></el-input>
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input v-model="product.price" ></el-input>
                </el-form-item>
                <el-form-item label="所属栏目">
                    <el-select v-model="product.categoryId" placeholder="请选择">
                        <el-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="product.description"></el-input>
                </el-form-item>
                <el-form-item label="照片" >
                    <!-- 上传插件 -->
                    <el-upload
                    class="upload-demo"
                    action="https://134.175.154.93:8099/manager/file/upload"
                    :file-list="fileList"
                    list-type="picture"
                    :on-success="uploadSuccessHandler">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <!-- /上传插件 -->
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button size="small" @click="closeModal">取消</el-button>
                <el-button size="small" type="primary" @click="handlerSubmit('productForm')">提交</el-button>
            </div>
        </el-dialog>
         <!-- /模态框 -->
     </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return {
            name:"产品管理",
            params:{
                page:0,
                pageSize:5
            },
            product:{},
            rules:{},
            fileList:[]
        }
    },
    methods:{
         ...mapActions("product",["openModal","closeModal"]),
        ...mapActions("product",{
            queryProduct:"query",
            saveOrUpdateProduct:"saveOrUpdate"
        }),
        ...mapActions("category",{
            findAllCategory:"findAll"
        }),
        ...mapMutations('app',["select"]),
        //分页
        handlerPageChange(page){
            this.params.page=page-1;
            this.queryProduct(this.params)
        },
        //查询功能
        headlerSearch(){
            this.queryProduct(this.params);
        },
        //产品信息提交
        handlerSubmit(formName){
            // this.$refs[formName].validate((valid)=>{
            //     if(valid){
            //         this.saveOrUpdateProduct(this.product).then(()=>{
            //             this.queryProduct(this.params);
            //             this.$notify({
            //                 title:"success",
            //                 type:"success",
            //                 message:this.message
            //             })
            //         })
            //     }else{
            //         return false
            //     }
            // })
            this.saveOrUpdateProduct(this.product).then(()=>{
                        this.queryProduct(this.params);
                        this.$notify({
                            title:"success",
                            type:"success",
                            message:this.message
                        })
                    })
        },
        //添加按钮
        handlerToAdd(){
            this.openModal();
            this.findAllCategory();
        },
        //图片上传成功处理函数
        uploadSuccessHandler(response,file,fileList){
            let id=response.data.id;
            this.product.photo="https://134.175.154.93:8888/group1/"+id;
            this.fileList=fileList1;
        },
        //详情页面
        toDetailsHandler(){
            this.select("5")
        }
    },
    computed:{
        ...mapState("product",["visible","title","message"]),
        ...mapState("product",{
            productList:"list"
        }),
        ...mapState("category",{
            categoryList:"list"
        })
    },
    created(){
        this.queryProduct(this.params);
    }
}
</script>
<style scoped>

</style>