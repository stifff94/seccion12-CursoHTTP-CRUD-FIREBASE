import { NgModule } from '@angular/core';
export class HeroeModel{

    id: string;
    nombre: string;
    poder: string
    vivo: boolean;

    constructor(){
        this.vivo = true;
    }
}