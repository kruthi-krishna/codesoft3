document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get form inputs
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const registrationNumber = document.getElementById('registrationNumber').value;

  // Perform form validation (You can add more validation if needed)

  // Display success message
  alert(`Successfully registered!\nName: ${name}\nEmail: ${email}\nRegistration Number: ${registrationNumber}`);

  // Reset form fields
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('registrationNumber').value = '';
});
