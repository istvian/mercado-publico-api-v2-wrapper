# mercado-publico-api-v2-wrapper

Este es un proyecto con el propósito de facilitar el uso de la API v2 de Mercado Público en NodeJS. Esta API sirve solo para compras ágiles.

Ejemplo de uso

```javascript

import {MercadoPublicoAPI} from "mercado-publico-api-v2-wrapper"
const mercadopublico = new MercadoPublicoAPI("TOKEN")

async function Ejemplo() {

    // Esta función te devuelve los detalles de una sola compra ágil por ID
    let compra = await mercadopublico.BusquedaPorID("CODIGO")
   
    // Esta función te devuelve un listado de compras ágiles según los filtros que utilizaste

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

Este proyecto no es comercial y puede tener errores, sientete libre de aportar.