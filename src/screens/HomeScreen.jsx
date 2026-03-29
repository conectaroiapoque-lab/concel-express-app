// Tela inicial com ações principais em botões grandes para navegação simplificada.
export default function HomeScreen({ onRequest, onTrack, onAdmin, whatsappUrl }) {
  return (
    <main className="screen card">
      <h1>Conserte seu celular em até 1 hora</h1>
      <p>Coleta rápida, conserto e entrega no local.</p>

      <div className="stack">
        <button className="big-button" onClick={onRequest}>
          🚀 Solicitar Coleta
        </button>
        <button className="big-button" onClick={onTrack}>
          📍 Acompanhar Pedido
        </button>
        <a className="big-button link-button" href={whatsappUrl} target="_blank" rel="noreferrer">
          💬 Falar no WhatsApp
        </a>
      </div>

      <button className="text-button" onClick={onAdmin}>
        Acessar painel admin
      </button>
    </main>
  );
}
