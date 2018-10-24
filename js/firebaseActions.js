var fireBase = initializeFirebase();
var db = fireBase.database();
var auth = fireBase.auth();
var storage = fireBase.storage();
function initializeFirebase() {
    var config = {
        apiKey: "AIzaSyCr0TcwSGW9uAMRneRfvIs6Imgrzul9gHI",
        authDomain: "visualcvmaker.firebaseapp.com",
        databaseURL: "https://visualcvmaker.firebaseio.com",
        projectId: "visualcvmaker",
        storageBucket: "visualcvmaker.appspot.com",
        messagingSenderId: "131749292182"
    };
    firebase.initializeApp(config);
    return firebase;
}

function uploadDataToDb(uid, data) {
    db.ref(`/users/${uid}`).set(data);

}


function getDataByUserId(uid) {
    return new Promise((resolve, reject) => {
        db.ref(`/users/${uid}`)
            .once("value", function (snapshot) {
                resolve(snapshot.val());
            }, function (errorObject) {
                reject(errorObject.message)
            })
    })

}

function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                resolve()
            })
            .catch((error) => {
                reject(error)
            })

    })

}

function checkIfLoggedIn() {
    return auth.currentUser;
}
function logOut() {
    auth.signOut()
}

function registerUser(email, password) {

    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                resolve(userData.user.uid)
            })
            .catch((error) => {
                reject(error)
            });
    })

}

function sendEmailVerification() {
    return new Promise((resolve, reject) => {
        auth.currentUser.sendEmailVerification()
            .then(() => {
                resolve(true)
            })
            .catch(() => {
                reject(error)
            })
    })

}


function sendPasswordReset(email) {
    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email).then(() => {
            resolve(true)
        }).catch(function (error) {
            reject(error);
        });
    })
}

function updateUserProfile(displayName, photoUrl) {
    return new Promise((resolve, reject) => {
        var user = auth.currentUser;
        user.updateProfile({
            displayName: displayName,
            photoURL: photoUrl
        }).then(() => {
            resolve(true)
        }).catch((error) => {
            reject(error)
        });
    })
}

function updateUserPassword(newPassword) {
    var user = auth.currentUser;
    user.updatePassword(newPassword)
        .then(function () {
            alert("updated");
        }).catch(function (error) {
            alert("error");
        });
}

function verifyPasswordResetCode(code) {
    return new Promise((resolve, reject) => {
        auth.verifyPasswordResetCode(code)
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

function resetPassword(actionCode, newPassword) {
    return new Promise((resolve, reject) => {
        auth.confirmPasswordReset(actionCode, newPassword)
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

function verifyMail(actionCode) {
    return new Promise((resolve, reject) => {
        auth.applyActionCode(actionCode)
            .then(() => {
                resolve(true)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function uploadToStorage(file) {

    var uid = auth.currentUser.uid;
    var fileExt = file.name.split(".").pop()
    ref = storage.ref(`/profile/${uid}.${fileExt}`);
    return new Promise((resolve, reject) => {
        ref.put(file)
            .then((snapshot) => snapshot.ref.getDownloadURL())
            .then((url) => resolve(url))
            .catch((error) => reject(error));
    })
}

