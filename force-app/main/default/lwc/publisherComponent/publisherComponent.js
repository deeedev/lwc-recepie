// publisherComponent.js

import { LightningElement, track, wire } from 'lwc';
// Import the publish function and MessageContext from lightning/messageService
import { publish, MessageContext } from 'lightning/messageService';
// Import the message channel we created (ensure it's deployed to your org)
import NOTIFICATION_CHANNEL from '@salesforce/messageChannel/NotificationChannel__c';

export default class PublisherComponent extends LightningElement {
    // Track the message input by the user
    @track message = '';

    // MessageContext is required to interact with LMS
    @wire(MessageContext)
    messageContext;

    // Handle input field changes and update the message property
    handleChange(event) {
        this.message = event.target.value;
    }

    // Publish the message to the message channel when the button is clicked
    handlePublish() {
        // Create the payload with the message text
        const payload = { messageText: this.message };
        // Use the publish function to send the message
        publish(this.messageContext, NOTIFICATION_CHANNEL, payload);
        // Clear the message input after publishing
        this.message = '';
    }
}
