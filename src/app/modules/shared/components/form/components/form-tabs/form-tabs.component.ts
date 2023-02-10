import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-tabs',
  templateUrl: './form-tabs.component.html',
  styleUrls: ['./form-tabs.component.scss']
})
export class FormTabsComponent implements OnChanges {

  @Input() tabs: string[] = [];
  @Input() activeTab: string = '';
  progress: number = 0;

  ngOnChanges (changes: SimpleChanges) {
    if (changes['activeTab']) {
      let totalTabs = this.tabs.length;
      let activeTabNumber = 1;
      let width = 0;

      this.tabs.forEach(tab => {
        if (tab == this.activeTab) width = (activeTabNumber / totalTabs) * 100;
        else activeTabNumber += 1;
      });

      this.progress = width;
    }
  }
}
