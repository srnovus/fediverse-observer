# Fediverse Observer

Una herramienta para escanear y analizar instancias del Fediverse.

## Características

- Escaneo de seguridad básico
- Análisis de actividad
- Interfaz de usuario moderna
- Despliegue en Netlify

## Requisitos

- Node.js 14.x o superior
- npm 6.x o superior

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/srnovus/fediverse-observer.git
cd fediverse-observer
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Despliegue en Netlify

1. Crea una cuenta en [Netlify](https://www.netlify.com/)
2. Conecta tu repositorio
3. Configura el build:
   - Build command: `npm run build`
   - Publish directory: `.next`

## Uso

1. Abre la aplicación en tu navegador
2. Ingresa la URL de una instancia del Fediverse
3. Haz clic en "Scan" para iniciar el análisis
4. Revisa los resultados del escaneo

## Licencia

AGPL-3.0

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

