// subscriberComponent.js

import { LightningElement, track, wire } from 'lwc';
// Import the subscribe function and MessageContext from lightning/messageService
import { subscribe, MessageContext } from 'lightning/messageService';
// Import the message channel we created
import NOTIFICATION_CHANNEL from '@salesforce/messageChannel/NotificationChannel__c';

export default class SubscriberComponent extends LightningElement {
    // Track the received message
    @track receivedMessage = 'No message yet';

    // Holds the subscription reference to manage it
    subscription = null;

    // MessageContext is required to interact with LMS
    @wire(MessageContext)
    messageContext;

    // Lifecycle hook that runs when the component is inserted into the DOM
    connectedCallback() {
        // Subscribe to the message channel
        this.handleSubscribe();
    }

    // Method to handle subscription to the message channel
    handleSubscribe() {
        // Prevent duplicate subscriptions
        if (this.subscription) {
            return;
        }
        // Subscribe and handle incoming messages
        this.subscription = subscribe(
            this.messageContext,
            NOTIFICATION_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    // Handler for processing received messages
    handleMessage(message) {
        // Update the receivedMessage property with the message content
        this.receivedMessage = message.messageText ? message.messageText : 'No message payload';
    }
}
