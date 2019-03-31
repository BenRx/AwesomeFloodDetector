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
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
              successCallback(user)
            } else {
                this.ui.start(id, {
                    callbacks: {
                        signInSuccessWithAuthResult: result => {
                            successCallback(result.user)
                        }
                    },
                    signInOptions: [
                        Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    ],
                });        
            }
          });
          
    }
    
    getData(path) {
        let docRef = this.db.ref(path);
        return docRef.once('value');
    }
    
    subscribeOnData(path, callback) {
        let docRef = this.db.ref(path);
        docRef.on('value', snapshot => {
            let dataTab = [];
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