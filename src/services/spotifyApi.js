/**
 * Spotify API Integration Service
 * 
 * Simulates searching for tracks and retrieving metadata.
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const spotifyApi = {
    // Simulate searching for tracks
    searchTracks: async (query) => {
        if (!query) return [];
        await delay(800);

        // Mock results inspired by real Spotify data
        const mockTracks = [
            { id: '1', name: 'Stay', artist: 'The Kid LAROI & Justin Bieber', albumArt: 'https://i.scdn.co/image/ab67616d0000b273417ee03d641121665a58920a', previewUrl: 'https://p.scdn.co/mp3-preview/a6d09c2a688f8d68962a93910c6d7eec43b1f13b' },
            { id: '2', name: 'Blinding Lights', artist: 'The Weeknd', albumArt: 'https://i.scdn.co/image/ab67616d0000b2738863bc1105479dc075783fae', previewUrl: 'https://p.scdn.co/mp3-preview/b6892c6e612988126e843818e6e5828882888288' },
            { id: '3', name: 'Heat Waves', artist: 'Glass Animals', albumArt: 'https://i.scdn.co/image/ab67616d0000b2739eeed219662706e2361ef53d', previewUrl: 'https://p.scdn.co/mp3-preview/9f38ea8f306d87f7e28329606a2826a7608f08f8' },
            { id: '4', name: 'As It Was', artist: 'Harry Styles', albumArt: 'https://i.scdn.co/image/ab67616d0000b273b46b7397d8e4802495d47971', previewUrl: 'https://p.scdn.co/mp3-preview/d8227b828842af4f4f464d4b4a25925200222222' },
            { id: '5', name: 'Bad Habits', artist: 'Ed Sheeran', albumArt: 'https://i.scdn.co/image/ab67616d0000b273ba9a18764020a59a9301931a', previewUrl: 'https://p.scdn.co/mp3-preview/3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d' }
        ];

        return mockTracks.filter(track =>
            track.name.toLowerCase().includes(query.toLowerCase()) ||
            track.artist.toLowerCase().includes(query.toLowerCase())
        );
    }
};
