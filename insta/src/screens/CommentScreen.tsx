import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { InstagramPhoto, Comment } from '../interfaces/unsplashInterfaces';
import { useUser } from '../contexts/UserContext';
import { useLikesComments } from '../hooks/useLikesComments';

export const CommentScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { photo }: { photo: InstagramPhoto } = route.params;
    const { currentUser } = useUser();
    const { comments, handleComment, deleteComment, loadComments, isLoadingComments } = useLikesComments(photo.id);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        loadComments();
    }, []);

    const displayText = photo.description || photo.alt_description || "Sin descripción";

    const renderComment = ({ item }: { item: Comment }) => (
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
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#E0E0E0" />
                </TouchableOpacity>
                <Text style={styles.title}>Comentarios</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView style={styles.content}>
                <View style={styles.postContainer}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {photo.user.name.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.username} numberOfLines={1}>
                                {photo.user.username}
                            </Text>
                        </View>
                    </View>
                    <Image
                        style={styles.photo}
                        source={{ uri: photo.thumb }}
                        resizeMode="cover"
                    />
                    <View style={styles.caption}>
                        <Text style={styles.username} numberOfLines={1}>
                            {photo.user.username}
                        </Text>
                        <Text style={styles.captionText} numberOfLines={2}>
                            {displayText}
                        </Text>
                    </View>
                </View>
                <View style={styles.commentsSection}>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderComment}
                        scrollEnabled={false}
                        ListEmptyComponent={
                            <Text style={styles.noComments}>No hay comentarios aún.</Text>
                        }
                    />
                </View>
            </ScrollView>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#121212',
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E1E',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E0E0',
    },
    content: {
        flex: 1,
    },
    postContainer: {
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
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
    photo: {
        width: Dimensions.get('window').width,
        aspectRatio: 1,
        backgroundColor: '#1E1E1E',
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
    commentsSection: {
        paddingHorizontal: 14,
        paddingBottom: 12,
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
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
    noComments: {
        fontSize: 14,
        color: '#B0B0B0',
        textAlign: 'center',
        marginTop: 16,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#1E1E1E',
        backgroundColor: '#121212',
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
