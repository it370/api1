# Simple GitHub Pages REST API

A vanilla JavaScript REST API that can be deployed to GitHub Pages. This API allows you to serve JSON data with simple filtering capabilities.

## Usage

### Basic GET Request
To retrieve data from a JSON file, use the following URL format:

```
https://<your-github-username>.github.io/<repo-name>/<filename>
```

This will return the contents of the JSON file located at `data/<filename>.json` in the repository.

### Filtering Data
To filter the data, add query parameters to the URL:

```
https://<your-github-username>.github.io/<repo-name>/<filename>?id=3
```

This will return only the objects in the JSON file where the `id` field equals `3`.

## Deployment

1. Push this repository to GitHub
2. Enable GitHub Pages for the repository in the repository settings
3. Make sure to select the main branch as the source

## Adding Data

To add new data, simply add JSON files to the `data/` directory in your repository. The files will be accessible via the API using their filenames (without the `.json` extension).

## Limitations

- This is a static API, meaning it only supports GET operations
- GitHub Pages only serves static content, so there's no server-side processing
- All filtering is done client-side using JavaScript 