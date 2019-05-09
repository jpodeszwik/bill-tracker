import {auth, db} from "./firebase";
import {firestore} from "firebase";

export interface Activity {
  name: string,
  uid: string,
}

export const addActivity = (activityName: string): Promise<firestore.DocumentReference | null> => {
  let currentUser = auth.currentUser;
  if (currentUser === null) {
    return Promise.resolve(null);
  }

  const activity: Activity = {name: activityName, uid: currentUser.uid};

  return db.collection('activities').add(activity);
};

export const listActivities = (cb: (activities: Activity[]) => void): () => void => {
  let currentUser = auth.currentUser;
  if (currentUser === null) {
    return () => {
    };
  }

  return db.collection('activities')
    .where('uid', '==', currentUser.uid)
    .onSnapshot(next => {
      const docs = next.docs;
      const activities: Activity[] = docs.map(doc => <Activity>doc.data());
      cb(activities)
    });
};
