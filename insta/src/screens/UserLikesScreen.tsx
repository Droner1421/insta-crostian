import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import { useLikesComments } from '../hooks/useLikesComments';

export const UserLikesScreen = () => {
    const navigation = useNavigation<any>();
    const { currentUser } = useUser();
    const { getUserLikesWithPhotos, deleteLikeById } = useLikesComments();
    const isFocused = useIsFocused();

    const [photos, setPhotos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser && isFocused) loadUserLikes();
    }, [currentUser, isFocused]);

    const loadUserLikes = async () => {
        if (!currentUser) return;

        const results = await getUserLikesWithPhotos();
        setPhotos(results);

        setIsLoading(false);
    };

    const handleDeleteLike = (likeId: number, photoId: string) => {
        Alert.alert(
            'Quitar like',
            '¿Estás seguro de que quieres quitar el like a esta foto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Quitar',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteLikeById(likeId);
                        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
                    }
                }
            ]
        );
    };

    const renderPhoto = ({ item }: { item: any }) => (
        <View style={styles.photoCard}>
            <Image
                source={{ uri: item.urls.small }}
                style={styles.photo}
                resizeMode="cover"
            />
            <View style={styles.photoInfo}>
                <Text style={styles.photoUser}>@{item.user.username}</Text>
                <Text style={styles.photoDescription} numberOfLines={2}>
                    {item.description || item.alt_description || 'No description'}
                </Text>
                <TouchableOpacity
                    style={styles.unlikeButton}
                    onPress={() => handleDeleteLike(item.likeData.id, item.id)}
                >
                    <Feather name="heart" size={16} color="#121212" />
                    <Text style={styles.unlikeText}>Unlike</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#BB86FC" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#E0E0E0" />
                </TouchableOpacity>
                <Text style={styles.title}>My Likes ({photos.length})</Text>
                <View style={{ width: 24 }} />
            </View>

            {photos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>You haven't liked any photos yet</Text>
                    <Text style={styles.emptySubtext}>
                        Go explore and find some photos you like!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={photos}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                    renderItem={renderPhoto}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

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
    backButton: {
        fontSize: 24,
        color: '#E0E0E0',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E0E0',
    },
    listContainer: {
        padding: 16,
    },
    photoCard: {
        flexDirection: 'row',
        marginVertical: 8,
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        overflow: 'hidden',
    },
    photo: {
        width: 100,
        height: 100,
    },
    photoInfo: {
        flex: 1,
        padding: 12,
    },
    photoUser: {
        fontSize: 14,
        color: '#B0B0B0',
        fontWeight: '600',
        marginBottom: 4,
    },
    photoDescription: {
        fontSize: 12,
        color: '#E0E0E0',
        lineHeight: 16,
        marginBottom: 8,
    },
    unlikeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BB86FC',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    unlikeIcon: {
        fontSize: 14,
        color: '#121212',
        marginRight: 4,
    },
    unlikeText: {
        fontSize: 12,
        color: '#121212',
        fontWeight: '600',
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
