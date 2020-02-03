import {post,get,post_array} from '../http'
export default{
    namespaced:true,
    state:{
        name:"customer",
        list:[],
        message:"",
        visible:false,
        loading:true
    },
    getters:{

    },
    mutations:{
        //重置List
        resetList(state,list){
            state.list=list;
        },
        //重置message
        resetMessage(state,message){
            state.message=message;
        },
        //重置visible
        resetVisible(state,visible){
            state.visible=visible;
        },
        //重置loading
        resetLoading(state,loading){
            state.loading=loading;
        }
    },
    actions:{
        //打开模态框
        openModal(context){
            context.commit('resetVisible',true)
        },
        //关闭模态框
        closeModal(context){
            context.commit('resetVisible',false)
        },
        //添加顾客信息
        saveOrUpdate(context,customer){
            return post("customer/saveOrUpdate",customer).then((result)=>{     
                context.commit('resetMessage',result.statusText);
                context.dispatch("findAll");
                context.dispatch("closeModal");
            })
        },
        //通过id删除
        deleteById({dispatch,commit},id){
            return get("/customer/deleteById?id="+id,).then((result)=>{
                commit('resetMessage',result.statusText);
                dispatch("findAll"); 
            })
        },
        //查询所有信息
        findAll(context){
             context.commit('resetLoading',true);
            get("/customer/findAll").then((result)=>{
                //将查询到的数据通过mutation设置到state
                context.commit('resetList',result.data)
            }).finally(()=>{
                context.commit('resetLoading',false)

            })
        },
        //批量删除
        deleteByBatchId({dispatch,commit},ids){
            return post_array("/customer/batchDelete",{ids}).then((result)=>{
                commit('resetMessage',result.statusText);
                dispatch('findAll');
            })
        }
    }
}