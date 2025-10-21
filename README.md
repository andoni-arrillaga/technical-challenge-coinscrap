### 1) Contexto rápido

- **Opción elegida**: B.
- **Alcance**: He incluído todo lo que se pedía.
- **Stack**: Next.js (15.5.6), TypeScript, Tailwind, (Jest/Vitest + RTL).

### 2) Cómo ejecutar

````jsx
```bash

pnpm i

pnpm dev    # arranca en http://localhost:3000

````

````


### 3) Cómo testear

```jsx
```bash

pnpm test       # unit/integración

````

```

### 4) Decisiones clave

- **SSR/RSC/CSR**: He optado por SSR y RSC para mejorar SEO y la percepción de latencia, aunque también he optado por CSR en los casos de búsqueda, filtrado y paginación.
- **Estado**: local, ya que no es necesario estados globales para esta prueba. Evitamos Redux porque es añadir complejidad cuando no es necesario, gracias a los RSC y los hooks ya apenas son necesarios.
- **Datos**: mock con Route Handler. He opatado por paginación server-side ya que es mejor para SEO y pensando en escalabilidad futura.
- **Estilos**: Tailwind. Creo que es más rápido a la hora de escribir código y además estoy más habituado a utilizarlo.

### 5) Accesibilidad (A11y)

Checklist mínimo:

- Labels y roles correctos.
- Navegación por teclado/foco visible.
- Mensajes `aria-live` para loading/empty/error (si aplica).

### 6) Seguridad

- He evitado `dangerouslySetInnerHTML`.
- He considerado implementar CSP porque es una barrera eficaz contra ataques XSS y la carga/ejecución de recursos no autorizados y reducir el riesgo de inyección de código.

### 7) Performance

- A pesar de que no se informa sobre la importancia de tener los datos de las transacciones actualizadas, he entendido que la mejor manera era no guardarlas en caché. No tendremos el mejor rendimiento pero tendremos los datos más actualizados.
- Al tener casi todos los componentes en RSC, no he tenido necesidad de usar el useMemo, aunque lo he utilizado en la paginación, ya que ha sido el único sitio donde lo he visto necesario.

### 8) Testing (TDD breve)

- Casos cubiertos: happy path, filtrado por texto de búsqueda, filtrado por categoría, ordenación por fecha y paginación.
- Muestra 1 commit **rojo→verde**: 9ccc80925122b8deb6fda8d315f208e6b571059f

### 9) Trade‑offs y alternativas

- He optado por utilizar más tiempo con el fin de entregar un buen trabajo con todos los requisitos que se pedían.
- No he considerado alternativas, ya que me sentía cómodo con las elecciones que he tomado desde el inicio.

### 10) Supuestos

- Fechas en formato regional (D-MM-YYYY). Categorías fijas limitadas a las del mock. Zona horaria del navegador.

### 11) Próximos pasos (si tuviera 1–2 h más)

- Añadir i18n (es/en) con `Intl`.
- Gráfico simple en `/stats`.
- E2E estable con datos seed.

### 12) Tiempo invertido (aprox.)

- Implementación: ~90 min · Tests: ~45 min · README: ~30 min.

### 13) Notas para la revisión

- Enlaces rápidos: ruta principal `/`, API `/api/transactions`, test files en `__tests__/`.
```
