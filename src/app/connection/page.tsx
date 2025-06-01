import React from 'react';
import Header from '../components/header_main';
// Remove unused import
// import HeroSection from '../components/home/hero-section';
import Footer from '../components/home/footer';
import LoginForm from '../components/login/login-in';

const SommePage = () => {
  // Ici, LoginForm ne doit router que les users classiques vers /dashboard.
  // L'admin doit se connecter ailleurs (ex: /admin/login).
  return (
    <div className="">
      <Header />
      <LoginForm /* onLoginSuccess={() => router.push("/dashboard")} */ />
      <Footer />
    </div>
  );
};

export default SommePage;




