import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const Repo = ({ repo }) => {
  return (
    <React.Fragment>
      <div className='repo'>
        <div className='flex-block'>
          <a
            href='https://github.com/octocat/boysenberry-repo-1'
            className='repo-name black-text'
          >
            {repo.name}
          </a>
          <div className='description'>{repo.description}</div>
        </div>
        <div className='language'>
          <span className='new badge blue lighten-1' data-badge-caption=''>
            {repo.language ? repo.language : 'none'}
          </span>
        </div>
      </div>
      <div className='divider'></div>
    </React.Fragment>
  );
};

const ProfileSection = ({ store }) => {
  const profile = store.profile;
  const repos = store.repos;
  const [data, setData] = useState();

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  useEffect(() => {
    const grouped = groupBy(repos, repo => repo.language);
    console.log(grouped);
    const labels = Array.from(grouped.keys());
    const dataset = labels.map(label => grouped.get(label).length);
    const bgColors = labels.map(
      label => '#' + Math.floor(Math.random() * 16777215).toString(16)
    );

    const _data = {
      labels: labels,
      datasets: [
        {
          data: dataset,
          backgroundColor: bgColors
        }
      ]
    };
    console.log(data);
    setData(_data);
  }, [repos]);

  return (
    <section className='profile-section'>
      <div className='container'>
        <div className='row'>
          <div className='col s12 m5'>
            <div className='card white'>
              <div className='card-content black-text'>
                <a
                  href={profile.html_url}
                  className='card-title flow-text'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    className='responsive-img circle profile-img left'
                    src={profile.avatar_url}
                    alt='profile_image'
                  />
                  &nbsp; {profile.login}
                </a>
                <br />
                <div className='stock-values'>
                  <div className='followers stock'>
                    <div className='value'>{profile.followers}</div>
                    <div className='label'>Followers</div>
                  </div>
                  <div className='following stock'>
                    <div className='value'>{profile.following}</div>
                    <div className='label'>Following</div>
                  </div>
                </div>
                <div className='divider'></div>
                {data ? <Pie data={data} width={200} height={200} /> : ''}
              </div>
            </div>
          </div>
          <div className='col s12 m7'>
            <h5>Repos</h5>
            <div className='div right'>{repos.length} Repos</div>
            <div className='row'>
              <div className='col s12'>
                <div className='card repos-card'>
                  {repos.map((repo, index) => (
                    <Repo key={index} repo={repo} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
