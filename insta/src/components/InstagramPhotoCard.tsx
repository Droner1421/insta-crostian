import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Platform, TextInput, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { InstagramPhoto, Comment } from "../interfaces/unsplashInterfaces";
import { useDownloadImage } from "../hooks/useDownloadImage";
import { useLikesComments } from "../hooks/useLikesComments";
import { useUser } from "../contexts/UserContext";

interface Props extends InstagramPhoto {
    onRefresh?: () => void;
}

export const InstagramPhotoCard = ({
    id,
    url,
    thumb,
    description,
    alt_description,
    user,
    likes,
    created_at
}: Props) => {
    const navigation = useNavigation<any>();
    const { handleDownload, isDownloading } = useDownloadImage();
    const { currentUser } = useUser();
    const { likes: photoLikes, comments, userLiked, handleLike, handleComment, deleteComment, loadLikes, loadComments, isLoadingLikes, isLoadingComments } = useLikesComments(id);
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);

    const displayText = description || alt_description || "Sin descripción";

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.username} numberOfLines={1}>
                            {user.username}
                        </Text>
                    </View>
                </View>
                
            </View>

            <TouchableOpacity activeOpacity={0.8}>
                <Image
                    style={styles.photo}
                    source={{ uri: thumb }}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <View style={styles.actions}>
                <View style={styles.leftActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleLike}
                        disabled={!currentUser || isLoadingLikes}
                    >
                        <Text style={[styles.heartIcon, userLiked && styles.likedHeart]}>
                            {userLiked ? '❤️' : '♡'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('CommentScreen', { photo: { id, url, thumb, description, alt_description, user, likes, created_at } })}
                    >
                        <Text style={styles.commentIcon}>💬</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Comments Section */}
            {showComments && (
                <View style={styles.commentsSection}>
                    {comments.length > 0 && (
                        <View style={styles.commentsList}>
                            <FlatList
                                data={comments.slice(0, 3)} // Show only first 3 comments
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.commentItem}>
                                        <View style={styles.commentLeft}>
                                            <Text style={styles.commentText}>
                                                {item.comentario}
                                            </Text>
                                        </View>
                                        {currentUser && currentUser.id === item.user_id && (
                                            <TouchableOpacity
                                                style={styles.commentDeleteButton}
                                                onPress={() => {
                                                    Alert.alert(
                                                        'Eliminar comentario',
                                                        '¿Estás seguro de que quieres eliminar este comentario?',
                                                        [
                                                            { text: 'Cancelar', style: 'cancel' },
                                                            {
                                                                text: 'Eliminar',
                                                                style: 'destructive',
                                                                onPress: () => deleteComment(item.id.toString())
                                                            }
                                                        ]
                                                    );
                                                }}
                                            >
                                                <Text style={styles.commentDeleteIcon}>🗑️</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                                scrollEnabled={false}
                            />
                            {comments.length > 3 && (
                                <Text style={styles.moreComments}>
                                    Ver {comments.length - 3} comentarios más...
                                </Text>
                            )}
                        </View>
                    )}

                    {currentUser && (
                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Escribe un comentario..."
                                placeholderTextColor="#8E8E8E"
                                value={commentText}
                                onChangeText={setCommentText}
                                multiline
                            />
                            <TouchableOpacity
                                style={[styles.commentButton, (!commentText.trim() || isLoadingComments) && styles.commentButtonDisabled]}
                                onPress={() => {
                                    if (commentText.trim()) {
                                        handleComment(commentText);
                                        setCommentText("");
                                    }
                                }}
                                disabled={!commentText.trim() || isLoadingComments}
                            >
                                <Text style={styles.commentButtonText}>
                                    {isLoadingComments ? '...' : 'Publicar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}

            <View style={styles.caption}>
                <Text style={styles.username} numberOfLines={1}>
                    {user.username}
                </Text>
                <Text style={styles.captionText} numberOfLines={2}>
                    {displayText}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#121212',
        marginHorizontal: 0.5,
        marginBottom: 16,
        borderRadius: 0,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E1E',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E0E0E0',
    },
    username: {
        fontSize: 14,
        fontWeight: '600',
        color: '#E0E0E0',
    },
    date: {
        fontSize: 12,
        color: '#B0B0B0',
    },
    moreButton: {
        padding: 4,
    },
    moreIcon: {
        fontSize: 16,
        color: '#E0E0E0',
    },
    photo: {
        width: Dimensions.get('window').width,
        aspectRatio: 1,
        backgroundColor: '#1E1E1E',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    leftActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginRight: 14,
        padding: 4,
    },
    heartIcon: {
        fontSize: 24,
        color: '#E0E0E0',
    },
    commentIcon: {
        fontSize: 22,
        color: '#E0E0E0',
    },
    shareIcon: {
        fontSize: 22,
        color: '#E0E0E0',
    },
    bookmarkButton: {
        padding: 4,
    },
    bookmarkIcon: {
        fontSize: 22,
        color: '#E0E0E0',
    },
    caption: {
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingBottom: 12,
    },
    captionText: {
        fontSize: 14,
        color: '#E0E0E0',
        marginLeft: 4,
        flex: 1,
    },
    likedHeart: {
        color: '#BB86FC',
    },
    commentsSection: {
        paddingHorizontal: 14,
        paddingBottom: 12,
    },
    commentsList: {
        marginBottom: 8,
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    commentLeft: {
        flex: 1,
        flexDirection: 'row',
    },
    commentText: {
        fontSize: 14,
        color: '#E0E0E0',
        flex: 1,
    },
    commentDeleteButton: {
        padding: 4,
        marginLeft: 8,
    },
    commentDeleteIcon: {
        fontSize: 14,
        color: '#B0B0B0',
    },
    moreComments: {
        fontSize: 14,
        color: '#B0B0B0',
        marginTop: 4,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#1E1E1E',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: '#E0E0E0',
        marginRight: 8,
        maxHeight: 80,
    },
    commentButton: {
        backgroundColor: '#BB86FC',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    commentButtonDisabled: {
        backgroundColor: '#1E1E1E',
    },
    commentButtonText: {
        color: '#121212',
        fontSize: 14,
        fontWeight: '600',
    },
});
