import PublicPosts from '@/lib/feature/publicPage/ui/PublicPosts/PublicPosts'
import { UsersCounter } from '@/lib/feature/publicPage/ui'
import { POSTS_ON_MAIN_PAGE } from '@/constants'

export default async function HomePage() {
  const postsRaw = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/public-posts/all?pageSize=${POSTS_ON_MAIN_PAGE}`
  )
  const publicPosts = await postsRaw.json()

  const countRaw = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user`)
  const usersCount = await countRaw.json()

  return (
    <div className={'flex flex-col items-center'}>
      <UsersCounter usersCount={usersCount.totalCount} />
      <PublicPosts initialPosts={publicPosts} />
    </div>
  )
}
