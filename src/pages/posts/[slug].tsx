import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'

function SinglePostPage({ source, frontMatter }) {
    return (
        <div>
            <img className="w-full opacity-40 max-h-[30vh] xl:max-h-[40vh]" src={frontMatter.image} />
            <h1 className='text-center mt-12 text-5xl font-bold tracking-wider sm:text-6xl'>{frontMatter.title}</h1>
            <h6 className='text-center text-sm text-gray-300 sm:text-base'>{frontMatter.category} / {frontMatter.createdAt}</h6>
            <div className='mt-8 py-8 px-12 bg-gray-600 rounded-t-md sm:w-4/5 mx-auto max-w-6xl text-gray-200'>
                <MDXRemote {...source} />
            </div>
        </div>
    )
}

export default SinglePostPage

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(postFilePath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    }
}

export const getStaticPaths = async () => {
    const paths = postFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}
