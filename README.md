# Application Overview

## Backend
The backend of this application is designed to receive URLs via **Socket.io** and fetch the content using the **Axios** library. It processes the fetched HTML using **Cheerio**, extracting specific elements like `<a>` and `<img>`. Additionally, the backend utilizes **Exif** and **buffer-image-size** to extract metadata, which is then sent back to the existing socket connection.

![ Screenshot of Application ](https://github.com/matinmlk/MadElevator/blob/main/images/Screenshot%202025-03-09%20121555.png?raw=true)

### Key Features:
- **Socket.io Integration**: Receives URLs dynamically.
- **Axios for Fetching**: Retrieves web page content.
- **Cheerio for Parsing**: Extracts specific HTML elements.
- **Metadata Extraction**: Uses **Exif** and **buffer-image-size** to provide necessary metadata.
- **Error Handling**: All requests have a specific timeout, and any failures are reported back to the client.

---

## Frontend
The frontend is built using **React** and consists of three main components that display the details received from the backend.

### Components:

#### 1. Quick Link
- A utility component used for testing with four different URLs.
- Fetches data upon clicking a URL for quick validation.

#### 2. Link Retrieval Component
- The primary component responsible for retrieving links from the backend.
- Handles click events to replace the main URL with the analyzed result.
- Implements an expandable section that loads additional links in batches of 20 upon user request.

![ Expandable links ](https://github.com/matinmlk/MadElevator/blob/main/images/Screenshot%202025-03-09%20121612.png?raw=true)

#### 3. Image Display Component
- Renders all images retrieved from the backend.
- Displays metadata information under each image card.

![Loading images from the website](https://github.com/user-attachments/assets/5d633e2c-db6f-4ae1-bb59-916eb829ff9d)

### Styling
- All CSS styles were consolidated into a single CSS file for maintainability and consistency.

---

This structured architecture ensures efficient URL analysis, metadata extraction, and a user-friendly interface for interacting with the results.
