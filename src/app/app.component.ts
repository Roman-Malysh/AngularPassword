import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'my-app';
  password: string = '';
  isEmpty: boolean = this.password.length === 0;
  regexStrong = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$)(.,!%*?&])[A-Za-z\d@$!)(.,%*?&]{8,}$/
  );
  regexWeakLetters = new RegExp(/^[a-zA-Z]{8,}$/);
  regexWeakDigits = new RegExp(/^[0-9]{8,}$/);
  regexWeakSymbols = new RegExp(/^[^A-Za-z0-9]{8,}$/);
  regexMediumLetters = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!)(.,%*?&]{8,}$/
  );
  regexMediumDigits = new RegExp(
    /^(?=.*\d)(?=.*[@$)(.,!%*?&])[A-Za-z\d@$!)(.,%*?&]{8,}$/
  );
  regexMediumSymbols = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*[@$)(.,!%*?&])[A-Za-z\d@$!)(.,%*?&]{8,}$/
  );
  isEasy: boolean = false;
  isMedium: boolean = false;
  isStrong: boolean = false;
  isLength: boolean = false;
  initialState: boolean = false;
  notAllowedSymbols: boolean = false;
  warning: boolean = false;
  searchValueChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.password = value;
    this.isStrong = this.regexStrong.test(value);
    this.isLength = this.password.length < 8;
    this.isEmpty = value.length === 0;
    this.initialState = this.isLength && !this.isEmpty;
    this.isEasy =
      this.regexWeakLetters.test(value) ||
      this.regexWeakDigits.test(value) ||
      this.regexWeakSymbols.test(value);
    this.isMedium =
      (this.regexMediumLetters.test(value) &&
        !this.regexMediumDigits.test(value) &&
        !this.regexMediumSymbols.test(value)) ||
      (!this.regexMediumLetters.test(value) &&
        this.regexMediumDigits.test(value) &&
        !this.regexMediumSymbols.test(value)) ||
      (!this.regexMediumLetters.test(value) &&
        !this.regexMediumDigits.test(value) &&
        this.regexMediumSymbols.test(value));
    this.notAllowedSymbols =
      !this.isEasy && !this.isMedium && !this.isStrong && !this.isEmpty;
    this.warning = this.notAllowedSymbols && !this.isLength;
  }
}
