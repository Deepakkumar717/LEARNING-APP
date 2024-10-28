import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IApiResponse, Login, User, User1 } from './model/master.mode';
import { MasterService } from './services/master.service';
import { HttpClientModule } from '@angular/common/http';
import emailjs from 'emailjs-com'; // Import EmailJS

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'learningsystem';
  isLoginFormVisible: boolean = true;

  userRegisterObj: User = new User();
  loginObj: Login = new Login();
  masterSrv = inject(MasterService);
  loggedUserData: User = new User();
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the feedback form with validation
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('learningUser');
    if (localData) {
      try {
        const parseData = JSON.parse(localData);
        if (parseData) {
          this.loggedUserData = parseData;
        }
      } catch (error) {
        console.error("Failed to parse user data from local storage", error);
      }
    }
  }

  toggleform(val: boolean) {
    this.isLoginFormVisible = val;
  }

  onlogoff() {
    this.loggedUserData = new User();
    localStorage.removeItem('learningUser');
  }

  openModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openFeedback() {
    const feedbackModal = document.getElementById("feedbackModal");
    if (feedbackModal) {
      feedbackModal.style.display = 'block';
    }
  }

  closeFeedback() {
    const feedbackModal = document.getElementById("feedbackModal");
    if (feedbackModal) {
      feedbackModal.style.display = 'none';
    }
    this.feedbackForm.reset(); // Reset the form when closing the modal
  }

  onRegister() {
    this.masterSrv.addNewUser(this.userRegisterObj).subscribe((res: IApiResponse) => {
      if (res.result) {
        alert("User Registered");
        this.closeModal();
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.masterSrv.onLogin(this.loginObj).subscribe((res: IApiResponse) => {
      if (res.result) {
        alert("User Logged Successfully");
        localStorage.setItem('learningUser', JSON.stringify(res.data));
        this.loggedUserData = res.data;
        this.closeModal();
      } else {
        alert(res.message);
      }
    });
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      // Get form values
      const feedbackData: User1 = this.feedbackForm.value;
  
      // Create a plain object with the expected structure for EmailJS
      const emailData = {
        name: feedbackData.name,
        phone: feedbackData.phone,
        email: feedbackData.emailId, // Use the email entered by the user
        message: feedbackData.message,
      };
  
      // Send feedback using EmailJS
      emailjs.send('service_cln9wzp', 'template_479nr1i', emailData, 'rbLx3-AzN55-82rzj')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert("Thank you for your feedback! We have received your message.");
          this.closeFeedback();
        })
        .catch((error) => {
          console.error('FAILED...', error);
          alert("Failed to send feedback. Please try again later.");
        });
    } else {
      alert("Please fill out all required fields.");
    }
  }
  
}
