# Simple GitHub Pages REST API

A vanilla JavaScript REST API that can be deployed to GitHub Pages. This API uses URL hash fragments to serve JSON data with simple filtering capabilities.

## Usage

### Basic GET Request
To retrieve data from a JSON file, use the following URL format with hash (#):

```
https://<your-github-username>.github.io/<repo-name>/#/<filename>
```

This will return the contents of the JSON file located at `data/<filename>.json` in the repository.

### Examples
For a repository named "api1":
- Get all users: `https://<your-github-username>.github.io/api1/#/users`
- Get products: `https://<your-github-username>.github.io/api1/#/products`

### Filtering Data
To filter the data, add query parameters after the hash URL:

```
https://<your-github-username>.github.io/<repo-name>/#/<filename>?id=3
```

This will return only the objects in the JSON file where the `id` field equals `3`.

### Filter Examples
- Get user with ID 3: `https://<your-github-username>.github.io/api1/#/users?id=3`
- Get electronics category: `https://<your-github-username>.github.io/api1/#/products?category=electronics`

## How It Works

1. The API uses client-side routing with URL hash fragments (`#/filename`)
2. When a hash URL is accessed, JavaScript reads the requested filename
3. The API fetches the corresponding JSON file from the `data/` directory
4. If query parameters are provided, the data is filtered accordingly
5. Results are displayed on the page in a formatted JSON view

## Local Testing

To test the API locally:

1. Run the included Node.js server:
   ```
   node server.js
   ```
2. Open your browser and navigate to:
   - http://localhost:3000/#/users
   - http://localhost:3000/#/products
   - http://localhost:3000/#/users?id=3

## Deployment

1. Push this repository to GitHub
2. Enable GitHub Pages for the repository in Settings > Pages
3. Select the main branch as the source and click Save
4. Wait for deployment to complete (usually takes a few minutes)

## Adding Data

To add new data, simply add JSON files to the `data/` directory in your repository. The files will be accessible via the API using their filenames (without the `.json` extension).

## Limitations

- This is a client-side API, meaning it only supports GET operations
- All data is loaded and filtered in the browser
- GitHub Pages only serves static content 