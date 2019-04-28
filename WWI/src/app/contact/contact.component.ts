import { Component, OnInit } from '@angular/core';

export class Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
 
  constructor() {
    this.name = "";
    this.email = "";
    this.subject = "";
    this.message = "";
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  contact = new Contact();

  // rubric60
  send() {
    let result = "";
    // rubric61
    if (this.contact.name === "" || this.contact.email === "" || this.contact.subject === "" || this.contact.message === "") {
      result = "All fields are required!";
    } else {
      result += `Name: ${this.contact.name}\n`;
      result += `Email Address: ${this.contact.email}\n`;
      result += `Subject: ${this.contact.subject}\n`;
      result += `Message: ${this.contact.message}\n`;
    }

    alert(result);
  }

}
