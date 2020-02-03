export default{
    namespaced:true,

    state:{
        name:"app",
        current:{
            view:"Customer",
            viewName:"顾客管理"
        }
    },
    getters:{

    },
    mutations:{
       resetCurrent(state,view){
            switch(view){
                case "1":
                break;
                case "2":
                    state.current.view="Customer";
                    state.current.viewName="顾客管理";
                    break;
                case "3":
                    state.current.view="Category";
                    state.current.viewName="栏目管理";
                    break;    
                case "4":
                    state.current.view="Product";
                    state.current.viewName="产品管理";
                    break;
                    case "4":
                    state.current.view="ProductDetails";
                    state.current.viewName="产品详情";
                    break;
                }
       }
    },
    actions:{
            select({commit},num){
                commit('resetCurrent',num);
            }
    }
}