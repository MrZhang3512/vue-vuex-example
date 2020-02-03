<template>
    <div id="app">
        <!-- 按钮 -->
        <div class="btns">
            <el-button size="small" type="primary" @click="handlerToAdd">添加</el-button>
            <el-button size="small" type="danger" @click="handlerToBatchDel">批量删除</el-button>
        </div>
        <!-- /按钮  -->
        <!-- 表格 -->
        <div class="tabls">
            <el-table 
            :data="list"
            style="width: 100%"
            v-loading="loading"
            @selection-change="handlerSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="realname"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="telephone"
                label="手机号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
            </el-table-column>
            <el-table-column
                label="操作">
                <template v-slot="slot">
                    <a href="" @click.prevent="handlerToDelete(slot.row.id)">删除</a>
                    <a href="" @click.prevent="handlerToEdit(slot.row)">修改</a>
                </template>
            </el-table-column>
            </el-table>
        
        </div>
        <!-- /表格 -->
        <!-- 模态框 -->
        <el-dialog :title="title" :visible="visible" @close="handlerClose">
            <el-form :model="customer"
                    label-width="80px"
                    label-position="left"
                    :rules="rules" 
                    ref="customerForm">
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="customer.realname" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="customer.password" ></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="customer.telephone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button size="small" @click="handlerClose">取消</el-button>
                <el-button size="small" type="primary" @click="handlerSubmit('customerForm')">提交</el-button>
            </div>
        </el-dialog>
        <!-- /模态框 -->
     </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return {
            title:"添加顾客信息",
            customer:{},
            rules:{
                realname:[
                    {required:true,message:"请输入姓名",trigger:"blur"},
                    {min:2,max:6,message:"姓名的字数应该为2到6位",trigger:"blur"}
                ],
                password:[
                    {required:true,message:"请输入密码",trigger:"blur"},
                    {min:6,message:"密码应该不小于6位",trigger:"blur"}
                ],
                telephone:[
                    {required:true,message:"请输入手机号",trigger:"blur"},

                ]
            },
            ids:[]  
        }
    },
    methods:{
        // ...mapActions("customer",["closeModal","openModal","saveOrUpdate"]),
        ...mapActions("customer",{
            closeModal:"closeModal",
            openModal:"openModal",
            saveOrUpdateCustomer:"saveOrUpdate",
            findAllCustomer:"findAll",
            deleteustomerById:"deleteById",
            deleteByBatchCustomer:"deleteByBatchId"}),
        handlerClose(){
            // this.$store.dispatch("customer/closeModal")
            this.closeModal();
        },
        handlerToAdd(){
            this.customer=[];
            this.title="添加顾客信息"

            //  this.$store.dispatch("customer/openModal")
            this.openModal();
        },
        handlerToEdit(row){
            this.title="修改顾客信息"
            this.$refs.customerForm.resetFields();
            this.customer=row;
            this.openModal();
        },
        handlerSubmit(formName){
            //在提交之前先去执行校验操作
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    //如果校验通过
                    this.saveOrUpdateCustomer(this.customer).then(()=>{
                    this.$notify({
                        title:"success",
                        type:"success",
                        message:this.message
                })
            })
                }else{
                    return false;
                }
            });
            
        },
        handlerToDelete(id){
            this.deleteustomerById(id).then(()=>{
                this.$notify({
                    title:"success",
                    type:"success",
                    message:this.message
                })
            })
        },
        //获取批量删除所需要的参数id
        handlerSelectionChange(val){
            //将数组中的id拿出来
            this.ids=val.map(item=>item.id);
        },
        //批量删除
        handlerToBatchDel(){
            this.deleteByBatchCustomer(this.ids).then(()=>{
                this.$notify({
                    title:"删除成功",
                    type:"success",
                    message:"this.message"
                })
            })
        }
    },
    computed:{
        ...mapState("customer",["list","visible","loading","message"])
        // list(){
        //     return this.$store.state.customer.list;
        // },
        // visible(){
        //     return this.$store.state.customer.visible;
        // }
    },
    created(){
         this.findAllCustomer()
    }
}
</script>
<style scoped>

</style>