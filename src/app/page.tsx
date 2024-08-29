// "use client";

// import { useState, useEffect } from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import Layout from "../Components/Layout"; 
// import Splash from "../Components/Splash";
// import Explore from "../Components/Explore";
// import styles from "./page.module.css";

// // Create a QueryClient instance
// const queryClient = new QueryClient();

// export default function Home() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 3000); 
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <Splash />; 
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       <Layout>
//         <main className={styles.main}>
//           <Explore />
//         </main>
//       </Layout>
//     </QueryClientProvider>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../Components/Layout"; 
import Splash from "../Components/Splash";
import Explore from "../Components/Explore";
import styles from "./page.module.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure this runs only in the client
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <main className={styles.main}>
          <Explore />
        </main>
      </Layout>
    </QueryClientProvider>
  );
}
