var notification = {
    layout: `<div class="notification alert col-6 col-md-3" id="notification">
                <p id="success_text"></p>
                <p id="error_text"></p>
            </div>`,
    login_success_message: "<strong>Success!</strong> Welcome to CvMaker!",
    logout_success_message: "<strong>Logged Out</strong> Thanks for visiting CvMaker!",
    type_success: "success",
    type_error: "error",
    register_success_message: "<strong>Successfully Registered!</strong> Please check mail for verification link.",
    reset_mail_success_message: "<strong>Reset link Sent Successfully! </strong> Please reset password and login!",
    reset_password_success_message: "<strong>Password reset successful! please Login</strong>",
    failed_link_message: "<strong>Snap! Link expired. Please regenerate link</strong>",
    email_verification_success_message: "<strong>Email successfully verified!<strong>"
}


function handleLogin() {
    var emailElement = document.getElementById("userEmail");
    var passwordElement = document.getElementById("userPassword");
    var email = emailElement.value;
    var password = passwordElement.value;
    var errorSpan = document.getElementById("login-error");

    var badRegisterationFlag = false;
    badRegisterationFlag = performValidations(emailElement, passwordElement, errorSpan);
    if (badRegisterationFlag)
        return;
    errorSpan.innerHTML = "Please Wait..."
    $(errorSpan).removeClass().addClass("alert alert-primary col-12 col-md-6 mb-4 d-inline-block")
    loginUser(email, password)
        .then((data) => {
            errorSpan.innerHTML = "";
            $(errorSpan).removeClass();
            var uid = checkIfLoggedIn().uid;
            var rootKey = getRootKey();
            LOCAL_STORAGE.setDatainLocalStorage(USER_ID, uid)
            if (rootKey !== uid) {
                var tempData = {}
                tempData[uid] = CV_JSON_DATA[rootKey];
                CV_JSON_DATA = tempData;
                LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA))
            }
            return uid;
        })
        .then((uid) => {
            animateNotification(notification.login_success_message, notification.type_success, 1);
            handleAfterLoginData(uid)
        }).catch((error) => {
            errorSpan.innerHTML = error.message;
            $(errorSpan).removeClass().addClass(" alert alert-danger col-12 col-md-6 mb-4 text-center d-inline-block")
        })


}

function handleRegister() {
    var emailElement = document.getElementById("userEmail");
    var passwordElement = document.getElementById("userPassword");
    var email = emailElement.value;
    var password = passwordElement.value;
    var badRegisterationFlag = false;
    var errorSpan = document.getElementById("register-error");
    badRegisterationFlag = performValidations(emailElement, passwordElement, errorSpan);
    if (badRegisterationFlag)
        return;
    errorSpan.innerHTML = "Please Wait..."
    $(errorSpan).removeClass().addClass("alert alert-primary col-12 col-md-6 mb-4 d-inline-block")
    registerUser(email, password)
        .then((uid) => {
            errorSpan.innerHTML = "";
            $(errorSpan).removeClass();
            sendEmailVerification()
                .then(() => {
                    LOCAL_STORAGE.setDatainLocalStorage(USER_ID, uid)
                })

            choosePageToLoad()

            animateNotification(notification.register_success_message, notification.type_success, 3);
        })
        .catch((error) => {
            errorSpan.innerHTML = error.message;
            $(errorSpan).removeClass().addClass("alert alert-danger col-12 col-md-6 mb-4 d-inline-block")
        })
}

function handleLogout() {
    logOut();
    LOCAL_STORAGE.removeItemFromLocalStorage(USER_ID)
    LOCAL_STORAGE.setDatainLocalStorage(DUMMY_DATA_EDIT_STATUS, true)
    animateNotification(notification.logout_success_message, notification.type_success, 1)

}

function handleForgetPassword() {
    var email = $("#userEmail")[0].value;
    var errorSpan = document.getElementById("forgetPassword-error");
    errorSpan.innerHTML = "Please Wait..."
    $(errorSpan).removeClass().addClass("alert alert-primary col-12 col-md-6 mb-4 d-inline-block")
    sendPasswordReset(email)
        .then(() => {
            showLoginForm();
            animateNotification(notification.reset_mail_success_message, notification.type_success, 2);

        })
        .catch((error) => {
            var errorMessage;
            if (error.code == 'auth/invalid-email') {
                errorMessage = error.message;
            } else if (error.code == 'auth/user-not-found') {
                errorMessage = "No record of user with given email found! Please recheck email id"
            }
            errorSpan.innerHTML = errorMessage;
            $(errorSpan).removeClass().addClass("alert alert-danger col-12 col-md-6 mb-4 d-inline-block")
        })
}

function handlePasswordReset() {
    var errorSpan = document.getElementById("reset-error");
    errorSpan.innerHTML = "Please Wait...";
    $(errorSpan).removeClass().addClass("alert alert-primary col-12 col-md-6 mb-4 d-inline-block");
    var newPassword = $("#newPassword")[0].value;
    resetPassword(LOCAL_STORAGE.getAuthActionCode(), newPassword)
        .then(() => {
            showLoginForm();
            animateNotification(notification.reset_password_success_message, notification.type_success, 2);
        })
        .catch((error) => {
            errorSpan.innerHTML = error.message;
            $(errorSpan).removeClass().addClass("alert alert-danger col-12 col-md-6 mb-4 d-inline-block")
        })
}

function animateNotification(message, type, ttl) {
    $("#notification").remove()
    $("body").append(notification.layout)
    document.getElementById("success_text").innerHTML = message;
    if (type === notification.type_success) {
        $("#notification").addClass("alert-success").show().delay(ttl * 1000).fadeOut();
    }
    else {
        $("#notification").addClass("alert-danger").show().delay(ttl * 1000).fadeOut();
    }
}

function getRootKey() {
    var rootKey;
    var data = LOCAL_STORAGE.getCvData();
    for (var prop in data) {
        rootKey = prop;
    }
    return rootKey;
}

function keepCurrentProgress() {
    var uid = LOCAL_STORAGE.getUserId();
    uploadDataToDb(uid, LOCAL_STORAGE.getCvData())
    setLayout(LOCAL_STORAGE.getTemplateId());
}

function loadPreviousSession() {
    var uid = LOCAL_STORAGE.getUserId();
    getDataByUserId(uid)
        .then((data) => {
            CV_JSON_DATA = data;
            populateData(data[getRootKey()]);
            LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(data));
        })
        .then(() => setLayout(LOCAL_STORAGE.getTemplateId()));
}

function choosePageToLoad() {
    // choose which page to load
    if (LOCAL_STORAGE.getCurrentPage !== EDITOR_LAYOUT_PAGE)
        $("#loadLayout").load("./views/selectTemplate.html");

    else
        setLayout(LOCAL_STORAGE.getTemplateId());
}

function handleAfterLoginData(uid) {
    getDataByUserId(uid)
        .then((data) => {
            if (data && LOCAL_STORAGE.getDummyDataStatus() === "false") {
                var templateId = LOCAL_STORAGE.getTemplateId();
                $("#loadLayout").load("./views/chooseSession.html", function () {
                    $("#thisSession").load(`./templates/${templateId}/${templateId}.html`, function () {
                        loadLayout()
                            .then(() => {
                                populateData(CV_JSON_DATA[getRootKey()]);

                            }).then(() => {
                                // remove button for duplicate and adding sections
                                $(".fa").remove()

                                // removing all ids for avoiding duplicacy
                                $("#thisSession").find("[id]").removeAttr("id")
                            })
                    })
                    $("#oldSession").load(`./templates/${templateId}/${templateId}.html`, function () {
                        loadLayout()
                            .then(() => {
                                populateData(data[uid]);

                            }).then(() => {
                                $(".fa").remove()
                            })
                    })
                })
            }
            else if (data && LOCAL_STORAGE.getDummyDataStatus()) {
                loadPreviousSession();
                choosePageToLoad();
            }
            else {
                uploadDataToDb(uid, LOCAL_STORAGE.getCvData())
                choosePageToLoad();
            }

        })
}

function performValidations(emailElement, passwordElement, errorSpan) {
    email = emailElement.value;
    password = passwordElement.value;
    badRegisterationFlag = false;
    if (email === '') {
        badRegisterationFlag = true;
        errorSpan.innerHTML = 'Fields cannot be empty.';
        $(errorSpan).removeClass().addClass("alert alert-danger col-12 col-md-6 mb-4 d-inline-block");
        emailElement.style.border = '1px solid red';
    } else {
        emailElement.style.removeProperty('border');
        $(errorSpan).removeClass();
        errorSpan.innerHTML = "";

    }

    if (password === '') {
        badRegisterationFlag = true;
        errorSpan.innerHTML = 'Fields cannot be empty.';
        $(errorSpan).removeClass().addClass("alert alert-danger col-12 col-md-6 mb-4 d-inline-block");
        passwordElement.style.border = '1px solid red';
    } else {
        passwordElement.style.removeProperty('border');
        $(errorSpan).removeClass();
        errorSpan.innerHTML = "";
    }

    return badRegisterationFlag;
}