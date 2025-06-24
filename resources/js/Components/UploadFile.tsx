import { Button } from '@/Components/ui/button'
import { cn } from '@/lib/utils'
import { UploadCloud } from 'lucide-react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type UploadFileProps = {
  onFilesAccepted: (files: File[]) => void
}

const UploadFile: React.FC<UploadFileProps> = ({ onFilesAccepted }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAccepted(acceptedFiles)
    },
    [onFilesAccepted]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer transition',
        isDragActive ? 'bg-blue-50 border-blue-500' : 'bg-white hover:bg-gray-50'
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <UploadCloud className="h-8 w-8 text-gray-500" />
        <p className="text-sm text-gray-600">
          Tarik file ke sini atau klik untuk memilih
        </p>
        <Button variant="outline" className="mt-2">
          Pilih File
        </Button>
      </div>
    </div>
  )
}

export default UploadFile
