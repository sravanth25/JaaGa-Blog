import { getPosts } from "@/lib/server/data";

export const dynamic = "force-static";

/**
 * Plain-text body of every post, keyed by slug. The Blogs page loads this
 * only when someone starts searching, so the full text of every post is
 * not sent with the page itself.
 */
export async function GET() {
  const index: Record<string, string> = {};
  for (const post of getPosts()) {
    index[post.slug] = (post.content || "")
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return Response.json(index);
}
