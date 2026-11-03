import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FiEdit2,
  FiImage,
  FiMaximize2,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
} from 'react-icons/fi';
import {
  deleteProduit,
  setFilterCategory,
  setSearchTerm,
} from '../produitSlice.js';

const styles = {
  page: {
    minHeight: '100vh',
    padding: '48px 24px',
    background:
      'radial-gradient(ellipse at 12% 0%, rgba(190, 24, 53, 0.2), transparent 38%), linear-gradient(145deg, #10090d 0%, #180d12 52%, #10090d 100%)',
    color: '#f8edf0',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  content: { maxWidth: '1120px', margin: '0 auto' },
  eyebrow: {
    margin: '0 0 8px',
    color: '#fb7185',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '30px',
  },
  title: {
    margin: 0,
    color: '#fff7f8',
    fontSize: 'clamp(28px, 5vw, 40px)',
    fontWeight: 750,
    letterSpacing: '-0.04em',
  },
  subtitle: { margin: '8px 0 0', color: '#bdaab1', fontSize: '14px' },
  addButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    padding: '12px 16px',
    border: '1px solid rgba(255, 160, 177, 0.3)',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #e11d48, #9f1239)',
    boxShadow: '0 8px 24px rgba(225, 29, 72, 0.23)',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '18px',
  },
  search: { position: 'relative', flex: '1 1 260px' },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: '14px',
    transform: 'translateY(-50%)',
    color: '#c08493',
  },
  input: {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '46px',
    padding: '11px 14px 11px 42px',
    border: '1px solid #40212c',
    borderRadius: '10px',
    outline: 'none',
    background: 'rgba(32, 18, 24, 0.86)',
    color: '#fff1f4',
    font: 'inherit',
    transition: 'border-color 180ms ease, box-shadow 180ms ease',
  },
  select: {
    minHeight: '46px',
    minWidth: '190px',
    padding: '10px 14px',
    border: '1px solid #40212c',
    borderRadius: '10px',
    outline: 'none',
    background: '#201218',
    color: '#f8edf0',
    font: 'inherit',
  },
  tableCard: {
    overflowX: 'auto',
    border: '1px solid rgba(255, 157, 177, 0.13)',
    borderRadius: '16px',
    background: 'rgba(27, 16, 21, 0.9)',
    boxShadow: '0 22px 65px rgba(0, 0, 0, 0.28)',
    backdropFilter: 'blur(14px)',
  },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  heading: {
    padding: '15px 18px',
    borderBottom: '1px solid #40212c',
    background: 'rgba(74, 20, 37, 0.38)',
    color: '#ceabb5',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  cell: {
    padding: '15px 18px',
    borderBottom: '1px solid rgba(105, 53, 68, 0.25)',
    color: '#f4e8ec',
    fontSize: '14px',
    verticalAlign: 'middle',
    transition: 'background 180ms ease',
  },
  thumbnail: {
    position: 'relative',
    display: 'grid',
    width: '64px',
    height: '64px',
    padding: 0,
    placeItems: 'center',
    overflow: 'hidden',
    border: '1px solid rgba(251, 113, 133, 0.28)',
    borderRadius: '11px',
    background: 'linear-gradient(145deg, #361722, #211219)',
    color: '#fb7185',
    cursor: 'zoom-in',
    boxShadow: '0 5px 16px rgba(0, 0, 0, 0.25)',
  },
  productImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 300ms ease, filter 300ms ease',
  },
  zoomIcon: {
    position: 'absolute',
    right: '5px',
    bottom: '5px',
    display: 'grid',
    width: '23px',
    height: '23px',
    placeItems: 'center',
    border: '1px solid rgba(255, 255, 255, 0.24)',
    borderRadius: '7px',
    background: 'rgba(18, 9, 13, 0.78)',
    color: '#fff',
    pointerEvents: 'none',
  },
  category: {
    display: 'inline-block',
    padding: '6px 10px',
    border: '1px solid rgba(251, 113, 133, 0.2)',
    borderRadius: '999px',
    background: 'rgba(159, 18, 57, 0.2)',
    color: '#ffb2c1',
    fontSize: '12px',
    fontWeight: 600,
  },
  actions: { display: 'flex', justifyContent: 'center', gap: '8px' },
  actionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '38px',
    height: '38px',
    border: '1px solid #4b2934',
    borderRadius: '10px',
    background: '#24141b',
    color: '#f5cad4',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'transform 180ms ease, border-color 180ms ease, background 180ms ease',
  },
  deleteButton: { color: '#fb7185' },
  emptyState: { padding: '36px 18px', color: '#c5aeb6', textAlign: 'center' },
  overlay: {
    position: 'fixed',
    zIndex: 1000,
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    padding: '24px',
    background: 'rgba(7, 4, 6, 0.84)',
    backdropFilter: 'blur(14px)',
  },
  modal: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.15fr) minmax(240px, 0.85fr)',
    width: 'min(900px, 100%)',
    maxHeight: 'min(720px, 90vh)',
    overflow: 'hidden',
    border: '1px solid rgba(251, 113, 133, 0.3)',
    borderRadius: '20px',
    background: 'linear-gradient(145deg, #26141c, #130b0f)',
    boxShadow: '0 28px 100px rgba(225, 29, 72, 0.24), 0 25px 80px #000',
  },
  modalImageFrame: {
    display: 'grid',
    minHeight: '340px',
    placeItems: 'center',
    overflow: 'hidden',
    background:
      'radial-gradient(ellipse at center, rgba(190, 24, 93, 0.2), transparent 70%), #10090d',
  },
  modalImage: {
    display: 'block',
    width: '100%',
    height: '100%',
    maxHeight: 'min(72vh, 650px)',
    objectFit: 'contain',
    animation: 'vintageZoomIn 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
  },
  modalDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '36px 30px',
  },
  modalEyebrow: {
    margin: '0 0 12px',
    color: '#fb7185',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },
  modalTitle: {
    margin: '0 0 18px',
    color: '#fff4f6',
    fontSize: 'clamp(24px, 4vw, 34px)',
    lineHeight: 1.14,
    letterSpacing: '-0.03em',
  },
  modalPrice: {
    margin: '24px 0 8px',
    color: '#ff8ba2',
    fontSize: '28px',
    fontWeight: 750,
  },
  modalRef: { margin: 0, color: '#b89da7', fontSize: '13px' },
  closeButton: {
    position: 'absolute',
    zIndex: 1,
    top: '12px',
    right: '12px',
    display: 'grid',
    width: '40px',
    height: '40px',
    placeItems: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    background: 'rgba(13, 7, 10, 0.78)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 180ms ease, background 180ms ease',
  },
};

const effects = `
  @keyframes vintageZoomIn {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
  }
  .vintage-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(225, 29, 72, 0.38);
  }
  .vintage-search:focus, .vintage-select:focus {
    border-color: #e11d48 !important;
    box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.16);
  }
  .vintage-row:hover td { background: rgba(159, 18, 57, 0.13); }
  .vintage-thumbnail:hover img { transform: scale(1.13); filter: saturate(1.16); }
  .vintage-thumbnail:focus-visible, .vintage-action:focus-visible,
  .vintage-close:focus-visible, .vintage-add:focus-visible {
    outline: 2px solid #fb7185;
    outline-offset: 3px;
  }
  .vintage-action:hover { transform: translateY(-2px); border-color: #e11d48; background: #351722; }
  .vintage-delete:hover { border-color: #fb7185; background: rgba(190, 18, 60, 0.24); }
  .vintage-close:hover { transform: rotate(90deg); background: #9f1239; }
  @media (max-width: 640px) {
    .vintage-modal { grid-template-columns: 1fr !important; overflow-y: auto !important; }
    .vintage-modal-image { min-height: 0 !important; height: 45vh; }
    .vintage-modal-details { padding: 24px !important; }
    .vintage-header { align-items: flex-start !important; flex-direction: column; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

export default function List() {
  const dispatch = useDispatch();
  const { produits, searchTerm, filterCategory } = useSelector(
    (state) => state.produits,
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categories = [...new Set(produits.map((product) => product.categorie))]
    .filter(Boolean)
    .sort((first, second) => first.localeCompare(second, 'fr'));
  const filteredProducts = produits.filter((product) => {
    const matchesSearch = (product.intitule ?? '')
      .toLowerCase()
      .includes((searchTerm ?? '').toLowerCase());
    const matchesCategory = filterCategory
      ? product.categorie === filterCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    if (!selectedProduct) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProduct(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  return (
    <main style={styles.page}>
      <style>{effects}</style>
      <div style={styles.content}>
        <header className="vintage-header" style={styles.header}>
          <div>
            <p style={styles.eyebrow}>La friperie sélection</p>
            <h1 style={styles.title}>Pièces vintage</h1>
            <p style={styles.subtitle}>Des trouvailles uniques, une seconde histoire.</p>
          </div>
          <Link className="vintage-add" to="/add" style={styles.addButton}>
            <FiPlus aria-hidden="true" />
            Ajouter une pièce
          </Link>
        </header>

        <section style={styles.toolbar} aria-label="Filtres des produits">
          <label style={styles.search}>
            <FiSearch style={styles.searchIcon} aria-hidden="true" />
            <input
              className="vintage-search"
              type="search"
              placeholder="Rechercher une pièce..."
              aria-label="Rechercher un produit"
              value={searchTerm}
              onChange={(event) => dispatch(setSearchTerm(event.target.value))}
              style={styles.input}
            />
          </label>
          <select
            className="vintage-select"
            aria-label="Filtrer par catégorie"
            value={filterCategory}
            onChange={(event) => dispatch(setFilterCategory(event.target.value))}
            style={styles.select}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </section>

        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th scope="col" style={styles.heading}>Photo</th>
                <th scope="col" style={styles.heading}>Réf</th>
                <th scope="col" style={styles.heading}>Pièce</th>
                <th scope="col" style={styles.heading}>Prix</th>
                <th scope="col" style={styles.heading}>Catégorie</th>
                <th scope="col" style={styles.heading}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr className="vintage-row" key={product.ref}>
                  <td style={styles.cell}>
                    <button
                      className="vintage-thumbnail"
                      type="button"
                      aria-label={`Agrandir la photo : ${product.intitule}`}
                      title="Cliquer pour agrandir"
                      onClick={() => setSelectedProduct(product)}
                      style={styles.thumbnail}
                    >
                      {product.photo ? (
                        <img
                          src={product.photo}
                          alt=""
                          style={styles.productImage}
                          onError={(event) => {
                            event.currentTarget.hidden = true;
                          }}
                        />
                      ) : (
                        <FiImage aria-hidden="true" />
                      )}
                      <span style={styles.zoomIcon}>
                        <FiMaximize2 size={12} aria-hidden="true" />
                      </span>
                    </button>
                  </td>
                  <td style={styles.cell}>{product.ref}</td>
                  <td style={styles.cell}>{product.intitule}</td>
                  <td style={styles.cell}>{product.prix} DH</td>
                  <td style={styles.cell}>
                    <span style={styles.category}>{product.categorie}</span>
                  </td>
                  <td style={styles.cell}>
                    <div style={styles.actions}>
                      <Link
                        className="vintage-action"
                        to={`/edit/${product.ref}`}
                        aria-label={`Modifier ${product.intitule}`}
                        title="Modifier"
                        style={styles.actionButton}
                      >
                        <FiEdit2 aria-hidden="true" />
                      </Link>
                      <button
                        className="vintage-action vintage-delete"
                        type="button"
                        aria-label={`Supprimer ${product.intitule}`}
                        title="Supprimer"
                        onClick={() => dispatch(deleteProduit(product.ref))}
                        style={{ ...styles.actionButton, ...styles.deleteButton }}
                      >
                        <FiTrash2 aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" style={styles.emptyState}>
                    Aucune pièce ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <div
          style={styles.overlay}
          onClick={() => setSelectedProduct(null)}
          role="presentation"
        >
          <section
            className="vintage-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-image-title"
            onClick={(event) => event.stopPropagation()}
            style={styles.modal}
          >
            <button
              className="vintage-close"
              type="button"
              aria-label="Fermer l’aperçu"
              onClick={() => setSelectedProduct(null)}
              style={styles.closeButton}
            >
              <FiX size={20} aria-hidden="true" />
            </button>
            <div className="vintage-modal-image" style={styles.modalImageFrame}>
              {selectedProduct.photo ? (
                <img
                  src={selectedProduct.photo}
                  alt={selectedProduct.intitule}
                  style={styles.modalImage}
                />
              ) : (
                <FiImage size={56} color="#fb7185" aria-hidden="true" />
              )}
            </div>
            <div className="vintage-modal-details" style={styles.modalDetails}>
              <p style={styles.modalEyebrow}>Pièce unique · {selectedProduct.categorie}</p>
              <h2 id="product-image-title" style={styles.modalTitle}>
                {selectedProduct.intitule}
              </h2>
              <p style={styles.modalRef}>Référence {selectedProduct.ref}</p>
              <p style={styles.modalPrice}>{selectedProduct.prix} DH</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
