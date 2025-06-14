import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FadeInUp from "../../animation/FadeInUp";
// import FadeInUp from "../../animation/FadeInUp";
// import CommentForm from "./CommentForm";
// import CommentList from "./CommentList";
// import PostMeta from "./PostMeta";
// import PostTags from "./PostTags";

const WP_API_URL = "https://codersh.com/wp-json/wp/v2/posts?_embed&slug=";

function BlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${WP_API_URL}${slug}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const formattedPost = {
            id: data[0].id,
            title: data[0].title.rendered,
            content: data[0].content.rendered,
            img:
              data[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/default-image.webp",
          };
          setPost(formattedPost);
        } else {
          setPost(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="blod-fetch">
        <div className="aximo-preloader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  if (!post) return <p style={{ textAlign: "center" }}>Post not found</p>;

  return (
    <>
      <FadeInUp className="post-thumbnail">
        <LazyLoadImage
          src={post.img}
          width={850}
          height={500}
          alt={post.title}
          effect="blur"
        />
      </FadeInUp>
      <div className="single-post-content-wrap">
        {/* {/ <PostMeta / > /} */}
        <div className="entry-content">
          <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          {/* <PostTags />
					<CommentList />
					<CommentForm /> */}
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
