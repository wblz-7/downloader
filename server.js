const express = require('express');
const cors = require('cors');
const play = require('play-dl');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('wblzy Downloader Backend is Live!');
});

app.get('/download', async (req, res) => {
    try {
        const videoURL = req.query.url;
        if (!videoURL) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const stream = await play.stream(videoURL);
        
        res.header('Content-Disposition', 'attachment; filename="wblzy_video.mp4"');
        res.header('Content-Type', 'video/mp4');
        
        stream.stream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process video stream' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
