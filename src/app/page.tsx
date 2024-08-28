
"use client";

import { useState, useEffect } from "react";
import Layout from "../Components/Layout"; 
import Splash from "../Components/Splash";
import Explore from "../Components/Explore"; // Import the Explore component
import styles from "./page.module.css";



export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />; 
  }

  return (
    <Layout>
      <main className={styles.main}>
        <Explore /> {/* Render the Explore component */}
        
      </main>
    </Layout>
  );
}
