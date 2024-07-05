import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../../api/apiService';
import ProfileSibar from './ProfileSibar';
import ProfileInfo from './ProfileContent';

export default function Profile() {
  return (
    <main class="main profile">
      <div class="container">
        <div class="profile-container d-none d-lg-block">
          <div class="search-bar">
            <input type="text" name="" id="" class="search-bar__input" placeholder="Seach for item" />
            <button>
              <img src="/assets/icon/filter-search.svg" alt="search" class="search-bar__icon icon" />
            </button>
          </div>
        </div>

        <div class="profile-container">
          <div class="row gy-md-3">
            <ProfileSibar />
            <Outlet />
          </div>
        </div>


      </div>

    </main>

  );
}
