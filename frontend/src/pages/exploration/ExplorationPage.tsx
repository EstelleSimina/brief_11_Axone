import { useState, useEffect } from 'react';

// Données mockées (à remplacer plus tard par l'API)
const MOCK_SNIPPETS = [
  { id: 1, title: "Boucle for en Python", code: "for i in range(10):\n    print(i)", language: "python" },
  { id: 2, title: "Fetch en JavaScript", code: "const data = await fetch('url');\nconst json = await data.json();", language: "javascript" },
];

export default function SnippetList() {
  const [snippets, setSnippets] = useState(MOCK_SNIPPETS);
  const [loading, setLoading] = useState(false);

  // Plus tard, remplace ce useEffect par un appel à ton backend
  useEffect(() => {
    setLoading(true);
    // Simulation d'un appel API
    setTimeout(() => {
      setSnippets(MOCK_SNIPPETS);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Liste des snippets</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '4px',
                background: '#f5f5f5',
              }}
            >
              <h2>{snippet.title}</h2>
              <pre style={{ background: '#eee', padding: '0.5rem' }}>
                <code>{snippet.code}</code>
              </pre>
              <p><strong>Langage:</strong> {snippet.language}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
