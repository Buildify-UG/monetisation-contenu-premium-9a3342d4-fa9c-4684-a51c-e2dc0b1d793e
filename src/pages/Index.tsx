import React, { useState } from 'react';
import { Play, Download, Music, Film, Tv, BookOpen, Phone, X, Check } from 'lucide-react';

interface Content {
  id: string;
  title: string;
  category: 'music' | 'series' | 'film' | 'anime';
  price: number;
  duration: number; // en minutes
  image: string;
}

interface PaymentModal {
  isOpen: boolean;
  content: Content | null;
  action: 'download' | 'watch';
}

const Index = () => {
  const [paymentModal, setPaymentModal] = useState<PaymentModal>({
    isOpen: false,
    content: null,
    action: 'download'
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const contents: Content[] = [
    // Musiques
    { id: '1', title: 'Album Succès 2024', category: 'music', price: 500, duration: 45, image: '🎵' },
    { id: '2', title: 'Hits Africains', category: 'music', price: 500, duration: 60, image: '🎶' },
    { id: '3', title: 'Jazz Relaxant', category: 'music', price: 500, duration: 90, image: '🎷' },
    
    // Séries
    { id: '4', title: 'Série Action Elite', category: 'series', price: 2000, duration: 45, image: '📺' },
    { id: '5', title: 'Drame Passion', category: 'series', price: 2000, duration: 50, image: '🎬' },
    { id: '6', title: 'Comédie Hilarante', category: 'series', price: 1500, duration: 40, image: '😂' },
    
    // Films
    { id: '7', title: 'Film Blockbuster', category: 'film', price: 3000, duration: 120, image: '🎭' },
    { id: '8', title: 'Thriller Suspense', category: 'film', price: 3000, duration: 110, image: '👁️' },
    { id: '9', title: 'Romance Émotion', category: 'film', price: 2500, duration: 105, image: '💕' },
    
    // Dessins animés
    { id: '10', title: 'Aventure Fantastique', category: 'anime', price: 1500, duration: 25, image: '🐉' },
    { id: '11', title: 'Magie et Mystère', category: 'anime', price: 1500, duration: 25, image: '✨' },
    { id: '12', title: 'Combat Épique', category: 'anime', price: 1500, duration: 25, image: '⚡' },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'music': return <Music className="w-5 h-5" />;
      case 'series': return <Tv className="w-5 h-5" />;
      case 'film': return <Film className="w-5 h-5" />;
      case 'anime': return <BookOpen className="w-5 h-5" />;
      default: return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      music: 'Musique',
      series: 'Série',
      film: 'Film',
      anime: 'Dessin Animé'
    };
    return labels[category] || category;
  };

  const openPaymentModal = (content: Content, action: 'download' | 'watch') => {
    setPaymentModal({ isOpen: true, content, action });
    setPhoneNumber('');
    setPaymentSuccess(false);
  };

  const handlePayment = async () => {
    if (!phoneNumber.trim()) {
      alert('Veuillez entrer votre numéro de téléphone');
      return;
    }

    setProcessingPayment(true);
    
    // Simulation de traitement de paiement
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentSuccess(true);
      
      // Fermer après 2 secondes
      setTimeout(() => {
        setPaymentModal({ isOpen: false, content: null, action: 'download' });
      }, 2000);
    }, 2000);
  };

  const contentByCategory = {
    music: contents.filter(c => c.category === 'music'),
    series: contents.filter(c => c.category === 'series'),
    film: contents.filter(c => c.category === 'film'),
    anime: contents.filter(c => c.category === 'anime'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎬</div>
            <h1 className="text-2xl font-bold text-gray-900">StreamVault RDC</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>+243 892 804 943</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Votre Plateforme de Streaming Premium</h2>
          <p className="text-lg opacity-90">Musiques • Séries • Films • Dessins Animés</p>
        </div>
      </section>

      {/* Contenu */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Musiques */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Music className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900">Musiques</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentByCategory.music.map(content => (
              <ContentCard 
                key={content.id} 
                content={content} 
                onAction={openPaymentModal}
              />
            ))}
          </div>
        </section>

        {/* Séries */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Tv className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Séries</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentByCategory.series.map(content => (
              <ContentCard 
                key={content.id} 
                content={content} 
                onAction={openPaymentModal}
              />
            ))}
          </div>
        </section>

        {/* Films */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Film className="w-6 h-6 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-900">Films</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentByCategory.film.map(content => (
              <ContentCard 
                key={content.id} 
                content={content} 
                onAction={openPaymentModal}
              />
            ))}
          </div>
        </section>

        {/* Dessins Animés */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-pink-600" />
            <h3 className="text-2xl font-bold text-gray-900">Dessins Animés</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentByCategory.anime.map(content => (
              <ContentCard 
                key={content.id} 
                content={content} 
                onAction={openPaymentModal}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Modal de Paiement */}
      {paymentModal.isOpen && paymentModal.content && (
        <PaymentModal 
          content={paymentModal.content}
          action={paymentModal.action}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onPayment={handlePayment}
          isProcessing={processingPayment}
          isSuccess={paymentSuccess}
          onClose={() => setPaymentModal({ isOpen: false, content: null, action: 'download' })}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">StreamVault RDC © 2024</p>
          <p className="text-sm">Tous les contenus sont autorisés et licenciés</p>
          <p className="text-sm mt-2">Contact: +243 892 804 943</p>
        </div>
      </footer>
    </div>
  );
};

interface ContentCardProps {
  content: Content;
  onAction: (content: Content, action: 'download' | 'watch') => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onAction }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="bg-gradient-to-br from-purple-400 to-blue-400 h-40 flex items-center justify-center text-6xl">
        {content.image}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-purple-600 uppercase">
            {content.category === 'music' ? '🎵' : 
             content.category === 'series' ? '📺' :
             content.category === 'film' ? '🎬' : '🐉'}
          </span>
        </div>
        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{content.title}</h4>
        <p className="text-sm text-gray-600 mb-4">{content.duration} min</p>
        <div className="flex gap-2">
          <button
            onClick={() => onAction(content, 'download')}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-semibold">{content.price} FC</span>
          </button>
          <button
            onClick={() => onAction(content, 'watch')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-semibold">{Math.ceil(content.price * 0.7)} FC</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface PaymentModalProps {
  content: Content;
  action: 'download' | 'watch';
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  onPayment: () => void;
  isProcessing: boolean;
  isSuccess: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  content,
  action,
  phoneNumber,
  setPhoneNumber,
  onPayment,
  isProcessing,
  isSuccess,
  onClose
}) => {
  const amount = action === 'download' ? content.price : Math.ceil(content.price * 0.7);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Confirmation de Paiement</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isSuccess ? (
          <>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Contenu</p>
              <p className="font-bold text-gray-900 mb-4">{content.title}</p>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Action</span>
                  <span className="font-semibold text-gray-900">
                    {action === 'download' ? 'Télécharger' : 'Regarder'}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Durée</span>
                  <span className="font-semibold text-gray-900">{content.duration} min</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Montant Total</span>
                  <span className="font-bold text-purple-600 text-lg">{amount} FC</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Numéro Mobile Money
              </label>
              <input
                type="tel"
                placeholder="+243 8XX XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <p className="text-xs text-gray-500 mt-2">Orange Money ou Vodacom Money</p>
            </div>

            <button
              onClick={onPayment}
              disabled={isProcessing}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {isProcessing ? 'Traitement...' : `Payer ${amount} FC`}
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Paiement Réussi!</h4>
            <p className="text-gray-600 mb-4">Accès accordé à "{content.title}"</p>
            <p className="text-sm text-gray-500">Redirection en cours...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
