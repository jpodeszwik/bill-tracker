import {auth, db} from "../firebase";
import {firestore} from "firebase";

export interface Activity {
  name: string,
  id?: string,
  statuses: Statuses,
}

export const DONE = 'DONE';
export const TO_DO = 'TO_DO';
export const WARNING = 'WARNING';
export type Status = 'DONE' | 'TO_DO' | 'WARNING' | null;

export interface Statuses {
  [date: string]: Status,
}

export const addActivity = (activityName: string): Promise<firestore.DocumentReference | null> => {
  const currentUser = auth.currentUser;
  if (currentUser === null) {
    return Promise.resolve(null);
  }

  const activity: Activity = {name: activityName, statuses: {}};

  return db.collection('users').doc(currentUser.uid).collection('activities').add(activity);
};

export const listActivities = (cb: (activities: Activity[]) => void): () => void => {
  const currentUser = auth.currentUser;
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

interface ActivityUpdate {
  [path: string]: Status
}

const getNextStatus = (status: Status) => {
  switch (status) {
    case TO_DO:
      return DONE;
    case DONE:
      return WARNING;
    case WARNING:
      return TO_DO;
    default:
      return TO_DO;
  }
};

export const toggleStatus = (activityId: string, date: string) => {
  const currentUser = auth.currentUser;
  if (currentUser === null) {
    return () => {
    };
  }

  const docRef = db.collection('users')
    .doc(currentUser.uid)
    .collection('activities')
    .doc(activityId);


  return db.runTransaction(transaction => {
    return transaction.get(docRef).then(doc => {
      const activity = doc.data() as Activity;
      const statuses = activity.statuses || {};
      const previousStatus = statuses[date] || TO_DO;

      const update: ActivityUpdate = {};
      update[`statuses.${date}`] = getNextStatus(previousStatus);
      transaction.update(docRef, update);
    });

  });
};
