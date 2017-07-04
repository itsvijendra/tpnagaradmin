import { Component, Input, OnInit,OnChanges } from '@angular/core';

import { UserServices } from '../services/user.services';
import { EmitterService } from '../services/emitter.services';
import { User } from '../model/user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() reset: string;
	@Input() userInfo: string;
	@Input() userList: string;

  private usersList;
	private currentUser:User;
	private isReset:boolean = true;

  constructor(private userServices: UserServices) { }
  
  ngOnInit() {
    this.userServices.getAllUser().subscribe(
                       response => this.usersList = response.users,
                       error=>  { alert(`Can't get users.`); }
                    );
  }

  public userSelected(user){		
		this.currentUser = user;
		EmitterService.get(this.userInfo).emit(this.currentUser);
		this.isReset = true;
	}

	public isSelected(user): boolean {
		if(!this.currentUser) {
			return false;
		}
		return this.currentUser.UserName ===  user.UserName ? true : false;
	}

	public deleteUser(userId:string){
		this.userServices.deleteUser(userId).subscribe(
						response => {
							if(response.error) { 
	                        	alert(`The user could not be deleted, server Error.`);
	                        } else {
	                        	this.usersList = response.users;
	                        }
                        },
                       error=> { 
                       		alert(`The user could not be deleted, server Error.`);
                       	}
                    );
	}

	ngOnChanges(changes:any) {

		EmitterService.get(this.reset).subscribe( (reset:boolean) => {
			this.isReset = false;
		});
		EmitterService.get(this.userList).subscribe( (userList:string) => {
			this.usersList = userList;
		});
	}

}
