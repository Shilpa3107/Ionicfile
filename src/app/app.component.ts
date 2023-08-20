import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  dataurl: string='./assets/home.json';
  items: any;
  public expandedSubtopics: { [key: string]: boolean } = {};

  public toggleSubtopic(label: any): void {
    if (this.expandedSubtopics[label.name]) {
      this.expandedSubtopics[label.name] = false;
    } else {
      this.expandedSubtopics[label.name] = true;
    }
  }

  public isSubtopicExpanded(label: any): boolean {
    return this.expandedSubtopics[label.name] === true;
  }
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home',content:'Welcome to home component' },
    { title: 'Methodology', url: '/folder/methodology', icon: 'bulb' },
    { title: 'Case Studies', url: '/folder/casestudies', icon: 'book' },
    { title: 'Best Practices', url: '/folder/practices', icon:'laptop' },
    { title: 'Tool & Resources', url: '/folder/tool', icon: 'hammer' },
    { title: 'Blog', url: '/folder/blog', icon: 'pencil' },
    { title: 'About Us', url: '/folder/about', icon: 'people'},
    { title: 'Contact Us', url: '/folder/contact', icon:'mail'}
  ];
  public selectedTopic: string ='home';
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    fetch(this.dataurl).then(res => res.json())
    .then(json => {
      this.items = json.topics;
      
      console.log("Topic name : ",this.items);
     
    }); 
  }

  public selectTopic(topic: string):void {
    this.selectedTopic = topic;
  }
}
