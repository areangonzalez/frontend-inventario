export interface IConfigurarPagina {
  colleccionSize: number,
  pageSize: number,
  page: number,
  cantRegistros: number,
  totalRegistros: number,
  size: number
}
/**
 * Clase que construye el objeto de la configuracion de pagina
 */
export class ConfigurarPagina implements IConfigurarPagina {
  public colleccionSize: number;
  public pageSize: number;
  public page: number;
  public size: number;
  public cantRegistros: number;
  public totalRegistros: number;
  public cantidad_vencidos: number;
  public cantidad_faltantes: number;
  public cantidad_defectuosos: number;
  public cantidad_stock: number;
  public cantidad_por_vencer: number;


  constructor() {
    this.colleccionSize = 0;
    this.pageSize = 20;
    this.size = 20;
    this.page = 1;
    this.cantRegistros = 0;
    this.totalRegistros = 0;
    this.cantidad_vencidos = 0;
    this.cantidad_faltantes = 0;
    this.cantidad_defectuosos = 0;
    this.cantidad_stock = 0;
    this.cantidad_por_vencer = 0;
    }
}
