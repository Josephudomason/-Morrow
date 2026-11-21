# Morrow

Morrow is a responsive home goods storefront built with **Node.js**, **Express**, and **EJS**. It demonstrates server-rendered product listings, search, category filtering, and a reusable EJS partial structure.

## Features

- Responsive storefront layout for desktop and mobile
- Product search by name, category, or color
- Category filters and client-side price sorting
- Product cards with demo add-to-bag and favorite interactions
- Newsletter signup interaction
- Reusable EJS partials for page sections and product cards

The cart, favorites, and newsletter signup are front-end demonstrations. They are not stored between visits and do not connect to a payment or email service.

## Requirements

- Node.js 18 or later
- npm

## Getting started

Install the dependencies:

```sh
npm install
```

Start the development server with Node's watch mode:

```sh
npm run dev
```

Or start the app normally:

```sh
npm start
```

By default, the storefront is available at [http://localhost:8000](http://localhost:8000). Set the `PORT` environment variable to use a different port.

## Routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Displays the storefront. Accepts optional `category`, `q`, and `cart` query parameters. |
| `POST` | `/cart/:id` | Demo add-to-bag action for a product. Redirects to the storefront with the updated count. |

Example URLs:

```text
/?category=Objects
/?q=linen
/?category=Furniture&q=chair
```

## Project structure

```text
.
├── data/
│   └── products.js              # Product catalog and category names
├── public/
│   ├── app.js                   # Storefront interactions
│   └── styles.css               # Responsive styles
├── views/
│   ├── home.ejs                 # Page composition
│   └── partials/
│       ├── head.ejs
│       ├── header.ejs
│       ├── hero.ejs
│       ├── intro.ejs
│       ├── shop.ejs
│       ├── product-card.ejs
│       ├── quote.ejs
│       ├── newsletter.ejs
│       └── footer.ejs
├── index.js                     # Express app and routes
├── package.json
└── README.md
```

## Updating the catalog

Edit the `products` array in `data/products.js`. Each product has an `id`, `name`, `category`, `price`, `color`, `image`, and optional `tag`. Product images use Unsplash photo IDs and are loaded remotely. Keep the `categories` list in the same file aligned with the categories assigned to products.

## Implementation notes

- Express renders `views/home.ejs` with EJS.
- The home view composes page sections with EJS `include()` calls from `views/partials/`.
- Product values are rendered with EJS's escaped output tag (`<%=`).
- Google Fonts and Unsplash images are external resources, so they require an internet connection to load.
