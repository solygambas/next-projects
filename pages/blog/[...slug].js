// http://localhost:3000/blog/john or http://localhost:3000/blog/2021/john
import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query); // array ['2021', 'john']
  return (
    <div>
      <h1>The Blog Posts Page</h1>
    </div>
  );
}

export default BlogPostsPage;
