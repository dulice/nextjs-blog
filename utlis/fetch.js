import useSWR from 'swr'
import { fetcher } from './helper'
export const usePost = (postId) => {
    const { data, isLoading, error } = useSWR(`/api/posts/${postId}`, fetcher);
    return {
        post: data,
        isLoading,
        error
    }
}