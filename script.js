document.addEventListener('DOMContentLoaded', function () {
  const fetchButton = document.getElementById('fetch-button');
  const rapidCheckbox = document.getElementById('rapid-checkbox');
  const blitzCheckbox = document.getElementById('blitz-checkbox');
  const bulletCheckbox = document.getElementById('bullet-checkbox');
  let username = ''; // Variable to store the current username

  // Function to fetch ratings and update display
  function fetchAndDisplayRatings() {
      if (!username) return; // If no username is set, exit function

      const url = `https://api.chess.com/pub/player/${username}/stats`;

      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              document.getElementById('username').textContent = username;

              // Update rapid rating section
              const rapidRatingSection = document.getElementById('rapid-rating-section');
              if (rapidCheckbox.checked) {
                  rapidRatingSection.style.display = 'block';
                  rapidRatingSection.querySelector('#rapid-rating').textContent = data.chess_rapid ? data.chess_rapid.last.rating : 'N/A';
              } else {
                  rapidRatingSection.style.display = 'none';
              }

              // Update blitz rating section
              const blitzRatingSection = document.getElementById('blitz-rating-section');
              if (blitzCheckbox.checked) {
                  blitzRatingSection.style.display = 'block';
                  blitzRatingSection.querySelector('#blitz-rating').textContent = data.chess_blitz ? data.chess_blitz.last.rating : 'N/A';
              } else {
                  blitzRatingSection.style.display = 'none';
              }

              // Update bullet rating section
              const bulletRatingSection = document.getElementById('bullet-rating-section');
              if (bulletCheckbox.checked) {
                  bulletRatingSection.style.display = 'block';
                  bulletRatingSection.querySelector('#bullet-rating').textContent = data.chess_bullet ? data.chess_bullet.last.rating : 'N/A';
              } else {
                  bulletRatingSection.style.display = 'none';
              }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              alert('Error fetching data. Please make sure the username is correct.');
              document.getElementById('username').textContent = 'N/A';
              document.getElementById('rapid-rating').textContent = 'N/A';
              document.getElementById('blitz-rating').textContent = 'N/A';
              document.getElementById('bullet-rating').textContent = 'N/A';
          });
  }

  // Event listener for fetch button
  fetchButton.addEventListener('click', function () {
      username = document.getElementById('username-input').value;
      fetchAndDisplayRatings();
  });

  // Event listeners for checkboxes
  rapidCheckbox.addEventListener('change', fetchAndDisplayRatings);
  blitzCheckbox.addEventListener('change', fetchAndDisplayRatings);
  bulletCheckbox.addEventListener('change', fetchAndDisplayRatings);

  // Polling interval (every 1 minutes)
  setInterval(fetchAndDisplayRatings, 60000); // Adjust interval as needed
});
