import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  userType = input.required<Permission>({alias:'appAuth'});
    // userType = input.required<Permission>();
    // if we do use it without alias then we have to take input in this:
    // For ex:  <p appAuth="admin">Only Admins should see this!</p> in case of -> alias
    //  <p appAuth userType="admin">Only Admins should see this!</p> in case of -> without alias

  private authService  = inject(AuthService);

  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);



  constructor() {
    effect(()=>{
      if(this.authService.activePermission() === this.userType()){
          // console.log('SHOW ELEMENT');
          this.viewContainerRef.createEmbeddedView(this.templateRef);
      }else{
        // console.log('DO NOT SHOW ELEMENT');
        this.viewContainerRef.clear();
      }
    });
   }

}
