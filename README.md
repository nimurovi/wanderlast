# Wonderlust

Wonderlust is a travel-focused web application built with Next.js and Node.js. It combines a modern frontend with an Express backend to support travel-related features and API services.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

### Backend
- Node.js
- Express.js
- REST API

## Project Structure

```text
wonderlust/
├── public/                 # Static assets
├── src/                    # Next.js application source
├── server/                 # Express backend
│   ├── src/                # Backend source code
│   ├── index.js            # Server entry point
│   ├── package.json        # Backend dependencies
│   └── .gitignore          # Backend Git exclusions
├── package.json            # Frontend dependencies
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
 
 
 
### Frontend — Vercel

1. Import the GitHub repository into Vercel.
2. Set the project root to the repository root.
3. Configure the required frontend environment variables.
4. Deploy the application.
 
## Security

- Never commit `.env` or `.env.local` files containing secrets.
- Keep database credentials and private API keys in environment variables.
- Do not commit `node_modules/` or generated build files.
- Validate incoming API requests on the server.
- Configure CORS to allow only trusted frontend origins where appropriate.

## Development Workflow

1. Create a feature branch when working on a new feature.
2. Implement and test the changes locally.
3. Commit the changes with a descriptive message.
4. Push the branch to GitHub.
5. Merge changes into the production branch after testing.
6. Verify the frontend and backend deployments.

## Contributing

Contributions and suggestions are welcome. Please test changes before submitting a pull request.

## License

Add your chosen license here if you intend to distribute this project under an open-source license.
