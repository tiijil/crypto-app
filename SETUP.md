# Setup Guide

This guide provides detailed instructions for setting up, testing, and deploying the CryptoTracker application.

## Development Setup

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git
- A CoinMarketCap API key

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
COINMARKETCAP_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

- `COINMARKETCAP_API_KEY`: Your CoinMarketCap API key
- `NEXT_PUBLIC_API_URL`: API URL (optional, defaults to production URL)
- `NODE_ENV`: Environment (development/production)

## Testing

### Running Tests

The project uses Jest and React Testing Library for testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

- Unit tests are located next to their components
- Integration tests are in the `tests` directory
- E2E tests use Playwright and are in `e2e` directory

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t crypto-tracker .
```

2. Run the container:
```bash
docker run -p 3000:3000 crypto-tracker
```

## Performance Monitoring

- Use Vercel Analytics for performance monitoring
- Check Lighthouse scores regularly
- Monitor API response times
- Track Core Web Vitals

## Troubleshooting

### Common Issues

1. API Key Issues:
```bash
# Check if API key is properly set
echo $COINMARKETCAP_API_KEY
```

2. Build Errors:
```bash
# Clear next.js cache
rm -rf .next
```

3. Dependencies Issues:
```bash
# Clear npm cache and reinstall
npm cache clean --force
npm install
```

## Security Considerations

- Keep API keys secure
- Use environment variables
- Implement rate limiting
- Regular dependency updates
- Security headers configuration

## Production Checklist

- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Error monitoring setup
- [ ] Performance monitoring setup
- [ ] SSL/TLS configured
- [ ] Backup strategy implemented
- [ ] CI/CD pipeline configured
- [ ] Documentation updated

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue if needed

## Updates and Maintenance

- Regular dependency updates
- Security patches
- Feature updates
- Bug fixes
- Documentation updates 