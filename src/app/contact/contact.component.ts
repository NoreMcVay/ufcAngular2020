import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  formSubmitted = false;

  constructor(public router: Router,
              public translate: TranslateService) {
    translate.addLangs(['en', 'ru', 'po']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru|po|/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      enteredName: new FormControl(null, Validators.required),
      enteredEmail: new FormControl(null, [Validators.required, Validators.email]),
      enteredMessage: new FormControl(null, Validators.required)
    });
  }

  onSaveForm() {
    console.log(this.contactForm.value);
    this.contactForm.reset();
    this.formSubmitted = true;
  }

}
