import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'Methodology', url: '/folder/methodology', icon: 'bulb' },
    { title: 'Case Studies', url: '/folder/casestudies', icon: 'book' },
    { title: 'Best Practices', url: '/folder/practices', icon:'laptop' },
    { title: 'Tool & Resources', url: '/folder/tool', icon: 'hammer' },
    { title: 'Blog', url: '/folder/blog', icon: 'pencil' },
    { title: 'About Us', url: '/folder/about', icon: 'people'},
    { title: 'Contact Us', url: '/folder/contact', icon:'mail'}
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
