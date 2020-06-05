import { request } from '../lib/datocms'
import { Image, renderMetaTags } from 'react-datocms'
import Head from 'next/head'

const HOMEPAGE_QUERY = `
query HomePage($limit: IntType) {
  site: _site {
    favicon: faviconMetaTags {
      attributes
      content
      tag
    }
  }
  blog {
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
  }
  allPosts(first: $limit) {
    id
    title
    excerpt
    date
    author {
      name
    }
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

export async function getStaticProps(context) {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
    preview: context.preview,
  })

  return {
    props: { data },
  }
}

export default function Home({ data }) {
  return (
    <div>
      <Head>{renderMetaTags(data.blog.seo.concat(data.site.favicon))}</Head>
      {data.allPosts.map((blogPost) => (
        <article key={blogPost.id}>
          <Image data={blogPost.coverImage.responsiveImage} />
          <h6>{blogPost.title}</h6>
        </article>
      ))}
    </div>
  )
}
