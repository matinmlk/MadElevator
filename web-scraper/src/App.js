import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import ContentDisplay from "./components/ContentDisplay";
import ImageDisplay from "./components/ImageDisplay";
import QuickLinks from "./components/QuickLinks";
import "./styles/modern.css";

const socket = io("http://localhost:5000");

function App() {
    const [url, setUrl] = useState("");
    const [content, setContent] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        socket.on("link_found", (chunk) => {
            setContent((prev) => [...prev, chunk]);
        });

        socket.on("image_found", (imageUrl) => {
            setImages((prev) => [...prev, imageUrl]);
        });

        socket.on("done", (message) => {
            console.log(message);
            setLoading(false);
        });

        socket.on("error", (error) => {
            alert(error);
            setLoading(false);
        });

        return () => {
            socket.off("link_found");
            socket.off("image_found");
            socket.off("done");
            socket.off("error");
        };
    }, []);

    const handleFetch = useCallback((e, newUrl = url) => {
        if (e) e.preventDefault();
        setUrl(newUrl);
        setContent([]);
        setImages([]);
        setLoading(true);
        socket.emit("fetch_url", newUrl);
        // Add to browser history
        window.history.pushState({ url: newUrl }, '', `?url=${encodeURIComponent(newUrl)}`);
    }, [url]);

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event) => {
            if (event.state && event.state.url) {
                handleFetch(null, event.state.url);
            }
        };

        // Set initial URL from query params if present
        const params = new URLSearchParams(window.location.search);
        const initialUrl = params.get('url');
        if (initialUrl) {
            handleFetch(null, initialUrl);
        }

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [handleFetch]);

    return (
        <div className="container">
            <div className="header">
                <h2>Web Content Fetcher</h2>
            </div>
            <QuickLinks onSelect={(url) => {
                setUrl(url);
                handleFetch(null, url);
            }} />
            <form className="search-form" onSubmit={handleFetch}>
                <input
                    className="search-input"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to fetch content"
                    required
                />
                <button className="search-button" type="submit" disabled={loading}>
                    {loading ? "Fetching..." : "Fetch Content"}
                </button>
            </form>
            <div className="content-layout">
                <div className="content-section">
                    <ContentDisplay 
                        content={content} 
                        onLinkClick={(link) => {
                            handleFetch(null, link);
                        }}
                    />
                </div>
                <div className="content-section">
                    <ImageDisplay images={images} />
                </div>
            </div>
        </div>
    );
}

export default App;
