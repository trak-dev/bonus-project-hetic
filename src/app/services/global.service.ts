import { Injectable } from '@angular/core';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user: User = {} as User;
  users: User[] = [];

  constructor() { }

  char_rot(num: number, char: string) {
    const initCharCode = char.charCodeAt(0)
    let charCode = char.toLowerCase().charCodeAt(0)
    let newCharCode = charCode + num
    if (newCharCode > 122) {
        newCharCode = newCharCode - 26
    }
    if (initCharCode >= 65 && initCharCode <= 90) {
        return String.fromCharCode(newCharCode).toUpperCase()
    } else {
        return String.fromCharCode(newCharCode)
    }
}

caesar(num: number, str: string) {
    let newStr = ''
    for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[a-z]/i)) {
            newStr += this.char_rot(num, str[i])
        } else {
            newStr += str[i]
        }
    }
    return newStr
}
}
