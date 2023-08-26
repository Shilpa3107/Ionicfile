import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  subtopic: string | null = null;
  part : string=""
  public subtopicContent: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.subtopic = this.activatedRoute.snapshot.paramMap.get('topic');
    console.log("Folder:  ",this.folder)
    console.log("SUbtopic : ",this.subtopic)
    if (this.subtopic) {
      const [topicUrl, subtopicUrl] = this.subtopic.split('_');
      this.part = subtopicUrl
      //  console.log("Subtopicurl : ",subtopicUrl)
      // Construct the URL for the JSON data
      const url = 'assets/' + this.folder + '.json';
     console.log("URL : ",url)
      // Fetch data from the constructed URL
      fetch(url)
        .then((response) => response.json())
        .then((data: any) => {
          const topic = data.topics.find((t: any) => t.url === topicUrl);

          if (topic) {
            const subtopicObj = topic.subtopics.find((subt: any) => subt.url === subtopicUrl);

            if (subtopicObj) {
              this.subtopicContent = subtopicObj.content;
            } else {
              this.subtopicContent = 'Subtopic not found.';
            }
          } else {
            this.subtopicContent = 'Topic not found.';
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          this.subtopicContent = 'Error fetching data. Please try again later.';
        });
    } else {
      this.subtopicContent = 'Subtopic parameter missing.';
    }
  }
}
