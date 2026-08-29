# 🎵 Offline Music Player

A beautiful, responsive offline music player that works entirely in your browser. Play your MP3 files locally without needing internet connection or server backend.

## Features

- **Local File Playback** - Load and play MP3 files directly from your computer
- **Full Player Controls** - Play, pause, stop, previous, and next track buttons
- **Playlist Management** - Add, remove, and manage multiple tracks
- **Progress Tracking** - Visual progress bar with current time and duration display
- **Volume Control** - Adjustable volume slider (0-100%)
- **Auto Play Next** - Automatically plays the next track when current song ends
- **Click to Seek** - Click on the progress bar to jump to any point in the track
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI** - Beautiful gradient design with smooth animations
- **No Backend Required** - Runs completely in the browser using the Web Audio API

## How to Use

1. **Open the Application**
   - Simply open `index.html` in your web browser

2. **Add Music Files**
   - Click the "+ Add MP3 Files" button
   - Select one or more MP3 files from your computer
   - Files will be added to your playlist

3. **Control Playback**
   - **Play** - Start playing the first track or resume paused track
   - **Pause** - Pause the current track
   - **Stop** - Stop playback and reset to beginning
   - **Previous** - Jump to the previous track
   - **Next** - Skip to the next track

4. **Adjust Volume**
   - Use the volume slider to adjust playback volume

5. **Manage Playlist**
   - Click on any track in the playlist to play it
   - Click the "Remove" button on a track to delete it from playlist
   - Click "Clear All" to remove all tracks at once

## Technical Details

### Browser Compatibility
- Works on all modern browsers that support:
  - HTML5 Audio API
  - File API
  - ES6 JavaScript

### Supported Formats
- MP3 files only (`.mp3`)

### How It Works
- Uses the HTML5 `<audio>` element for audio playback
- File API's `URL.createObjectURL()` to load local files
- Real-time progress tracking with time formatting
- Smooth animations and transitions for better UX

## File Structure

```
offine-music/
├── index.html      # Single file containing HTML, CSS, and JavaScript
└── README.md       # This file
```

## Installation

No installation required! Simply:
1. Download or clone this project
2. Open `index.html` in any web browser
3. Start adding MP3 files and enjoy!

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- MP3 audio files
- No internet connection needed for playback

## Tips & Tricks

- **Keyboard Friendly** - Click buttons to control playback
- **Multiple Selection** - You can select multiple MP3 files at once when adding to playlist
- **Fast Seeking** - Click anywhere on the progress bar to jump to that point
- **Loop Playback** - The player automatically loops back to the first track after the last one finishes
- **File Size** - Large playlists don't affect performance as files are accessed locally

## Performance

- Lightweight and fast - no external dependencies
- All processing happens in your browser
- Your files never leave your computer

## Privacy

✅ **Your privacy is protected**
- No data is sent to any server
- No tracking or analytics
- All processing happens locally on your device
- No account or login required

## Limitations

- Only supports MP3 format (can be extended to support other formats)
- Files must be loaded each session (not persisted locally)
- Playback depends on browser's audio capabilities

## Future Enhancements

Possible improvements for future versions:
- Support for additional audio formats (WAV, FLAC, OGG)
- Local storage persistence
- Playlist save/export functionality
- Equalizer controls
- Shuffle and repeat modes
- Search and filter in playlist
- Keyboard shortcuts

## License

Free to use and modify for personal use.

## Support

For issues or suggestions, feel free to modify the code to suit your needs!

---

**Enjoy your music! 🎶**
