import { Directive, ElementRef, inject, input } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({
    selector:'a[appSafeLink]',
    standalone:true,
    host:{
        '(click)':'onConfirmLeavePage($event)'
    },
    hostDirectives:[LogDirective]
})
export class SafeLinkDirective{

    queryParam  = input('myapp',{alias:'appSafeLink'});

    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor(){
        console.log("safeLinkDirective is active");
    }

    onConfirmLeavePage(event :MouseEvent){
        const wantsToLeave  = window.confirm('Do you want to leave the app?');
        if(wantsToLeave){
            //  const address = (event.target as HTMLAnchorElement).href; // old way of doing unsafe, reason explained in Notes
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + "?from="+ this.queryParam();
            return;
        }
        event.preventDefault();

    }

}