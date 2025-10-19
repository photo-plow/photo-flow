const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
)

export default function ProfileLoading() {
  return (
    <div className='m-auto w-[1060px]'>
      <div className='flex gap-[38px] pr-[64px]'>
        <div>
          <Skeleton className='h-[204px] w-[204px] rounded-[50%]' />
        </div>
        <div className='w-full space-y-4'>
          <div className='flex justify-between'>
            <Skeleton className='h-8 w-48' />
            <div className='flex gap-2'>
              <Skeleton className='h-10 w-24' />
              <Skeleton className='h-10 w-24' />
            </div>
          </div>
          <div className='flex gap-[38px]'>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className='h-6 w-16' />
            ))}
          </div>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
      <div className='mt-8 flex flex-wrap gap-[12px] py-[48px]'>
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className='h-[228px] w-[234px]' />
        ))}
      </div>
    </div>
  )
}
