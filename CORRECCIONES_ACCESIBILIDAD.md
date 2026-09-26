# Correcciones de Accesibilidad y Formularios

## Problemas identificados

Tras analizar los formularios de la aplicación, se han identificado varios problemas relacionados con la accesibilidad y el uso correcto de atributos de formulario:

### 1. Selects sin atributos autocomplete
- En `ads-manager/page.tsx` línea 304: El elemento `<select>` no tiene atributo `autocomplete`
- En `bulk-import/simple-test.tsx` línea 249: El elemento `<select>` no tiene atributo `autocomplete`

### 2. Inputs sin atributos autocomplete
- En `token-test/page.tsx` líneas 90 y 105: Los inputs no tienen atributo `autocomplete`

### 3. Warning deUnload event listeners
- En `content.js:2`: Se están usando listeners de unload event que están deprecated

## Soluciones propuestas

### 1. Corrección de selects

#### ads-manager/page.tsx
```jsx
// Antes:
<select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary">

// Después:
<select 
  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
  autoComplete="off"
>
```

#### bulk-import/simple-test.tsx
```jsx
// Antes:
<select
  value={mapping[header] || ''}
  onChange={(e) => handleMappingChange(header, e.target.value)}
  className="bg-gray-600 border-gray-600 text-white rounded px-2 py-1 text-sm"
>

// Después:
<select
  value={mapping[header] || ''}
  onChange={(e) => handleMappingChange(header, e.target.value)}
  className="bg-gray-600 border-gray-600 text-white rounded px-2 py-1 text-sm"
  autoComplete="off"
>
```

### 2. Corrección de inputs

#### token-test/page.tsx
```jsx
// Antes (línea 90):
<input
  type="text"
  value={testEmail}
  onChange={(e) => setTestEmail(e.target.value)}
  placeholder="New access token"
  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 mr-2"
/>

// Después:
<input
  type="text"
  value={testEmail}
  onChange={(e) => setTestEmail(e.target.value)}
  placeholder="New access token"
  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 mr-2"
  autoComplete="off"
/>

// Antes (línea 105):
<input
  type="text"
  value={testPassword}
  onChange={(e) => setTestPassword(e.target.value)}
  placeholder="New refresh token"
  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 mr-2"
/>

// Después:
<input
  type="text"
  value={testPassword}
  onChange={(e) => setTestPassword(e.target.value)}
  placeholder="New refresh token"
  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 mr-2"
  autoComplete="off"
/>
```

### 3. Corrección de unload event listeners

El warning de unload event listeners deprecated se refiere a que los navegadores están eliminando el soporte para ciertos eventos de unload que pueden afectar el rendimiento. La solución es reemplazarlos con Page Lifecycle API:

```javascript
// En lugar de:
window.addEventListener('beforeunload', (event) => {
  // código
});

// Usar:
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // código de cleanup
  }
});
```

## Formularios ya correctos

Los siguientes formularios ya tienen una implementación correcta:

### 1. Login page (/src/app/(auth)/login/page.tsx)
- Todos los inputs tienen `id`, `name` y `autoComplete` correctamente asignados
- Los checkboxes tienen `id` y `htmlFor` correctamente vinculados

### 2. Register page (/src/app/(auth)/register/page.tsx)
- Todos los inputs tienen `id`, `name` y atributos de accesibilidad correctamente asignados
- Los checkboxes tienen `id` y `htmlFor` correctamente vinculados

## Beneficios de las correcciones

1. **Mejora de la accesibilidad**: Los usuarios con tecnologías de asistencia podrán navegar mejor por los formularios
2. **Autofill mejorado**: Los navegadores podrán autocompletar correctamente los campos de formulario
3. **Compatibilidad futura**: Evitamos el uso de APIs deprecated que podrían dejar de funcionar
4. **Experiencia de usuario mejorada**: Menos errores en la consola del navegador

## Checklist de implementación

- [ ] Agregar `autoComplete="off"` a los selects en ads-manager
- [ ] Agregar `autoComplete="off"` a los selects en bulk-import
- [ ] Agregar `autoComplete="off"` a los inputs en token-test
- [ ] Reemplazar unload event listeners con Page Lifecycle API
- [ ] Verificar que no hay errores de accesibilidad en la consola
- [ ] Probar el autocompletado en los formularios

Estas correcciones mejorarán significativamente la accesibilidad y compatibilidad de la aplicación.