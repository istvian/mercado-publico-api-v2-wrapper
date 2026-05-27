export class MercadoPublicoAPI {

    baseUrl: string = "https://api2.mercadopublico.cl/v2/compra-agil";

    ticket: string
    constructor(ticket: string) {
        this.ticket = ticket;
    }
    /**
     * Esta función ejecuta una llamada a la API de consulta de busqueda, puedes aplicar diversos filtros.
     * @param opciones Nota: No puedes utilizar Opción A: ttl_cambio_ms y Opción B: cambio_desde o cambio_hasta a la vez. 
     * De la misma forma no puedes usar id y query a la vez.
     * @returns La respuesta de la API de tipo ApiResponse
     */

    public async Busqueda(opciones: Busqueda): Promise<ApiResponse | null> {
        try {
            const url = new URL(this.baseUrl);
            if (opciones.ttl_cambio_ms) {
                url.searchParams.set("ttl_cambio_ms", opciones.ttl_cambio_ms.toString());
            }
            if (opciones.cambio_desde) {
                url.searchParams.set("cambio_desde", opciones.cambio_desde.toISOString().split('.')[0] + 'Z');
            }
            if (opciones.cambio_hasta) {
                url.searchParams.set("cambio_hasta", opciones.cambio_hasta.toISOString().split('.')[0] + 'Z');
            }
            if (opciones.publicado_desde) {
                url.searchParams.set("publicado_desde", opciones.publicado_desde.toISOString().split('.')[0] + 'Z');
            }
            if (opciones.publicado_hasta) {
                url.searchParams.set("publicado_hasta", opciones.publicado_hasta.toISOString().split('.')[0] + 'Z');
            }
            if (opciones.estado) {
                if (Array.isArray(opciones.estado)) {
                    url.searchParams.set("estado", opciones.estado.join(","));
                }
                else {
                    url.searchParams.set("estado", opciones.estado.toString());
                }
            }
            if (opciones.region) {
                if (Array.isArray(opciones.region)) {
                    url.searchParams.set("region", opciones.region.join(","));
                }
                else {
                    url.searchParams.set("region", opciones.region.toString());
                }
            }
            if (opciones.id) {
                url.searchParams.set("id", opciones.id);
            }
            if (opciones.query) {
                if (Array.isArray(opciones.query)) {
                    url.searchParams.set("q", opciones.query.join(" "));
                }
                else {
                    url.searchParams.set("q", opciones.query);
                }
            }
            if (opciones.tamano_pagina) {
                url.searchParams.set("tamano_pagina", opciones.tamano_pagina.toString());
            }
            if (opciones.numero_pagina) {
                url.searchParams.set("numero_pagina", opciones.numero_pagina.toString());
            }
            if (opciones.ordenar_por) {
                url.searchParams.set("ordenar_por", opciones.ordenar_por);
            }
            if (!this.ticket || this.ticket === "") throw new Error("No hay un ticket válido")
            let res: ApiResponse = await (await fetch(url.toString(), { headers: { ticket: this.ticket } })).json()
            return res
        }
        catch (e) {
            console.error(e)
            return null
        }
    }

    /**
     * Permite buscar el detalle de una compra ágil
     * @param codigo Es el ID o código de la compra ágil a buscar
     * @returns Retorna un objeto de tipo ApiDetalleResponse 
     */
    public async BusquedaPorID(codigo: string): Promise<ApiDetalleResponse | null> {
        try {
            if (codigo === "") throw new Error("No hay un código")
            if (!this.ticket || this.ticket === "") throw new Error("No hay un ticket válido")
            let res = await (await fetch(this.baseUrl + "/" + codigo, { headers: { ticket: this.ticket } })).json()
            return res

        } catch (e) {
            console.error(e)
            return null
        }

    }
}
//#region Interfaces
interface Busqueda {
    ttl_cambio_ms?: number;
    cambio_desde?: Date;
    cambio_hasta?: Date;
    publicado_desde?: Date;
    publicado_hasta?: Date;
    estado?: Estado | Estado[];
    region?: Region | Region[];
    id?: string;
    query?: string[] | string
    tamano_pagina?: number;
    numero_pagina?: number;
    ordenar_por?: OrdenarPor;
}
interface EstadoRespuesta {
    id_estado: number;
    codigo: string;
    glosa: string;
}
interface Convocatoria {
    estado_convocatoria: number;
    descripcion: string;
}
interface Fechas {
    fecha_publicacion: string;
    fecha_cierre: string;
    fecha_ultimo_cambio: string;
    fecha_cierre_primer_llamado: string;
    fecha_cierre_segundo_llamado: string;
}
interface Montos {
    moneda: string;
    monto_disponible: number;
    monto_disponible_clp: number;
}
interface Institucion {
    organismo_comprador: string;
    rut: string;
    unidad_compra: string;
    region: number;
    nombre_region: string;
}
interface Resumen {
    total_ofertas_recibidas: number;
}
interface Motivos {
    motivo_cancelacion: string | null;
    motivo_desierta: string | null;
    motivo_seleccion: string | null;
}
interface Links {
    detalle: string;
}
interface Item {
    codigo: string;
    nombre: string;
    estado: EstadoRespuesta;
    convocatoria: Convocatoria;
    documentos: any[];
    fechas: Fechas;
    montos: Montos;
    institucion: Institucion;
    resumen: Resumen;
    motivos: Motivos;
    links: Links | Links[];
}
interface Paginacion {
    total_paginas: number;
    numero_pagina: number;
    tamano_pagina: number;
    total_resultados: number;
}
interface Payload {
    items: Item[];
    paginacion: Paginacion;
}
interface ApiResponse {
    success: string;
    trace: string | null;
    payload: Payload;
    errors: any[] | null;
}
interface Convocatoria {
    estado_convocatoria: number;
    descripcion: string;
    fecha_cierre_primer_llamado: string;
    fecha_cierre_segundo_llamado: string;
}
interface Fechas {
    fecha_publicacion: string;
    fecha_cierre: string;
    fecha_ultimo_cambio: string;
    fecha_cancelacion: string | null;
}
interface Entrega {
    direccion_entrega: string;
    plazo_entrega_dias: number;
}
interface Presupuesto {
    tipo_presupuesto: string;
    moneda: string;
    presupuesto_estimado: number;
    monto_disponible: number;
    monto_disponible_clp: number;
    valor_cambio_moneda: number | null;
    fecha_cambio_moneda: string | null;
}
interface Institucion {
    organismo_comprador: string;
    rut: string;
    unidad_compra: string;
    region: number;
    nombre_region: string;
}
interface ProductoSolicitado {
    codigo_producto: number;
    nombre: string;
    descripcion: string;
    cantidad: number;
    unidad_medida: string;
}
interface Resumen {
    multa_sancion: number;
    total_ofertas_recibidas: number;
    total_demandas: number;
}
interface Motivos {
    motivo_cancelacion: string | null;
    motivo_desierta: string | null;
}
interface Flags {
    considera_requisitos_medioambientales: boolean;
    considera_requisitos_impacto_social_economico: boolean;
}
interface DetallePayload {
    codigo: string;
    nombre: string;
    descripcion: string;
    estado: Estado;
    convocatoria: Convocatoria;
    fechas: Fechas;
    entrega: Entrega;
    documentos: any[];
    presupuesto: Presupuesto;
    id_orden_compra: string | null;
    institucion: Institucion;
    productos_solicitados: ProductoSolicitado[];
    proveedores_cotizando: any[];
    resumen: Resumen;
    motivos: Motivos;
    flags: Flags;
}
interface ApiDetalleResponse {
    success: string;
    trace: string | null;
    payload: DetallePayload;
    errors: any[] | null;
}
//#endregion

//#region Enums
enum OrdenarPor {
    "FechaUltimaModificacion" = "FechaUltimaModificacion",
    "FechaPublicacion" = "FechaPublicacion",
}
enum Estado {
    "Publicada" = "publicada",
    "Cerrada" = "cerrada",
    "Desierta" = "desierta",
    "Cancelada" = "cancelada",
    "Proveedor Seleccionado" = "proveedor_seleccionado",
    "OC Emitida" = "oc_emitida",
}
enum Region {
    "Tarapacá" = 1,
    "Antofagasta" = 2,
    "Atacama" = 3,
    "Coquimbo" = 4,
    "Valparaiso" = 5,
    "O'Higgins" = 6,
    "Maule" = 7,
    "Biobío" = 8,
    "Araucanía" = 9,
    "Los Lagos" = 10,
    "Aisén" = 11,
    "Magallanes y Antártica" = 12,
    "Metropolitana" = 13,
    "Los Ríos" = 14,
    "Arica y Parinacota" = 15,
    "Ñuble" = 16,
}
//#endregion



export default MercadoPublicoAPI