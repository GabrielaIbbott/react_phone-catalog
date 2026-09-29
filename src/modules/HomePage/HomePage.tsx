import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const hotPrices = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 8);

  const brandNew = [...products].sort((a, b) => b.year - a.year).slice(0, 8);

  const renderProducts = (items: Product[]) => (
    <div className={styles.productsGrid}>
      {items.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <main className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <section className={styles.welcome}>
        <h2>Welcome to Nice Gadgets</h2>
        <p>Discover your next favorite device.</p>
      </section>

      {loading && <p>Loading products...</p>}

      {error && (
        <p className={styles.error}>
          Something went wrong. Please try again later.
        </p>
      )}

      {!loading && !error && (
        <>
          <section className={styles.section}>
            <h2>Hot prices</h2>
            {renderProducts(hotPrices)}
          </section>

          <section className={styles.section}>
            <h2>Shop by category</h2>

            <div className={styles.categories}>
              <Link to="/phones" className={styles.category}>
                <h3>Mobile phones</h3>
                <p>
                  {
                    products.filter(product => product.category === 'phones')
                      .length
                  }{' '}
                  models
                </p>
              </Link>

              <Link to="/tablets" className={styles.category}>
                <h3>Tablets</h3>
                <p>
                  {
                    products.filter(product => product.category === 'tablets')
                      .length
                  }{' '}
                  models
                </p>
              </Link>

              <Link to="/accessories" className={styles.category}>
                <h3>Accessories</h3>
                <p>
                  {
                    products.filter(
                      product => product.category === 'accessories',
                    ).length
                  }{' '}
                  models
                </p>
              </Link>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Brand new</h2>
            {renderProducts(brandNew)}
          </section>
        </>
      )}
    </main>
  );
};
