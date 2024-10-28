import { Component, inject, OnInit } from '@angular/core';
import { IApiResponse, Icourse, ICoursewithVideos, IEnrollment, User } from '../../model/master.mode';
import { MasterService } from '../../services/master.service';
import { SlicePipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IEnrollnent } from '../../model/master.mode';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, SlicePipe],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']  // Fixed 'styleUrl' to 'styleUrls'
})
export class MyCoursesComponent implements OnInit {
  
  loggedUserData: User = new User();
  masterSrv = inject(MasterService);
  courseList: IEnrollnent[] = []; 
   // Fixed typo in IEnrollment
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute)
  courseId: number = 0;
  constructor() {
    const localData = localStorage.getItem('learningUser');
    if (localData !== null) {
      const parseData = JSON.parse(localData);
      this.loggedUserData = parseData;
    }
    
  }

  ngOnInit(): void {
    this.getEnrollmentByUserId();
  }

  navigatingToCourse(id: number) {
    this.router.navigate(['coursedetail', id]);
  }

  getEnrollmentByUserId() {
    this.masterSrv.getEnrolledCourseByUserId(this.loggedUserData.userId).subscribe((res: IApiResponse) => {
      this.courseList = res.data;
    });
  }
  
}
