const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'ngo');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated high quality authentic welfare & educational photos from Unsplash
const images = [
  // Hero slides
  {
    name: 'hero-children-study.jpg',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600&auto=format&fit=crop&q=80' // Children studying in school
  },
  {
    name: 'hero-food-relief.jpg',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80' // Volunteering and meal support
  },
  {
    name: 'hero-stationery.jpg',
    url: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1600&auto=format&fit=crop&q=80' // Books, notebook & supplies
  },
  {
    name: 'hero-community.jpg',
    url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1600&auto=format&fit=crop&q=80' // Community welfare and hope
  },

  // 5 Main Initiatives
  {
    name: 'initiative-education.jpg',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80' // Education for every child
  },
  {
    name: 'initiative-food.jpg',
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1000&auto=format&fit=crop&q=80' // Food distribution
  },
  {
    name: 'initiative-stationery.jpg',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&auto=format&fit=crop&q=80' // Free stationery & school kits
  },
  {
    name: 'initiative-welfare.jpg',
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&auto=format&fit=crop&q=80' // Social welfare for poor families
  },
  {
    name: 'initiative-child-dev.jpg',
    url: 'https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=1000&auto=format&fit=crop&q=80' // Child welfare & development
  },

  // Campaigns
  {
    name: 'campaign-child-education.jpg',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&auto=format&fit=crop&q=80' // Support a child's education
  },
  {
    name: 'campaign-feed-family.jpg',
    url: 'https://images.unsplash.com/photo-1541802645635-11f2286a7482?w=1000&auto=format&fit=crop&q=80' // Feed a hungry family
  },
  {
    name: 'campaign-stationery.jpg',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&auto=format&fit=crop&q=80' // Free school stationery
  },
  {
    name: 'campaign-child-welfare.jpg',
    url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=1000&auto=format&fit=crop&q=80' // Help underprivileged children
  },

  // Stories of Change
  {
    name: 'story-priya.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80' // Student Priya
  },
  {
    name: 'story-rohit.jpg',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80' // Student Rohit
  },
  {
    name: 'story-sunita.jpg',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80' // Mother Sunita
  },

  // Volunteer & Community
  {
    name: 'volunteer-team.jpg',
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop&q=80' // Volunteers team
  },
  {
    name: 'donation-banner.jpg',
    url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb7?w=1200&auto=format&fit=crop&q=80' // Donation banner hands giving
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Status ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${images.length} NGO assets...`);
  let success = 0;
  for (const img of images) {
    const dest = path.join(targetDir, img.name);
    try {
      console.log(`Downloading ${img.name}...`);
      await downloadFile(img.url, dest);
      console.log(`✓ Saved ${img.name}`);
      success++;
    } catch (e) {
      console.error(`✗ Error downloading ${img.name}:`, e.message);
    }
  }
  console.log(`Download completed: ${success}/${images.length} assets saved.`);
}

run();
