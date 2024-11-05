import { Storage } from '@google-cloud/storage'
import dotenv from 'dotenv'

dotenv.config()

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEYFILE // Path ke file JSON kunci layanan Anda
})

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME as string)

export { bucket }
