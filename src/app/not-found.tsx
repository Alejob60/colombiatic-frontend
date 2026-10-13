/**
 * 404 real para toda la app.
 *
 * Sin este archivo, cualquier ruta desconocida que pasara por
 * `notFound()` devolvia 500 en vez de 404: el crawler receiptia un error de
 * servidor y dejaba de rastrear el dominio. El caso visible era
 * `/robots.txt`, pero aplicaba a cualquier ruta de un solo segmento.
 */
import Link from 'next/link';

/**
 * El enlace va con `prefetch={false}` a proposito: este boundary se renderiza
 * fuera del contexto normal del App Router, y el prefetch que hace `Link` por
 * defecto dispara
 * `TypeError: Cannot read properties of undefined (reading 'entryCSSFiles')`
 * en Next 15.3.0, devolviendo 500 en vez de 404.
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0C1116',
        color: '#E5E7EB',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div>
        <p style={{ fontSize: '56px', fontWeight: 800, margin: 0, letterSpacing: '-2px' }}>
          404
        </p>
        <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '8px 0 4px' }}>
          Esta pagina no existe
        </h1>
        <p style={{ fontSize: '14px', opacity: 0.7, margin: '0 0 24px' }}>
          El enlace puede estar mal escrito o el contenido se movio.
        </p>
        <Link
          href="/es"
          prefetch={false}
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            borderRadius: '10px',
            background: '#4F46E5',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}