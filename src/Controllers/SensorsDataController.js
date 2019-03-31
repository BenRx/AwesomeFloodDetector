import FirebaseStoreSingleton from '../Stores/FirebaseStore'

class SensorsDataController {
    constructor() {
        this.firebaseStore = FirebaseStoreSingleton.getInstance();
    }

    getSensorsHistory() {
        return this.firebaseStore.getData("sensors_history");
    }

    getSensorHistory(sID, resultCallback) {
        this.firebaseStore.getData(`sensors_history/${sID}`).then(snapshot => {
            resultCallback(snapshot.val());
        });
    }

    subscribeToSensorsUpdates(subscriptionCallback) {
        this.firebaseStore.subscribeOnData("sensors", subscriptionCallback);
    }

    unsubscribeToSensorsUpdates(ref) {
        this.firebaseStore.unsubscribeOnData(ref);
    }
}

export default SensorsDataController