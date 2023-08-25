import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  
  topicurl : any;
  subtopicurl: any;
  private activatedRoute = inject(ActivatedRoute);
  constructor() { }

  
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log("Folder : ",this.folder)
    this.activatedRoute.paramMap.subscribe(params => {
      this.topicurl=params.get('_')?.split('_')[0];
      this.subtopicurl = params.get('_')?.split('_')[1];
    });
   
  }
}
