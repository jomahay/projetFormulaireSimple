import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataFormulaire } from '../model/dataFormulaire.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input()  data!: DataFormulaire;
  @Input() isSubmitting!:boolean
  @Output() resetFunction = new EventEmitter();
  @Output() modifyFunction = new EventEmitter();
  isEditable:boolean=false;
  isSubmited:boolean=false;
  constructor(){
    console.log("atooooo ")
  }
  reset(){
    alert("jujuju")
    this.resetFunction.emit({isEditable :this.isEditable,isSubmited:this.isSubmited})
  }
  modify(){
    alert("wawawa")
    this.modifyFunction.emit({isEditable :this.isEditable,isSubmited:this.isSubmited})
  }
}
