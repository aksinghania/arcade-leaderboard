/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui';
import theme from './theme';

const users = [
  { name: 'Alice', tickets: 30 },
  { name: 'Bob', tickets: 20 },
  { name: 'Charlie', tickets: 40 }
];

const Leaderboard = () => {
  const maxTickets = Math.max(...users.map(user => user.tickets));

  return (
    <div sx={{ variant: 'styles.root', p: 4 }}>
      <h1 className="arcade-title" sx={{ variant: 'text.title', mb: 4 }}>Arcade Leaderboard</h1>
      {users.map(user => (
        <div key={user.name} sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
          <h2 className='sub-font' sx={{ variant: 'text.title',fontSize:"2.8rem", width: '150px', mr: 3 }}>{user.name}</h2>
          <div sx={{ flexGrow: 1, bg: 'muted', borderRadius: 'default', position: 'relative', height: '40px' }}>
            <div
              sx={{
                width: `${(user.tickets / maxTickets) * 100}%`,
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
