import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "./action";
import { useLayout } from "@/lib/LayoutContext";

export function useLikePostMutation() {
  const queryClient = useQueryClient();
  const { userIp } = useLayout();

  const mutation = useMutation({
    mutationFn: likePost,
    onSuccess: async (newComment) => {
      const queryKey = ["post-feed", "for-you"];
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, (oldData) => {
        if (newComment?._id) {
          return {
            ...oldData,
            data: oldData.data.map((post) => {
              if (post._id === newComment._id) {
                return {
                  ...post,
                  likes: newComment.likes,
                };
              }
              return post;
            }),
          };
        }
        return oldData;
      });
      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
    },

    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to submit comment. Please try again.",
      });
    },
  });

  return mutation;
}
