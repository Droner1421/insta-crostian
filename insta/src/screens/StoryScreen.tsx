import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export const StoryScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { story } = route.params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            if (currentIndex < story.photos.length - 1) {
                flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            } else {
                navigation.goBack();
            }
        }, 3000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image source={{ uri: story.avatar }} style={styles.avatar} />
                    <Text style={styles.username}>{story.username}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.pagination}>
                {story.photos.map((_: any, index: number) => (
                    <View key={index} style={[styles.paginationDot, { backgroundColor: index === currentIndex ? '#BB86FC' : '#888' }]} />
                ))}
            </View>
            <FlatList
                ref={flatListRef}
                data={story.photos}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.storyImage} />
                )}
            />
        </SafeAreaView>
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
        padding: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        color: '#E0E0E0',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        color: '#E0E0E0',
        fontSize: 24,
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    storyImage: {
        width: width,
        height: '85%',
        borderRadius: 8,
    },
});
