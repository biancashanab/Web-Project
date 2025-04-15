import Contact from '../../models/Contact.js';

export const getContactMessages = async (req, res) => {
  console.log('getContactMessages called');
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    console.log('Messages found:', messages.length);
    res.json(messages);
  } catch (error) {
    console.error('Error in getContactMessages:', error);
    res.status(500).json({ message: 'Error fetching contact messages', error: error.message });
  }
};

export const submitContactForm = async (req, res) => {
  console.log('submitContactForm called with body:', req.body);
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'pending'
    });

    const savedContact = await newContact.save();
    console.log('Contact form submitted successfully:', savedContact);
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    res.status(500).json({ message: 'Error submitting contact form', error: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  console.log('updateContactStatus called with id:', req.params.id);
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('Updating message status to:', status);
    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      console.log('Message not found with id:', id);
      return res.status(404).json({ message: 'Contact message not found' });
    }

    console.log('Message updated successfully');
    res.json(updatedMessage);
  } catch (error) {
    console.error('Error in updateContactStatus:', error);
    res.status(500).json({ message: 'Error updating contact message status', error: error.message });
  }
}; 