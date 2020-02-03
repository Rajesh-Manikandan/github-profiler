import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';

const gitUrl = 'https://api.github.com/users/';

function App() {
  const [store, setStore] = useState({
    profile: { login: 'Rajesh-Manikandan' }
  });

  const searchProfile = searchText => {
    if (searchText) {
      fetch(gitUrl + searchText, {
        method: 'get'
      })
        .then(res => res.json())
        .then(profile => {
          if (profile) {
            fetch(profile.repos_url, {
              method: 'get'
            })
              .then(res => res.json())
              .then(repos => {
                setStore({
                  ...store,
                  repos,
                  profile: {
                    login: profile.login,
                    html_url: profile.html_url,
                    followers: profile.followers,
                    following: profile.following,
                    repos_url: profile.repos_url,
                    avatar_url: profile.avatar_url
                  }
                });
                console.log(profile, repos);
              });
          } else {
            setStore({});
          }
        });
    }
  };

  return (
    <div className='App'>
      <Header searchProfile={searchProfile} />
      {store.profile && store.repos ? (
        <ProfileSection store={store} />
      ) : (
        <p className='center'>Search profile to see the data...</p>
      )}
    </div>
  );
}

export default App;
