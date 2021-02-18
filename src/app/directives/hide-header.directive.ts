import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
  host:{
    '(ionScroll)': 'onContentScroll($event)'
  } 
})
export class HideHeaderDirective implements OnInit {
  @Input('header') header: any;

 public hidden:boolean;
 private timer;
//   private lastY = 0;

//   constructor(
//     private renderer: Renderer2,
//     private domCtrl: DomController)
//      { 

//     }

//     ngOnInit(): void {
//       this.header = this.header.el;
//       this.domCtrl.write(() => {
//           this.renderer.setStyle(this.header, 'transition', 'margin-top 100ms');
//       });
//   }
  

// onContentScroll(event:any){
//   if(event.detail.scrollTop>this.lastY){
//     this.domCtrl.write(()=>{
//       this.renderer.setStyle(this.header,'margin-top',`-${this.header.clientHeight}px`);
//     });
//   }else{
//     this.domCtrl.write(()=>{
//       this.renderer.setStyle(this.header,'margin-top','0');
//     });
//   }
//   this.lastY=event.detail.scrollTop;
// }



private lastY = 0;

    constructor(
        private renderer: Renderer2,
        private domCtrl: DomController
    ) { 
        this.hidden=false;
        this.timer=setTimeout(()=>{
            this.hidden=false;
        },70);
    }

    ngOnInit(): void {
        this.header = this.header.el;
        this.domCtrl.write(() => {
            this.renderer.setStyle(this.header, 'transition', 'top 150ms');
        });
    }

    @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
        // console.log($event.detail.scrollTop+"vs"+this.lastY);
        if ($event.detail.scrollTop > this.lastY) {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.header, 'top', `-${ this.header.clientHeight }px`);
                
            });
            console.log("Ocultando");
            
        } else {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.header, 'top', '0');
            });console.log("Mostrando");
            
        }

        this.lastY = $event.detail.scrollTop;
        
       
    }
}
