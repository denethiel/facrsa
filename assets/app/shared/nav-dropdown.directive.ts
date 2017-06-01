import { Directive, HostListener } from '@angular/core';

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
    selector:'.nav-dropdown-items',
    host:{
        '[style.display]':'_display',
    }
})
export class NavDropdownItems{
    private _display = 'none';
    isDisplay() { 
        if(this._display = 'none'){
            return true;
        }else{
            return false;
        }
    }

    show() {
        this._display = 'block';
    }

    hide() {
        this._display = 'none';
    }

    toggle() {
        if(this.isDisplay()) {
            this.hide();
        }else{
            this.show();
        }
    }
}

@Directive({
    selector:'.nav-dropdown-toggle',
})
export class NavDropdownToggleDirective {
    constructor(private dropdown: NavDropdownDirective, private dropdownitems: NavDropdownItems) {}

    @HostListener('click',['$event'])
    toggleOpen($event: any){
        $event.preventDefault();
        this.dropdown.toggle();
        this.dropdownitems.toggle();
    }
}

export const NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective, NavDropdownItems];