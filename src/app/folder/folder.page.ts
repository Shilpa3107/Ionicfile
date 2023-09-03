import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  subtopic: string | null = null;
  part: string = '';
  public subtopicContent: any[] = [];
  public valuecontent: string = '';
  contentItems: any[] = [];
  num: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.subtopic = this.activatedRoute.snapshot.paramMap.get('topic');
    console.log('Folder: ', this.folder);
    console.log('Num : ', this.num);
    console.log('Subtopic: ', this.subtopic);

    if (this.subtopic) {
      // Split the subtopic parameter using underscores
      const subtopicParts = this.subtopic.split('_');
      console.log('Subtopicparts : ', subtopicParts);
      if (subtopicParts.length === 2) {
        const [topicUrl, subtopicUrl] = subtopicParts;
        this.part = subtopicUrl;
        console.log('Topic Url: ', topicUrl);
        console.log('Subtopic Url: ', subtopicUrl);
        console.log('part: ', this.part);
        // Construct the URL for the JSON data
        const url = 'assets/' + this.folder + '.json';
        console.log('URL: ', url);

        // Fetch data from the constructed URL
        fetch(url)
          .then((response) => response.json())
          .then((data: any) => {
            const topic = data.topics.find((t: any) => t.url === topicUrl);
            console.log('Topic : ', topic);

            if (topic) {
              const subtopicObj = topic.subtopics.find(
                (subt: any) => subt.url === subtopicUrl
              );
              if (subtopicObj) {
                this.subtopicContent = subtopicObj.content;
                
                // Check if 'item.table' is provided and load the associated JSON file
                this.subtopicContent.forEach((item: any) => {
                  if (item.table) {
                    const tableUrl = 'assets/' + item.table + '.json';
                    fetch(tableUrl)
                      .then((response) => response.json())
                      .then((tableData: any[]) => {
                        item.tableContent = tableData; // Populate the tableContent array
                      })
                      .catch((error) => {
                        console.error('Error fetching table data:', error);
                      });
                  }
                });
              } else {
                this.subtopicContent= [{"value": "Subtopic not found."},
                {"imageUrl":"Data format error: Unable to find image url."},
                {
                  "describe":"Data format error: Unable to find description"
                },
                {
                  "table":"Data format error: Unable to find table"
                },
                {
                  "description":"Data format error: Unable to find description"
                }];
      
              }
            } else {
              this.subtopicContent = [{"value": "Topic not found."},
              {"imageUrl":"Data format error: Unable to find image url."},
              {
                "describe":"Data format error: Unable to find description"
              },
              {
                "table":"Data format error: Unable to find table"
              },
              {
                "description":"Data format error: Unable to find description"
              }];
    
            }
          }, (error) => {
            console.error('Error fetching data:', error);
            this.subtopicContent = [{"value": "Error fetching data. Please try again later."},
            {"imageUrl":"Data format error: Unable to find image url."},
            {
              "describe":"Data format error: Unable to find description"
            },
            {
              "table":"Data format error: Unable to find table"
            },
            {
              "description":"Data format error: Unable to find description"
            }];
          });
    }
  }
  }

  @ViewChild('myModal') modalRef!: ElementRef;

  modalImageUrl: string = '';
  modalImageDescrip: string = '';

  openModal(imageUrl: string, describe: string) {
    // Open the modal popup
    const modal: HTMLElement = this.modalRef.nativeElement;
    modal.style.display = 'block';
  
    // Set the modal content to the clicked image and description
    this.modalImageUrl = imageUrl;
    this.modalImageDescrip = describe;
    console.log("OpenModal")
  }

  closeModal() {
    // Close the modal popup
    const modal: HTMLElement = this.modalRef.nativeElement;
    modal.style.display = 'none';
    console.log("CloseModal")
  }

  openTableModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeTableModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
