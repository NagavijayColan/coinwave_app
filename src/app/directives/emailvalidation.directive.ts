import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEmailvalidation]'
})
export class EmailvalidationDirective {

  constructor() { }
  @HostListener('blur', ['$event'])
  validateEmail(event) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var email = event.target.value;
    if (reg.test(email) == false) {
      if (!event.target.classList.contains("error")) {
        event.target.classList.add("error");
        event.target.parentNode.insertAdjacentHTML('beforeend', '<div class="error_mes">Not a valid Email!</div>');
      }
    }
    else if (event.target.classList.contains("error")) {
      event.target.classList.remove("error");
      var childNo = event.target.parentNode.childNodes.length - 1
      event.target.parentNode.childNodes[childNo].remove();
    }
  }
}
