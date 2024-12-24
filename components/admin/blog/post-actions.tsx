"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ContentActions } from "../utils/content-actions"
import { ConfirmDialog } from "../shared/confirm-dialog"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client"
import type { BlogPost } from "@/lib/supabase/types"

interface PostActionsProps {
  post: BlogPost
}

export function PostActions({ post }: PostActionsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", post.id)

      if (error) throw error

      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted.",
        variant: "success",
      })

      router.push("/admin/blog")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <ContentActions
        onEdit={() => router.push(`/admin/blog/${post.id}`)}
        onDelete={() => setDeleteDialogOpen(true)}
        onPreview={() => window.open(`/blog/${post.slug}`, "_blank")}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  )
}