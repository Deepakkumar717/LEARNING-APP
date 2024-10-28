import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApiResponse, ICoursewithVideos, User, Video } from '../../model/master.mode';
import { MasterService } from '../../services/master.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  activatedRoute = inject(ActivatedRoute)
  courseId: number = 0;
  loggedUserData: User = new User();
  masterSrv = inject(MasterService);
  videoList: Video[] = []; 
  currentVideoUrl: string='';
  safeUrl: SafeResourceUrl | undefined;
  
  constructor(private sanitize : DomSanitizer) { 
    const localData = localStorage.getItem('learningUser');
    if (localData !== null) {
      const parseData = JSON.parse(localData);
      this.loggedUserData = parseData;
    }
    this.activatedRoute.params.subscribe((res:any)=>{
      this.courseId = res.id;
      this.getVideos();
    })
  }

   sanitizeUrl(url: string): SafeResourceUrl{
    return this.sanitize.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+url);
   }
  watchVideo(url:string){
    this.safeUrl = this.sanitizeUrl(url);

  }

  getVideos() {
    this.masterSrv.getCourseVideosbyCourseId(this.courseId).subscribe((res: IApiResponse) => {
      this.videoList = res.data;
    });
  }

}
