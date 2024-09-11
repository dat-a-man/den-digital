import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "./action";

export function useLikePostMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: likePost,
    onSuccess: async (newComment) => {
      const queryKey = ["post-feed", "for-you"];
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, (oldData) => {
        console.log("oldData", oldData);
        // const firstPage = oldData?.pages[0];

        // if (firstPage) {
        //   return {
        //     pageParams: oldData.pageParams,
        //     pages: [
        //       {
        //         previousCursor: firstPage.previousCursor,
        //         comments: [...firstPage.comments, newComment],
        //       },
        //       ...oldData.pages.slice(1),
        //     ],
        //   };
        // }
      });
      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          console.log("inside predicate", query.state.data);
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
