/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import theme from './theme';

const users = [
  { name: 'Alice', tickets: 30 },
  { name: 'Bob', tickets: 20 },
  { name: 'Charlie', tickets: 40 }
];

const Leaderboard = () => {
  const maxTickets = Math.max(...users.map(user => user.tickets));
  const barsRef = useRef([]);

  useEffect(() => {
    barsRef.current.forEach((bar, index) => {
      gsap.fromTo(bar, 
        { width: '0%' }, 
        { 
          width: `${(users[index].tickets / maxTickets) * 100}%`, 
          duration: 1.5, 
          ease: 'power3.out' 
        }
      );
    });
  }, [maxTickets]);

  return (
    <div sx={{ variant: 'styles.root', p: 4 }}>
      <h1 className="arcade-title" sx={{ variant: 'text.title', mb: 4 }}>Arcade Leaderboard</h1>
      {users.map((user, index) => (
        <div key={user.name} sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
          <h2 sx={{ variant: 'text.headline', width: '150px', mr: 3 }}>{user.name}</h2>
          <div sx={{ flexGrow: 1, bg: 'muted', borderRadius: 'default', position: 'relative', height: '48px' }}>
            <div
              ref={el => barsRef.current[index] = el}
              sx={{
                bg: 'primary',
                height: '100%',
                borderRadius: 'default',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                pr: 2,
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <span sx={{ color: 'white', fontWeight: 'bold', variant: 'text.headline' }}>{user.tickets} 🎟</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Leaderboard />
  </ThemeProvider>
);

export default App;
