import { Component, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse, Icourse, Icoursevideos, IEnrollment, User } from '../../model/master.mode';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  masterSrv=inject(MasterService);
  courseList = signal<Icourse[]>([]);
  courseVideos:Icoursevideos[]=[]
  @ViewChild('courseModal') modal:ElementRef | undefined;

   loggedUserData: User = new User();
  
  
  ngOnInit(): void {
   // Check if localStorage is available
   if (typeof localStorage !== 'undefined') {
    const localData = localStorage.getItem('learningUser');
    if (localData) {
      this.loggedUserData = JSON.parse(localData);
    }
  }
    this.loadCourses();
    
  }
  onEnroll(courseId: number){
   
    if(this.loggedUserData.userId == 0){
      alert("Please Login First to enroll")
    }
    else{
      const enrollObj: IEnrollment ={
        courseId:courseId,
        enrolledDate : new Date(),
        enrollmentId:0,
        userId:this.loggedUserData.userId,
        isCompleted:false
      };
      this.masterSrv.onEnrollment(enrollObj).subscribe((res: IApiResponse) => {
        if (res.result) {
          alert("Enrollment Success");
          
        } else {
          alert(res.message);
        }
      });
    }

  }
  openModal(courseId: number){
    if(this.modal){
      this.modal.nativeElement.style.display = 'block'
      this.getCourseVideos(courseId)
    }

  }
  closeModal(){
    if(this.modal){
      this.modal.nativeElement.style.display = 'none'
     
    }

  }
  loadCourses(){
    this.masterSrv.getAllCourse().subscribe((res:IApiResponse)=>{
      this.courseList.set(res.data)
    },error=>{

    })
  }
  getCourseVideos(courseId:number){
    this.masterSrv. getCourseVideosbyCourseId(courseId).subscribe((res:IApiResponse)=>{
      this.courseVideos=res.data
    },error=>{

    })
  }

}
