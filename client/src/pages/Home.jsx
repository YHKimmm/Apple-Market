import React from 'react'
import styles from './Home.module.css'

const imageFolderPath = import.meta.env.BASE_URL + "";

function Home() {
  return (
    <main className={styles.home__container}>
      <section className={styles.section__01}>
        <img src={`${imageFolderPath}img_main.png`} alt='logo' />
        <div className={styles.home__content}>
          <h1 className={styles.home__title}>Welcome to Apple Market!</h1>
          <p className={styles.home__text}>
            Browse other's used items and sell your own unique items
          </p>
        </div>
      </section>
      <section className={styles.section__02}>
        <div className={styles.home__subContent}>
          <div className={styles.home__subtitle}>
            <h3>
              Enjoy
              Real people like you
              All of our members are
              verified and Real Review is there for you
            </h3>
            <div className={styles.subContainer}>
              <div className={styles.verified__user}>
                <span className="material-symbols-outlined">
                  admin_panel_settings
                </span>
                <span>Verified users</span>
              </div>
              <div className={styles.home__review}>
                <span className="material-symbols-outlined">
                  rate_review
                </span>
                <span>Real review</span>
              </div>
            </div>
          </div>
          <div className={styles.home__reviewImg}>
            <img src={`${imageFolderPath}img_review.png`} alt="review img" />
          </div>
        </div>
      </section>
      <section className={styles.section__03}>
        <img src={`${imageFolderPath}img_free.png`} alt="free img" />
        <div className={styles.home__subContent}>
          <h3>It's free!</h3>
          <p>We don’t charge you to enjoy apple market.</p>
          <p>Upload your precious items and Trade with your neighbours for free!</p>
        </div>
      </section>
    </main>
  )
}

export default Home
