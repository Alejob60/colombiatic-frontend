/**
 * Boundary de 404 dentro del grupo i18n.
 *
 * `notFound()` se lanza desde `(i18n)/[lang]/layout.tsx` cuando el primer
 * segmento de la URL no es un locale valido. Con el boundary unicamente en la
 * raiz, Next 15.3.0 revienta con
 * `TypeError: Cannot read properties of undefined (reading 'entryCSSFiles')`
 * y responde 500 en vez de 404: cualquier crawler recibe error de servidor.
 *
 * Ponerlo tambien aqui cubre el caso, porque el boundary mas cercano al punto
 * donde se lanza el error es el que se renderiza.
 */
export { default } from '@/app/not-found';