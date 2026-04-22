Guía de despliegue y verificación para PaaS
===========================================

Este archivo explica lo que debes proporcionar para cumplir los requisitos de la plataforma y contiene scripts para preparar el proyecto para despliegue y verificación.

Elementos obligatorios (debes proporcionar al PaaS):

- URL pública: Proporciona la URL de producción de la aplicación desplegada (PaaS). La URL debe tener al menos 3 cuentas de usuario distintas creadas en la plataforma (usa el script de seed para crear usuarios locales o créalas en la instancia PaaS).
- Descripción: Incluye una descripción detallada del proyecto en el repositorio y en la página del proyecto en el PaaS.
- ZIP: Sube todo el código fuente como un archivo ZIP en el formulario de envío del PaaS. Se incluye un script auxiliar para generar el ZIP.
- Comentarios en el código: El repositorio contiene comentarios explicativos en archivos del servidor y del cliente. Hay un índice breve en `CODE_COMMENTS.md`.

Lista de verificación para preparar y verificar localmente
-------------------------------------------------------

1. Instalar dependencias

```bash
npm install
```

2. Crear un archivo `.env` en la raíz del repositorio con al menos:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.../mydb
DB_NAME=cervezas_db
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

3. Iniciar backend y frontend (en terminales separados):

```bash
npm run dev:api
npm run dev
```

4. Crear tres usuarios (BD local) — recomendado para cumplir el requisito del PaaS:

Si tienes MongoDB y `MONGODB_URI` configurado, ejecuta:

```bash
npm run seed:users
```

Esto creará tres usuarios de ejemplo: `alice`, `bob` y `carol`. Cuando despliegues en el PaaS, repite el paso de seed (o registra los tres usuarios vía la UI) para asegurarte de que la URL del PaaS tenga al menos tres cuentas.

5. Generar el ZIP del proyecto (para subir al PaaS):

```bash
./scripts/create-zip.sh
# Este script crea `project-deploy.zip` en la raíz del repositorio excluyendo node_modules, .git y archivos .env.
```

Notas sobre la verificación en el PaaS
------------------------------------

- Tras desplegar, visita la URL de producción y crea o importa tres cuentas de usuario. La verificación del PaaS espera al menos tres cuentas conectadas a la instancia desplegada (no basta con cuentas locales).
- Añade la URL pública y una breve descripción (puedes copiar desde `package.json`/`README.md`) en el formulario del PaaS.
- Sube `project-deploy.zip` generado con el script anterior.

Si quieres, puedo ayudarte con:
- (A) Crear un `Dockerfile` para facilitar el despliegue en PaaS.
- (B) Añadir una ruta de seed temporal, protegida por un secreto, que cree los 3 usuarios directamente en la instancia PaaS (activar solo para pruebas y desactivar posteriormente).
- (C) Preparar una guía de despliegue específica para Vercel o Netlify.
