// Lighthouse Configuration for Next Notes

module.exports = {
  lighthouserc: {
    ci: {
      collect: {
        settings: {
          // Lighthouse configuration settings
          'preset': ['lighthouse:recommended'],
          'skipAudits': [
            'budgets',
            'categories.performance',
            'categories.pwa'
          ],
          'chromeFlags': [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-web-security'
          ]
        }
      },
      assert: {
        assertions: {
          'categories.performance': ['warn'],
          'categories.pwa': ['warn'],
          'categories.accessibility': ['error']
        }
      }
    }
  }
};