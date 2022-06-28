import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
	private _url = "http://jsonplaceholder.typicode.com/users";

	constructor(private _http: HttpClient){
	}

	getUsers(){
		return this._http.get<string[]>(this._url);
	}

    deleteUser(user){
		return this._http.delete(this.getUserUrl(user));
	}

    private getUserUrl(userId){
		return this._url + "/" + userId;
	}
}
