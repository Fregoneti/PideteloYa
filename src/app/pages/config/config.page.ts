import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  public darkMode: boolean = true;
  public language: string;
  public languageString: string;
  public langmenu: any;

  constructor(private _translate: TranslateService) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
    this.langmenu = (environment.defaultLanguage == "en" ? false : true);
  }
  ngOnInit(): void { }

  public changeLanguage(): void {
    this._translateLanguage();
  }

  _translateLanguage(): void {
    this._translate.use(this.language);

  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('en');
    if (language) {
      this.language = language;
    }
    else {
      // Set your language here
      this.language = 'en';
    }
    this._translateLanguage();
  }

  
//Dark
cambiodark(){
  this.darkMode = !this.darkMode;
  console.log("CAMBIo");
  
  document.body.classList.toggle('dark');
}
}





