import React from 'react';
import './AboutUs.css';
import Layout from '../Components/Layout/layout'

const AboutUs = () => {
  return (
    <Layout>
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Librazen</strong>, your one-stop destination for all your library needs!
      </p>
      <h2>Our Mission</h2>
      <p>
        At Librazen, our mission is to foster a love for reading and learning by providing easy access to a vast collection of books, resources, and innovative tools. We believe in empowering our community with knowledge, encouraging lifelong learning, and supporting personal growth.
      </p>
      <h2>Who We Are</h2>
      <p>
        Librazen is a dynamic library management system designed to cater to the needs of modern readers and library administrators alike. Our team comprises passionate bibliophiles, tech enthusiasts, and dedicated professionals who are committed to enhancing your library experience.
      </p>
      <h2>What We Offer</h2>
      <ul>
        <li><strong>Extensive Book Catalogue:</strong> Browse through our comprehensive collection of books spanning various genres, authors, and interests. From classic literature to the latest bestsellers, we have something for everyone.</li>
        <li><strong>User-Friendly Interface:</strong> Our platform is designed to be intuitive and easy to navigate, ensuring a seamless experience for all users.</li>
        <li><strong>Advanced Search and Filters:</strong> Find exactly what you're looking for with our powerful search and filtering options. Locate books by title, author, genre, and more.</li>
        <li><strong>Borrowing System:</strong> Effortlessly borrow and return books with our streamlined borrowing system. Keep track of due dates and avoid overdue fines with timely notifications.</li>
        <li><strong>User Profiles:</strong> Manage your library activities with personalized profiles. View your borrowing history, track fines, and monitor your reading progress.</li>
        <li><strong>Leaderboard and Achievements:</strong> Engage with the community through our interactive leaderboard and achievement system. Earn rewards and recognition for your reading milestones.</li>
        </ul>
      <h2>Our Vision</h2>
      <p>
        We envision a world where everyone has easy access to knowledge and the tools they need to succeed. By continually innovating and improving our services, we aim to create a library system that not only meets but exceeds the expectations of our users.
      </p>
      <h2>Join Us</h2>
      <p>
        Become a part of the Librazen community today! Whether you're a voracious reader, a student, or a casual browser, we welcome you to explore our platform and discover the endless possibilities that await.
      </p>
      <p><strong>Librazen</strong> - Enriching minds, one book at a time.</p>
    </div>
    </Layout>
  );
};

export default AboutUs;
