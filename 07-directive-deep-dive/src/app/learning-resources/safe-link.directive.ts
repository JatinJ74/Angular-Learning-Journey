import { Directive, ElementRef, HostBinding, HostListener, Input, input, Renderer2 } from "@angular/core";

@Directive({
    selector: "a[safeLink]",
    standalone: true,
    host:{
        '(click)': 'onClick($event)',
    }
})
export class SafeLinkDirective{

    @Input() queryParam = 'myapp';

    constructor(private element:ElementRef<HTMLAnchorElement>){
        console.log("Directive created");
    }  
    
    onClick(event: MouseEvent){
        const wantsToLeave = window.confirm('Do you want to leave the app?');

        if(wantsToLeave){
            const address = this.element.nativeElement.href;
            this.element.nativeElement.href = address + '?from=' + this.queryParam;
            return;
        }

        event.preventDefault();
    }

}