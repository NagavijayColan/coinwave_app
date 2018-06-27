import { Directive,HostListener,ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyalphabets]'
})
export class OnlyalphabetsDirective {

  constructor() { }
 @HostListener('keydown',['$event'])
 onlyAlphabets(event){
  var key = event.keyCode;
  if((key >= 65 && key <= 90) || key == 8 || key == 32 || key == 9){
     return true
  }
  else{
    return false;
  }
  }
  @HostListener('blur',['$event'])
  notNull(event){
    var val = event.target.value;
    if(val == ""){
      console.log(event.target.classList.contains('error'))
      if(!event.target.classList.contains('error')){
        event.target.classList.add("error");
        event.target.parentNode.insertAdjacentHTML('beforeend', '<div class="error_mes">Name is mandatory!</div>');
      }
  }
    else if(event.target.classList.contains('error')){
      event.target.classList.remove("error");
      event.target.parentNode.childNodes[event.target.parentNode.childNodes.length-1].remove();
    }
  }
}
