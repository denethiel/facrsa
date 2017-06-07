import {Directive, HostListener } from '@angular/core';

@Directive({
    selector:'.menu-wrapper',
    host:{
        '[class.enlarged]':'_enlarged'
    }
})
export class WrapperDirective{
    private _enlarged = false;
    isEnlarged() { return this._enlarged; }

    @HostListener('window:resize',['$event'])
    onResize($event: any){
        if($event.target.innerWidth > 990){
            this.shrink();
        }else{
            this.enlarged();
        }
        //console.log($event.target.innerWidth);
    }

    enlarged(){
        this._enlarged = true;
    }

    shrink(){
        this._enlarged = false;
    }

    toggle() {
        if(this.isEnlarged()) {
            this.shrink();
        }else{
            this.enlarged();
        }
    }
}

@Directive({
    selector:'.open-left',
})
export class MenuToggleDirective{
    constructor(private wrapper: WrapperDirective){}

    @HostListener('click',['$event'])
    toggleOpen($event: any){
        $event.preventDefault();
        this.wrapper.toggle();
        console.log("Soy un click");
    }
}

export const NAV_MENU_DIRECTIVES = [WrapperDirective, MenuToggleDirective];