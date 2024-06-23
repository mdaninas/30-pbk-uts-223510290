import { defineStore } from 'pinia';

export const useAlbumStore = defineStore('albumStore', {
    state: () => ({
        albums: [],
        photos: [],
        selectedAlbumId: null
    }),
    actions: {
        async fetchAlbums() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/albums');
                const data = await response.json();
                this.albums = data;
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        },
        async fetchPhotos() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                const data = await response.json();
                this.photos = data;
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        },
        setSelectedAlbum(albumId) {
            this.selectedAlbumId = albumId;
        }
    },
    getters: {
        filteredPhotos(state) {
            return state.photos.filter(photo => photo.albumId === state.selectedAlbumId);
        }
    }
});
