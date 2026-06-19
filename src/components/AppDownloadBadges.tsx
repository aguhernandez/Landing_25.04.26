const IOS_URL = 'https://apps.apple.com/us/app/asciende-hub/id6763733254';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=pro.asciende.app&pcampaignid=web_share';

interface AppDownloadBadgesProps {
  size?: 'sm' | 'lg';
  direction?: 'row' | 'col';
}

export function AppDownloadBadges({ size = 'sm', direction = 'row' }: AppDownloadBadgesProps) {
  // Apple badge is tightly cropped; Google Play badge has ~16% internal padding.
  // We give Google Play a taller container so both render at the same visual height.
  const appleH = size === 'lg' ? 'h-[52px]' : 'h-[40px]';
  const googleH = size === 'lg' ? 'h-[78px]' : 'h-[60px]';

  const layout = direction === 'col'
    ? 'flex flex-col items-center gap-2'
    : 'flex flex-row justify-center items-center gap-3';

  return (
    <div className={layout}>
      <a
        href={IOS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-200 hover:scale-105 hover:opacity-90"
      >
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="Download on the App Store"
          className={appleH}
        />
      </a>
      <a
        href={ANDROID_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-200 hover:scale-105 hover:opacity-90"
      >
        <img
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          alt="Get it on Google Play"
          className={googleH}
        />
      </a>
    </div>
  );
}
