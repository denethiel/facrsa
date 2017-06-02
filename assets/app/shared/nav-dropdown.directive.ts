import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector:'.nav-dropdown',
    host:{
        '[class.open]':'_open',
    }
})
export class NavDropdownDirective{
    private _open = false;

    isOpen() { return this._open; }

    open() {
        this._open = true;
    }

    close() {
        this._open = false;
    }

    toggle() {
        if(this.isOpen()) {
            this.close();
        }else{
            this.open();
        }
    }
}

@Directive({
    selector:'.nav-dropdown-toggle',
})
export class NavDropdownToggleDirective {
    constructor(private dropdown: NavDropdownDirective) {}

    @HostListener('click',['$event'])
    toggleOpen($event: any){
        $event.preventDefault();
        this.dropdown.toggle();
        //this.navItems.toggle();
    }
}

export const NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective];