import { useEffect, useState } from 'react';
import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { STATUS_STEPS, WHATSAPP_MESSAGE } from './constants';
import HomeScreen from './screens/HomeScreen';
import RequestScreen from './screens/RequestScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import TrackScreen from './screens/TrackScreen';
import AdminScreen from './screens/AdminScreen';

// App centraliza a navegação simples por estado para reduzir cliques e complexidade.
export default function App() {
  const [screen, setScreen] = useState('home');
  const [trackingId, setTrackingId] = useState('');
  const [latestOrder, setLatestOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  // Escuta os pedidos em tempo real no Firebase quando configurado.
  useEffect(() => {
    if (!db) return undefined;

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      setOrders(list);
    });

    return unsubscribe;
  }, []);

  // Lê código de acompanhamento da URL para abrir direto no status.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const track = params.get('track');
    if (track) {
      setTrackingId(track);
      setScreen('track');
    }
  }, []);

  // Cria novo pedido no Firebase (ou memória local se Firebase não estiver configurado).
  const handleCreateOrder = async (payload) => {
    if (db) {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...payload,
        status: STATUS_STEPS[0],
        createdAt: Date.now(),
      });

      const createdOrder = { id: docRef.id, ...payload, status: STATUS_STEPS[0] };
      setLatestOrder(createdOrder);
      setTrackingId(docRef.id);
      setScreen('confirmation');
      return;
    }

    const localId = `LOCAL-${Date.now()}`;
    const createdOrder = {
      id: localId,
      ...payload,
      status: STATUS_STEPS[0],
      createdAt: Date.now(),
    };
    setOrders((prev) => [createdOrder, ...prev]);
    setLatestOrder(createdOrder);
    setTrackingId(localId);
    setScreen('confirmation');
  };

  // Atualiza status de um pedido no painel admin.
  const handleUpdateStatus = async (orderId, newStatus) => {
    if (db) {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      return;
    }

    setOrders((prev) => prev.map((item) => (item.id === orderId ? { ...item, status: newStatus } : item)));
  };

  // Link rápido para WhatsApp com texto automático.
  const whatsappUrl = `https://wa.me/5500000000000?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <HomeScreen
          onRequest={() => setScreen('request')}
          onTrack={() => setScreen('track')}
          onAdmin={() => setScreen('admin')}
          whatsappUrl={whatsappUrl}
        />
      )}

      {screen === 'request' && <RequestScreen onSubmit={handleCreateOrder} onBack={() => setScreen('home')} />}

      {screen === 'confirmation' && (
        <ConfirmationScreen
          orderId={trackingId}
          onTrack={() => setScreen('track')}
          onHome={() => setScreen('home')}
        />
      )}

      {screen === 'track' && (
        <TrackScreen
          orders={orders}
          trackingId={trackingId}
          setTrackingId={setTrackingId}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'admin' && (
        <AdminScreen
          orders={orders}
          statusSteps={STATUS_STEPS}
          onUpdateStatus={handleUpdateStatus}
          onBack={() => setScreen('home')}
        />
      )}

      {latestOrder && (
        <button className="floating-track" onClick={() => setScreen('track')}>
          📍 Ver meu pedido
        </button>
      )}
    </div>
  );
}
