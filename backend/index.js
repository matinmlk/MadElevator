const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const exif = require('exif-reader');
const sizeOf = require('buffer-image-size');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("fetch_url", async (url) => {
        console.log(`Fetching: ${url}`);

        if (!url.startsWith("http")) {
            socket.emit("error", "Invalid URL format");
            return;
        }

        try {
            const response = await axios.get(url, { timeout: 10000 });
            const $ = cheerio.load(response.data);
            let content = $("body a");
            let imgs = $("body img");

            // Handle links
            for (let i = 0; i < content.length; i++) {
                let link = content[i].attribs["href"];
                if (link && link.startsWith("http")) {
                    socket.emit("link_found", link);
                }
            }

            // Handle images
            for (let i = 0; i < imgs.length; i++) {
                let imgSrc = imgs[i].attribs["src"];
                if (!imgSrc) continue;

                // Convert relative URLs to absolute
                const imgUrl = imgSrc.startsWith("http")? imgSrc:null;

                if (imgUrl) {
                    try {
                        // Fetch image data
                        const imageResponse = await axios.get(imgUrl, {
                            responseType: 'arraybuffer',
                            timeout: 5000
                        });

                        // Get image dimensions and type
                        const buffer = Buffer.from(imageResponse.data);
                        const dimensions = sizeOf(buffer);

                        let imageData = {
                            url: imgUrl,
                            width: dimensions.width,
                            height: dimensions.height,
                            type: dimensions.type || dimensions.mime?.split('/')[1] || 'unknown',
                            size: buffer.length
                        };


                        socket.emit("image_found", imageData);
                    } catch (imgError) {
                        console.error(`Failed to process image: ${imgUrl}`, imgError.message);
                    }
                }
            }

            socket.emit("done", "Content loaded successfully.");
        } catch (error) {
            socket.emit("error", `Failed to fetch content: ${error.message}`);
            console.error("Error:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(5000, () => console.log("Server running on port 5000"));
