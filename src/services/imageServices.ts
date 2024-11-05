import { bucket } from '../config/storage'
import { Storage } from '@google-cloud/storage'
import mongoose from 'mongoose'

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

const getImages = async (): Promise<any[]> => {
  // Implementasikan logika untuk mendapatkan daftar gambar dari storage jika diperlukan
  // Misalnya dengan menyimpan metadata di database
  return []
}

const getImageById = async (id: string): Promise<any> => {
  // Implementasikan logika untuk mendapatkan gambar berdasarkan ID
  return null
}

const deleteImage = async (id: string): Promise<void> => {
  // Implementasikan logika untuk menghapus gambar berdasarkan ID dari storage
  const blob = bucket.file(id)
  await blob.delete()
}

export { uploadImage, getImages, getImageById, deleteImage }
