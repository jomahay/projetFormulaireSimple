import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { DataFormulaire } from '../model/dataFormulaire.interface';



@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  registerForm!: FormGroup;

  cacher:boolean=false;
  erreurFormulaire!:string
  inscriptionElement!:any;
 
  total!:number;
  inscriptionDescription!: string;
  reservationDescription!: string;
  emailNonValid!: string;
  isSubmited: boolean=false;
  isEditable: boolean=false;
  obj!: DataFormulaire;
  zavatra: boolean=false;
  lolo!:boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,private snackBar: MatSnackBar
   ) { }
   openSnackBar() {
    this.snackBar.open("Votre inscription a été confirmée","succes", {
      duration: 2000,
   });
  }
   ngOnInit() {
    this.registerForm = this.fb.group({
     'nom': ['', [
       Validators.required,
     ]],
     'prenom': ['', [
       Validators.required,
       
     ]],
     'email': ['', [
       Validators.required,
       Validators.email,
       Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
     ]],
     'sexe': ['',[
      Validators.required,
      
    ]],
    'institution': ['', [
      Validators.required,
    ]],
    
     'adresse': ['', [
      Validators.required,
    ]],
    'pays': ['', [
      Validators.required,
    ]],
    'code': ['', [
      Validators.required,
    ]],
    'ville': ['', [
      Validators.required,
    ]],
    'page': ['',[
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    ]],
    'paysInstitution': ['',[Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
    'inscription': ['', [
      Validators.required,
    ]],
    'reservation':['', [
      Validators.required,
    ]],
    
    });
   }
   submit(){
      this.isSubmited = true;
      if(this.registerForm.valid){
        this.cacher=false;
        this.inscriptionElement=this.registerForm.value
        this.isEditable=true;
        this.total=Number(this.inscriptionElement.inscription)+Number(this.inscriptionElement.reservation)
        if(this.inscriptionElement.inscription==="150"){
          this.inscriptionDescription="Etudiant (150 EUR)"
        }else if(this.inscriptionElement.inscription==="200"){
          this.inscriptionDescription="Académique (200 EUR)"
        }else{
          this.inscriptionDescription="Entreprise (300 EUR)"
        }

        if(this.inscriptionElement.reservation==="150"){
          this.reservationDescription="Avec résérvation(150 EUR)"
        }else{
          this.reservationDescription="Sans résérvation (0 EUR)"
        }
        this.obj={
          nom: this.registerForm.value.nom,
          prenom:this.registerForm.value.prenom,
          sexe: this.registerForm.value.sexe,
          descReservation:this.reservationDescription,
          descHHebergement:this.inscriptionDescription,
          email:this.registerForm.value.email,
          total: this.total

        }
        
        
        //this.emailNonValid=false;
      }else{
        
        let formBro=this.registerForm.value
        this.cacher=true;
        this.lolo=formBro.email.errors && formBro.email.errors.pattern;

          
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

        if (!pattern.test(formBro.email) || formBro.email==='') {
          this.zavatra=false;
        }else if(pattern.test(formBro.email) && formBro.email!==''){
          this.zavatra=true; 
        }

      }
      
   }

   reset(event :any){
    
    this.isEditable=event.isEditable;
    this.isSubmited=event.isSubmited;
    this.openSnackBar();
    this.registerForm.reset();
   }
   modify(event :any){
    
    this.isEditable=event.isEditable;
    this.isSubmited=event.isSubmited;
   }
   
    
}
