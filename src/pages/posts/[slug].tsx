import fs from 'fs'
import matter from 'gray-matter'
import { GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import path from 'path'
import rehypeHighlight from 'rehype-highlight'
import emoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import { PostMeta } from '../../types'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'


const components = {
    pre: (props: any) => <pre style={{ direction: "ltr" }} {...props} />,
    h1: (props: any) => <h1 className='my-4 text-4xl' {...props} />,
    h2: (props: any) => <h2 className='my-4 text-3xl' {...props} />,
    h3: (props: any) => <h3 className='my-2 text-2xl' {...props} />,
    h4: (props: any) => <h4 className='my-2 text-xl' {...props} />,
    h5: (props: any) => <h5 className='my-1 text-lg' {...props} />,
    h6: (props: any) => <h6 className='my-1 text-base' {...props} />,
    img: (props: any) => <img className="mx-auto" {...props} />,
    p: (props: any) => <p className="mb-4" {...props} />,
    blockquote: (props: any) => <blockquote className="my-4 italic bg-gray-800 p-4 rounded-xl text-gray-300" {...props} />,
    code: (props: any) => <code style={{ borderRadius: "0.75rem" }} className="italic py-[0.1rem] px-1" {...props} />,
    li: (props: any) => <li className="list-disc mr-12" {...props} />,
}
const SinglePostPage: React.FC<{ source: MDXRemoteSerializeResult, frontMatter: PostMeta }> = ({ source, frontMatter }) => {

    return (
        <>
            <Head>
                <title>{frontMatter.title}</title>
                <meta name="description" content={frontMatter.description} />
                <meta property="og:title" content={frontMatter.title} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content={frontMatter.description} />
                <meta property="og:url" content={frontMatter.image} />
            </Head>
            <div>
                <img className="w-full opacity-40 max-h-[30vh] xl:max-h-[40vh]" src={frontMatter.image} />
                <h1 className='text-center mt-12 text-5xl font-bold tracking-wider sm:text-6xl'>{frontMatter.title}</h1>
                <h6 className='text-center text-sm text-gray-300 sm:text-base'>{frontMatter.category} / {frontMatter.createdAt}</h6>
                <div className='mt-8 py-8 px-4 bg-gray-600 rounded-t-md sm:w-4/5 mx-auto max-w-6xl text-gray-200'>
                    <MDXRemote {...source} components={components} />
                </div>
            </div>
        </>
    )
}

export default SinglePostPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`)
    const source = fs.readFileSync(postFilePath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [emoji, remarkGfm],
            rehypePlugins: [rehypeHighlight],
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
