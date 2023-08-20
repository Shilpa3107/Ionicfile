import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  // dataurl: string= './assets/home.json';
  dataurl:string ="";
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
    { title: 'Home', url: '/folder/home', icon: 'home',lastword: 'home' },
    { title: 'Methodology', url: '/folder/methodology', icon: 'bulb'},
    { title: 'Case Studies', url: '/folder/casestudies', icon: 'book',lastword:'casestudies' },
    { title: 'Best Practices', url: '/folder/practices', icon:'laptop' ,lastword:'practices'},
    { title: 'Tool & Resources', url: '/folder/tool', icon: 'hammer',lastword:'tool' },
    { title: 'Blog', url: '/folder/blog', icon: 'pencil' },
    { title: 'About Us', url: '/folder/about', icon: 'people'},
    { title: 'Contact Us', url: '/folder/contact', icon:'mail'}
  ];

  
  public selectedTopic: string ='home';
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const segments = event.url.split('/').filter(segment => segment !== '');
        const lastSegment = segments[segments.length - 1];
        const menuItem = this.appPages.find(page => page.lastword === lastSegment);
        if (menuItem) {
          // this.selectedTopic = menuItem.lastword;
          this.dataurl = `/assets/${menuItem.lastword}.json`; // Correctly use backticks for template literals
          this.fetchData();
        }
      }
    });
  }

  private fetchData(): void {
    fetch(this.dataurl)
      .then(res => res.json())
      .then(json => {
        this.items = json.topics;
        console.log('Topic name : ', this.items);
      });
  }
  

}
