export type PostMeta = {
    title: string
    category: string
    createdAt: string
    description: string
    image: string
}

export type Post = {
    content: string
    data: PostMeta
    filePath: string
}