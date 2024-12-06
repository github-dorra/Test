import { Component,OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { ClientsService} from '../services/clients.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  id:any
  errorMessage:string ='';
  errorMessage1:string =''; 
  formGroup: FormGroup;

  clientdetails:any= []

  cin:string 
  email:string
  name:string
  password:string
  userforupdate: AngularFireList<any>

  data = {
    cin: '',
    name : '' ,

    email :  '' ,
    password :  ''  
   } 
    id1: any;
    
  constructor(private router:Router,private firebase: AngularFireDatabase,
    private route: ActivatedRoute, private clientservice: ClientsService) {
    this.route.params.subscribe( params => {
      this.id = params
    });
    this.userforupdate = this.firebase.list('users');
    this.id1 = this.route.snapshot.paramMap.get('id');
    console.log(this.id1)
   }
  
   ngOnInit(): void {
    this.formGroup=new FormGroup({
      cin: new FormControl('',[
        Validators.required,
      
        Validators.minLength(8)
      ]),
      name: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(7)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      
    
    });
    this.clientservice.getClientById(this.id1).subscribe((results) => {
      
      this.getClient(results)
    
    })

  }

  getClient(entries: any[]){
    this.clientdetails = [];
    entries.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        if (element.key === this.id1) {
            this.clientdetails.push(y as Client);
            this.data.cin = this.clientdetails[0]['cin'];
            this.data.name = this.clientdetails[0]['name'];
            this.data.email = this.clientdetails[0]['email'];
        }
    });
}


   onSubmit1() {
  
    let create = 'false';
    
     console.log(this.data.cin);
     this.userforupdate.update(this.id1 , {
      cin :  this.data.cin ,
      name : this.data.name  ,
      email : this.data.email ,
      password : this.data.password,
  
    }).then(added =>{

      this.router.navigate(['/tables'])
  
})
 
  }


}
