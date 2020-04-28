import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  
  constructor(private HeroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo'){
      this.HeroesService.getHeroe(id)
      .subscribe( (resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      })
    }

  }

  guardar(form: NgForm){
    if (form.invalid){
      console.log("formulario no valido")
      return;
    }

   Swal.fire({
     title: 'Espere',
     text: 'Se esta guardando',
     allowOutsideClick: false
   })
   Swal.showLoading();

   let peticion: Observable<any>;

    if(this.heroe.id){
      peticion = this.HeroesService.actualizarHeroe(this.heroe);
    }else{
      peticion = this.HeroesService.crearHeroe(this.heroe);
    }
    
    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      })
    })

  }

}
