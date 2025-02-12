# URL Shortener

## Project Overview

This project is a URL Shortener service that allows users to shorten long URLs into more manageable, compact links. The service provides a simple API to create, manage, and retrieve shortened URLs. This is a one-time use URL shortener where the shortened URL can be accessed only once.

## Features

- Shorten long URLs
- Redirect to original URLs using the shortened link (one-time use)
- Track the number of times a shortened URL has been accessed
- Simple and easy-to-use API

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/url_shortener.git
    ```
2. Navigate to the project directory:
    ```sh
    cd url_shortener
    ```
3. Install the required dependencies:
    ```sh
    yarn install
    ```

## Usage

1. Start the server:
    ```sh
    yarn dev
    ```
2. Use the API to shorten URLs:
    - **POST /shorten**: Create a shortened URL
    - **GET /:shortUrl**: Redirect to the original URL (one-time use)
    - **GET /stats/:shortUrl**: Get statistics for a shortened URL

## API Endpoints

- **POST /shorten**
    - Request: `{ "url": "https://example.com" }`
    - Response: `{ "shortUrl": "http://yourdomain.com/abc123" }`

- **GET /:shortUrl**
    - Redirects to the original URL (one-time use)

- **GET /stats/:shortUrl**
    - Response: `{ "originalUrl": "https://example.com", "clicks": 1 }`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
