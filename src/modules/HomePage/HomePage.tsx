import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <section className={styles.welcome}>
        <h2>Welcome to Nice Gadgets</h2>
        <p>Discover your next favorite device.</p>
      </section>
    </main>
  );
};
