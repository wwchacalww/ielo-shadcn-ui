import { FileText } from 'lucide-react'

import { pdfProgress } from '@/api/progress/pdf-progress'
import { Button } from '@/components/ui/button'

export function PrintProgress({ id }: { id: string }) {
  async function handleDownloadPDF() {
    const blob = await pdfProgress({ id })
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')
  }
  return (
    <Button onClick={handleDownloadPDF} variant="outline">
      <FileText className="mr-2 h-3 w-3" />
      Visualizar
    </Button>
  )
}
