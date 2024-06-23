import React, { useState, useEffect } from 'react';
import styles from './NasaAPOD.module.css';

const API_KEY = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

function Nasa() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAPOD();
  }, []);

  const fetchAPOD = () => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setApodData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('An error occurred while fetching the data');
        setLoading(false);
      });
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!apodData) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NASA Astronomy Picture of the Day</h1>
      <h2 className={styles.imageTitle}>{apodData.title}</h2>
      <p className={styles.date}>Date: {apodData.date}</p>
      <div className={styles.mediaContainer}>
        {apodData.media_type === 'image' ? (
          <img className={styles.image} src={apodData.url} alt={apodData.title} />
        ) : (
          <iframe className={styles.video} src={apodData.url} title={apodData.title} />
        )}
      </div>
      <p className={styles.explanation}>{apodData.explanation}</p>
    </div>
  );
}

export default Nasa;