'use client'
import { AddPostPhoto } from '@/lib/feature/posts/ui/postCreate/addPostPhoto/AddPostPhoto'
import { useRef, useState } from 'react'
import { ReviewPostPhoto } from '@/lib/feature/posts/ui/postCreate/reviewPostPhoto/ReviewPostPhoto'
import { useUploadImagesMutation } from '@/lib/feature/posts/api/postsApi'
import { AddPostDescription } from '@/lib/feature/posts/ui/postCreate/addPostDescription/AddPostDescription'
export type NavigationFormType = 'addFiles' | 'review' | 'addDescription'

export const PostCreate = () => {
  const [formNavigation, setFormNavigation] = useState<NavigationFormType>('addFiles')
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadId = useRef<string[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [filesImg, setFilesImg] = useState<File[]>([])
  const [uploadImages] = useUploadImagesMutation()
  const sendFilesToServer = async () => {
    const formData = new FormData()
    filesImg.forEach(file => {
      formData.append('file', file)
    })
    const result = await uploadImages(formData).unwrap()

    uploadId.current = result.images.map(img => img.uploadId)
    setFormNavigation('addDescription')
  }

  return (
    <div>
      {formNavigation === 'addFiles' && (
        <AddPostPhoto
          setFilesImg={setFilesImg}
          inputRef={inputRef}
          setFormNavigation={setFormNavigation}
          setImageUrls={setImageUrls}
        />
      )}
      {formNavigation === 'review' && (
        <ReviewPostPhoto
          setFormNavigation={setFormNavigation}
          sendFilesToServer={sendFilesToServer}
          setFilesImg={setFilesImg}
          inputRef={inputRef}
          setImageUrls={setImageUrls}
          imageUrls={imageUrls}
        />
      )}
      {formNavigation === 'addDescription' && (
        <AddPostDescription uploadId={uploadId} imageUrls={imageUrls} />
      )}
    </div>
  )
}
