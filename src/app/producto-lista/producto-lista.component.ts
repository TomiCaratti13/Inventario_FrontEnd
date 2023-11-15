import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  // styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent {
  productos: Producto[];

  constructor(private productoServicio: ProductoService, private enrutador: Router){}

  ngOnInit(){
    // Cargamos los productos
    this.obtenerProductos();
  }

  private obtenerProductos(){
    // Consumimos los datos del observable(suscribirnos)
    this.productoServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    );
  }

  editarProducto(id:number){
    this.enrutador.navigate(['editar-producto', id]);
  }

  borrarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.obtenerProductos()
        ,
        error: (errores) => console.log(errores)
      }
    );
  }
}
