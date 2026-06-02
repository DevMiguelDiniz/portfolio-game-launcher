"use client"

export default function CVButton() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/CV/Miguel_Diniz_CV_PT.pdf'
    link.download = 'Miguel_Diniz_CV_PT.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className="steam-btn-secondary flex items-center gap-2 text-sm"
      style={{ borderRadius: 'var(--radius-md)', padding: '14px 18px' }}
    >
      ⬇ CV
    </button>
  )
}
