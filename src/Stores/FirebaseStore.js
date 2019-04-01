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
        const firebaseStore = new FirebaseStore();
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

    setData(path, data) {
        this.db.ref(path).set(data);
        return data;
    }
    
    getData(path) {
        const docRef = this.db.ref(path);
        return docRef.once('value');
    }

    updateData(path, data) {
        const docRef = this.db.ref(path);
        docRef.update(data);
    }
    
    subscribeOnData(path, callback) {
        const docRef = this.db.ref(path);
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