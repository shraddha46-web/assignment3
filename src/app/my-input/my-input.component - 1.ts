import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl,ValidatorFn,AbstractControl } from '@angular/forms';

//import {
//   ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidatorFn, Validators, NG_VALIDATORS, NgControl, NgForm
// } from '@angular/forms';


@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [
  //   { 
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => MyInputComponent),
  //     multi: true
  //   }
  // ]
})
export class MyInputComponent implements ControlValueAccessor{ // OnInit {
@Input() label: string;
@Input() errors: any;
  value: any = '';
  constructor(
    // Retrieve the dependency only from the local injector,
    // not from parent or ancestors.
    @Self()
    // We want to be able to use the component without a form,
    // so we mark the dependency as optional.
    @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const control = this.ngControl.control;

    console.log(control);

    const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
    // if (this.isRequired) {
    //   validators.push(Validators.required);
    // }
    // if (this.pattern) {
    //   validators.push(Validators.pattern(this.pattern));
    // }

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  private value1: any;
  
  // private _value: any;

  // set value(value: any) {
  //   this._value = value;
  //   this.onChange(value);
  // }

  // get value(): any {
  //   return this._value;
  // }

  onChange = event => {

    console.log(event);
    console.log(this.errors);
  };
  onTouched = event => {
  //  this.value = value;
    //console.log(this.value);
    console.log(event);
    console.log(this.errors);
  };

  writeValue(value: any) {
  //  this.value1 = value;
    console.log(value);
    // if (this.changeDetectorRef) {
    //   this.changeDetectorRef.markForCheck();
    // }
  }

  registerOnChange(fn: any) {
    //this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  
  validate(c: AbstractControl): { [key: string]: any; } {
    const validators: ValidatorFn[] = [];
    // if (this.isRequired) {
    //   validators.push(Validators.required);
    // }
    // if (this.pattern) {
    //   validators.push(Validators.pattern(this.pattern));
    // }

    return validators;
  }
}
