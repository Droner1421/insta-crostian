import React from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useUnsplash } from "../hooks/useUnsplash";
import { InstagramPhotoCard } from "../components/InstagramPhotoCard";

export const HomeScreen = () => {
    const { photos, isLoadingUnsplash, refreshing, onRefresh } = useUnsplash();

    return (
        <View style={{ flex: 1, backgroundColor: '#121212' }}>
            {isLoadingUnsplash && !refreshing ? (
                <ActivityIndicator size="large" color="#BB86FC" style={{ flex: 1 }} />
            ) : (
                <FlatList
                    data={photos}
                    keyExtractor={(photo) => photo.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <InstagramPhotoCard {...item} />}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    ListEmptyComponent={
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#B0B0B0' }}>No photos found.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
};
