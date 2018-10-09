import firebase from 'firebase';

var config = {

};

firebase.initializeApp(config);
var fs = firebase.firestore();

const settings = {timestampsInSnapshots: true};
fs.settings(settings);

export const firestore = fs;
export const firebaseAuth = firebase.auth();
export const storage = firebase.storage().ref();