// firebaseinit
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFJFB8zEr2YmJWCIvBqULqmTDG1-adVlY",
    authDomain: "hackathonbatch7.firebaseapp.com",
    projectId: "hackathonbatch7",
    storageBucket: "hackathonbatch7.appspot.com",
    messagingSenderId: "900761913502",
    appId: "1:900761913502:web:845deb3024c0129d93538f",
    measurementId: "G-NHJ027MGVX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//javascript
let username = document.getElementById("username")
let email = document.getElementById("email")
let password = document.getElementById("passcode")
let confirmpassword = document.getElementById("review-passcode")
let errorvalue = document.getElementById("messagepara")
let db = firebase.firestore()
let heading = document.getElementById("firstheading")

function register() {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user
            console.log(user)
            validation()

            function saveUserInFirestore() {
                // var user = userCredential.user;
                // console.log(user, userCredential);
                db.collection("users").add({
                        email: email.value,
                        userName: username.value,
                        password: password.value,
                        UID: user.uid
                    })
                    .then(() => {
                        console.log("Document written with ID: ", user.uid);
                        window.location = "./login.html";


                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }
            saveUserInFirestore()


            // ...
        })


    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // var errorvalue = document.getElementById("error")
        errorvalue.innerHTML = error
    });
}

function validation() {
    if (username.value === "" || username.value === null) {
        errorvalue.innerHTML = "Error: Username can't be empty !"
    } else if (email.value === "" || email.value === null) {
        errorvalue.innerHTML = "Error:Email can't be empty !"
    } else if (password.value === "") {
        errorvalue.innerHTML = "Error: Password can't be empty !"
    } else if (password.value.length < 6) {
        errorvalue.innerHTML = "Error: you should enter atleast 6 letter !"
    } else if (password.value != confirmpassword.value) {
        errorvalue.innerHTML = "Error: Password must be same !"
    }


}

function login() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)

    .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            window.location = "./home.html"

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            errorvalue.innerHTML = error
        });
}


firebase.auth().onAuthStateChanged((user) => {
    console.log(user, '*********************');
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        fetchUsers();
        // ...
    } else {
        // User is signed out
        // ...

    }
});

function signout() {
    firebase.auth().signOut()
        .then(() => {
            window.location = './index.html';
        })
        .catch(() => {
            errorvalue.innerHTML = error
        })
}


function sendPasswordResetEmail() {
    let emailAddress = email.value;
    firebase.auth().sendPasswordResetEmail(emailAddress)
        .then(() => {
            errorvalue.innerHTML = 'Check your email ';
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            errorvalue.innerHTML = error
        });
}

function fetchUsers() {
    let uid = firebase.auth().currentUser.uid;
    console.log(uid)
}