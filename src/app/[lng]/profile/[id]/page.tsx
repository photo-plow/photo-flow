import { twMerge } from 'tailwind-merge'
import { Typography } from 'photo-flow-ui-kit'
import {
  PostData,
  UserPosts,
} from '@/lib/feature/profile/ui/components/profile/userPosts/UserPosts'
import { ProfileControls } from '@/lib/feature/profile/ui/components/profile/profileControls/ProfileControls'
import Image from 'next/image'
import DefaultAvatar from '@/../public/defaultAvatar.jpg'
import { UserProfileDataResponse } from '@/lib/feature/profile/api/profile.types'
import { UserProfileMetadata } from '@/lib/feature/profile/ui/components/profile/userProfileMetadata/UserProfileMetadata'
import { PAGE_SIZE } from '@/constants'
import { UserPostsResponse } from '@/lib/feature/posts/api/postsApi.types'
import { getComments, getPost } from '@/lib/feature/posts/ssr/getPostSSR'
import { Button } from 'photo-flow-ui-kit'
import Link from 'next/link'
import PostModal from '@/lib/feature/posts/ui/post/PostModal'
import { withLocale, type Locale } from '@/i18n/utils/withLocale'
import { getServerTranslate } from '@/i18n/utils'

type ProfilePageProps = {
  params: Promise<{ lng: Locale; id: string }>
  searchParams: Promise<{ postId: string }>
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { postId } = await searchParams
  const postDataQuery = {} as PostData
  const { lng, id: userId } = await params

  const t = await getServerTranslate(lng)

  try {
    if (postId) {
      postDataQuery.post = await getPost(postId)
      postDataQuery.comments = await getComments(postId)
    }
    const userProfileData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user/profile/${userId}`
    )
    const userProfile: UserProfileDataResponse = await userProfileData.json()

    const userPostsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/user/${userId}/0?pageSize=${PAGE_SIZE}`
    )

    const userPosts: UserPostsResponse = await userPostsData.json()
    const totalCountPosts = userPosts.totalCount
    return (
      <div className={twMerge('m-auto w-[1060px]')}>
        <div className='flex gap-[38px] pr-[64px]'>
          <Image
            priority
            src={userProfile?.avatars[0]?.url || DefaultAvatar}
            alt={userProfile.userName}
            width={204}
            height={204}
            className='h-[204px] w-[204px] rounded-[50%]'
          />

          <div className='w-full'>
            <div className='flex w-full justify-between'>
              <Typography variant={'h1'} className={'capitalize'}>
                {userProfile.userName}
              </Typography>
              <ProfileControls id={userId} />
            </div>
            <UserProfileMetadata
              following={userProfile.userMetadata.following}
              followers={userProfile.userMetadata.followers}
              postsCount={userPosts.totalCount}
            />
            <Typography variant='regular_text_16' className='mt-[23px]'>
              {userProfile.aboutMe}
            </Typography>
          </div>
        </div>
        <UserPosts
          key={userId}
          userId={userId}
          userPostsData={userPosts}
          totalCountPosts={totalCountPosts}
        />
        {postDataQuery.post && postId && (
          <PostModal post={postDataQuery.post} comments={postDataQuery.comments} />
        )}
      </div>
    )
  } catch (e) {
    console.log(e)
    return (
      <div className={'flex h-[80vh] flex-col items-center justify-center gap-[45px]'}>
        <Typography variant={'h1'}>{t('common_404_title')}</Typography>
        <Button asChild variant={'secondary'}>
          <Link href={withLocale('/', { lng })}>{t('common_goHome')}</Link>
        </Button>
      </div>
    )
  }
}
