'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoClickListener() {
  const [clickCount, setClickCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.id === 'logo-link' ||
        target.closest('#logo-link')
      ) {
        setClickCount((prev) => {
          const newCount = prev + 1
          if (newCount === 13) {
            // Navigate to guano economy dashboard
            router.push('/guano-economy')
            return 0
          }
          return newCount
        })

        // Reset after 2 seconds
        setTimeout(() => setClickCount(0), 2000)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [router])

  return null
}
