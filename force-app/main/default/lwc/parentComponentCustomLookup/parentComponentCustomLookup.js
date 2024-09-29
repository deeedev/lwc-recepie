// parentComponent.js
import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
  selectedRecord;

  handleRecordSelect(event) {
    this.selectedRecord = event.detail;
    console.log('Selected Record:', this.selectedRecord);
  }
}