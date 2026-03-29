import { useState } from 'react';
import { PROBLEM_OPTIONS } from '../constants';

// Tela de solicitação em 3 passos com linguagem simples e campos essenciais.
export default function RequestScreen({ onSubmit, onBack }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    brand: '',
    model: '',
    issue: '',
    phone: '',
    geo: '',
    address: '',
  });
  const [loadingGeo, setLoadingGeo] = useState(false);

  // Solicita geolocalização automática para facilitar usuários leigos.
  const captureGeolocation = () => {
    if (!navigator.geolocation) {
      setForm((prev) => ({ ...prev, geo: 'Geolocalização não suportada neste aparelho.' }));
      return;
    }

    setLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        setForm((prev) => ({ ...prev, geo: `${lat}, ${lng}` }));
        setLoadingGeo(false);
      },
      () => {
        setForm((prev) => ({ ...prev, geo: 'Não foi possível obter localização automática.' }));
        setLoadingGeo(false);
      },
    );
  };

  const canNextStep1 = form.brand.trim() && form.model.trim();
  const canNextStep2 = form.issue;
  const canSubmit = form.phone.trim() && (form.geo || form.address.trim());

  const submit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <main className="screen card">
      <h2>Solicitar Coleta</h2>
      <p>Passo {step} de 3</p>

      <form onSubmit={submit} className="stack">
        {step === 1 && (
          <>
            <label>
              Marca
              <input
                value={form.brand}
                onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))}
                placeholder="Ex: Samsung"
                required
              />
            </label>
            <label>
              Modelo
              <input
                value={form.model}
                onChange={(e) => setForm((prev) => ({ ...prev, model: e.target.value }))}
                placeholder="Ex: Galaxy A54"
                required
              />
            </label>
            <button type="button" className="big-button" onClick={() => setStep(2)} disabled={!canNextStep1}>
              Continuar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Qual é o problema?</p>
            <div className="grid-buttons">
              {PROBLEM_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`big-button ${form.issue === option ? 'selected' : ''}`}
                  onClick={() => setForm((prev) => ({ ...prev, issue: option }))}
                >
                  {option}
                </button>
              ))}
            </div>
            <button type="button" className="big-button" onClick={() => setStep(3)} disabled={!canNextStep2}>
              Continuar
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label>
              Telefone
              <input
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 99999-9999"
                required
              />
            </label>

            <button type="button" className="big-button" onClick={captureGeolocation}>
              {loadingGeo ? 'Capturando localização...' : 'Usar localização automática'}
            </button>
            {form.geo && <p className="info-box">Localização: {form.geo}</p>}

            <label>
              Endereço manual (opcional)
              <input
                value={form.address}
                onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Rua, número e referência"
              />
            </label>

            <button type="submit" className="big-button" disabled={!canSubmit}>
              🚚 Solicitar Agora
            </button>
          </>
        )}

        <button type="button" className="text-button" onClick={step === 1 ? onBack : () => setStep(step - 1)}>
          Voltar
        </button>
      </form>
    </main>
  );
}
