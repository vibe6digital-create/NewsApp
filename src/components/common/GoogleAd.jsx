import React, { useEffect, useRef } from 'react';

/**
 * GoogleAd — renders a real AdSense ad unit.
 *
 * Props:
 *   slot      (string)  — data-ad-slot value from your AdSense dashboard  [REQUIRED]
 *   format    (string)  — 'auto' | 'horizontal' | 'rectangle' | 'vertical'  [default: 'auto']
 *   style     (object)  — extra inline styles on the wrapper div
 */
const GoogleAd = ({ slot, format = 'auto', style = {} }) => {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      // adsbygoogle not loaded yet (localhost / no approval)
    }
  }, []);

  return (
    <div style={{ overflow: 'hidden', textAlign: 'center', ...style }} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8676352991922899"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;
