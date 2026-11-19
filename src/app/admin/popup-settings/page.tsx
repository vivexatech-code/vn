import React from 'react';
import { getPopupSettings } from '@/lib/data';
import PopupSettingsManager from './PopupSettingsManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Automatic Enquiry Popup Settings | VN Vidhyapeeth Admin'
};

export default function AdminPopupSettingsPage() {
  const settings = getPopupSettings();

  return (
    <div className="space-y-6">
      <PopupSettingsManager initialSettings={settings} />
    </div>
  );
}
