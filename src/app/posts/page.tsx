// app/posts/page.tsx
export const dynamic = "force-static"; // cache na build (SSG)

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 }, // ISR: revalida a cada 60s
  });

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts (cache server-side)</h1>
      <ul>
        {posts.slice(0, 5).map((post: Post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
