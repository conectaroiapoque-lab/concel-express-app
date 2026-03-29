// Painel admin simples para listar pedidos, ver detalhes e alterar status.
export default function AdminScreen({ orders, statusSteps, onUpdateStatus, onBack }) {
  return (
    <main className="screen card">
      <h2>Painel Admin</h2>
      <p>Total de pedidos: {orders.length}</p>

      <div className="stack">
        {orders.map((order) => {
          const trackingLink = `${window.location.origin}?track=${order.id}`;
          return (
            <article key={order.id} className="order-card">
              <h3>
                {order.brand} {order.model}
              </h3>
              <p>Problema: {order.issue}</p>
              <p>Telefone: {order.phone}</p>
              <p>Localização: {order.geo || 'Não informada'}</p>
              <p>Endereço: {order.address || 'Não informado'}</p>
              <label>
                Status
                <select
                  value={order.status}
                  onChange={(event) => onUpdateStatus(order.id, event.target.value)}
                >
                  {statusSteps.map((step) => (
                    <option key={step} value={step}>
                      {step}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Link de acompanhamento
                <input readOnly value={trackingLink} onFocus={(event) => event.target.select()} />
              </label>
            </article>
          );
        })}
      </div>

      <button className="text-button" onClick={onBack}>
        Voltar
      </button>
    </main>
  );
}
