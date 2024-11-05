import { bucket } from '../config/googleCloudStorage'
import { format } from 'util'

export const uploadImage = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { originalname, buffer } = file

    const blob = bucket.file(originalname.replace(/ /g, '_'))
    const blobStream = blob.createWriteStream({
      resumable: false
    })

    blobStream
      .on('finish', () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
        resolve(publicUrl)
      })
      .on('error', (err) => {
        reject(`Unable to upload image, something went wrong: ${err}`)
      })
      .end(buffer)
  })
}
