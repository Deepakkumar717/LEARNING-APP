export interface IApiResponse {
    message: string,
    result: boolean,
    data: any
}

export class Login {

    userName: string
    password: string
    constructor() {
        this.password = '';
        this.userName = '';



    }
}
export interface IEnrollnent {
    courseId: number
    enrolledDate:string
    enrollmentId:number
    isCompleted:boolean
    userId:number
    courseName:string
    thumbnailUrl:string
    courseDescription: string
}


export class User {
    userId: number
    userName: string
    emailId: string
    fullName: string
    role: string
    createdDate: Date
    password: string
    projectName: string
    refreshToken: string
    refreshTokenExpiryTime: string

    constructor() {
        this.createdDate = new Date();
        this.emailId = '';
        this.fullName = '';
        this.password = '';
        this.projectName = '';
        this.role = '';
        this.refreshToken = '';
        this.refreshTokenExpiryTime = '';
        this.userId = 0; this.userName = '';





    }
}
export class Video{
    videoId: number
    videoUrl:string
    videoTitle: string
    videoDescription: string
    videoThumbnail:string
    totalDuration: string

    constructor(){

        this.videoId=0;
        this.videoUrl = '';
        this.videoTitle = '';
        this.videoDescription='';
        this.videoThumbnail = '';
        this.totalDuration = '';
    }
}
export class userlist {
    videoId: number
    videoUrl: string
    videoTitle: string
    videoDescription: string
    videoThumbnail: string
    totalDuration: string



    constructor() {
        this.videoId = 0;
        this.videoUrl = "";
        this.videoTitle = "";
        this.videoDescription = "";
        this.videoThumbnail = "";
        this.totalDuration = "";
    }
}

export interface Icourse {
    courseId: number,
    courseName: string,
    createdDate: string,
    totalHours: string,
    totalVideos: number,
    courseDescription: string,
    thumbnailUrl: string,
}
export interface ICoursewithVideos {

    courseId: number,
    courseName: string,
    createdDate: string,
    totalHours: string,
    totalVideos: number,
    courseDescription: string,
    lmsCourseVideos: {
        courseVideoId: number,
        courseId: number,
        videoId: number,

    }

}
export interface Icoursevideos {

    courseVideoId: number
    courseName: string
    courseId: number
    videoThumbnail: string
    videoTitle: string
    videoId: number
    videoUrl: string
}
export class IEnrollment {

    enrollmentId: number
    userId: number
    courseId: number
    enrolledDate: Date
    isCompleted: boolean
    constructor() {
        this.enrollmentId = 0;
        this.courseId = 0;
        this.enrolledDate = new Date();
        this.isCompleted = false;
        this.userId = 0;



    }
    
}
export class User1 {
    name: string = '';
    phone: string = '';
    emailId: string = '';  // Use emailId if this is the intended property, or rename to 'email' if it should be 'email'
    message: string = '';
    // Add any other properties that your form or logic requires
  }
  
