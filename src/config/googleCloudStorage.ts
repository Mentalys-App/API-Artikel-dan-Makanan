import { Storage } from '@google-cloud/storage'
import path from 'path'

const storage = new Storage({
  keyFilename: path.join(__dirname, '../../AccountServiceKey.json'),
  projectId: 'coral-melody-440810-a6'
})

const bucket = storage.bucket('artikelrekomendasi')

export { storage, bucket }
