import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const onCreateUser = functions.auth.user().onCreate(user => {
    if (!user.email || !user.emailVerified) {
        return null;
    }

    console.log(`registering user: ${user.uid}, with email: ${user.email}`);
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
    });
});
