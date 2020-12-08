import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent implements  OnInit {
	controll: any;
	errorMsg: any;
	hasFileError: boolean = false;
  label1:any;
	@Input()
	set errors(err: any) {
		this.errorMsg = err;
	}

	@Input()
	set ctrl(ctrl: any) {
		this.controll = ctrl;
	//	console.log(this.controll)
	}

	@Input()
	set lbl(lbl: any) {
		this.label1 = lbl;
	}
	displayError: boolean;
	error: any;

	constructor() {
	}

	ngOnInit() {
	}

	ngOnChanges() {
		this.hasFileError = false;
		if (this.errorMsg) {
			let keys = Object.keys(this.errorMsg);
			let len = keys.length;
			if (len > 0) {
				switch (keys[0]) {
          
          case "spaceNotAllowed":
						this.error = "Space Not allowed";
						break;
					case "required":
						this.error = "This field is required.";
						break;
					case "minlength":
						this.error = "Minimum " + this.errorMsg['minlength']['requiredLength'] + " length required.";
						break;
					case "maxlength":
						this.error = "Maximum " + this.errorMsg['maxlength']['requiredLength'] + " length required.";
						break;
					case "email":
						this.error = "Please enter a valid email address";
						break;
					case "min":
						this.error = "Please enter greater than " + this.errorMsg['min']['min'];
						break;
					case "max":
						this.error = "Please enter less than " + this.errorMsg['max']['max'];
						break;
					case "pattern":
						this.error = "Your password must have 1 upper and lowercase letter, 1 number and 1 special character with a minimum length of 8.";
						break;
					case "nameField":
						this.error = "This Field accepts only Alphabets";
						break;
						
					case "phoneValid":
						this.error = "This field accepts only numbers";
						break;
					case "mobile_number":
						this.error = "Please enter valid Mobile Number";
						break;
					case "integer":
						this.error = "This Field accepts only Integer";
						break;
					case "alphaNumeric":
						this.error = "This Field accepts only AlphaNumeric characters";
						break;
					case "splChar":
						this.error = "This Field accepts only Special characters";
						break;
					case "email":
						this.error = "Please enter a valid email";
						break;
					case "alphabets":
						this.error = "This field contain only alphabets";
						break;
					case "url":
						this.error = "Enter valid link";
						break;
					case "quantityValid":
						this.error = "This field accepts only Integers";
						break;
					case "alpAndSplChar":
						this.error = "This field accepts only alphabets and special characters";
						break;
					case "validationForDomainAndUrl":
						this.error = "Enter valid Url";
						break;
					case "priceValid":
						this.error = "This field accepts only Decimal numbers";
						break;
					case "emailValid":
						this.error = "Please enter a valid Email";
						break;
					case "extension":
						this.error = "Invalid Extension.";
						break;
					case "maxSize":
						this.error = "File size should be less than maximum size.";
						break;
					case "dimension":
						this.error = "Upload file 300 x 300 dimensions.";
						break;
					case "custom_message":
						this.error = this.errorMsg['custom_message']
				}
			}
		}
	}

}
