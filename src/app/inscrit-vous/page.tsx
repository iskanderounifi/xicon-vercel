import React from 'react';
import Footer from '../components/home/footer';
import RegisterForm from '../components/inscrit/inscritVous';
import Header from '../components/header_main';

// Ajoute la logique pour router l'inscription user vers l'API appropriée
// Exemple d'utilisation d'une fonction pour POST vers /api/auth/register côté composant RegisterForm

const SommePage = () => {
  return (
    <div className="">
      <Header />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default SommePage;




