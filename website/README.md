# RG Automation Website

This is the static website for RG Automation. It is ready to be hosted on Cloudflare Pages or any other static site hosting service.

## Project Structure

```
website/
├── index.html      # Main HTML file
├── style.css       # Stylesheet
├── script.js       # JavaScript logic
├── data.json       # Data for Products and Partners
└── assets/         # Images and other assets
    ├── img/
    ├── partners/
    └── products/
```

## How to Deploy to Cloudflare Pages

1.  **Log in to Cloudflare Dashboard** and go to **Pages**.
2.  Click **Create a project** > **Direct Upload**.
3.  Upload the `website` folder (the folder containing `index.html`).
4.  Cloudflare will deploy your site instantly.

## Local Development

To test the site locally:

1.  Open the `website` folder.
2.  Start a simple HTTP server. For example, using Python:
    ```bash
    python3 -m http.server
    ```
3.  Open `http://localhost:8000` in your browser.
