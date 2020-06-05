import { request } from '../lib/datocms'
import { Image } from 'react-datocms'
const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allBlogPosts(first: $limit) {
    id
    title
    coverImage {
      responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
}`
export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
  })
  return {
    props: {
      data,
    },
  }
}
export default function Home({ data }) {
  return (
    <div>
      {data.allBlogPosts.map((blogPost) => (
        <article key={blogPost.id}>
          <Image data={blogPost.coverImage.responsiveImage} />
          <h6>{blogPost.title}</h6>
        </article>
      ))}
    </div>
  )
}
