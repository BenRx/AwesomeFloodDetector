import FirebaseStoreSingleton from '../Stores/FirebaseStore'

class UserDataController {
    constructor() {
        this.firebaseStore = FirebaseStoreSingleton.getInstance();
    }

    createUser(user) {
        return this.firebaseStore.setData(`users/${user.uid}`, user);
    }

    getUser(userID) {
        return this.firebaseStore.getData(`users/${userID}`);
    }

    updateUser(user) {
        return this.firebaseStore.updateData(`users/${user.uid}`);
    }

    tryToRecoverUser(fireUser, callback) {
        this.getUser(fireUser.uid).then(user => {
           if (!user.val()) {
               console.log(`User: ${fireUser.uid} doest not exist, creating a new one...`);
               this.createUser({uid: fireUser.uid, favList: [], displayName: fireUser.displayName, photoURL: fireUser.photoURL}).then(newUser => {
                   callback(newUser);
               });
           } else {
               console.log(`User: ${user.val().uid} already exist`);
               callback(user.val());
           }
        });
    }
}

export default UserDataController