import { Component,Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServices } from '../../services/user.services';
import { EmitterService } from '../../services/emitter.services';
import { User } from '../../model/user';
@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Input() reset: string;
	@Input() userInfo: string;
	@Input() userList: string;

  private isInsert:boolean = true;
	private user:User = new User('','','','');

  constructor() {}

  ngOnInit() {
    
  } 

	 

}
