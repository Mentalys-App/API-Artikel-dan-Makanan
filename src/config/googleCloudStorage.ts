import { AppError } from '@/utils/AppError'
import { Storage } from '@google-cloud/storage'
import path from 'path'

const BUCKET_NAME = process.env.GOOGLE_CLOUD_BUCKET_NAME as string
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID as string

if (!BUCKET_NAME) throw AppError('GOOGLE_CLOUD_BUCKET_NAME is not defined', 500)
if (!PROJECT_ID) throw AppError('GOOGLE_CLOUD_PROJECT_ID is not defined', 500)

const storage = new Storage({
  // buat file AccountServiceKey.json di folder root atau di folder yang sama dengan package.json
  keyFilename: path.join(__dirname, '../../AccountServiceKey.json'),
  projectId: PROJECT_ID
})

const bucket = storage.bucket(BUCKET_NAME)

export { storage, bucket }
