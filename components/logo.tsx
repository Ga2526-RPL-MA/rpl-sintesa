import Image from 'next/image'
import { cn } from '@/lib/utils'

function SintesaLogo({ className }: { className?: string}) {
  return (
    <div>
        <Image 
        src='/logomaybe.svg'
        alt='Sintesa Logo'
        width={25}
        height={0}
        loading='eager'
        fetchPriority='high'
        className={cn('h-auto pointer-events-none select-none', className)}
        />
    </div>
  )
}

export default SintesaLogo