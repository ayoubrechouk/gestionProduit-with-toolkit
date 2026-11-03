import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { addProduit, updateProduit } from '../produitSlice.js';

const styles = {
  page: {
    minHeight: '100vh',
    padding: '48px 24px',
    color: '#f8edf0',
    fontFamily: 'Inter, system-ui, sans-serif',
    background:
      'radial-gradient(ellipse at 12% 0%, rgba(190, 24, 53, 0.2), transparent 42%), linear-gradient(145deg, #10090d 0%, #180d12 52%, #10090d 100%)',
  },
  content: { maxWidth: '560px', margin: '0 auto' },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
    color: '#e5b7c2',
    textDecoration: 'none',
    transition: 'color 180ms ease, transform 180ms ease',
  },
  card: {
    padding: '28px',
    border: '1px solid rgba(255, 157, 177, 0.16)',
    borderRadius: '16px',
    background: 'rgba(27, 16, 21, 0.92)',
    boxShadow: '0 22px 65px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(14px)',
  },
  eyebrow: {
    margin: '0 0 8px',
    color: '#fb7185',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },
  title: { margin: '0 0 24px', color: '#fff4f6', fontSize: '28px' },
  form: { display: 'grid', gap: '16px' },
  label: { display: 'grid', gap: '7px', color: '#e1cbd2', fontSize: '14px' },
  input: {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '46px',
    padding: '11px 13px',
    border: '1px solid #482630',
    borderRadius: '9px',
    outline: 'none',
    background: '#1b1015',
    color: '#fff1f4',
    font: 'inherit',
    transition: 'border-color 180ms ease, box-shadow 180ms ease',
  },
  error: {
    margin: 0,
    color: '#fda4af',
    fontSize: '14px',
  },
  actions: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '4px' },
  submitButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    minHeight: '44px',
    padding: '11px 16px',
    border: '1px solid rgba(255, 160, 177, 0.28)',
    borderRadius: '9px',
    background: 'linear-gradient(135deg, #e11d48, #9f1239)',
    boxShadow: '0 8px 22px rgba(225, 29, 72, 0.2)',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
  },
  cancelButton: {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: '44px',
    padding: '10px 15px',
    border: '1px solid #482630',
    borderRadius: '9px',
    background: '#21131a',
    color: '#edcbd3',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'transform 180ms ease, border-color 180ms ease',
  },
};

const effects = `
  .vintage-form-input:focus {
    border-color: #e11d48 !important;
    box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.16);
  }
  .vintage-form-back:hover { color: #fb7185 !important; transform: translateX(-3px); }
  .vintage-form-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(225, 29, 72, 0.34);
  }
  .vintage-form-cancel:hover { transform: translateY(-2px); border-color: #e11d48 !important; }
  .vintage-form-input:focus-visible, .vintage-form-submit:focus-visible,
  .vintage-form-cancel:focus-visible, .vintage-form-back:focus-visible {
    outline: 2px solid #fb7185;
    outline-offset: 3px;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const produits = useSelector((state) => state.produits.produits);
  const existingProduct = id
    ? produits.find((product) => String(product.ref) === id)
    : null;
  const [produit, setProduit] = useState(() => existingProduct ?? {
    ref: '',
    intitule: '',
    prix: '',
    categorie: '',
    photo: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setProduit((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const ref = String(produit.ref ?? '').trim();
    const intitule = String(produit.intitule ?? '').trim();
    const categorie = String(produit.categorie ?? '').trim();
    const prix = Number(produit.prix);

    if (!ref || !intitule || !categorie || !Number.isFinite(prix) || prix < 0) {
      setError('Veuillez renseigner une référence, un nom, une catégorie et un prix valide.');
      return;
    }

    const duplicateReference = produits.some(
      (product) =>
        String(product.ref).toLowerCase() === ref.toLowerCase() &&
        String(product.ref) !== String(existingProduct?.ref),
    );
    if (duplicateReference) {
      setError('Cette référence existe déjà. Choisissez une référence différente.');
      return;
    }

    const updatedProduct = {
      ...produit,
      ref,
      intitule,
      categorie,
      prix,
      photo: String(produit.photo ?? '').trim(),
    };

    if (id) {
      dispatch(updateProduit(updatedProduct));
    } else {
      dispatch(addProduit(updatedProduct));
    }

    navigate('/produits');
  };

  if (id && !existingProduct) {
    return (
      <main style={styles.page}>
        <style>{effects}</style>
        <div style={styles.content}>
          <p>Ce produit est introuvable.</p>
          <Link className="vintage-form-back" to="/produits" style={styles.backLink}>
            <FiArrowLeft aria-hidden="true" />
            Retour aux produits
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <style>{effects}</style>
      <div style={styles.content}>
        <Link className="vintage-form-back" to="/produits" style={styles.backLink}>
          <FiArrowLeft aria-hidden="true" />
          Retour aux produits
        </Link>
        <section style={styles.card}>
          <p style={styles.eyebrow}>La friperie sélection</p>
          <h1 style={styles.title}>
            {id ? 'Modifier le produit' : 'Ajouter un produit'}
          </h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Référence
              <input
                className="vintage-form-input"
                type="text"
                name="ref"
                value={produit.ref}
                onChange={handleChange}
                disabled={Boolean(id)}
                required
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Nom du produit
              <input
                className="vintage-form-input"
                type="text"
                name="intitule"
                value={produit.intitule}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Prix (DH)
              <input
                className="vintage-form-input"
                type="number"
                name="prix"
                value={produit.prix}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Catégorie
              <input
                className="vintage-form-input"
                type="text"
                name="categorie"
                value={produit.categorie}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              URL de la photo (facultatif)
              <input
                className="vintage-form-input"
                type="url"
                name="photo"
                value={produit.photo}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            {error && <p role="alert" style={styles.error}>{error}</p>}
            <div style={styles.actions}>
              <button className="vintage-form-submit" type="submit" style={styles.submitButton}>
                <FiSave aria-hidden="true" />
                {id ? 'Enregistrer' : 'Ajouter le produit'}
              </button>
              <Link className="vintage-form-cancel" to="/produits" style={styles.cancelButton}>
                Annuler
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
