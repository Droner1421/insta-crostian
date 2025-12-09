import { useState } from 'react';
import * as FileSystem from 'expo-file-system/legacy';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const useDownloadImage = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async (url: string, filename: string) => {
        setIsDownloading(true);

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita permiso de almacenamiento para guardar imágenes');
            setIsDownloading(false);
            return;
        }

        const tempUri = `${FileSystem.cacheDirectory}${filename}`;
        const downloadResult = await FileSystem.downloadAsync(url, tempUri);

        if (downloadResult.status === 200) {
            await MediaLibrary.saveToLibraryAsync(tempUri);
            Alert.alert('Éxito', 'Imagen guardada en la galería del dispositivo');
        } else {
            Alert.alert('Error', 'No se pudo descargar la imagen');
        }

        setIsDownloading(false);
    };

    return { handleDownload, isDownloading };
};
