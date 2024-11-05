import { bucket } from '../config/storage'

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  const blob = bucket.file(file.originalname)
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype
  })

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      reject(err)
    })

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      resolve(publicUrl)
    })

    blobStream.end(file.buffer)
  })
}

const getImages = async (): Promise<unknown[]> => {
  const [files] = await bucket.getFiles()
  const imageUrls = files.map((file) => {
    return {
      name: file.name,
      publicUrl: `https://storage.googleapis.com/${bucket.name}/${file.name}`
    }
  })
  return imageUrls
}

const getImageById = async (id: string): Promise<unknown> => {
  const blob = bucket.file(id)
  const exists = await blob.exists()
  if (!exists[0]) {
    throw new Error(`Image with ID ${id} not found.`)
  }
  return {
    name: blob.name,
    publicUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}`
  }
}

const updateImage = async (id: string, file: Express.Multer.File): Promise<string> => {
  const blob = bucket.file(id) // Menggunakan id untuk menentukan file yang akan diupdate
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype
  })

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      reject(err)
    })

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      resolve(publicUrl)
    })

    blobStream.end(file.buffer)
  })
}

const deleteImage = async (id: string): Promise<void> => {
  const blob = bucket.file(id)
  await blob.delete()
}

export { uploadImage, getImages, getImageById, updateImage, deleteImage }
