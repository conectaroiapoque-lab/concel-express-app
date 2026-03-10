import { STATUS_STEPS } from '../constants';

// Exibe status com barra visual simples de 4 etapas.
export default function TrackScreen({ orders, trackingId, setTrackingId, onBack }) {
  const order = orders.find((item) => item.id === trackingId);
  const currentStepIndex = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <main className="screen card">
      <h2>Acompanhar Pedido</h2>
      <label>
        Código do pedido
        <input
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value.trim())}
          placeholder="Cole o código recebido"
        />
      </label>

      {!order && trackingId && <p className="info-box">Pedido não encontrado.</p>}

      {order && (
        <div className="stack">
          <p>
            Aparelho: {order.brand} {order.model}
          </p>
          <div className="status-line">
            {STATUS_STEPS.map((step, index) => (
              <div key={step} className={`status-step ${index <= currentStepIndex ? 'active' : ''}`}>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="text-button" onClick={onBack}>
        Voltar
      </button>
    </main>
  );
}
