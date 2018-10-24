var LOCAL_STORAGE = {
    getUserId:function () { 
        return localStorage.getItem(USER_ID);
    },
    getTemplateId: function(){
        return localStorage.getItem(TEMPLATE_ID);
    },
    getCvJsonData: function(){
        return localStorage.getItem(CV_JSON_DATA);
    },
    getCvData: function(){
        return JSON.parse(localStorage.getItem(LOCALSTORAGE_CVDATA_KEY))
    },
    getDummyDataStatus:function(){
        return localStorage.getItem(DUMMY_DATA_EDIT_STATUS);
    },
    getCurrentPage:function(){
        return localStorage.getItem(CURRENT_PAGE);
    },
    getAuthActionCode:function(){
        return localStorage.getItem(AUTH_ACTION_CODE);
    },
    setDatainLocalStorage:function(key,value){
        localStorage.setItem(key,value)
    },
    removeItemFromLocalStorage:function(key){
        localStorage.removeItem(key);
    }
}

