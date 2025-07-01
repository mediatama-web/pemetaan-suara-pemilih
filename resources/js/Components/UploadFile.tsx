import { Button } from '@/Components/ui/button'
import { cn } from '@/lib/utils'
import { FileText, UploadCloud } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type UploadFileProps = {
  onFilesAccepted: (files: File[]) => void
}

const UploadFile: React.FC<UploadFileProps> = ({ onFilesAccepted }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedFiles(acceptedFiles)
      onFilesAccepted(acceptedFiles)
    },
    [onFilesAccepted]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true, // atur ke false kalau hanya 1 file
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
        {
          selectedFiles.length > 0 ?
            <FileText className="h-8 w-8 text-gray-500" />
          :
            <UploadCloud className="h-8 w-8 text-gray-500" />
        }
        <p className="text-sm text-gray-600">
          {selectedFiles.length > 0
            ? selectedFiles.map(file => file.name).join(', ')
            : 'Tarik file ke sini atau klik untuk memilih'}
        </p>
        <Button variant="outline" className="mt-2">
          Pilih File
        </Button>
      </div>
    </div>
  )
}

export default UploadFile
