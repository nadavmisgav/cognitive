import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
import Custom404 from '../404'

function SinglePostPage() {
    const router = useRouter()

    const postId = router.query.postId as string

    const { data, isLoading } = trpc.useQuery(['posts.single-post', { postId }])

    if (isLoading) {
        return <h1>טוען</h1>
    }

    if (!data) {
        return <Custom404 />
    }

    return (
        <div>
            <img className="w-full opacity-40 max-h-[30vh]" src={data.image} />
            <h1 className='text-center mt-12 text-5xl font-bold tracking-wider sm:text-6xl'>{data.title}</h1>
            <h6 className='text-center text-sm text-gray-300 sm:text-base'>{data.category} / {data.createdAt.toLocaleDateString("he")}</h6>
            <div className='mt-8 py-8 px-12 bg-gray-600 rounded-t-md sm:w-4/5 mx-auto max-w-6xl'>
                {data.body}
            </div>
        </div>
    )
}

export default SinglePostPage
