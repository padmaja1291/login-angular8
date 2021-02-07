import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class LoginSharedService {
    constructor(private http: HttpClient){

    }

    loginUser(username: string, password: string){
        const date = new Date;
        let minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
        let hour = (date.getHours()<10?'0':'') + date.getHours();
        var token = hour + minutes;
        const formData = new FormData();
        formData.append('username',username);
        formData.append('password',password);
        formData.append('token',token);
        return this.http.post<any>(`${environment.apiUrl}/login`, formData);
        
    }
}