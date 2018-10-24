auth.onAuthStateChanged(function (user) {
    if (user) {
        $(".login")[0].style.display = "none";
        $(".logout")[0].style.display = "block";
        $(".myprofile")[0].style.display = "block";
        if(DP){
            uploadToStorage(DP)
                .then((url) => {
                    var img = document.getElementById("display-picture");
                    img.src = url;
                    USER_CV_DATA["display-picture"] = img.src
                    LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA));
                })
        }
        else{
            
        }

    } else {
        $(".login")[0].style.display = "block";
        $(".logout")[0].style.display = "none";
        $(".myprofile")[0].style.display = "none";
    }
});

window.onload = function () {  
    handleUrl(location.href)
    LOCAL_STORAGE.setDatainLocalStorage(CURRENT_PAGE, "selectTemplate.html")
    if (!LOCAL_STORAGE.getCvData()) {
        var json = $.getJSON("./data.json", function (data) {
            LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(data));
            CV_JSON_DATA = data;
        })
        LOCAL_STORAGE.setDatainLocalStorage(DUMMY_DATA_EDIT_STATUS, true);
    }
    else {
        CV_JSON_DATA = LOCAL_STORAGE.getCvData();
    }
}


function setLayout(id) {
    LOCAL_STORAGE.setDatainLocalStorage(TEMPLATE_ID, id);

    USER_CV_DATA = CV_JSON_DATA[getRootKey()];
    $("#loadLayout").load("./views/editTemplate.html", function () {
        loadLayout()
            .then(() => {
                LOCAL_STORAGE.setDatainLocalStorage(CURRENT_PAGE, "editTemplate.html")
                populateData(USER_CV_DATA);
                addEventListeneronEditable();

            })
    })
}

function handleUrl(url) {
    var params = getUrlParams(url)
    if (Object.keys(params).length == 0) {
        var urlParts = url.split("/");
        var navigate = urlParts.pop()
        var urlToOpen = urlRedirect[navigate]
        if(url.includes("template")){
            urlRedirect["userCv"](urlParts[urlParts.length-1],navigate);
        }     
        else if (urlRedirect[navigate]) {
            urlToOpen()
        } else {
            urlRedirect.landing();
        }
    }
    else {
        urlRedirect[params.mode](params.oobCode);
    }
}

function getUrlParams(url) {
    var params = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        params[key] = value;
    });
    return params;
}

var urlRedirect = {
    login: showLoginForm,
    register: showRegisterForm,
    selectTemplate: showSelectTemplate,
    forgetPassword: showForgetPasswordForm,
    resetPassword: showResetPasswordForm,
    checkout: showCheckout,
    landing:showLandingPage,
    userCv:function(){
        urlRedirect.selectTemplate();
    },
    verifyEmail: function (actionCode) {
        verifyMail(actionCode)
            .then(() => {
                animateNotification(notification.email_verification_success_message, notification.type_success, 2);
                urlRedirect.selectTemplate();
            })
            .catch((error) => {
                animateNotification(notification.failed_link_message, notification.type_error, 2);
                urlRedirect.selectTemplate();
            })
    }

}

function showLoginForm() {
    if (!LOCAL_STORAGE.getUserId()) {
        $("#loadLayout").load("./views/login.html")
        window.history.pushState({}, "Login", "login")
        return;
    }
    else {
        urlRedirect.selectTemplate();
    }


}


function showRegisterForm() {
    if (!LOCAL_STORAGE.getUserId()) {
        $("#loadLayout").load("./views/register.html")
        window.history.pushState({}, "register", "register")
    }
    else {
        urlRedirect.selectTemplate();
    }
}

function showForgetPasswordForm() {
    if (!LOCAL_STORAGE.getUserId()) {
        $("#loadLayout").load("./views/forgetPassword.html")
        window.history.pushState({}, "ForgetPassword", "forgetPassword")
    }
    else {
        urlRedirect.selectTemplate();
    }

}

function showSelectTemplate() {
    LOCAL_STORAGE.setDatainLocalStorage(CURRENT_PAGE, "selectTemplate.html")
    $("#loadLayout").load("./views/selectTemplate.html")
    window.history.pushState({}, "SelectTemplate", "selectTemplate")
}

function showLandingPage(){
    $("#loadLayout").load("./views/landing.html")
}
function showResetPasswordForm(actionCode) {
    verifyPasswordResetCode(actionCode)
        .then(() => {
            $("#loadLayout").load("./views/resetPassword.html")
            window.history.pushState("", "ResetPassword", "resetPassword")
            LOCAL_STORAGE.setDatainLocalStorage(AUTH_ACTION_CODE, actionCode)
            if (!LOCAL_STORAGE.getCvData()) {
                var json = $.getJSON("./data.json", function (data) {
                    LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(data));
                    CV_JSON_DATA = data;
                })
                LOCAL_STORAGE.setDatainLocalStorage(DUMMY_DATA_EDIT_STATUS, true);
            }
        })
        .catch((error) => {
            urlRedirect.login();
            animateNotification(notification.failed_link_message, notification.type_error, 3)
        })

}


function showCheckout() {
    LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA))
    if (checkIfLoggedIn()) {
        uploadDataToDb(LOCAL_STORAGE.getUserId(), LOCAL_STORAGE.getCvData())
        $.getScript(`./js/checkout.js`)
        $(".paypal-button-layout-horizontal").remove()
        // $("#checkout").removeAttr("onclick")
        processPayment();
        window.history.pushState("", "checkout", "checkout");
    }
    else {
        $("#loadLayout").load("./views/login.html");
        window.history.pushState("", "login", "login");
    }
}



