import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Comment } from '../interfaces/unsplashInterfaces';
import { useUser } from '../contexts/UserContext';
import { useLikesComments } from '../hooks/useLikesComments';

export const UserCommentsScreen = () => {
    const navigation = useNavigation<any>();
    const { currentUser } = useUser();
    const { getUserComments, deleteComment } = useLikesComments();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (currentUser && isFocused) {
            loadUserComments();
        }
    }, [currentUser, isFocused]);

    const loadUserComments = async () => {
        if (!currentUser) return;

        const data = await getUserComments();

        setComments(data);
        setIsLoading(false);
    };

    const handleDeleteComment = (commentId: string) => {
        Alert.alert(
            'Eliminar comentario',
            '¿Estás seguro de que quieres eliminar este comentario?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteComment(commentId);
                        setComments(prev => prev.filter(comment => comment.id.toString() !== commentId));
                    }
                }
            ]
            );
        };
        
        const renderComment = ({ item, handleDeleteComment }: { item: Comment, handleDeleteComment: (id: string) => void }) => (
            <View style={styles.commentCard}>
                <View style={styles.commentHeader}>
                    <Text style={styles.commentText}>{item.comentario}</Text>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteComment(item.id.toString())}
                    >
                        <Feather name="trash-2" size={20} color="#B0B0B0" />
                    </TouchableOpacity>
                </View>
            </View>
        );
        
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#121212',
            },
            centered: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
            listContainer: {
                padding: 16,
            },
            commentCard: {
                backgroundColor: '#1E1E1E',
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
            },
            commentHeader: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
            },
            avatar: {
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 12,
                backgroundColor: '#121212',
            },
            username: {
                fontSize: 14,
                fontWeight: 'bold',
                color: '#E0E0E0',
            },
            timestamp: {
                fontSize: 12,
                color: '#B0B0B0',
            },
            deleteButton: {
                padding: 4,
            },
            commentText: {
                fontSize: 16,
                color: '#E0E0E0',
                lineHeight: 22,
            },
            emptyContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 32,
            },
            emptyText: {
                fontSize: 18,
                color: '#E0E0E0',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: 8,
            },
            emptySubtext: {
                fontSize: 14,
                color: '#B0B0B0',
                textAlign: 'center',
            },
        });

        if (isLoading) {
            return (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#E0E0E0" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={24} color="#E0E0E0" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Mis Comentarios</Text>
                    <View style={{ width: 24 }} />
                </View>
                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderComment({ item, handleDeleteComment })}
                    contentContainerStyle={comments.length === 0 ? styles.emptyContainer : styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No tienes comentarios</Text>
                            <Text style={styles.emptySubtext}>Los comentarios que hagas aparecerán aquí</Text>
                        </View>
                    }
                />
            </View>
        );
    };
