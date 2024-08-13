import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert('src/Service/secury.json')
});


export default admin