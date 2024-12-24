import { supabaseAdmin } from "@/lib/supabase/admin"
import { blogPosts } from "@/lib/content/blog-posts"

async function createBlogPosts() {
  try {
    for (const post of blogPosts) {
      // Create the post
      const { data: blogPost, error: postError } = await supabaseAdmin
        .from("blog_posts")
        .insert([{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          status: post.status,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          published_at: post.published_at,
        }])
        .select()
        .single()

      if (postError) {
        console.error(`Error creating post ${post.title}:`, postError)
        continue
      }

      console.log(`Created post: ${post.title}`)

      // Create tags if they don't exist and link them to the post
      for (const tagName of post.tags) {
        try {
          // Create or get tag
          const { data: tag, error: tagError } = await supabaseAdmin
            .from("tags")
            .upsert({ 
              name: tagName, 
              slug: tagName.toLowerCase().replace(/\s+/g, '-') 
            }, { 
              onConflict: 'name' 
            })
            .select()
            .single()

          if (tagError) throw tagError

          // Link tag to post
          const { error: linkError } = await supabaseAdmin
            .from("blog_posts_tags")
            .insert([{
              blog_post_id: blogPost.id,
              tag_id: tag.id
            }])

          if (linkError) throw linkError

          console.log(`Linked tag "${tagName}" to post: ${post.title}`)
        } catch (error) {
          console.error(`Error processing tag "${tagName}" for post "${post.title}":`, error)
        }
      }
    }

    console.log("All blog posts created successfully!")
  } catch (error) {
    console.error("Error creating blog posts:", error)
  }
}

createBlogPosts()