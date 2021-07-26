import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      <Image
        src={post.frontmatter.cover_image}
        alt=""
        width={600}
        height={420}
        className="mb-4 rounded"
      />
    </div>
  );
}
