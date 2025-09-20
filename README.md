# Property Management Client

Este es un cliente React sencillo que demuestra las funcionalidades del backend de gestión de propiedades desarrollado con Spring Boot, JPA y MySQL.

## Características Implementadas

### Gestión de Propiedades
- **Listar propiedades** con paginación
- **Crear nuevas propiedades** con formulario completo
- **Editar propiedades existentes**
- **Ver detalles** de una propiedad específica
- **Eliminar propiedades** con confirmación

### Filtros de Búsqueda
- Filtro por precio (mínimo y máximo)
- Filtro por ciudad
- Filtro por nombre de propiedad
- Filtro por dirección
- Filtro por área en metros cuadrados (mínimo y máximo)
- Filtro por tipo de propiedad (HOUSE, APARTMENT, CONDO, VILLA, TOWNHOUSE)

### Interfaz de Usuario
- Diseño responsivo que funciona en desktop y móvil
- Tarjetas de propiedades con información clave
- Formularios con validación básica
- Paginación configurable (5, 10, 20, 50 elementos por página)
- Estados de carga y manejo de errores

## Estructura del Proyecto

```
src/
├── components/
│   ├── Layout.js              # Layout principal de la aplicación
│   ├── PropertyCard.js        # Tarjeta individual de propiedad
│   ├── PropertyList.js        # Lista de propiedades con filtros
│   ├── PropertyForm.js        # Formulario para crear/editar
│   ├── PropertyDetail.js      # Vista detallada de una propiedad
│   ├── PropertyFilters.js     # Componente de filtros de búsqueda
│   ├── Pagination.js          # Componente de paginación
│   └── ConfigStatus.js        # Estado de configuración (desarrollo)
├── config/
│   └── environment.js         # Configuración de variables de entorno
├── services/
│   ├── api.js                 # Configuración de axios
│   └── propertyService.js     # Servicios para comunicación con el backend
├── types/
│   └── Property.js            # Tipos y DTOs de propiedades
├── App.js                     # Componente principal
├── App.css                    # Estilos principales
└── index.js                   # Punto de entrada
```

## Configuración y Uso

### Requisitos Previos
- Node.js 16 o superior
- Backend de Spring Boot ejecutándose en http://localhost:8080

### Instalación
1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar la aplicación en modo desarrollo:
   ```bash
   npm start
   ```

3. Abrir http://localhost:3000 en tu navegador

## Variables de Entorno

El proyecto utiliza variables de entorno para una configuración segura y flexible:

### Configuración Básica
Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

### Variables Disponibles

| Variable | Descripción | Valor por Defecto | Requerida |
|----------|-------------|-------------------|-----------|
| `REACT_APP_API_BASE_URL` | URL base del backend API | `http://localhost:8080/api/v1` | ✅ |
| `REACT_APP_ENV` | Entorno de la aplicación | `development` | ❌ |
| `REACT_APP_API_TIMEOUT` | Timeout para peticiones API (ms) | `30000` | ❌ |
| `REACT_APP_ENABLE_API_LOGGING` | Habilitar logs de API | `true` (development) | ❌ |
| `PORT` | Puerto del servidor de desarrollo | `3000` | ❌ |
| `HOST` | Host del servidor de desarrollo | `localhost` | ❌ |

### Archivos de Entorno

- **`.env`** - Configuración por defecto (se sube al repo)
- **`.env.local`** - Configuración local personal (no se sube al repo)
- **`.env.production`** - Configuración para producción
- **`.env.example`** - Plantilla con todas las variables disponibles

### Ejemplos de Configuración

**Desarrollo local:**
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_ENV=development
REACT_APP_ENABLE_API_LOGGING=true
PORT=3000
HOST=localhost
```

**Producción:**
```env
REACT_APP_API_BASE_URL=https://api.midominio.com/api/v1
REACT_APP_ENV=production
REACT_APP_ENABLE_API_LOGGING=false
```

**Backend en puerto diferente:**
```env
REACT_APP_API_BASE_URL=http://localhost:9090/api/v1
```

**React en puerto personalizado:**
```env
PORT=3001
HOST=0.0.0.0
```

### Verificar Configuración

En modo desarrollo, puedes ver la configuración actual usando el botón **⚙️ Config** en la esquina inferior derecha de la aplicación.

### Configuración del Backend
El cliente utiliza variables de entorno para una configuración segura y flexible. Ver la sección de **Variables de Entorno** más abajo para configurar la URL del backend.

## Funcionalidades del Backend Utilizadas

### Endpoints Implementados:
- `GET /api/v1/properties` - Listar propiedades con filtros y paginación
- `GET /api/v1/properties/{id}` - Obtener una propiedad por ID
- `POST /api/v1/properties` - Crear nueva propiedad
- `PUT /api/v1/properties/{id}` - Actualizar propiedad existente
- `DELETE /api/v1/properties/{id}` - Eliminar propiedad

### Tipos de Propiedad Soportados:
- HOUSE (Casa)
- APARTMENT (Apartamento)
- CONDO (Condominio)
- VILLA (Villa)
- TOWNHOUSE (Casa en conjunto)

### Filtros Disponibles:
- `minPrice` / `maxPrice` - Rango de precio
- `city` - Ciudad
- `name` - Nombre de la propiedad
- `address` - Dirección
- `minAreaSquareMeters` / `maxAreaSquareMeters` - Rango de área
- `type` - Tipo de propiedad
- `page` / `size` - Paginación

## Características Técnicas

### Dependencias Principales:
- **React 18** - Framework de UI
- **Axios** - Cliente HTTP para comunicación con el backend
- **CSS Grid/Flexbox** - Para layouts responsivos

### Manejo de Estados:
- Estados locales con React hooks (useState, useEffect)
- Manejo de errores con try/catch y estados de error
- Loading states para mejor UX

### Validaciones:
- Validación en el frontend antes de enviar datos
- Campos requeridos marcados con asterisco (*)
- Validación de números negativos
- Manejo de errores del backend

## Demo de Funcionalidades

1. **Vista de Lista**: Muestra todas las propiedades con filtros y paginación
2. **Crear Propiedad**: Formulario completo con todos los campos requeridos
3. **Editar Propiedad**: Cargar datos existentes y permitir modificación
4. **Ver Detalles**: Vista completa de una propiedad con toda su información
5. **Filtros**: Búsqueda avanzada por múltiples criterios
6. **Paginación**: Navegación eficiente por grandes cantidades de datos

Este cliente proporciona una demostración completa de todas las funcionalidades del backend, con una interfaz intuitiva y fácil de usar.
