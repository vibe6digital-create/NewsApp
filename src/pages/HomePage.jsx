import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSlider from '../components/home/HeroSlider';
import AdBanner from '../components/layout/AdBanner';
import UttarakhandSection from '../components/home/UttarakhandSection';
import IndiaSection from '../components/home/IndiaSection';

const VideoNewsSection = lazy(() => import('../components/home/VideoNewsSection'));
const WorldSection = lazy(() => import('../components/home/WorldSection'));
const SubscriptionBanner = lazy(() => import('../components/home/SubscriptionBanner'));
const Sidebar = lazy(() => import('../components/layout/Sidebar'));

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>खबर का सफर — तेज नज़र तेज़ खबर | Khabar Ka Safar — Tez Nazar Tez Khabar</title>
        <meta name="description" content="खबर का सफर — तेज नज़र तेज़ खबर। आपका अपना हिंदी समाचार पोर्टल। ताज़ा खबरें, शिक्षा, नौकरी, तकनीक और राज्य समाचार।" />
      </Helmet>

      <div className="container-fluid px-0">
        {/* Full-width hero */}
        <HeroSlider />

        {/* Full-width leaderboard ad */}
        <div className="container my-2">
          <AdBanner size="728x90" index={0} />
        </div>

        {/* ── Two-column layout: main (col-lg-8) + sidebar (col-lg-4) ── */}
        <div className="container py-2">
          <div className="row g-4">

            {/* ── Main content ── */}
            <div className="col-lg-8">
              {/* Featured: Uttarakhand */}
              <UttarakhandSection />

              <hr className="section-divider" />

              {/* National News */}
              <IndiaSection />

              <hr className="section-divider" />

              {/* KPN Exclusive Video News */}
              <Suspense fallback={null}>
                <VideoNewsSection />
              </Suspense>

              <hr className="section-divider" />

              <div className="my-2">
                <AdBanner size="728x90" index={3} />
              </div>

              {/* International News */}
              <Suspense fallback={null}>
                <WorldSection />
              </Suspense>
            </div>

            {/* ── Sidebar ── */}
            <div className="col-lg-4 d-none d-lg-block">
              <Suspense fallback={null}>
                <Sidebar />
              </Suspense>
            </div>

          </div>
        </div>

        {/* Full-width bottom ad */}
        <div className="container my-2">
          <AdBanner size="970x90" index={5} />
        </div>

        {/* Full-width subscription banner */}
        <Suspense fallback={null}>
          <SubscriptionBanner />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
