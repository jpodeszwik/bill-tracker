import {auth, db} from "./firebase";
import {firestore} from "firebase";

export interface Activity {
  name: string,
  id?: string,
}

export const addActivity = (activityName: string): Promise<firestore.DocumentReference | null> => {
  let currentUser = auth.currentUser;
  if (currentUser === null) {
    return Promise.resolve(null);
  }

  const activity: Activity = {name: activityName};

  return db.collection('users').doc(currentUser.uid).collection('activities').add(activity);
};

export const listActivities = (cb: (activities: Activity[]) => void): () => void => {
  let currentUser = auth.currentUser;
  if (currentUser === null) {
    return () => {
    };
  }

  return db.collection('users')
    .doc(currentUser.uid)
    .collection('activities')
    .onSnapshot(next => {
      const docs = next.docs;
      const activities: Activity[] = docs.map(doc => ({id: doc.id, ...doc.data()} as Activity));
      cb(activities)
    });
};
