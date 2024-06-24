/** @jsxImportSource theme-ui */
import { ThemeProvider } from "theme-ui";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import theme from "./theme";

const initialUsers = [];
const Ids = [
  {
    username: "akshatsinghania",
    id: "U0217R0029Z",
  },
  { username: "s8ul", id: "U04AQNZRJQ5" },
  { username: "Mehul", id: "U06DMH2GHC7" },
];

const Leaderboard = () => {
  const [users, setUsers] = useState(
    initialUsers.sort((a, b) => b.tickets - a.tickets)
  );

  const listRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          Ids.map((idObj) =>
            fetch(
              `https://arcade-leaderboard-m4zsrel7l-akshatsinghanias-projects-a4067bab.vercel.app/api/v1/stats/${idObj.id}`
            )
          )
        );
        const data = await Promise.all(responses.map((res) => res.json()));

        const updatedUsers = data
          .map((userData, index) => ({
            name: Ids[index].username,
            tickets: userData.data.sessions,
          }))
          .sort((a, b) => b.tickets - a.tickets);

        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Ids]);

  useEffect(() => {
    const listItems = Array.from(listRef.current.children);
    const maxTickets = Math.max(...users.map((user) => user.tickets));
    listItems.forEach((item, index) => {
      const progressBar = item.querySelector(".progress-bar");
      const ticketCount = item.querySelector(".ticket-count");
      gsap.fromTo(
        progressBar,
        { width: "0%" },
        {
          width: `${(users[index].tickets / maxTickets) * 100}%`,
          duration: 1.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ticketCount,
        { innerText: 0 },
        {
          innerText: users[index].tickets,
          duration: 2,
          ease: "power3.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            ticketCount.textContent = `${Math.round(ticketCount.innerText)} 🎟`;
          },
        }
      );
    });

    const animatePositions = () => {
      listItems.forEach((item, index) => {
        gsap.to(item, { y: index * 5, duration: 1.5, ease: "power3.out" });
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
    <div sx={{ variant: "styles.root", p: 4 }}>
      <h1 className="arcade-title" sx={{ variant: "text.title", mb: 4 }}>
        Arcade Leaderboard
      </h1>
      <div ref={listRef}>
        {users.map((user, index) => (
          <div
            key={user.name}
            sx={{
              my: -3,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              position: "relative",
              marginBottom: 30,
            }}
          >
            <h2
              sx={{
                variant: "text.headline",
                width: "300px",
                mr: 3,
                fontSize: 4,
              }}
            >
              <span sx={{ variant: "text.eyebrow", fontSize: 4 }}>
                {index + 1}.{" "}
              </span>{" "}
              {user.name}
            </h2>
            <div
              sx={{
                flexGrow: 1,
                bg: "muted",
                borderRadius: "default",
                position: "relative",
                height: "40px",
                minWidth: "200px",
              }}
            >
              <div
                className="progress-bar"
                sx={{
                  bg: "primary",
                  height: "100%",
                  borderRadius: "default",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  pr: 2,
                  position: "relative",
                  zIndex: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  className="ticket-count"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    variant: "text.headline",
                  }}
                >
                  {user.tickets} 🎟
                </span>
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
