import { HttpClient } from '@angular/common/http'
import { Component, OnInit, Input } from '@angular/core'
import { AccountComponent } from '../components/account/account.component'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  // @Input('av') av: any;
  public constructor() { }
  public ngOnInit(): void { }

  // console.log(this.av);

}
