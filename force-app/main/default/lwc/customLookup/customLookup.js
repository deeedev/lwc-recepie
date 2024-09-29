import { LightningElement, api, track } from 'lwc';
import searchRecords from '@salesforce/apex/CustomLookupController.searchRecords';

export default class CustomLookup extends LightningElement {
  @api label = 'Lookup';
  @api placeholder = 'Search...';
  @api objectApiName = 'Account';
  @api iconName = 'standard:account';
  @api searchFields = 'Name';

  @track searchKey = '';
  @track searchResults;
  @track isDropdownOpen = false;

  timeoutId;

  get comboboxClass() {
    return this.isDropdownOpen
      ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open'
      : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
  }

  handleFocus() {
    this.isDropdownOpen = true;
  }

  handleBlur() {
    // Delay closing to allow click event to register
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
  }

  handleInput(event) {
    this.searchKey = event.target.value;
    // Debounce the search to reduce Apex calls
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.search();
    }, 300);
  }

  search() {
    if (this.searchKey.length < 2) {
      this.searchResults = null;
      return;
    }
    searchRecords({
      objectApiName: this.objectApiName,
      searchFields: this.searchFields,
      searchTerm: this.searchKey
    })
      .then((results) => {
        this.searchResults = results;
      })
      .catch((error) => {
        console.error('Error:', error);
        this.searchResults = null;
      });
  }

  handleSelect(event) {
    const recordId = event.currentTarget.dataset.id;
    const selectedRecord = this.searchResults.find((record) => record.id === recordId);
    this.searchKey = selectedRecord.name;
    this.isDropdownOpen = false;
    this.dispatchEvent(new CustomEvent('recordselect', { detail: selectedRecord }));
  }
}