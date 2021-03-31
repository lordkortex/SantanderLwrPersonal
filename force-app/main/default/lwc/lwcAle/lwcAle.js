import { LightningElement, api, wire } from 'lwc';


export default class LwcAle extends LightningElement {


    get lista(){
        var lista = ["Repollo", "Nabo", "Rábano", "Zanahoria", "Lechuga", "Espinacas"];

        return lista;
    }
}