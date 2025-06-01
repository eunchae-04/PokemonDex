// src/components/SelectedSlot.jsx
export default function SelectedSlot({ selectedPokemons, onRemove }) {
  return (
    <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
      {Array.from({ length: 6 }).map((_, i) => {
        const pokemon = selectedPokemons[i];
        return (
          <div
            key={i}
            style={{
              width: '80px',
              height: '80px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9f9f9',
              position: 'relative',
            }}
          >
            {pokemon ? (
              <>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={{ width: '60px' }}
                />
                <button
                  onClick={() => onRemove(pokemon)}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </>
            ) : (
              <span style={{ color: '#ccc' }}>빈 슬롯</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
