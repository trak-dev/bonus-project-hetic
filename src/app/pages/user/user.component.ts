import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user';
import { Post } from 'src/app/types/post';
import { Comment } from 'src/app/types/comment';
import { Task } from 'src/app/types/task';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  @Input() user = this.Global.user;
  @Input() users: User[] = [];
  posts: Post[] = [];
  comments: Comment[] = [];
  tasks: Task[] = [];
  commentNumbers: number[] = [];
  average: number = 0;
  tasksStatus = { completed: 0, notCompleted: 0}
  distances: number[] = [];
  loaded: boolean = false;
  loading: boolean = false;
  crypted: boolean = false;

  constructor(
    private Users: UsersService,
    private Global: GlobalService
    ) { }

  async ngOnInit() {
  }

  async ngOnChanges() {
    this.distances = [];
    if (!this.user.id) return;
    try {
      this.loaded = false;
      this.loading = true;
      this.posts = await this.Users.getPosts(this.user.id);
      this.commentNumbers = await this.Users.getCommentsCount(this.posts);
      this.average = this.commentNumbers.reduce((a, b) => a + b, 0) / this.commentNumbers.length;
      this.tasks = await this.Users.getTasks(this.user.id);
      this.tasksStatus.completed = this.tasks.filter(task => task.completed).length;
      this.tasksStatus.notCompleted = this.tasks.filter(task => !task.completed).length;
      for (let user of this.users) {
        console.log(this.user.name, user.name , {lat: this.user.address.geo.lat, lng: this.user.address.geo.lng}, {lat: user.address.geo.lat, lng: user.address.geo.lng});
        this.distances.push(this.calcCrow(this.user.address.geo, user.address.geo));
      }
    } catch (error) {
      console.error(error);
      alert('something went wrong');
    } finally {
      this.loaded = true;
      this.loading = false;
    }
}


  logme() {
    this.user = this.Global.user;
  }

  calcCrow(userPos: {lat: string | number, lng: string | number}, OtherUserPos: {lat: string | number, lng: string | number}) 
    {
      userPos.lat = parseFloat(userPos.lat as string);
      userPos.lng = parseFloat(userPos.lng as string);
      OtherUserPos.lat = parseFloat(OtherUserPos.lat as string);
      OtherUserPos.lng = parseFloat(OtherUserPos.lng as string);
      let R = 6371; // km
      let dLat = this.toRad(OtherUserPos.lat-userPos.lat);
      let dLon = this.toRad(OtherUserPos.lng-userPos.lng);
      let tmpuserPos = this.toRad(userPos.lat);
      let tmpOtherUserPos = this.toRad(OtherUserPos.lat);

      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(tmpuserPos) * Math.cos(tmpOtherUserPos); 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      let d = R * c;
      return parseInt(d.toFixed(0));
    }

    toRad(Value: number) 
    {
        return Value * Math.PI / 180;
    }

    cryptThis() {
      for (let post of this.posts) {
        if (this.crypted) {
          post.title = this.Global.caesar(-5, post.title);
          post.body = this.Global.caesar(-5, post.body);
        } else {
          post.title = this.Global.caesar(5, post.title);
          post.body = this.Global.caesar(5, post.body);
        }
      }
      this.crypted = !this.crypted;
    }

}
