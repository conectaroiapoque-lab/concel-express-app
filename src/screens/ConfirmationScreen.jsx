// Tela de confirmação após concluir solicitação.
export default function ConfirmationScreen({ orderId, onTrack, onHome }) {
  return (
    <main className="screen card">
      <h2>Pedido confirmado ✅</h2>
      <p>
        Seu pedido foi recebido.
        <br />
        Nosso motoboy está a caminho.
        <br />
        Tempo médio de reparo: até 1 hora.
      </p>
      <p className="info-box">Código de acompanhamento: {orderId}</p>
      <button className="big-button" onClick={onTrack}>
        📲 Acompanhar Status
      </button>
      <button className="text-button" onClick={onHome}>
        Voltar ao início
      </button>
    </main>
  );
}
