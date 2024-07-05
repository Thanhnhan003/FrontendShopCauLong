import React from 'react'
import SlideShow from './SlideShow'
import BrowseCategory from './BrowseCategory'
import NewProducts from './NewProducts'

export default function Home() {
  return (
    <>
      <main class="main">
        <div class="container home">
          <SlideShow />
          <BrowseCategory />
          <NewProducts/>
        </div>
      </main>
    </>
  )
}
