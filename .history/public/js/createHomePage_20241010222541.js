const fs = require('fs');

// Define the HTML content
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bluff Royale</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body, html { height: 100%; margin: 0; font-family: 'Helvetica Neue', sans-serif; background: #0d0d0d; color: #e0e0e0; font-size: 1em; }
    .hero-section { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background-image: url('https://source.unsplash.com/1600x900/?poker,casino'); background-size: cover; background-position: center; position: relative; overflow: hidden; }
    .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.75); }
    .hero-content { position: relative; text-align: center; z-index: 1; color: #e0e0e0; padding: 0 20px; }
    .hero-content h1 { font-size: 4rem; font-weight: bold; color: #ffffff; letter-spacing: 2px; text-shadow: 0 4px 10px rgba(0, 0, 0, 0.8); }
    .hero-content p { font-size: 1.5rem; margin-top: 10px; color: #cccccc; text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6); }
    .btn-start { margin-top: 30px; padding: 18px; font-size: 1.8rem; background-color: #262626; border: 2px solid #595959; color: #e0e0e0; font-weight: bold; border-radius: 8px; text-transform: uppercase; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(255, 111, 97, 0.6); }
    .btn-start:hover { background-color: #595959; color: #ffffff; box-shadow: 0 10px 30px rgba(255, 111, 97, 0.9); transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="hero-section">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1>Welcome to Bluff Royale</h1>
      <p>Your ultimate poker experience</p>
      <a href="/play" class="btn-start">Start Playing</a>
    </div>
  </div>
</body>
</html>
`;

// Write the HTML content to a file called index.html
fs.writeFileSync('index.html', htmlContent, (err) => {
  if (err) throw err;
  console.log('Homepage created successfully!');
});
