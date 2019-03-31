import Firebase from "firebase";
import firebaseui from 'firebaseui';

var config = {
    apiKey: "AIzaSyBNQXjYM9AMEsSfc8e6DzgYWAkbP9VzKEM",
    authDomain: "river-watcher.firebaseapp.com",
    projectId: "river-watcher",
    databaseURL: "https://river-watcher.firebaseio.com",
};

var FirebaseStoreSingleton = (function () {
    var instance;
 
    function createInstance() {
        var firebaseStore = new FirebaseStore();
        return firebaseStore;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

class FirebaseStore {
    constructor() {
        this.initFirebase();
    }

    initFirebase() {
        Firebase.initializeApp(config);
        this.db = Firebase.database();
        this.ui = new firebaseui.auth.AuthUI(Firebase.auth());
    }
    
    startFirebaseUILogin(id, successCallback) {
        this.ui.start(id, {
            callbacks: {
                signInSuccessWithAuthResult: successCallback
            },
            signInOptions: [
              // List of OAuth providers supported.
              Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
              // firebase.auth.GithubAuthProvider.PROVIDER_ID
            ],
            // Other config options...
          });
    }

    getData(path) {
        var docRef = this.db.ref(path);
        return docRef.once('value');
    }

    subscribeOnData(path, callback) {
        var docRef = this.db.ref(path);
        var dataTab = [];
        docRef.on('value', snapshot => {
            snapshot.forEach(snap => {
                dataTab.push(snap.val());
            });
            callback(docRef, dataTab)
        });
    }

    unsubscribeOnData(ref) {
        ref.off();
    }
}

export default FirebaseStoreSingleton