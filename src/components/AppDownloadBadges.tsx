const IOS_URL = 'https://apps.apple.com/us/app/asciende-hub/id6763733254';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=pro.asciende.app&pcampaignid=web_share';

interface AppDownloadBadgesProps {
  size?: 'sm' | 'lg';
}

export function AppDownloadBadges({ size = 'sm' }: AppDownloadBadgesProps) {
  const imgClass = size === 'lg' ? 'h-12' : 'h-10';

  return (
    <div className="flex flex-row justify-center items-center gap-3">
      <a
        href={IOS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-200 hover:scale-105 hover:opacity-90"
      >
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="Download on the App Store"
          className={imgClass}
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
          className={imgClass}
        />
      </a>
    </div>
  );
}
