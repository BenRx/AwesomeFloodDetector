import FirebaseStoreSingleton from '../Stores/FirebaseStore'

class EventsDataController {
    constructor() {
        this.firebaseStore = FirebaseStoreSingleton.getInstance();
    }

    subscribeToEvents(subscriptionCallback) {
        this.firebaseStore.subscribeOnData("floods", subscriptionCallback);
    }

    unsubscribeToEvents(ref) {
        this.firebaseStore.unsubscribeOnData(ref);
    }
}

export default EventsDataController