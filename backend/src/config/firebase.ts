
import admin, { ServiceAccount } from 'firebase-admin';
import GOOGLE_APPLICATION_CREDENTIALS from './sistema-igreja-3c4f2-firebase-adminsdk-upa6k-5389b2f887.json'; 

admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS as ServiceAccount),
  databaseURL: "https://sistema-igreja-3c4f2-default-rtdb.firebaseio.com"
});


export default admin