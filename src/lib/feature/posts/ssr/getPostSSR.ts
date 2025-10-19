export async function getPost(postId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/id/${postId}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Post not found')
  return res.json()
}

export async function getComments(postId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`, {
    cache: 'no-store',
  })
  return res.json()
}
