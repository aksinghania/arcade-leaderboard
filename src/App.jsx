/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import theme from './theme';

const initialUsers = [
  { name: 'Charlie', tickets: 40 },
  { name: 'Alice', tickets: 30 },
  { name: 'Bob', tickets: 20 },
];

const Leaderboard = () => {
  const [users, setUsers] = useState(initialUsers);
  
  const listRef = useRef();

  useEffect(() => {
    const listItems = Array.from(listRef.current.children);
    const maxTickets = Math.max(...users.map(user => user.tickets));
    listItems.forEach((item, index) => {
      const progressBar = item.querySelector('.progress-bar');
      gsap.fromTo(
        progressBar,
        { width: '0%' },
        { width: `${(users[index].tickets / maxTickets) * 100}%`, duration: 1.5, ease: 'power3.out' }
      );
    });

    const animatePositions = () => {
      listItems.forEach((item, index) => {
        gsap.to(item, { y: index * 60, duration: 1.5, ease: 'power3.out' });
      });
    };

    animatePositions();
  }, [users]);

  // const updateTickets = (name, newTickets) => {
  //   setUsers(prevUsers => {
  //     const updatedUsers = prevUsers
  //       .map(user => (user.name === name ? { ...user, tickets: user.tickets+newTickets } : user))
  //       .sort((a, b) => b.tickets - a.tickets);
  //     return updatedUsers;
  //   });
  // };

  return (
    <div sx={{ variant: 'styles.root', p: 4 }}>
      <h1 className="arcade-title" sx={{ variant: 'text.title', mb: 4 }}>Arcade Leaderboard</h1>
      <div ref={listRef}>
        {users.map((user,index) => (
          <div key={user.name} sx={{ my: 3, display: 'flex', alignItems: 'center', position: 'relative' }}>
            <h2 sx={{ variant: 'text.headline', width: '150px', mr: 3 }}><span sx={{ variant: 'text.eyebrow'}}>{index+1}. </span> {user.name}</h2>
            <div sx={{ flexGrow: 1, bg: 'muted', borderRadius: 'default', position: 'relative', height: '48px' }}>
              <div
                className="progress-bar"
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
     
      {/* <button onClick={() => updateTickets('Alice',5)}>Update Alice's Tickets</button>
      <button onClick={() => updateTickets('Bob', 5)}>Update Bob's Tickets</button>
      <button onClick={() => updateTickets('Charlie', 5)}>Update Charlie's Tickets</button> */}
    </div>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Leaderboard />
  </ThemeProvider>
);

export default App;
