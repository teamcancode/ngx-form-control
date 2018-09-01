import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data = {
    email: '',
    password: 'temp',
    repeatPassword: 'temp',
    age: 18,
    description: 'Hello Kitty',
    gender: 'm',
    skill: [{text: 'HTML', value: 2}, {text: 'CSS', value: 3}],
    allowAd: true,
  };

  listGender = [
    {text: 'Unknown', value: 'u'},
    {text: 'Male', value: 'm'},
    {text: 'Female', value: 'f'},
  ];

  listSkill = [
    {text: 'PHP', value: 1},
    {text: 'HTML', value: 2},
    {text: 'CSS', value: 3},
    {text: 'Javascript', value: 4},
    {text: 'Typescript', value: 5},
    {text: 'Python', value: 6},
    {text: 'Java', value: 7},
    {text: 'C', value: 8},
    {text: 'C++', value: 9},
    {text: 'C#', value: 10},
  ];

}
