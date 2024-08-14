import admin from 'firebase-admin';

if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert('src/config/secury.json'),    
    });
    
}

export default admin
