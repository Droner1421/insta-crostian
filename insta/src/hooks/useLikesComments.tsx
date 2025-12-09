import { useState, useEffect } from 'react';
import { Like, Comment } from '../interfaces/unsplashInterfaces';
import { likesCommentsApi } from '../api/likesCommentsApi';
import { unsplashApi } from '../api/unsplashApi';
import { useUser } from '../contexts/UserContext';

export const useLikesComments = (photoId?: string) => {
    const { currentUser } = useUser();

    const [likes, setLikes] = useState<Like[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoadingLikes, setIsLoadingLikes] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [userLiked, setUserLiked] = useState(false);

    useEffect(() => {
        if (photoId) {
            loadLikes();
            loadComments();
        }
    }, [photoId]);

    useEffect(() => {
        if (currentUser && likes.length > 0) {
            setUserLiked(
                likes.some(like => like.user_id === Number(currentUser.id))
            );
        } else {
            setUserLiked(false);
        }
    }, [likes, currentUser]);

    const loadLikes = async () => {
        if (!photoId) return;

        setIsLoadingLikes(true);

        const response = await likesCommentsApi.get(`/likes/photo/${photoId}`);
        setLikes(response.data);

        setIsLoadingLikes(false);
    };

    const loadComments = async () => {
        if (!photoId) return;

        setIsLoadingComments(true);

        const response = await likesCommentsApi.get(`/comments/photo/${photoId}`);
        setComments(response.data);

        setIsLoadingComments(false);
    };

    const handleLike = async () => {
        if (!currentUser || !photoId) return;

        const existingLike = likes.find(
            like =>
                like.user_id === Number(currentUser.id) &&
                like.photo_id === photoId
        );

        if (existingLike) {
            await likesCommentsApi.delete(`/likes/${existingLike.id}`);
            setLikes(prev => prev.filter(like => like.id !== existingLike.id));
            return;
        }

        const response = await likesCommentsApi.post('/likes', {
            user_id: currentUser.id.toString(),
            photo_id: photoId,
            estado: 'Activo',
        });

        const newLike = response.data;

        const alreadyExists = likes.some(
            like =>
                like.user_id === Number(currentUser.id) &&
                like.photo_id === photoId
        );

        if (!alreadyExists) {
            setLikes(prev => [...prev, newLike]);
        }
    };

    const handleComment = async (commentText: string) => {
        if (!currentUser || !photoId || !commentText.trim()) return;

        const response = await likesCommentsApi.post('/comments', {
            user_id: currentUser.id.toString(),
            photo_id: photoId,
            comentario: commentText.trim(),
            estado: 'Activo',
        });

        setComments(prev => [...prev, response.data]);
    };

    const deleteComment = async (commentId: string) => {
        if (!currentUser) return;

        await likesCommentsApi.delete(`/comments/${commentId}`);

        setComments(prev =>
            prev.filter(comment => comment.id !== commentId)
        );
    };

    const deleteLikeById = async (likeId: number) => {
        if (!currentUser) return;
        await likesCommentsApi.delete(`/likes/${likeId}`);
    };

    const getUserComments = async () => {
        if (!currentUser) return [];

        const response = await likesCommentsApi.get(
            `/comments/user/${currentUser.id.toString()}`
        );

        return response.data;
    };

    const getUserLikesWithPhotos = async () => {
        if (!currentUser) return [];

        const response = await likesCommentsApi.get(
            `/likes/user/${currentUser.id.toString()}`
        );

        const userLikes = response.data;

        const uniqueLikes = userLikes.filter(
            (like: Like, index: number, self: Like[]) =>
                index === self.findIndex(l => l.photo_id === like.photo_id)
        );

        const photoPromises = uniqueLikes.map(async (like: Like) => {
            const res = await unsplashApi.get(`/photos/${like.photo_id}`);
            return { ...res.data, likeData: like };
        });

        const results = await Promise.all(photoPromises);
        return results;
    };

    return {
        likes,
        comments,
        userLiked,
        isLoadingLikes,
        isLoadingComments,
        handleLike,
        handleComment,
        deleteComment,
        deleteLikeById,
        loadLikes,
        loadComments,
        getUserComments,
        getUserLikesWithPhotos,
    };
};
