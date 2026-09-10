const play = require('play-dl');

module.exports = async (req, res) => {
    try {
        const videoURL = req.query.url;
        if (!videoURL) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const stream = await play.stream(videoURL);

        res.setHeader('Content-Disposition', 'attachment; filename="wblzy_video.mp4"');
        res.setHeader('Content-Type', 'video/mp4');

        stream.stream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process video stream' });
    }
};
