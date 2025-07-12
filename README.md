# BountyBoard - Bounty Platform

A beautiful, modern bounty board platform built with Next.js, TypeScript, and PostgreSQL. Features a comic-style design with smooth animations and a fully functional bounty creation system.

## ✨ Features

### 🎨 Beautiful Comic-Style Design
- Vibrant colors and bold typography
- Smooth hover animations and transitions
- Comic-style borders and shadows
- Responsive design for all devices

### 🚀 Bounty Creation Modal
- **Beautiful Form Interface**: Clean, intuitive form with comic-style styling
- **Category Selection**: Visual category picker with icons and colors
- **Real-time Validation**: Form validation with helpful error messages
- **Smooth Animations**: Fade-in and slide-in animations
- **Responsive Design**: Works perfectly on mobile and desktop

### 📊 Dashboard Features
- **Bounty Listings**: View all available bounties with filtering
- **Search Functionality**: Search bounties by title, description, or project
- **Category Filtering**: Filter by design, video, content, development, social, educational
- **User Statistics**: Track earnings and completed tasks
- **Recent Activity**: View recent bounty completions

### 🛠 Technical Stack
- **Frontend**: Next.js 14 with App Router
- **Styling**: SCSS with custom comic-style design system
- **Database**: PostgreSQL with Prisma ORM
- **TypeScript**: Full type safety throughout the application
- **API**: RESTful API endpoints for all functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bountyboard-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/bountyboard"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 How to Use

### Creating a New Bounty

1. **Click the floating action button** (+ icon) in the bottom-right corner
2. **Fill out the bounty form**:
   - **Title**: Enter a descriptive title for your bounty
   - **Description**: Provide detailed requirements
   - **Reward**: Set the APT reward amount
   - **Project**: Specify the project name
   - **Category**: Choose from Design, Video, Content, Development, Social, or Educational
   - **Due Date**: Set an optional deadline
   - **Tags**: Add comma-separated tags for better discoverability

3. **Click "Create Bounty"** to submit
4. **The bounty will appear** in the main listing immediately

### Browsing Bounties

- **Search**: Use the search bar to find specific bounties
- **Filter**: Click category tabs to filter by type
- **View Details**: Click on any bounty card to see full details
- **Sort**: Bounties are sorted by creation date (newest first)

## 🎨 Design System

### Color Palette
- **Primary**: #E74C3C (Red)
- **Secondary**: #3498DB (Blue)
- **Accent**: #FFD93D (Yellow)
- **Background**: #FFF9C4 (Light Yellow)
- **Text**: #2C3E50 (Dark Gray)

### Typography
- **Headings**: Fredoka One (Comic-style)
- **Body**: Nunito (Clean, readable)

### Components
- **Cards**: Comic-style borders with shadows
- **Buttons**: 3D effect with hover animations
- **Modals**: Smooth fade-in with backdrop blur
- **Forms**: Clean inputs with focus states

## 🔧 API Endpoints

### Bounties
- `GET /api/bounties` - List all bounties
- `POST /api/bounties` - Create a new bounty
- `GET /api/bounties/[id]` - Get specific bounty

### Submissions
- `GET /api/submissions` - List submissions
- `POST /api/submissions` - Create submission

### User Stats
- `GET /api/stats` - Get user statistics

## 📱 Responsive Design

The application is fully responsive and works beautifully on:
- **Desktop**: Full layout with sidebar
- **Tablet**: Optimized layout with adjusted spacing
- **Mobile**: Stacked layout with touch-friendly buttons

## 🎭 Animations

- **Hover Effects**: Cards lift and buttons scale
- **Modal Transitions**: Smooth fade-in and slide-in
- **Loading States**: Pulsing animations
- **Floating Action**: Bouncing animation

## 🔮 Future Enhancements

- [ ] **Wallet Integration**: Connect real crypto wallets
- [ ] **Real-time Updates**: WebSocket for live updates
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Advanced Filtering**: More filter options
- [ ] **Bounty Submissions**: Submit work for bounties
- [ ] **User Profiles**: Detailed user profiles
- [ ] **Notifications**: Real-time notifications
- [ ] **Leaderboards**: User ranking system

## 🛠 Development

### Project Structure
```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   ├── globals.scss    # Global styles
│   └── page.tsx        # Main page
├── components/         # React components
│   └── CreateBountyModal.tsx
├── lib/               # Utilities
│   ├── api.ts         # API service
│   └── prisma.ts      # Database client
└── prisma/            # Database schema
    └── schema.prisma
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open database GUI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Next.js, TypeScript, and PostgreSQL**
