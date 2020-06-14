import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB7yEKyi8f_bA2TuzJSNKJiP7uAEuIiI-Q",
    authDomain: "forlogic-a4b41.firebaseapp.com",
    databaseURL: "https://forlogic-a4b41.firebaseio.com",
    projectId: "forlogic-a4b41",
    storageBucket: "forlogic-a4b41.appspot.com",
    messagingSenderId: "1069650638141",
    appId: "1:1069650638141:web:734ffn15abd83b660fd8154"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

// firebase collections
const ClientsCollection = db.collection('clients')
const EvaluationsCollection = db.collection('evaluations')
const LogsCollection = db.collection('logs')


export {
    db,
    auth,
    ClientsCollection,
    EvaluationsCollection,
    LogsCollection
}