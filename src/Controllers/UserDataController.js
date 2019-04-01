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
        return this.firebaseStore.updateData(`users/${user.uid}`, user);
    }
    
    tryToRecoverUser(fireUser, callback) {
        this.getUser(fireUser.uid).then(user => {
            if (!user.val()) {
                console.log(`User: ${fireUser.uid} doest not exist, creating a new one...`);
                const newUser = this.createUser({uid: fireUser.uid, favList: [], displayName: fireUser.displayName, photoURL: fireUser.photoURL});
                callback(newUser);
            } else {
                console.log(`User: ${user.val().uid} already exist`);
                callback(user.val());
            }
        });
    }
    
    updateUserFavList(user, sensorID) {
        if (user.favList) {
            const idx = user.favList.indexOf(sensorID)
            if (idx !== -1) {
                user.favList.splice(idx, 1);
            }  else {
                user.favList.push(sensorID);
            }
        } else { 
            user.favList = [sensorID]; 
        }
        this.updateUser(user);
    }
}

export default UserDataController