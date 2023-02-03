import { Injectable } from '@angular/core';
import { Post } from '../types/post';
import { User } from '../types/user';
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor() { }

  async getUsers() {
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    return await users.json();
  }

  async getUser(id: number): Promise<User> {
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return await user.json();
  }

  async getPosts(id: number) {
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    return await posts.json();
  }

  async getComments(posts: Post[]) {
    let allPostsComments: any = [];
    for (const post of posts) {
      let postComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
      allPostsComments = [...allPostsComments, ...await postComments.json()];
    }
    return allPostsComments;
  }

    async getCommentsCount(posts: Post[]) {
    let counts: number[] = [];
    for (const post of posts) {
      let postComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
      counts.push((await postComments.json()).length);
    }
    return counts;
  }

  async getTasks(id: number) {
    const tasks = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
    return await tasks.json();
  }
}
