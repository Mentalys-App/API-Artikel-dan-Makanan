import admin from 'firebase-admin'
import * as serviceAccount from './serviceAccountKey.json' // Ensure the path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

const db = admin.firestore()

export { db }
