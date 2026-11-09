export const forms = {
  fields: {
    name: "Full name",
    phone: "Phone number",
    email: "Email address",
    topic: "What is your inquiry about?",
    subject: "Subject",
    message: "Message",
    optional: "(optional)",
    required: "required",
  },

  placeholders: {
    name: "Your full name",
    phone: "09XX XXX XXX",
    email: "name@example.com",
    subject: "A short subject",
    message: "Write your message here",
  },

  topics: {
    general: "General inquiry",
    savings: "Savings",
    loans: "Loans",
    membership: "Membership",
    employment: "Employment",
    partnership: "Partnership",
    other: "Other",
  },

  validation: {
    summaryTitle: "Please correct the following:",
    required: "This field is required.",
    nameShort: "Please enter your full name.",
    phoneInvalid:
      "Enter a valid phone number, for example 0911234567 or +251911234567.",
    emailInvalid: "Enter a valid email address, for example name@example.com.",
    contactRequired:
      "Please give a phone number or an email address so that we can reach you.",
    subjectShort: "Please enter a subject.",
    messageShort: "Please write at least 10 characters.",
    messageLong: "Please keep your message under 2,000 characters.",
  },

  submitPrepare: "Prepare my message",
  submitSend: "Send message",
  helpPrepare:
    "In the next step you choose how to send your message (email or WhatsApp). This website does not store it.",
  helpSend: "Your message is sent to the cooperative when you press send.",
  sending: "Sending…",

  prepared: {
    title: "Your message is ready to send",
    text: "This website does not store or automatically send messages. Choose how you would like to send yours:",
    email: "Open in my email app",
    whatsapp: "Send on WhatsApp",
    copy: "Copy message",
    copied: "Message copied to your clipboard.",
    copyFailed:
      "Could not copy automatically. Please select the text below and copy it.",
    edit: "Edit my message",
    callInstead: "Prefer to talk? Call us:",
  },

  sent: {
    title: "Message sent",
    text: "Thank you. Your message has been sent to the cooperative.",
    another: "Write another message",
  },

  failed: {
    title: "We could not send your message",
    text: "Please check your connection and try again, or contact us directly using the options below.",
  },

  compose: {
    website: "Website message",
    name: "Name",
    phone: "Phone",
    email: "Email",
    topic: "Topic",
    subject: "Subject",
    message: "Message",
    subjectContact: "Website inquiry",
    subjectMembership: "Membership inquiry",
    subjectComplaint: "Complaint / feedback",
    greeting: "Hello,",
  },

  honeypot: "Leave this field empty",
};
