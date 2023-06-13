import React from 'react';

import { useLocation } from '@redwoodjs/router';

import CalenderTabSection from './CalenderTabSection';
import GenralTabSection from './GenralTabSection';
import NoticficationTabSection from './NoticficationTabSection';
import RecuitTabSection from './RecuitTabSection';
import TabSection from './TabSection';
import WebinarTebSection from './TebSection';

const tabs = [
  { tabName: 'General', hash: 'general' },
  { tabName: 'Recuit', hash: 'recuit' },
  { tabName: 'Noticfication', hash: 'noticfication' },
  { tabName: 'Calender', hash: 'callender' },
  { tabName: 'Webinar', hash: 'webinar' },
];
function SettingPage() {
  const ActiveTab = useLocation().hash;
  return (
    <div className="px-10">
      <h1 className="text-3xl ">Setting</h1>
      <TabSection tabData={tabs} />

      {ActiveTab === '#general' ? <GenralTabSection /> : ''}
      {ActiveTab === '#recuit' ? <RecuitTabSection /> : ''}
      {ActiveTab === '#noticfication' ? <NoticficationTabSection /> : ''}
      {ActiveTab === '#callender' ? <CalenderTabSection /> : ''}
      {ActiveTab === '#webinar' ? <WebinarTebSection /> : ''}
    </div>
  );
}

export default SettingPage;
