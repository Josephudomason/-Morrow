import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories, products } from './data/products.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const requestedCategory = typeof req.query.category === 'string' ? req.query.category : 'All';
  const category = categories.includes(requestedCategory) ? requestedCategory : 'All';
  const search = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = !search || `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  res.render('home', {
    products: filtered,
    categories,
    selectedCategory: category,
    search,
    cartCount: Number(req.query.cart) || 0
  });
});

app.post('/cart/:id', (req, res) => {
  const exists = products.some((product) => product.id === req.params.id);
  const currentCount = Number.parseInt(req.body.count, 10);
  const count = Math.min(99, Math.max(0, Number.isFinite(currentCount) ? currentCount : 0) + (exists ? 1 : 0));
  const category = categories.includes(req.body.category) ? req.body.category : 'All';
  res.redirect(`/?cart=${count}${category !== 'All' ? `&category=${encodeURIComponent(category)}` : ''}`);
});

app.use((_req, res) => res.status(404).send('Page not found'));

app.listen(port, () => console.log(`Morrow is ready at http://localhost:${port}`));
