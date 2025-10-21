### 1) Contexto rápido

- **Opción elegida**: (A | B | C).
- **Alcance**: qué incluiste y qué dejaste fuera.
- **Stack**: Next.js (versión), TypeScript, (Tailwind/CSS Modules), (Jest/Vitest + RTL), (Playwright opc.).

### 2) Cómo ejecutar

````jsx
```bash

pnpm i

pnpm dev    # arranca en http://localhost:3000

````

````

Variables/flags relevantes: `NODE_ENV=`, `NEXT_TELEMETRY_DISABLED=1` (si lo usas).

### 3) Cómo testear

```jsx
```bash

pnpm test       # unit/integración

pnpm test:e2e   # opcional si implementaste E2E

````

```

Cobertura opcional: `pnpm test -- --coverage`.

### 4) Decisiones clave

- **SSR/RSC/CSR**: elección y por qué (SEO, latencia, simplicidad).
- **Estado**: local vs global; por qué evitar Redux aquí.
- **Datos**: mock con Route Handler/MSW; paginación server/client.
- **Estilos**: Tailwind o CSS Modules; criterio.

### 5) Accesibilidad (A11y)

Checklist mínimo:

- Labels y roles correctos.
- Navegación por teclado/foco visible.
- Mensajes `aria-live` para loading/empty/error (si aplica).

### 6) Seguridad

- Evito `dangerouslySetInnerHTML` o lo uso con **sanitización**.
- Considero **CSP** (comentado en README si procede) y **SameSite** en cookies (si aplica).

### 7) Performance

- Decisiones de caché (`revalidate`, `no-store`) o motivos para no usarlas.
- Evitar N+1 en cliente; paginación; memorización donde aporta.

### 8) Testing (TDD breve)

- Casos cubiertos: (p. ej., filtro por categoría, estado vacío, error API).
- Muestra 1 commit **rojo→verde**.

### 9) Trade‑offs y alternativas

- Qué simplifiqué por tiempo y cómo lo haría “bien” con más tiempo.
- Alternativas consideradas (p. ej., TanStack Query vs fetch RSC).

### 10) Supuestos

- Ej.: formato de fechas, zona horaria, categories conocidas.

### 11) Próximos pasos (si tuviera 1–2 h más)

- Añadir i18n (es/en) con `Intl`.
- Gráfico simple en `/stats`.
- E2E estable con datos seed.

### 12) Tiempo invertido (aprox.)

- Implementación: ~__ min · Tests: ~__ min · README: ~__ min.

### 13) Notas para la revisión

- Enlaces rápidos: ruta principal `/`, API `/api/transactions`, test files en `tests/` o `__tests__/`.
```
