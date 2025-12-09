import { useState, useEffect } from "react";
import { unsplashApi } from "../api/unsplashApi";
import { UnsplashSearchResponse, UnsplashPhoto, InstagramPhoto } from "../interfaces/unsplashInterfaces";

interface UseUnsplash{
    isLoadingUnsplash: boolean;
    photos: InstagramPhoto[];
    loadPhotos: (query?: string) => void;
    refreshing: boolean;
    onRefresh: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const useUnsplash = (): UseUnsplash => {

    const [ isLoadingUnsplash, setIsLoadingUnsplash ] = useState<boolean>(false);
    const [ photos, setPhotos ] = useState<InstagramPhoto[]>([]);
    const [ refreshing, setRefreshing ] = useState<boolean>(false);
    const [ searchQuery, setSearchQuery ] = useState<string>("");

    const loadPhotos = async (query: string = "animals", isRefresh: boolean = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setIsLoadingUnsplash(true);
        }

        const response = await unsplashApi.get<UnsplashSearchResponse>(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&page=1`
        );

        mapPhotos(response.data.results, isRefresh);
    }

    const onRefresh = () => {
        loadPhotos(searchQuery || "nature", true);
    }

    const mapPhotos = (photoResults: UnsplashPhoto[], isRefresh: boolean = false) => {
        const mappedPhotos: InstagramPhoto[] = photoResults.map(photo => ({
            id: photo.id,
            url: photo.urls.regular,
            thumb: photo.urls.thumb,
            description: photo.description,
            alt_description: photo.alt_description,
            user: {
                name: photo.user.name,
                username: photo.user.username,
            },
            likes: photo.likes,
            created_at: photo.created_at,
        }));

        setPhotos(mappedPhotos);

        if (isRefresh) {
            setRefreshing(false);
        } else {
            setIsLoadingUnsplash(false);
        }
    }

    useEffect(() => {
        loadPhotos();
    },[]);

    return { isLoadingUnsplash, photos, loadPhotos, refreshing, onRefresh, searchQuery, setSearchQuery };
}
