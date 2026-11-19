import React from 'react';
import AdminLayoutClient from './AdminLayoutClient';

export const metadata = {
  title: 'Admin Console | VN Vidhyapeeth',
  description: 'Administrative panel for managing courses, campaigns, hero slides, inquiries, and settings.'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
