# mercado-publico-api-v2-wrapper

Un envoltorio (wrapper) de Node.js diseñado para simplificar la integración y el consumo de la API v2 de Mercado Público (Chile), enfocada exclusivamente en el módulo de Compras Ágiles.

## Características
- Enfoque en Compra Ágil: Optimizado para los endpoints de la API v2 de Mercado Público.
- Filtros Flexibles: Soporte para búsquedas por palabras clave, rangos de fechas, regiones y estados.
- Soporte Multivalor: Permite filtrar por múltiples regiones o estados en una sola consulta.
- Sintaxis Moderna: Basado en promesas (async/await) y preparado para ES Modules.

## Instalación

```terminal
npm i mercado-publico-api-v2-wrapper
```

## Ejemplo de uso

```javascript

import {MercadoPublicoAPI} from "mercado-publico-api-v2-wrapper"
const mercadopublico = new MercadoPublicoAPI("TOKEN")

async function Ejemplo() {

    // Esta función te devuelve los detalles de una sola compra ágil por ID
    let compra = await mercadopublico.BusquedaPorID("CODIGO")
   
    // Buscar y filtrar por query
    let resultadoQuery = await mercadopublico.Busqueda({ query: "toner impresora" })

    // Buscar y filtrar por fechas
    let resultadoFecha = await mercadopublico.Busqueda({ publicado_desde: new Date(2026, 4, 1), publicado_hasta: new Date(2026, 4, 30) })

    //  Buscar y filtrar por Estado
    let resultadoEstado = await mercadopublico.Busqueda({ estado: Estado.Publicada })

    // Buscar y filtrar por multiples Estados
    let resultadoEstados = await mercadopublico.Busqueda({ estado: [Estado.Publicada, Estado.Desierta] })

    // Buscar y filtrar por región
    let resultadoRegion = await mercadopublico.Busqueda({ region: Region.Biobío })

    // Buscar y filtrar por multiples regiones
    let resultadoRegiones = await mercadopublico.Busqueda({ region: [Region.Biobío, Region.Antofagasta] })
    
}

```

## Contribuciones
Este es un proyecto de código abierto y no comercial. Si encuentras algún error, deseas proponer mejoras o añadir soporte para nuevos parámetros de la API, siéntete libre de abrir un Issue o enviar un Pull Request directamente al repositorio.
